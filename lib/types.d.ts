export interface DarkModeConfig {
    lessJSPath: string;
    lessFilePath: string;
    isDebugLog: boolean;
}
export interface DarkMode {
    isLoadScript: boolean;
    onModifyVars: (vars: Record<string, string>, cb: (isFinish: boolean) => void) => void;
}
declare global {
    interface Window {
        less: any;
    }
}
