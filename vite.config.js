import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Esto asegura que las rutas en el HTML sean relativas
  build: {
    outDir: 'dist', // Directorio de salida para el build
    assetsDir: 'assets' // Directorio para los archivos estáticos
  }
})
