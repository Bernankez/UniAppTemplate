<h2 align="center">
uni-app-template
</h2>

### 运行

#### H5

```sh
pnpm dev
```

#### 微信小程序

```sh
pnpm dev:mp-weixin
```

### 打包

#### H5

```sh
pnpm build
```

#### 微信小程序

```sh
pnpm build:mp-weixin
```

### 预览

#### H5

```sh
pnpm preview
```

### 环境配置

`.env.[production | development]`

`VITE_APP_BASE_URL`：域名 + base url

### Features

[uni-app](https://zh.uniapp.dcloud.io/api/)、[微信小程序](https://developers.weixin.qq.com/miniprogram/dev/api/)

- 模版：[vitesse-uni-app](https://vitesse-docs.netlify.app/)

- UI组件库：[wot-design-uni](https://wot-design-uni.pages.dev/component/button.html)

- 主题：[`theme.json`（微信小程序整体颜色配置）](./src/theme.json)、[`theme.ts`（组件库及页面内主题色配置）](./src/styles/theme.ts)

  有关导航栏颜色等的主题在[`theme.json`](./src/theme.json)中配置。详见[官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/darkmode.html#%E5%8F%98%E9%87%8F%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6-theme-json)。有关页面内及组件库的主题色，在[`theme.ts`](./src/styles/theme.ts)中配置。

- 路由：[@uni-helper/vite-plugin-uni-pages](https://github.com/uni-helper/vite-plugin-uni-pages)

  **基于文件系统的路由**。如果要配置全局`pages.json`，需要修改[这个文件](./pages.config.ts)。如果要配置全局`manifest.json`，需要修改[这个文件](./manifest.config.ts)。如果要修改某一特定页面的属性（比如navigationBarTitleText），参考[这个文件](./src/pages/index.vue)的`<route>`块。所有`pages`目录下的文件会自动生成路由，比如`src/pages/index.vue`生成的路由为`pages/index`。

- 布局：[@uni-helper/vite-plugin-uni-layouts](https://github.com/uni-helper/vite-plugin-uni-layouts)

  页面统一Layout。`layouts`目录下的页面会自动注册为布局。默认对每个`pages`中的页面使用`default`布局。如果某个特定页面不需要layout或使用其他layout，参考[这个文件](./src/pages/hi.vue)的`<route>`块。

- Auto Import: [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)

  自动加载`vue`、`@vueuse/core`、`uni-app`以及`src/composables`、`src/stores`、`src/utils`下的函数

- Component Auto Import: [@uni-helper/vite-plugin-uni-components](https://github.com/uni-helper/vite-plugin-uni-components)

  自动加载`wot-design-uni`中的组件以及`components`目录下的组件。用法同[`unplugin-vue-components`](https://github.com/unplugin/unplugin-vue-components)

- 状态管理：[pinia](https://pinia.vuejs.org/zh/)、[pinia-plugin-persist-uni](https://github.com/Allen-1998/pinia-plugin-persist-uni)

- 网络请求：[Axios@1.5.x](https://axios-http.com/zh/docs/intro)、[@uni-helper/axios-adapter](https://github.com/uni-helper/axios-adapter)

  使用`utils/service.ts`中导出的`service`作为请求方法。
