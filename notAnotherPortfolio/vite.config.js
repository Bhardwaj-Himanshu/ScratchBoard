// vite.config.js
import { build, defineConfig } from 'vite';

export default {
  // configuration options
  base: './',
  build: {
    minify: 'terser',
  },
};
