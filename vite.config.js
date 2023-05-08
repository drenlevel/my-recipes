/* eslint-disable no-undef */
import path from 'node:path';
import { defineConfig } from 'vite';

// Plugins
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [react(), eslint()],
  resolve: {
    alias: {
      '#docs': path.resolve(__dirname, 'docs'),
      '#assets': path.resolve(__dirname, 'src/assets'),
      '#components': path.resolve(__dirname, 'src/components'),
      '#constants': path.resolve(__dirname, 'src/constants'),
      '#layouts': path.resolve(__dirname, 'src/layouts'),
      '#schemas': path.resolve(__dirname, 'src/schemas'),
      '#utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  server: { port: 3000 },
  mode: 'development',
});
