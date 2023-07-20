export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(date);
}

export function ensureTrailingSlash(url: string | URL) {
  return url.toString().replace(/\/$/, "") + "/";
}
