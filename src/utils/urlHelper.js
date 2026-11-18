/**
 * Formats a URL to ensure it is always an absolute external link.
 * If a URL is missing protocol (e.g. "www.linkedin.com/..."),
 * browsers treat it as a relative URL on localhost, reloading the local page.
 * This helper guarantees all external links start with https://.
 */
export const formatExternalUrl = (url) => {
  if (!url) return '';
  const trimmed = String(url).trim();
  if (!trimmed) return '';

  if (/^(https?:\/\/|mailto:)/i.test(trimmed)) {
    return trimmed;
  }

  // Strip leading slashes if any
  const clean = trimmed.replace(/^(\/\/|\/)+/, '');
  return `https://${clean}`;
};

export default formatExternalUrl;
