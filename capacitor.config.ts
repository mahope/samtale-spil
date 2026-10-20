import type { CapacitorConfig } from "@capacitor/cli";

// Native shells for iOS and Android around the static export in out/.
// The web build is the same as snakkespil.dk; native-only behaviour lives in src/lib/native.ts.
const config: CapacitorConfig = {
  appId: "dk.snakkespil.app",
  appName: "Snakkespil",
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
