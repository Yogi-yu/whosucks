# 09 — Scaling Strategy (1M+ users, viral spikes)

The hard problem isn't 1M rows — it's **bursty write spikes** (a celebrity tweet → 100× traffic in
minutes) on a counter everyone reads.

## 1. Traffic shape
- Reads ≫ writes (everyone watches the balloon; fewer vote).
- Writes spike hard and briefly.
- Money path is low-volume but must be perfectly correct.

## 2. Read scaling (the balloon)
- `GET /stats/live` served from **Redis**, **edge-cached 1–2s** at Cloudflare → millions of reads at ~zero origin cost.
- **SSE fan-out** for live updates: a small pool of broadcast nodes reads Redis deltas and pushes to clients, instead of every client polling the DB.
- Static + ISR pages (home shell, leaderboards) cached at edge.
- Dynamic OG images cached on CDN keyed by user + stat bucket.

## 3. Write scaling (votes)
- **Accept fast, persist async:** API does atomic Redis `INCR` + idempotency check, enqueues a durable event, returns immediately. Durable write to Postgres happens in workers.
- **Queue absorbs spikes:** BullMQ (Redis) → migrate to SQS/Kafka at very high scale. Backpressure + autoscaled workers.
- **Batch inserts:** vote-writer batches N events per `INSERT ... VALUES` to cut Postgres write amplification.
- **Idempotency** prevents double counting on retries/double-taps.

## 4. Postgres scaling
- **Partition `votes` by month** (RANGE on `created_at`) → fast inserts, cheap pruning/archival.
- **Read replicas** for analytics, leaderboards, history queries; primary handles writes.
- **Connection pooling** via PgBouncer (transaction pooling) — essential under spiky concurrency.
- Hot aggregates (totals, referral_stats) maintained incrementally by workers, not computed on read.
- Vertical scale first (cheap wins), then partition/replica; **shard only if truly needed** (Phase 3 multi-topic could shard by topic).

## 5. Redis scaling
- Counters + ZSET leaderboards + rate-limit + idempotency.
- Cluster mode / Redis Enterprise for HA + memory headroom.
- Counters are rebuildable from Postgres → Redis is a cache, not the ledger (resilience).

## 6. Stateless, autoscaled services
- API and SSE nodes are stateless → horizontal autoscale on CPU/conn count (Fargate/Fly/K8s HPA).
- Workers autoscale on queue depth.
- Separate deploys: API, SSE, workers scale independently (SSE scales with viewers, workers with vote volume).

## 7. Reliability under attack/spike
- **Kill switches (flags):** freeze counter, disable anon voting, disable purchases, raise challenge rate — all without deploy.
- **Graceful degradation:** if write queue saturates, keep serving cached reads (balloon stays live) while writes drain.
- **Reconciliation job:** periodically recompute Redis counters from Postgres `votes` by status → self-heals drift.
- Multi-AZ for DB + Redis; PITR backups; tested restore.

## 8. Capacity sketch (order-of-magnitude)
- 1M DAU, ~2 votes/user/day ≈ 2M writes/day ≈ 23/s average, but peak bursts to thousands/s.
- Redis INCR handles >100k ops/s on modest hardware → counter path is not the bottleneck.
- Queue + batched workers smooth peaks into steady Postgres write rate.
- SSE: shard viewers across broadcast nodes; each handles tens of thousands of connections.

## 9. Cost controls
- Edge caching slashes origin reads (the dominant volume).
- Async batching cuts DB IOPS.
- Archive old vote partitions to cold storage (S3) after N months; keep aggregates hot.

## 10. Observability
- OpenTelemetry traces across vote path; dashboards for queue depth, counter drift, SSE conns, p99 vote latency, fraud quarantine rate, payment success rate.
- Alerts on: queue backlog, drift > threshold, payment webhook failures, abnormal vote velocity.
