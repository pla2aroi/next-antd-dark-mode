export interface DarkModeConfig {
  lessJSPath: string
  lessFilePath: string
}

export interface DarkMode {
  isLoadScript: boolean
  onModifyVars: (vars: Record<string, string>, cb: (isFinish: boolean) => void) => void
}
