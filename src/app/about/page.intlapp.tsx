import { AppTextScreen } from "@/components/app/AppTextScreen";
import { AboutText } from "@/intl/content";

export const metadata = { title: "About Goodtalk" };

export default function AboutScreen() {
  return (
    <AppTextScreen title="About Goodtalk">
      <AboutText />
    </AppTextScreen>
  );
}
