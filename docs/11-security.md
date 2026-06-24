# 11 — Security Recommendations

## 1. Authentication & sessions
- Auth.js/Clerk for email + Google + social; enforce email verification before purchases.
- HttpOnly, Secure, SameSite=Lax cookies; short-lived access + rotating refresh tokens.
- Anonymous identity uses a **signed** cookie (no trust in client-set ids); bind to fingerprint.
- Rate-limit auth endpoints; lockout/backoff on OTP brute force; OAuth state/PKCE.

## 2. Authorization
- RBAC: `user`, `support`, `admin`. Admin endpoints behind separate guard + audit log + MFA.
- Object-level checks (a user can only read/modify own wallet, orders, referrals).
- Server is authoritative on totals, allowances, prices — never trust client values.

## 3. Input & API hardening
- Validate every payload with zod; reject unknown fields; strict types.
- Parameterized queries / ORM only (no string SQL) → SQLi-safe.
- Output encoding + CSP → XSS defense; sanitize user-set username/profile.
- CSRF protection on cookie-auth mutations (double-submit token / SameSite).
- Idempotency keys on votes + payments to prevent replay/double-spend.

## 4. Payment security
- PCI SAQ-A: Stripe Elements/hosted Checkout, card data never touches our servers.
- Verify webhook signatures; preserve raw body; reject unsigned/replayed events (timestamp window).
- Credit wallet only on verified events; idempotent on `provider_ref`.
- 3DS/SCA for EU; Radar rules; velocity caps; manual hold on high-risk first purchases.

## 5. Infrastructure & network
- Cloudflare WAF + DDoS + Bot Management at the edge; Turnstile challenge on risk.
- TLS everywhere (1.2+), HSTS; private subnets for DB/Redis; no public DB exposure.
- Secrets in vault (AWS Secrets Manager/Doppler); rotate; never in repo or client bundles.
- Least-privilege IAM; separate prod/staging credentials; signed internal service auth (mTLS/JWT).

## 6. Data protection & privacy (GDPR/CCPA)
- Disclose device fingerprinting & analytics; lawful basis (legitimate interest for fraud, consent for analytics).
- DSAR support: data export & deletion; soft-delete + purge pipeline.
- Minimize PII; hash IPs with TTL; encrypt sensitive columns at rest; encrypted backups.
- Cookie consent banner (region-aware); honor Do-Not-Track/GPC.
- 18+ gate for payments; no behavioral targeting of minors.

## 7. Anti-abuse (cross-ref `07-anti-fraud.md`)
- Layered: edge → sync pre-check → async scoring → manual review.
- Dual counter (raw vs public), shadowbanning, kill switches.

## 8. Application security process
- Dependency scanning (Dependabot/Snyk), SAST in CI, secret scanning on commits.
- Pen test before launch; bug bounty after.
- Security headers (CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy).
- Audit logging for admin actions, payments, fraud decisions; tamper-evident (append-only).
- Incident response plan + on-call; documented kill-switch runbook.

## 9. Resilience
- Multi-AZ DB + Redis; automated PITR backups with tested restores.
- Rate limit + circuit breakers on external calls (Stripe, fingerprint vendor).
- Graceful degradation under load (serve cached balloon, queue writes).

## 10. Compliance checklist (pre-launch)
- [ ] Legal review: gambling classification, consumer protection, digital-goods withdrawal rights
- [ ] Privacy policy + cookie consent + fingerprint disclosure
- [ ] Terms incl. paid-vote entertainment disclosure + refund policy
- [ ] 18+ enforcement at checkout
- [ ] PCI SAQ-A attestation
- [ ] Pen test sign-off
