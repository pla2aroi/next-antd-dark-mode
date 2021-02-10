import { useState } from 'react'
import useScript from 'react-script-hook'
import type { DarkMode, DarkModeConfig } from './types'

const loadLess = (src: string) => {
  const link = document.createElement('link')
  link.rel = 'stylesheet/less'
  link.type = 'text/css'
  link.href = src
  return link
}

const useDarkMode = (options: DarkModeConfig): DarkMode => {
  const [isLoadScript, setIsLoadScript] = useState<boolean>(true)

  useScript({
    src: options.lessJSPath,
    checkForExisting: true,
    onload: () => {
      if (!window.less) return
      window.less.options.env = !!options.isDebugLog ? 'development' : 'production'
      window.less.options.async = false
      window.less.options.logLevel = !!options.isDebugLog ? 2 : 0
      window.less.options.javascriptEnabled = true
      window.less.sheets = [loadLess(options.lessFilePath)]
      setTimeout(() => setIsLoadScript(false), 100)
    },
  })

  const onModifyVars = (
    vars: Record<string, string>,
    cb?: (isFinish: boolean) => void,
  ) => {
    if (!window.less) {
      if (typeof cb === 'function') cb(false)
      return
    }

    window.less
      .modifyVars(vars)
      .then(() => {
        if (typeof cb === 'function') cb(true)
      })
      .catch(() => {
        if (typeof cb === 'function') cb(false)
      })
  }

  return {
    isLoadScript,
    onModifyVars,
  }
}

export default useDarkMode
