import type { CapacitorConfig } from "@capacitor/cli";

// Native shells for iOS and Android around the static export in out/.
// Snakkespil (dk.snakkespil.app) holds Danish and English in one build (scripts/build-app.sh,
// src/lib/appLang.ts); Goodtalk is its English half since Apple's 4.3 rejection of a separate app.
// APP_VARIANT=voksen is the separate 18+ app (issue #57), built from the same native projects: CI
// passes the app id and name to Gradle (APP_ID/APP_NAME) and Xcode (PRODUCT_BUNDLE_IDENTIFIER/APP_DISPLAY_NAME).
const voksen = process.env.APP_VARIANT === "voksen";

const config: CapacitorConfig = {
  appId: voksen ? "dk.snakkespil.voksen" : "dk.snakkespil.app",
  appName: voksen ? "Snakkespil 18+" : "Snakkespil",
  webDir: "out",
  backgroundColor: "#1d4a38",
  ios: {
    contentInset: "never",
    scheme: "Snakkespil",
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
      // text colour per screen). 18+ keeps a fixed felt-green strip.
      overlaysWebView: !voksen,
    },
    LocalNotifications: {
      smallIcon: "ic_stat_snakkespil",
      iconColor: "#1d4a38",
    },
  },
};

export default config;
