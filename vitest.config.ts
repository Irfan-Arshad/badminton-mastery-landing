import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: [],
    globals: false,
    include: ['tests/**/*.test.ts'],
    coverage: { enabled: false },
  },
  resolve: {
    alias: {
      '@': resolve(root, '.'),
    },
  },
});
