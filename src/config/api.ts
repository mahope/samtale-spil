import { site } from "@/locale/site";

/** The Cloudflare Worker on <site>/api/* (worker/). Absolute, so the apps can reach it too. */
export const API_BASE = `${site.url}/api`;

/** Public Turnstile site key for the report form; the secret lives in the worker */
export const TURNSTILE_SITEKEY = "0x4AAAAAAFeCntBmRJs1YNst";
