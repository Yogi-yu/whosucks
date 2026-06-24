export function formatNumber(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

export function formatPct(n: number): string {
  return `${n.toFixed(1)}%`;
}
