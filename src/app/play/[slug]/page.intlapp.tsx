// The game screens are the same in the app as on the site
export { default, generateStaticParams, generateMetadata } from "./page.intl";

// Route segment config must be declared here; Next cannot read a re-exported one
export const dynamicParams = false;
