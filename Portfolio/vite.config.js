import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs';

// Custom plugin to copy CNAME file
function copyCNAME() {
  return {
    name: 'copy-cname',
    closeBundle() {
      copyFileSync('CNAME', 'dist/CNAME');
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), copyCNAME()],
    base: '/',
    server: {
        port: 5173,
        host: true
    }
})
