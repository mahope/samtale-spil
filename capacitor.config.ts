import type { CapacitorConfig } from "@capacitor/cli";

// Native shells for iOS and Android around the static export in out/.
// The web build is the same as the site; native-only behaviour lives in src/lib/native.ts.
// SITE_LOCALE=en builds Goodtalk (issue #74) from the same native projects: CI passes the
// app id and name to Gradle (APP_ID/APP_NAME) and Xcode (PRODUCT_BUNDLE_IDENTIFIER/APP_DISPLAY_NAME).
const goodtalk = process.env.SITE_LOCALE === "en";

const config: CapacitorConfig = {
  appId: goodtalk ? "com.goodtalkcards.app" : "dk.snakkespil.app",
  appName: goodtalk ? "Goodtalk" : "Snakkespil",
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
      // A fixed felt-green strip: readable on both the felt and the paper pages
      overlaysWebView: false,
    },
    LocalNotifications: {
      smallIcon: "ic_stat_snakkespil",
      iconColor: "#1d4a38",
    },
  },
};

export default config;
