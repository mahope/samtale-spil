import { TrappenLoader } from "./TrappenLoader";

export { metadata } from "./page";

// The setup screen gets the app's navigation bar; the run itself is the same as on the site (issue #108)
export default function TrappenAppPage() {
  return <TrappenLoader variant="app" />;
}
