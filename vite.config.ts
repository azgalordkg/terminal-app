import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'components': path.resolve(__dirname, './src/components'),
      'context': path.resolve(__dirname, './src/context'),
      'constants': path.resolve(__dirname, './src/constants'),
      'hooks': path.resolve(__dirname, './src/hooks'),
      'types': path.resolve(__dirname, './src/types'),
      'utils': path.resolve(__dirname, './src/utils'),
    }
  }
})
