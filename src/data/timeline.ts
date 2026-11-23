export const CATS = {
  infra: { name: "Compute & infrastructure", color: "var(--c-speed)" },
  universe: { name: "Universe & data", color: "var(--c-universe)" },
  prod: { name: "Production", color: "var(--c-prod)" },
  model: { name: "Model & training", color: "var(--c-model)" },
} as const;
export type Cat = keyof typeof CATS;

export interface Era {
  id: string;
  name: string;
  start: string;
  end: string;
  blurb: string;
}

export const ERAS: Era[] = [
  {
    id: "proto",
    name: "Prototyping",
    start: "2025-10-25",
    end: "2025-12-21",
    blurb: "A long-only temporal convolutional policy over a handful of ETFs, trained on CPU, then moved to GPU.",
  },
  {
    id: "sweeps",
    name: "Early Parameter Experiments",
    start: "2025-12-22",
    end: "2026-03-23",
    blurb: "Hyperparameter sweeps across a growing GPU pool, and proper experiment tracking.",
  },
  {
    id: "prod",
    name: "Early Production",
    start: "2026-03-24",
    end: "2026-06-17",
    blurb: "A held-out test harness, a daily inference package, brokerage integration and the first live models.",
  },
  {
    id: "dynamic",
    name: "Rolling Equity Universe",
    start: "2026-06-18",
    end: "2026-09-22",
    blurb: "A per-day S&P 500 universe, much longer runs, a custom worker queue and custom GPU kernels.",
  },
  {
    id: "kernels",
    name: "Universe Scaling",
    start: "2026-09-23",
    end: new Date().toISOString().slice(0, 10), // the current era runs to the build date
    blurb: "Hand-tuned Triton kernels, fp16 tensor-core math, systematic robustness reviews, universes up to 300 names and 100-arm architecture scans.",
  },
];

export interface Event {
  date: string;
  era: string;
  cat: Cat;
  major: boolean;
  title: string;
  detail?: string;
  metric?: string;
  strip?: string;
  star?: "s" | "b";
  /** id of an explainer dialog on the research page (span | trunk | fp16 | hyperfine) */
  explain?: "span" | "trunk" | "fp16" | "hyperfine";
}

export const EVENTS: Event[] = [
  { date: "2025-10-25", era: "proto", cat: "model", major: true, title: "Initial commit", detail: "Model, portfolio projection and training loop, written in the first week.", strip: "Initial commit", star: "s" },
  { date: "2025-11-21", era: "proto", cat: "universe", major: true, title: "yfinance price data", detail: "Daily price history from yfinance replaces placeholder data.", strip: "yfinance data" },
  { date: "2025-11-27", era: "proto", cat: "model", major: true, title: "First training run", detail: "Two epochs on five ETFs (SPY, QQQ, IWM, TLT, GLD), 16 features each. The run failed, prompting the first pipeline fixes.", metric: "5 ETFs", strip: "First run (5 ETFs)", star: "s" },
  { date: "2025-11-30", era: "proto", cat: "infra", major: false, title: "CPU training runs", detail: "Six to twelve concurrent training runs on CPU." },
  { date: "2025-12-11", era: "proto", cat: "infra", major: true, title: "First GPU run", detail: "About 12x the stock-days per second of a CPU machine running two jobs.", metric: "~12x per machine", strip: "GPU (~12x)", star: "b" },
  { date: "2025-12-11", era: "proto", cat: "model", major: true, title: "Experiment-sweep setup", detail: "Launches a grid of training runs from one settings table.", strip: "Experiment-sweep setup", star: "s" },

  { date: "2025-12-22", era: "sweeps", cat: "universe", major: true, title: "Universe grows from 5 to 49 names", detail: "34 large-cap stocks and 15 ETFs.", metric: "49 names", strip: "49 names", star: "b" },
  { date: "2025-12-22", era: "sweeps", cat: "universe", major: true, title: "New normalized feature calculations", detail: "17 features per name, rebuilt and normalized to a common scale. Feature definitions are proprietary.", metric: "17 features", star: "b" },
  { date: "2025-12-22", era: "sweeps", cat: "infra", major: true, title: "First 4 GPUs", detail: "Sweeps run in parallel on four GPUs.", metric: "4 GPUs", star: "s" },
  { date: "2025-12-26", era: "sweeps", cat: "infra", major: true, title: "Training windows cached in RAM", detail: "Training windows held in RAM instead of rebuilt from disk at each step.", metric: "~7.6x per machine", strip: "RAM windows (~7.6x)", star: "b" },
  { date: "2026-01-16", era: "sweeps", cat: "model", major: false, title: "fp16 mixed precision tried", detail: "fp16 autocast produced NaN losses and was disabled by Jan 27." },
  { date: "2026-01-19", era: "sweeps", cat: "infra", major: true, title: "Experiment tracking with MLflow", detail: "Run metrics logged to MLflow.", strip: "MLflow", star: "s" },
  { date: "2026-01-27", era: "sweeps", cat: "infra", major: false, title: "Pool grows to 8 GPUs", metric: "8 GPUs" },
  { date: "2026-02-02", era: "sweeps", cat: "model", major: false, title: "bf16 mixed precision tried", detail: "bf16 autocast degraded model performance; training stayed in fp32." },
  { date: "2026-02-15", era: "sweeps", cat: "infra", major: false, title: "12 GPUs", metric: "12 GPUs" },
  { date: "2026-02-16", era: "sweeps", cat: "infra", major: true, title: "PostgreSQL experiment tracking", detail: "MLflow backend moved from a file store to PostgreSQL.", strip: "PostgreSQL" },
  { date: "2026-03-19", era: "sweeps", cat: "model", major: true, title: "Held-out test harness", detail: "Models scored on dates excluded from both training and model selection." },

  { date: "2026-03-22", era: "sweeps", cat: "model", major: true, title: "Nonlinear loss function", detail: "The training objective becomes nonlinear; later sweeps tune its shape.", strip: "Nonlinear loss function", star: "s" },
  { date: "2026-04-14", era: "prod", cat: "prod", major: true, title: "Production pipeline and brokerage integration", detail: "A self-contained daily inference package and a brokerage API client.", strip: "Live trading pipeline", star: "s" },
  { date: "2026-04-21", era: "prod", cat: "prod", major: true, title: "First models trading live", detail: "A personal account begins trading model allocations.", strip: "Live trading", star: "b" },
  { date: "2026-05-17", era: "prod", cat: "model", major: true, title: "Integrated gradients", detail: "Integrated-gradients feature attribution computed for every test run.", strip: "Integrated gradients" },
  { date: "2026-06-13", era: "prod", cat: "prod", major: true, title: "Second production generation", detail: "Longer pre-production testing; the deployment package is compiled with Cython." },

  { date: "2026-06-18", era: "dynamic", cat: "universe", major: true, title: "Fixed stocks replaced by the rolling top-50 S&P 500 names each day", detail: "The tradable set is taken from each day's S&P 500 index weights.", metric: "50 names", strip: "Top-50 S&P", star: "b" },
  { date: "2026-06-23", era: "dynamic", cat: "model", major: true, title: "100 names per day, 600-epoch runs", detail: "Twice the universe and six times the training length, run across 30 GPUs.", metric: "100 names", strip: "100 → 600 epochs", star: "b" },
  { date: "2026-06-24", era: "dynamic", cat: "infra", major: false, title: "GPU pool reaches 30", metric: "30 GPUs" },
  { date: "2026-07-12", era: "dynamic", cat: "model", major: false, title: "fp16 retried and dropped", detail: "fp16 autocast overflowed even with fp32 heads and clamping. Training stayed fp32 until fp16 returned inside the convolution kernels in November 2026." },
  { date: "2026-07-28", era: "dynamic", cat: "model", major: true, title: "Runs extend to 1,000 epochs", detail: "Ten times the epochs of the early sweeps.", metric: "1,000 epochs", strip: "1,000 epochs" },
  { date: "2026-08-07", era: "dynamic", cat: "prod", major: true, title: "Larger ensemble deployed", detail: "An ensemble of several hundred models replaces the earlier production models." },
  { date: "2026-08-11", era: "dynamic", cat: "infra", major: true, title: "Custom worker queue", detail: "Replaces fixed sweeps: atomic job claiming over NFS, heartbeats, resumable per-epoch checkpoints and preemption.", strip: "Custom worker queue", star: "b" },
  { date: "2026-08-20", era: "dynamic", cat: "infra", major: true, title: "Early execution optimizations", detail: "Day packing, GPU-resident windows and torch.compile fixes.", metric: "~1.3x", strip: "First fine-optimization round", star: "s" },
  { date: "2026-08-21", era: "dynamic", cat: "infra", major: false, title: "Packed evaluation", detail: "Many days evaluated in a single forward pass.", metric: "1.64x eval" },
  { date: "2026-08-30", era: "dynamic", cat: "infra", major: true, title: "Fused Triton TCN trunk", detail: "Custom forward and backward Triton kernels for the convolution stack, matching eager PyTorch to ~1e-5.", metric: "1.16x step", star: "s", explain: "trunk" },
  { date: "2026-08-30", era: "dynamic", cat: "infra", major: true, title: "One convolution pass per ticker", detail: "Overlapping training windows share a single convolution over each ticker's history. Training step 124 → 39 ms.", metric: "3.2x step", strip: "Span conv (3.2x)", star: "b", explain: "span" },
  { date: "2026-09-09", era: "dynamic", cat: "universe", major: true, title: "Point-in-time index membership back to 1990", detail: "Delisted names (Lehman Brothers, Merrill Lynch, Wachovia and others) restored to remove survivorship bias." },

  { date: "2026-10-05", era: "kernels", cat: "model", major: true, title: "Model weight anatomy study and ensemble analysis", detail: "Ensemble decomposition, turnover analysis, variance-based sensitivity analysis and dead-channel diagnostics." },
  { date: "2026-10-13", era: "kernels", cat: "infra", major: false, title: "GPU profiling", detail: "The GPU idled 10–17% of each step waiting on the CPU; convolution kernels were memory-bound." },
  { date: "2026-10-20", era: "kernels", cat: "infra", major: true, title: "Hyperfine kernels", detail: "Fused pooling and output-head kernels, and a Triton AdamW bit-identical to PyTorch's fused AdamW. Epoch 4.72 → 3.34 s.", metric: "1.41x", strip: "Hyperfine 1.41x", star: "b", explain: "hyperfine" },
  { date: "2026-10-25", era: "kernels", cat: "universe", major: true, title: "Data-source discrepancy traced", detail: "A gap between two data vendors traced to a warm-up rule that excluded newly added index members for a year." },
  { date: "2026-10-30", era: "kernels", cat: "universe", major: true, title: "Universes up to 300 names", detail: "Research runs on 200- and 300-name universes, with training cut to 50 epochs per model; the pool reaches 37 GPUs.", metric: "300 names", star: "b" },
  { date: "2026-10-31", era: "kernels", cat: "infra", major: false, title: "Training windows gathered on-the-fly", detail: "2.2–6.7 GB less GPU memory per job at the same speed; 300 names fit on an 8 GB card.", metric: "−6.7 GB" },
  { date: "2026-11-04", era: "kernels", cat: "prod", major: true, title: "Two live books", detail: "Two ensembles with different training targets trade separate brokerage accounts. This site launches.", metric: "2 books", star: "s" },
  { date: "2026-11-12", era: "kernels", cat: "model", major: true, title: "Feature-family sweep: 24 arms x 108 models", detail: "New feature families and wider universes, each evaluated as a 108-member cross-validated ensemble.", metric: "2,592 runs" },
  { date: "2026-11-15", era: "kernels", cat: "infra", major: true, title: "fp16 tensor-core math in the convolution kernels", detail: "Convolution matrix multiplies use fp16 inputs with fp32 accumulation and power-of-two scaling; everything else stays fp32. Epoch 2.58 → 2.13 s on an RTX A1000; 2.24 → 1.07 s on an RTX 8000 (previously cuDNN).", metric: "1.21–2.1x", strip: "fp16 kernels", star: "b", explain: "fp16" },
  { date: "2026-11-15", era: "kernels", cat: "infra", major: false, title: "Per-GPU kernel tuning tables", detail: "Kernel tile sizes are tuned once per GPU model and shipped with the code, saving 1–4 minutes of autotuning per job." },
  { date: "2026-11-15", era: "kernels", cat: "infra", major: true, title: "Sharded evaluation kit", detail: "Re-scores trained models and simulates trading their ensembles under configurable transaction costs, rebalance frequency and allocation smoothing, with results by period and split-half. Work runs in parallel across the workstations." },
  { date: "2026-11-22", era: "kernels", cat: "infra", major: true, title: "CUTLASS/CUDA convolution kernels", detail: "All four convolution blocks rewritten as CUDA kernels built on NVIDIA CUTLASS implicit GEMMs, with bias, activation, dropout and the residual add fused into the matrix multiply's output stage, and fp16 inputs stored for the next block. Epoch 1.50 → 0.93 s on an RTX A1000; RTX 8000 and RTX 2080 kernels 23–36% faster.", metric: "1.62x", star: "b" },
];

export const UNIVERSE: [string, number][] = [
  ["2025-11-27", 5],
  ["2025-12-22", 49],
  ["2026-06-18", 50],
  ["2026-06-23", 100],
  ["2026-10-30", 300],
];

export const MODELS: [string, number][] = [
  ["2025-12-22", 64], ["2025-12-30", 128], ["2025-12-31", 380], ["2026-01-05", 636], ["2026-01-10", 892],
  ["2026-01-16", 1340], ["2026-01-18", 1596], ["2026-01-23", 2108], ["2026-01-27", 2858],
  ["2026-01-30", 3882], ["2026-02-02", 4674], ["2026-02-03", 4938], ["2026-02-07", 7050],
  ["2026-03-01", 9040], ["2026-03-17", 9296], ["2026-03-24", 11344], ["2026-04-25", 13392],
  ["2026-05-04", 17488], ["2026-05-21", 19792], ["2026-06-07", 21840], ["2026-06-11", 22096],
  ["2026-06-18", 23120], ["2026-06-19", 24144], ["2026-06-20", 24912], ["2026-06-23", 25680],
  ["2026-06-29", 26704], ["2026-07-12", 27084], ["2026-07-15", 28620], ["2026-07-28", 28876],
  ["2026-08-11", 29182], ["2026-08-21", 29542], ["2026-08-30", 30694], ["2026-09-09", 32206],
  ["2026-09-12", 32314], ["2026-09-23", 32962], ["2026-10-10", 33922], ["2026-10-11", 34162],
  ["2026-10-18", 34282], ["2026-10-20", 34922], ["2026-10-24", 34982], ["2026-10-25", 35414],
  ["2026-10-30", 35918], ["2026-10-31", 36242], ["2026-11-01", 36350], ["2026-11-04", 36752],
  ["2026-11-12", 39344], ["2026-11-17", 44852], ["2026-11-19", 46040], ["2026-11-21", 46904],
];

// Per-machine (RTX A1000) training throughput, stock-days/s. Anchored on a direct measurement of the current code
// (2026-11-22, gastly A1000: fused CUTLASS trunk, gnc7 row falcon-0 at pnl_horizon_days 20, fold 0, 11 steps x 20
// decision days x ~300 names in 0.483 s/epoch = 136,600); earlier points are that value divided back by each stage's
// measured speedup (research/2026-11-21-cutlass-trunk/tools/epoch_bench.py, execution.md).
export const THROUGHPUT: [string, number][] = [
  ["2025-12-07", 109],
  ["2025-12-11", 1350],
  ["2025-12-26", 10300],
  ["2026-08-20", 13500],
  ["2026-08-29", 15500],
  ["2026-08-30", 49400],
  ["2026-10-20", 69600],
  ["2026-11-15", 84200],
  ["2026-11-22", 136600],
];

export const GPUS: [string, number][] = [
  ["2025-12-07", 6],
  ["2025-12-11", 1],
  ["2025-12-22", 4],
  ["2026-01-27", 8],
  ["2026-02-15", 12],
  ["2026-05-05", 18],
  ["2026-06-18", 22],
  ["2026-06-23", 30],
  ["2026-07-28", 33],
  ["2026-08-11", 34],
  ["2026-10-30", 37],
  ["2026-11-12", 40],
];

export const TOTAL_THROUGHPUT: [string, number][] = (() => {
  const at = (s: [string, number][], d: string) => s.filter(([t]) => t <= d).at(-1)?.[1] ?? s[0][1];
  const dates = [...new Set([...THROUGHPUT, ...GPUS].map(([d]) => d))].sort();
  return dates.map((d) => [d, at(THROUGHPUT, d) * at(GPUS, d)] as [string, number]);
})();

// Headline numbers shared by the home and research pages (derived from the series above, so they update with them).
export const MODELS_TRAINED = MODELS[MODELS.length - 1][1];
/** e.g. "46,000+": the cumulative count rounded down to the thousand */
export const MODELS_TRAINED_TEXT = `${(Math.floor(MODELS_TRAINED / 1000) * 1000).toLocaleString("en-US")}+`;
/** per-machine training throughput, latest / first (CPU) */
export const THROUGHPUT_GAIN = Math.round(THROUGHPUT[THROUGHPUT.length - 1][1] / THROUGHPUT[0][1]).toLocaleString("en-US");

export const FIRST_COMMIT = "2025-10-25";
export const COMMITS = 354;

export const STAGES: { name: string; date: string; what: string; gain: string }[] = [
  { name: "CPU to GPU", date: "Dec 2025", what: "Two CPU runs per machine to one GPU run: 109 to 1,350 stock-days/s", gain: "~12x" },
  { name: "Windows in RAM", date: "Dec 2025", what: "Windows cached in RAM: 1,350 to 10,300 stock-days/s (49 names, eight runs per GPU)", gain: "~7.6x" },
  { name: "Early execution optimizations", date: "Aug 2026", what: "Day packing, GPU-resident windows, torch.compile: 10,300 to 13,500 stock-days/s", gain: "~1.3x" },
  { name: "Machine pool", date: "Dec 2025 – Nov 2026", what: "4 to 40 GPUs", gain: "10x" },
  { name: "Fused Triton trunk", date: "Aug 2026", what: "Fused forward and backward convolution kernels", gain: "1.16x" },
  { name: "Span convolution", date: "Aug 2026", what: "Train step 124 to 39 ms", gain: "3.2x" },
  { name: "Hyperfine kernels", date: "Oct 2026", what: "Fused pool and head, bias-grad partials, Triton AdamW; 4.72 to 3.34 s/epoch", gain: "1.41x" },
  { name: "fp16 kernels", date: "Nov 2026", what: "fp16 inputs, fp32 accumulation, power-of-two scaling; 2.58 to 2.13 s/epoch on an RTX A1000 (2.1x on an RTX 8000)", gain: "1.21x" },
  { name: "CUTLASS/CUDA kernels", date: "Nov 2026", what: "Fused CUTLASS/CUDA convolutions with fp16 inputs stored in memory; 1.50 to 0.93 s/epoch on an RTX A1000", gain: "1.62x" },
];

export const RANGE = { start: "2025-10-20", end: "2026-11-24" };
