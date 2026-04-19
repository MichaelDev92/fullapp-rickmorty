import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['tests/**/*.spec.ts', 'tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/modules/**/services/**', 'src/modules/**/resolvers/**', 'src/cache/**'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@config': path.resolve(__dirname, './src/config'),
      '@container': path.resolve(__dirname, './src/container'),
      '@graphql': path.resolve(__dirname, './src/graphql'),
      '@modules': path.resolve(__dirname, './src/modules'),
      '@cache': path.resolve(__dirname, './src/cache'),
      '@decorators': path.resolve(__dirname, './src/decorators'),
      '@middlewares': path.resolve(__dirname, './src/middlewares'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
    },
  },
});
