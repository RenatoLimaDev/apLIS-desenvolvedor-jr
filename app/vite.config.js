import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// Durante testes, vitest usa esbuild para transformar JSX; no build/serve,
// Vite 8 usa oxc via @vitejs/plugin-react. Configuramos `esbuild.jsx` só no
// modo de teste para evitar o warning "both esbuild and oxc options were set".
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  ...(mode === 'test' ? { esbuild: { jsx: 'automatic' } } : {}),
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
  },
}))
