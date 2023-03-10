/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '#': path.join(__dirname, './src'),
      '#assets': path.join(__dirname, './src/assets'),
      '#components': path.join(__dirname, './src/components'),
      '#constants': path.join(__dirname, './src/constants'),
      '#layouts': path.join(__dirname, './src/layouts'),
      '#schemas': path.join(__dirname, './src/schemas'),
      '#utils': path.join(__dirname, './src/utils'),
    },
  },
  server: { port: 3000 },
});
