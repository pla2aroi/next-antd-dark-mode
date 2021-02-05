# next-antd-dark-mode
Plugin for next to change ant design theme ( 🌌 dark 🌇 light)

[![version](https://img.shields.io/github/v/tag/pla2aroi/next-antd-dark-mode)](https://github.com/pla2aroi/next-antd-dark-mode/tags) [![License](https://img.shields.io/github/license/pla2aroi/next-antd-dark-mode)](./LICENSE) [![npm version](https://img.shields.io/npm/v/next-antd-dark-mode)](https://www.npmjs.com/package/next-antd-dark-mode)

- ⚡ chunk file antd component
- 💅 custom variable  🌌 dark  🌇 light


## Usage
```
npm i next-antd-dark-mode --save
or
yarn add next-antd-dark-mode
```

## DEMO
https://try-next-antd-dark-mode-drgdd3mhz.vercel.app/


## Setting

💅 file -> antd-component.less
```
//https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less

@import '~antd/lib/style/core/index.less';
//@import "~antd/lib/affix/style/index.less";
//@import '~antd/lib/alert/style/index.less';
//@import "~antd/lib/anchor/style/index.less";
//@import '~antd/lib/auto-complete/style/index.less';
//@import '~antd/lib/avatar/style/index.less';
//@import "~antd/lib/back-top/style/index.less";
//@import '~antd/lib/badge/style/index.less';
//@import '~antd/lib/breadcrumb/style/index.less';
@import '~antd/lib/button/style/index.less';
//@import "~antd/lib/calendar/style/index.less";
//@import '~antd/lib/card/style/index.less';
//@import '~antd/lib/descriptions/style/index.less';
//@import "~antd/lib/carousel/style/index.less";
//@import "~antd/lib/cascader/style/index.less";
//@import '~antd/lib/checkbox/style/index.less';
//@import '~antd/lib/collapse/style/index.less';
@import '~antd/lib/date-picker/style/index.less';
//@import '~antd/lib/divider/style/index.less';
//@import '~antd/lib/dropdown/style/index.less';
//@import '~antd/lib/form/style/index.less';
//@import '~antd/lib/grid/style/index.less';
//@import '~antd/lib/input/style/index.less';
//@import '~antd/lib/input-number/style/index.less';
//@import '~antd/lib/layout/style/index.less';
//@import "~antd/lib/list/style/index.less";
//@import '~antd/lib/locale-provider/style/index.less';
//@import "~antd/lib/mentions/style/index.less";
//@import '~antd/lib/menu/style/index.less';
//@import '~antd/lib/message/style/index.less';
//@import '~antd/lib/modal/style/index.less';
//@import '~antd/lib/notification/style/index.less';
//@import '~antd/lib/pagination/style/index.less';
//@import '~antd/lib/popover/style/index.less';
//@import '~antd/lib/progress/style/index.less';
//@import '~antd/lib/radio/style/index.less';
//@import "~antd/lib/rate/style/index.less";
@import '~antd/lib/select/style/index.less';
//@import "~antd/lib/slider/style/index.less";
//@import '~antd/lib/spin/style/index.less';
//@import "~antd/lib/steps/style/index.less";
//@import '~antd/lib/switch/style/index.less';
//@import '~antd/lib/table/style/index.less';
//@import '~antd/lib/tabs/style/index.less';
//@import '~antd/lib/tag/style/index.less';
//@import '~antd/lib/time-picker/style/index.less';
//@import '~antd/lib/timeline/style/index.less';
//@import '~antd/lib/tooltip/style/index.less';
//@import "~antd/lib/transfer/style/index.less";
//@import '~antd/lib/tree/style/index.less';
//@import '~antd/lib/tree-select/style/index.less';
//@import '~antd/lib/upload/style/index.less';
//@import '~antd/lib/drawer/style/index.less';
//@import '~antd/lib/empty/style/index.less';
//@import '~antd/lib/result/style/index.less';
//@import '~antd/lib/skeleton/style/index.less';
//@import '~antd/lib/typography/style/index.less';
```

💅 file -> antd-variable.less
```
@import '~antd/lib/style/themes/default.less';

@primary-color: #391085;
@animation-duration-base: 0.1s;
```

📝 next.config.js

```
🤔 npm i @zeit/next-less --save

const withLess = require('@zeit/next-less')
const generateTheme = require('next-antd-dark-mode/plugin')

const withAntdTheme = generateTheme({
  varFile: path.join(__dirname, './src/styles/antd-variable.less'),
  antdComponentFile: path.join(__dirname, './src/styles/antd-component.less'),
  customThemes: {
    dark: {
      '@primary-color': '#ad6800',
      '@body-background': '#363537',
    },
  },
})

const nextConfig = {
  reactStrictMode: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  webpack: (config, { isServer }) => {

    ...

    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ]

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      })
    }

    ...

  },
}

module.exports = withPlugins([[withAntdTheme], [withLess]], nextConfig)
```

📝 pages/_app.tsx || pages/_app.js

```
import '(path your)/styles/antd-component.less'
```

📝 pages/index.tsx || pages/index.js

```
import { ReactElement } from 'react'
import Button from 'antd/lib/button'
import DatePicker from 'antd/lib/date-picker'
import Select from 'antd/lib/select'
import getConfig from 'next/config'
import useDarkMode from 'next-antd-dark-mode'

const { publicRuntimeConfig = {} } = getConfig() || {}
const { next_antd_dark_mode = {} } = publicRuntimeConfig
const { themes, lessFilePath, lessJSPath } = next_antd_dark_mode

const DISABLE_ANIMATION = 'disable-animation'

const Home = (): ReactElement => {
  const { isLoadScript, onModifyVars } = useDarkMode({ lessJSPath, lessFilePath })

  const changeTheme = (theme: Record<string, string> | string) => {
    if (!document.getElementById(DISABLE_ANIMATION)) {
      const css = `*, *::before, *::after {
        transition: none !important;
        animation-duration: 0s !important;
      }`
      const head = document.head || document.getElementsByTagName('head')[0]
      const style = document.createElement('style')
      head.appendChild(style)
      style.id = DISABLE_ANIMATION
      style.appendChild(document.createTextNode(css))
    }

    if (typeof theme === 'string') {
      onModifyVars({ ...themes.default, ...themes[theme] }, () => {
        setTimeout(() => {
          document.getElementById(DISABLE_ANIMATION)?.remove()
        }, 100)
      })
      return
    }

    onModifyVars({ ...themes.default, ...theme }, () => {
      setTimeout(() => {
        document.getElementById(DISABLE_ANIMATION)?.remove()
      }, 100)
    })
  }

  return (
    <div>
      {!isLoadScript && (
        <>
          <Button
            type="primary"
            onClick={() => {
              changeTheme('dark')
            }}
          >
            dark
          </Button>
          <Button
            type="primary"
            onClick={() => {
              changeTheme('default')
            }}
          >
            light
          </Button>
        </>
      )}
      <DatePicker />
      <Select defaultValue="lucy">
        <Select.Option value="jack">Jack</Select.Option>
        <Select.Option value="lucy">Lucy</Select.Option>
      </Select>
    </div>
  )
}

export default Home
```

## Inspiration
- [next-dynamic-antd-theme](https://www.npmjs.com/package/next-dynamic-antd-theme "next-dynamic-antd-theme")
- [antd-theme-generator](https://github.com/mzohaibqc/antd-theme-generator "antd-theme-generator")

## License

[MIT](LICENSE)
