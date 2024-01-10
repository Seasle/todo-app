import { resolve } from 'node:path';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/todo-app/' : '/',
  plugins: [react(), splitVendorChunkPlugin()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/'),
      '@testing-utils': resolve(__dirname, 'testing-utils/'),
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
}));
