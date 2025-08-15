'use client';
  import * as React from 'react';
  import { useServerInsertedHTML } from 'next/navigation';
  import { CacheProvider, ThemeProvider } from '@emotion/react';
  import createCache from '@emotion/cache';
import { theme } from './styles/theme';

  interface InsertedStyle {
    name: string;
    isGlobal: boolean;
  }

  type InsertArgs = [type: string, serialized: { name: string; styles: string }];

  interface ThemeRegistryProps {
    children: React.ReactNode;
    options: { key: string };
  }

  export default function ThemeRegistry({ children, options }: ThemeRegistryProps) {
    const [{ cache, flush }] = React.useState(() => {
      const cache = createCache({ key: options.key, prepend: true });
      cache.compat = true;

      const prevInsert = cache.insert;
      let inserted: InsertedStyle[] = [];
      cache.insert = (...args: InsertArgs) => {
        const [type, serialized] = args;
        if (cache.inserted[serialized.name] === undefined) {
          inserted.push({ name: serialized.name, isGlobal: type === '' });
        }
        return prevInsert(...args);
      };

      const flush = () => {
        const prevInserted = inserted;
        inserted = [];
        return prevInserted;
      };

      return { cache, flush };
    });

    useServerInsertedHTML(() => {
      const names = flush();
      if (names.length === 0) return null;
      let styles = '';
      for (const { name } of names) styles += cache.inserted[name] || '';
      return (
        <style
          key={cache.key}
          data-emotion={`${cache.key} ${names.map((n) => n.name).join(' ')}`}
          dangerouslySetInnerHTML={{ __html: styles }}
        />
      );
    });

    return (
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </CacheProvider>
    );
  }