import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/QuestionTracker/', // Update with your repo name
  plugins: [react()],
})