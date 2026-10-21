const normalize = (path: string) => (path.endsWith("/") ? path : `${path}/`);

/** Is `href` the current page, or a section the current page lives under? */
export function isActive(pathname: string, href: string) {
  const here = normalize(pathname);
  return href === "/" ? here === "/" : here.startsWith(href);
}
