export interface ReturnRow {
  date: string;
  r: number;
  index?: number;
  bench: Record<string, number | null>;
  from?: string;
}

export interface Returns {
  sample?: boolean;
  book: string;
  name: string;
  inception: string;
  as_of: string;
  benchmarks: Record<string, string>;
  series: ReturnRow[];
}

export const BOOK = "book";
export const TDAYS = 252;
export const MIN_RISK_DAYS = 20;
export const MIN_ANN_DAYS = 63;

export type Series = (number | null)[];

export const seriesOf = (d: Returns, key: string): Series =>
  key === BOOK ? d.series.map((x) => x.r) : d.series.map((x) => x.bench?.[key] ?? null);

export function wealth(rs: Series): number[] {
  const w = [1];
  for (const r of rs) w.push(w[w.length - 1] * (1 + (r ?? 0)));
  return w;
}

export function drawdown(rs: Series): number[] {
  let peak = 1;
  return wealth(rs).map((v) => {
    peak = Math.max(peak, v);
    return v / peak - 1;
  });
}

const mean = (a: number[]) => a.reduce((s, v) => s + v, 0) / a.length;
const sd = (a: number[]) => {
  const m = mean(a);
  return Math.sqrt(a.reduce((s, v) => s + (v - m) ** 2, 0) / (a.length - 1));
};

export interface Metrics {
  n: number;
  missing: number;
  total: number;
  ann: number | null;
  vol: number | null;
  sharpe: number | null;
  sortino: number | null;
  mdd: number;
  beta: number | null;
  best: number | null;
  worst: number | null;
  upShare: number | null;
}

export function metrics(rs: Series, ref?: Series): Metrics {
  const v = rs.filter((x): x is number => x !== null);
  const n = v.length;
  const w = wealth(rs);
  const total = w[w.length - 1] - 1;
  const risk = n >= MIN_RISK_DAYS;
  const s = n > 1 ? sd(v) : 0;
  const down = Math.sqrt(mean(v.map((x) => Math.min(x, 0) ** 2)));
  let beta: number | null = null;
  if (ref && risk) {
    const pairs = rs.flatMap((x, i) => (x !== null && ref[i] !== null ? [[x, ref[i] as number]] : []));
    if (pairs.length >= MIN_RISK_DAYS) {
      const mx = mean(pairs.map((p) => p[0]));
      const my = mean(pairs.map((p) => p[1]));
      const cov = pairs.reduce((a, [x, y]) => a + (x - mx) * (y - my), 0);
      const vy = pairs.reduce((a, [, y]) => a + (y - my) ** 2, 0);
      beta = vy > 0 ? cov / vy : null;
    }
  }
  return {
    n,
    missing: rs.length - n,
    total,
    ann: n >= MIN_ANN_DAYS ? (1 + total) ** (TDAYS / n) - 1 : null,
    vol: risk ? s * Math.sqrt(TDAYS) : null,
    sharpe: risk && s > 0 ? (mean(v) / s) * Math.sqrt(TDAYS) : null,
    sortino: risk && down > 0 ? (mean(v) / down) * Math.sqrt(TDAYS) : null,
    mdd: Math.min(...drawdown(rs)),
    beta,
    best: n ? Math.max(...v) : null,
    worst: n ? Math.min(...v) : null,
    upShare: n ? v.filter((x) => x > 0).length / n : null,
  };
}

export function monthly(d: Returns, key: string): Map<string, number> {
  const out = new Map<string, number>();
  seriesOf(d, key).forEach((r, i) => {
    const m = d.series[i].date.slice(0, 7);
    out.set(m, (1 + (out.get(m) ?? 0)) * (1 + (r ?? 0)) - 1);
  });
  return out;
}

export const pct = (x: number | null, dp = 2, sign = true) =>
  x === null || !Number.isFinite(x) ? "—" : `${sign && x > 0 ? "+" : ""}${(x * 100).toFixed(dp)}%`;
export const num = (x: number | null, dp = 2) => (x === null || !Number.isFinite(x) ? "—" : x.toFixed(dp));

export const fmtDay = (iso: string, year = true) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    ...(year ? { year: "numeric" } : {}),
    timeZone: "UTC",
  });
