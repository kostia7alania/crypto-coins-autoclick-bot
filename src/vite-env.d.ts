/// <reference types="vite/client" />

interface ImportMeta {
  readonly AuthorizationHeaderLimeCoin: string;
}

interface customWindow extends Window {
  AuthorizationHeaderLimeCoin: string;
}

declare const window: customWindow;

declare global {
  interface Window {
    AuthorizationHeaderLimeCoin: string | null;
  }
}

declare module '*.txt' {
  const value: string;
  export default value;
}
