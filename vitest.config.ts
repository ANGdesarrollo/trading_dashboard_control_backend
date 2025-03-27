import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    passWithNoTests: true,
    clearMocks: true,
    globals: true,
    root: './',
    reporters: ['verbose'],
    coverage: {
      all: true,
      include: ['src/**/*.{ts,js}'],
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
      exclude: ['src/**/*Module.ts', 'src/main.ts']
    },
    testTimeout: 16000,
    include: ['test/**/*.spec.ts']
  },
  plugins: [swc.vite({
    sourceMaps: true,
    module: {
      type: 'es6'
    },
    jsc: {
      target: 'esnext',
      parser: {
        syntax: 'typescript',
        decorators: true,
        dynamicImport: true
      },
      transform: {
        legacyDecorator: true,
        decoratorMetadata: true
      },
      keepClassNames: true,
      baseUrl: __dirname
    },
    minify: false
  })]
});
