import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/__tests__/setup.ts'],
    globalSetup: ['./worker/test-setup.ts'],
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}', 'worker/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/__tests__/setup.ts',
      ],
    },
  },
  resolve: {
    // "@/locale/*" is Danish in the tests; the files only international languages have (screens,
    // content, aaret) fall back to English, like tsconfig.json's paths
    alias: [
      { find: /^@\/locale\/(screens|content|aaret)$/, replacement: resolve(__dirname, './src/locales/en/$1') },
      { find: '@/locale', replacement: resolve(__dirname, './src/locales/da') },
      { find: '@', replacement: resolve(__dirname, './src') },
    ],
  },
});
