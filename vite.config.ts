import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import Uni from '@dcloudio/vite-plugin-uni'
import UniHelperManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniHelperPages from '@uni-helper/vite-plugin-uni-pages'
import UniHelperLayouts from '@uni-helper/vite-plugin-uni-layouts'
import UniHelperComponents from '@uni-helper/vite-plugin-uni-components'
import { WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import { uniPolyfill } from './plugins/uni-polyfill'

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const UnoCSS = (await import('unocss/vite')).default

  return defineConfig({
    plugins: [
      // Polyfill for VueUse@10
      uniPolyfill(),
      // https://github.com/uni-helper/vite-plugin-uni-manifest
      UniHelperManifest(),
      // https://github.com/uni-helper/vite-plugin-uni-pages
      UniHelperPages({
        dts: 'src/uni-pages.d.ts',
      }),
      // https://github.com/uni-helper/vite-plugin-uni-layouts
      UniHelperLayouts(),
      // https://github.com/uni-helper/vite-plugin-uni-components
      UniHelperComponents({
        dts: 'src/components.d.ts',
        directoryAsNamespace: true,
        resolvers: [WotResolver()],
      }),
      Uni(),
      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: ['vue', '@vueuse/core', 'uni-app'],
        dts: 'src/auto-imports.d.ts',
        dirs: ['src/composables', 'src/stores', 'src/utils'],
        vueTemplate: true,
      }),
      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      UnoCSS(),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '~': resolve(__dirname, '.'),
      },
    },
  })
})
