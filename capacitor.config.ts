import type { CapacitorConfig } from "@capacitor/cli";

// Native shells for iOS and Android around the static export in out/.
// The web build is the same as the site; native-only behaviour lives in src/lib/native.ts.
// SITE_LOCALE=en builds Goodtalk (issue #74) from the same native projects: CI passes the
// app id and name to Gradle (APP_ID/APP_NAME) and Xcode (PRODUCT_BUNDLE_IDENTIFIER/APP_DISPLAY_NAME).
const goodtalk = process.env.SITE_LOCALE === "en";
// APP_VARIANT=voksen is the separate 18+ app (issue #57)
const voksen = process.env.APP_VARIANT === "voksen";

const config: CapacitorConfig = {
  appId: goodtalk ? "com.goodtalkcards.app" : voksen ? "dk.snakkespil.voksen" : "dk.snakkespil.app",
  appName: goodtalk ? "Goodtalk" : voksen ? "Snakkespil 18+" : "Snakkespil",
  webDir: "out",
  backgroundColor: "#1d4a38",
  ios: {
    contentInset: "never",
    scheme: goodtalk ? "Goodtalk" : "Snakkespil",
  },
  android: {
    allowMixedContent: false,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 600,
      launchAutoHide: true,
      backgroundColor: "#1d4a38",
      showSpinner: false,
    },
    StatusBar: {
      style: "DARK",
      backgroundColor: "#1d4a38",
      // Snakkespil has its own app shell that draws under the status bar (NativeBoot sets the
      // text colour per screen). Goodtalk and 18+ keep a fixed felt-green strip.
      overlaysWebView: !goodtalk && !voksen,
    },
    LocalNotifications: {
      smallIcon: "ic_stat_snakkespil",
      iconColor: "#1d4a38",
    },
  },
};

export default config;
