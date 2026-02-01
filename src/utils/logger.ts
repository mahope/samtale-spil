// src/utils/logger.ts
const isDev = process.env.NODE_ENV === 'development';

export const logger = {
  log: (...args: unknown[]) => isDev && console.log('[DEV]', ...args),
  warn: (...args: unknown[]) => isDev && console.warn('[DEV]', ...args),
  error: (...args: unknown[]) => console.error(...args), // Behold i prod
  debug: (...args: unknown[]) => isDev && console.debug('[DEBUG]', ...args),
};

export default logger;
