export interface DarkModeConfig {
    lessJSPath: string;
    lessFilePath: string;
    isDebugLog?: boolean;
}
export interface DarkMode {
    isLoadScript: boolean;
    onModifyVars: (vars: Record<string, string>, cb: (isFinish: boolean) => void) => void;
}
declare global {
    interface Window {
        less: {
            options: {
                env: string;
                async: boolean;
                logLevel: number;
                javascriptEnabled: boolean;
            };
            modifyVars: (vars: Record<string, string>) => Promise<void>;
            sheets: Array<HTMLLinkElement>;
        };
    }
}
