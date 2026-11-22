/**
 * Store identity for the "rate the app" row and the system rating dialog (README, "Ratings").
 * The system dialog (src/lib/review.ts) needs none of this; only the row on the More tab does.
 */

/**
 * The numeric App Store id of dk.snakkespil.app (the digits after "id" in the App Store URL).
 * EMPTY ON PURPOSE until Mads fills it in: the row is hidden on iOS while this is "".
 * Never guess a value here.
 */
export const APPLE_APP_ID = "";

/** The Play package id; the row is shown on Android only once STORES_LIVE.android is true (src/config/site.ts) */
export const ANDROID_PACKAGE_ID = "dk.snakkespil.app";

/** Where "write a review" opens on the given platform, or null when there is nothing to open (yet) */
export function reviewUrl(platform: string, androidLive: boolean): string | null {
  if (platform === "ios") {
    return /^\d{6,}$/.test(APPLE_APP_ID) ? `https://apps.apple.com/app/id${APPLE_APP_ID}?action=write-review` : null;
  }
  if (platform === "android") {
    return androidLive ? `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE_ID}&showAllReviews=true` : null;
  }
  return null;
}
