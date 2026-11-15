# TCN U.S. Equity Portfolio

Source code for [tigercodehub.github.io/tcn-portfolio](https://tigercodehub.github.io/tcn-portfolio/),
which presents the live track record, allocation ledger and research history of a temporal
convolutional network managing a U.S. equity portfolio.

## Published data

All published data is kept on the [`data`](https://github.com/TigerCodeHub/tcn-portfolio/tree/data)
branch, organized by book (`summit` and `ridgeline`):

| Path | Contents |
|---|---|
| `ledger/<book>.json` | A daily record of each target allocation file's hash and blockchain timestamp |
| `allocations/<book>/` | The target allocation files, released 14 days after their effective date |
| `returns/<book>.json` | Daily account returns alongside benchmark returns |

A ledger record has the following form:

```json
{
  "date": "2026-11-13",
  "collection_cid": "0x8613…1ad0",
  "sha256": "8b83…4ee7",
  "object_cid": "0xd2dd…9191",
  "committed_at": "2026-11-13T12:21:12Z",
  "tx_hash": "0xa92c…10a5",
  "chain_id": 137,
  "file": "/allocations/summit/<file>"
}
```

The `object_cid` field is the SHA3-256 hash of the allocation file. Before trading begins on `date`,
this hash is timestamped on the Polygon blockchain (`chain_id` 137) through
[validityBase (vBase)](https://www.vbase.com/). The `file` field remains `null` until the file is
released.

## Verification

Each published allocation file can be checked independently against public blockchain records.
Together, these checks establish that **every allocation file existed, unaltered, before the market
opened on the day it was traded**, so the published record **cannot have been revised with hindsight**.

**File integrity.** The SHA3-256 hash of the file should equal the record's `object_cid`, without
the `0x` prefix. Either of the following produces the hash:

```bash
openssl dgst -sha3-256 <file>
python3 -c "import hashlib,sys; print(hashlib.sha3_256(open(sys.argv[1],'rb').read()).hexdigest())" <file>
```

**Timestamp.** The event log of the stamping transaction is available at
`https://polygonscan.com/tx/<tx_hash>#eventlog`. Its first event contains:

- Topics, in order: the event signature, the stamping address, the `collection_cid` and the `object_cid`.
- Data: the commitment time as a Unix timestamp, matching `committed_at`.

All stamps are made by the address `0x1bbbdabc7130b5a5131c664eca7ed671b1060a76`. Transactions are
submitted through a vBase relayer, so the transaction's sender differs from the stamping address.

**vBase.** Files can also be verified by upload at [app.vbase.com/verify](https://app.vbase.com/verify/).
The stamp collections for vBase user `Lion_Leopard` are listed below.

| Book | Daily target | Traded book |
|---|---|---|
| Summit | [Summit-5](https://app.vbase.com/verify/user-data/?user=Lion_Leopard&collection_name=Summit-5) | [Summit-5-Smoothed](https://app.vbase.com/verify/user-data/?user=Lion_Leopard&collection_name=Summit-5-Smoothed) |
| Ridgeline | [Ridgeline-5](https://app.vbase.com/verify/user-data/?user=Lion_Leopard&collection_name=Ridgeline-5) | [Ridgeline-5-Smoothed](https://app.vbase.com/verify/user-data/?user=Lion_Leopard&collection_name=Ridgeline-5-Smoothed) |

A timestamp establishes only that a file existed at the recorded time; it makes no claim about
performance. Further detail is available in the site's
[Disclosures](https://tigercodehub.github.io/tcn-portfolio/disclosures/).
