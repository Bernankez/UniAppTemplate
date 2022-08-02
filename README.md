## 环境

`Nodejs >= 12`

输入

```sh
npm install // npm
pnpm install // pnpm
```

安装依赖

## 运行

`npm run dev:h5`运行h5端

`npm run dev:mp-weixin`运行小程序端。小程序端启动后会build到根目录下`/dist/dev/mp-weixin`，使用微信开发者工具打开`mp-weixin`目录。

## 配置

项目全局变量配置在`/uni_configs`下。本地开发时，需要在`/uni_configs`下新建`.env.development.local`文件，文件中输入以下内容：

```sh
# 开发环境接口地址
VITE_APP_DOMAIN = '...'
# 开发环境token，优先级大于项目中store.state.token
VITE_APP_TOKEN = 'token'
```

## 目录

```
- src
-- api // 接口文件
-- components // 全局组件
-- composables // 全局composition API
-- pages // 主包页面
-- store // 状态管理
-- styles // 全局样式
-- subpackages // 分包
-- types // 全局类型
-- utils // utils
-- env.d.ts // 全局类型声明
-- manifest.json // uni-app配置
-- pages.json // 路由及分包配置
-- uni.scss // uni全局样式变量
- uni_configs // 全局变量，参考 https://cn.vitejs.dev/guide/env-and-mode.html
```

## 文档

- [Pinia](https://pinia.vuejs.org/)
- [Day.js](https://dayjs.gitee.io/zh-CN/)
- [Vite](https://cn.vitejs.dev/)
- [uni-app 全局文件配置](https://uniapp.dcloud.io/collocation/pages.html#globalstyle)
- [uni-ui](https://uniapp.dcloud.io/component/uniui/uni-ui.html#uni-ui产品特点)
- [uni-app 全面屏安全区适配](https://ask.dcloud.net.cn/article/35564)
- [在uniapp, taro中体验unocss](https://juejin.cn/post/7116730180252467236#heading-22)
- [UnoCSS](https://github.com/unocss/unocss)
- [UnoCss Interactive docs 交互式文档](https://uno.antfu.me/)
- [Vitest](https://vitest.dev/)
- [uni-echarts](https://ext.dcloud.net.cn/plugin?id=4899#detail)
- [echarts](https://echarts.apache.org/zh/api.html#echarts)
- [LimeEcharts](https://limeui.qcoon.cn/#/echart-example)
- [iconify](https://icon-sets.iconify.design/)
- [vite-plugin-mock](https://github.com/vbenjs/vite-plugin-mock/blob/HEAD/README.zh_CN.md)
