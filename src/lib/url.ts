// Root-relative paths ("/research/") under the deploy's base path: "/tcn-portfolio/research/" on a
// GitHub Pages project URL, unchanged when the site is served from a domain root (see astro.config.mjs).
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
export const url = (path: string) => (path.startsWith("/") ? BASE + path : path);
