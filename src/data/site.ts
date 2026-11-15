export const SITE = {
  name: "TCN U.S. Equity Portfolio",
  author: "Tiger J. Deng",
  embargoDays: 14,
};

export const VBASE = {
  collectionNames: {
    "0x8613be0a5ae45877c6d45cb1e4f0363f4d8238a13b8d51d9dd3f73a7e2b51ad0": "Summit-5",
    "0x5172cbb8014dfed1cec814c5a608f7a606eb9706f148d91804c2d7a24e238c56": "Summit-5-Smoothed",
    "0xa8f974aaed1fe5a0f34c7a08b4f719fb741f134a676bc3a0983bb844b856b48c": "Ridgeline-5",
    "0x5c2c955cf8702149928cf1cd987813ea5fe3a13daa2d41efaeb9e1a1842bf0d5": "Ridgeline-5-Smoothed",
  } as Record<string, string>,
  smoothedCollections: {
    summit: "0x5172cbb8014dfed1cec814c5a608f7a606eb9706f148d91804c2d7a24e238c56",
    ridgeline: "0x5c2c955cf8702149928cf1cd987813ea5fe3a13daa2d41efaeb9e1a1842bf0d5",
  } as Record<string, string>,
  user: "Lion_Leopard",
  smoothing: 0.1,
  tearsheets: { summit: "", ridgeline: "" } as Record<string, string>,
};

export const BOOKS = [
  {
    id: "summit",
    blurb: "an ensemble of 540 models focused on raw return, traded via Charles Schwab.",
  },
  {
    id: "ridgeline",
    blurb:
      "an ensemble of 648 models focused on risk-adjusted return, traded via Interactive Brokers.",
  },
] as const;

export const NUMERAI = {
  url: "",
};

export const NAV = [
  { href: "/", label: "About", key: "about" },
  { href: "/performance/", label: "Performance", key: "performance" },
  { href: "/research/", label: "Research", key: "research" },
  { href: "/disclosures/", label: "Disclosures", key: "disclosures" },
] as const;

export type NavKey = (typeof NAV)[number]["key"];
