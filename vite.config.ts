import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [vue({}), dts()],
  build: {
    lib: {
      entry: 'index.ts',
      name: 'Vue3DebugData',
      fileName: (format) => `vue3-debug-data.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
