import { PassThePhoneLoader } from "./PassThePhoneLoader";

export const metadata = { title: "Send telefonen rundt" };

// The setup screen gets the app's navigation bar; the game itself is the same as on the site (issue #108)
export default function PassThePhoneAppPage() {
  return <PassThePhoneLoader variant="app" />;
}
