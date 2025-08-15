declare module '@emotion/cache' {
  import { Cache } from '@emotion/cache';
  export default function createCache(options?: { key: string; prepend?: boolean }): Cache & { inserted: Record<string, string> };
}