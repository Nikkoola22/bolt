import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react( )],
  // VEUILLEZ AJOUTER CETTE LIGNE :
  base: '/bolt/',
  // FIN DE L'AJOUT
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
