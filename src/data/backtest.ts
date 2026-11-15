export interface BacktestRow {
  total: number;
  cagr: number;
  vol: number;
  sharpe: number;
  mdd: number;
  beta: number;
  alpha: number;
}

export const BACKTEST_WINDOW = "Jan 2001 – Nov 2025";

export const BACKTEST: Record<string, BacktestRow> = {
  summit: { total: 211.102, cagr: 0.2409, vol: 0.3582, sharpe: 0.7808, mdd: -0.6601, beta: 1.2535, alpha: 0.139 },
  ridgeline: { total: 69.4406, cagr: 0.187, vol: 0.2548, sharpe: 0.8005, mdd: -0.6022, beta: 0.9424, alpha: 0.0981 },
};

export const BACKTEST_SPY: BacktestRow = {
  total: 6.7167,
  cagr: 0.0858,
  vol: 0.1921,
  sharpe: 0.5247,
  mdd: -0.5675,
  beta: 1,
  alpha: 0,
};
