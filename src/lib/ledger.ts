// Per-book allocation ledger written by the trading host (src/data/ledger/<book>.json).

export interface LedgerRecord {
  date: string;
  collection_cid: string;
  sha256: string;
  // vBase Content ID (SHA3-256); absent in ledgers written before it was recorded.
  object_cid?: string | null;
  committed_at: string;
  tx_hash: string;
  chain_id: number;
  // "/allocations/<book>/<stamped filename>" once past the embargo, else null.
  file: string | null;
}

export interface Ledger {
  sample?: boolean;
  book: string;
  collections: Record<string, string>;
  records: LedgerRecord[];
  // The book's smoothed (traded) Collection and its latest stamp.
  smoothed?: { collection_cid: string; date: string; object_cid: string | null };
}

const EXPLORERS: Record<number, string> = { 137: "https://polygonscan.com/tx/" };

// vBase's public verify page for one stamp, looked up by Content ID.
export const stampUrl = (objectCid: string | null | undefined) =>
  objectCid ? `https://app.vbase.com/verify/?method=hash&cid=${objectCid}` : null;

// Opens on the event log, where the stamp lists the stamper, Collection ID and Content ID.
export const txUrl = (r: LedgerRecord) => (EXPLORERS[r.chain_id] ? `${EXPLORERS[r.chain_id]}${r.tx_hash}#eventlog` : null);
