import { readFileSync } from "node:fs";
import { expect, it } from "vitest";

// The store builds read the version from three places. If they drift, iOS uploads a version
// Apple has already approved (ITMS-90186) or the stores show different versions.
const read = (p: string) => readFileSync(p, "utf8");

it("keeps package.json, the iOS project and the Android build on the same version", () => {
  const pkg = JSON.parse(read("package.json")).version as string;
  const ios = [...read("ios/App/App.xcodeproj/project.pbxproj").matchAll(/MARKETING_VERSION = ([0-9.]+);/g)].map((m) => m[1]);
  const android = read("android/app/build.gradle").match(/versionName "([0-9.]+)"/)?.[1];
  expect(ios.length).toBeGreaterThan(0);
  expect(new Set(ios)).toEqual(new Set([pkg]));
  expect(android).toBe(pkg);
});
