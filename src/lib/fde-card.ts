// Data model for an FDE holographic card.
//
// This is the shape produced (eventually) by the `fde-pro` transformation
// diagnosis skill. For the local MVP we read it from `data/{handle}.json`,
// but the read happens behind `getCard()` so swapping to an API / database
// later only touches this file.

export interface FdeDimension {
  /** stable key, e.g. "thin_slice" */
  key: string;
  /** human label shown on the card, e.g. "薄切片" */
  label: string;
  /** earned score for this dimension */
  score: number;
  /** max possible score for this dimension */
  max: number;
}

export interface FdeLinks {
  /** personal site, e.g. "lawted.tech" */
  site?: string;
  /** github profile, e.g. "github.com/lawted" */
  github?: string;
  /** public card url, e.g. "fde.ha7ch.tech/lawted" */
  card?: string;
}

export interface FdeCard {
  /** url handle, e.g. "lawted" */
  handle: string;
  /** display name, e.g. "Mingze Wu" */
  name: string;
  /** the headline verdict, e.g. "真 FDE · 高 Echo 高 Delta" */
  verdict: string;
  /** the Echo/Delta quadrant label */
  quadrant: string;
  /** normalized score out of `scoreMax` */
  score: number;
  /** score denominator (100) */
  scoreMax: number;
  /** optional raw score string, e.g. "95 / 110" */
  scoreRaw?: string;
  /** one-line subtitle under the score */
  subtitle: string;
  /** the seven-dimension breakdown */
  dimensions: FdeDimension[];
  /** route badge, e.g. "土 FDE 已毕业 · 正打海外大厂线" */
  route: string;
  /** signature achievement / proof of work */
  signature: string;
  /** footer links */
  links: FdeLinks;
}

/**
 * Load a card by handle.
 *
 * Today: reads a bundled JSON file from the repo-root `data/{handle}.json`.
 * (Relative to this file: src/lib → ../../data.)
 * Tomorrow: replace the import with a `fetch()` to the fde-pro backend
 * (e.g. `https://fde.ha7ch.com/api/cards/{handle}`) — callers don't change.
 */
export async function getCard(handle: string): Promise<FdeCard | null> {
  try {
    const data = (await import(`../../data/${handle}.json`)).default as FdeCard;
    return data;
  } catch {
    return null;
  }
}
