import { DarkMode, DarkModeConfig } from './types';
declare global {
    interface Window {
        less: any;
    }
}
declare const useDarkMode: (options: DarkModeConfig) => DarkMode;
export default useDarkMode;
