import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
/* 
export default defineConfig({
  plugins: [react()],
  css: {
    // Habilitar la detección de cambios en estilos normales
    requireModuleExtension: false,
  },
});
*/
