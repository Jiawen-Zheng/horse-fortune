import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import postcsspxtoviewport from 'postcss-px-to-viewport'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 根据环境设置 base 路径
  // 开发环境：使用根路径 /
  // 生产环境：
  //   - Vercel部署：使用根路径 /
  //   - OSS部署：使用 /fortune/ 路径
  // 通过环境变量 VITE_DEPLOY_TARGET 来区分
  const deployTarget = process.env.VITE_DEPLOY_TARGET || 'vercel'
  const base = mode === 'production' && deployTarget === 'oss' ? '/fortune/' : '/'
  
  return {
    base,
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    css: {
      postcss: {
        plugins: [
          postcsspxtoviewport({
            viewportWidth: 375,
            viewportHeight: 667,
            unitPrecision: 5,
            viewportUnit: 'vw',
            selectorBlackList: ['.ignore', '.hairlines'],
            minPixelValue: 1,
            mediaQuery: false
          })
        ]
      }
    },
    server: {
      port: 3000,
      open: true,
      host: true
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    }
  }
})