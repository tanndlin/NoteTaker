import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    plugins: [react(), svgr(), tailwindcss()],
    server: {
        port: 3000,
        proxy: {
            '/api': 'http://localhost:5000'
        }
    },
    build: {
        outDir: 'build'
    },
    define: {
        global: 'globalThis'
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.ts',
        css: true,
        reporters: ['verbose'],
        coverage: {
            reporter: ['text', 'json', 'html'],
            include: ['src/**/*'],
            exclude: []
        }
    }
});
