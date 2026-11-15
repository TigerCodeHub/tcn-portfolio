// @ts-check
import { defineConfig } from "astro/config";

// Static output only: the site is plain HTML/CSS plus two small client scripts
// (the allocation verifier). No server, no secrets.
export default defineConfig({
  output: "static",
  // Both come from the deploy workflow (actions/configure-pages): a GitHub Pages project URL serves the
  // site under /<repo>/, a custom domain at "/". Local dev and builds default to the root.
  site: process.env.SITE_URL || undefined,
  base: process.env.SITE_BASE || "/",
});
