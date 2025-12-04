// Plugins
import Vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
// import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// Utilities
import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const BASE_URL = `http://localhost:${env.VITE_BACKEND_PORT}`

  return {
    configureWebpack: {
      externals: {
        ace: 'ace',
      },
    },

    plugins: [
      Vue(),
      VueRouter({
        dts: 'src/typed-router.d.ts',
      }),
      // vueDevTools(),
      AutoImport({
        imports: [
          'vue',
          {
            'vue-router/auto': ['useRoute', 'useRouter'],
          },
        ],
        dts: 'src/auto-imports.d.ts',
        eslintrc: {
          enabled: true,
        },
        vueTemplate: true,
      }),

      Components({
        dts: 'src/components.d.ts',
      }),

      Vuetify({
        autoImport: true,
        styles: {
          configFile: 'src/styles/settings.scss',
        },
      }),
    ],

    define: { 'process.env': {} },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
      extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
    },

    devServer: {
      hot: true,
    },

    server: {
      cors: true,
      port: Number(env.VITE_BACKEND_PORT),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      },

      proxy: {
        [env.VITE_BACKEND_ENDPOINT]: {
          target: env.VITE_BACKEND,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(new RegExp(`^\\${env.VITE_BACKEND_ENDPOINT}`), ''),
          configure: (proxy, options) => {
            proxy.on('proxyRes', (proxyRes, req, res) => {
              proxyRes.headers['Access-Control-Allow-Origin'] = '*'
              proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
              proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
            })
          },
        },

        '/city.list.json': {
          target: BASE_URL,
          changeOrigin: false,
          secure: false,
        },

        '/static': {
          target: BASE_URL,
          changeOrigin: false,
          secure: false,
        },
      },
    },

    publicDir: 'public',

    build: {
      outDir: 'dist',
      emptyOutDir: true,
      copyPublicDir: true,

      rollupOptions: {
        input: 'src/main.widget.ts',
        output: {
          format: 'iife',
          name: 'WeatherWidget',
          entryFileNames: 'weather-widget.js',
          inlineDynamicImports: true,
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith('.css')) {
              return 'weather-widget.css'
            }
            return assetInfo.name || 'asset'
          },
        },
      },

      cssCodeSplit: true,
      minify: false,
      sourcemap: false,
    },

    optimizeDeps: {
      include: ['vue', 'vuetify', 'pinia'],
    },

    css: {
      preprocessorOptions: {
        sass: {
          api: 'modern-compiler',
        },
      },
    },
  }
})
