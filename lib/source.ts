import { loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { docs } from '@/.source/server';
import { openapi } from './openapi';

export const source = loader(
  {
    docs: docs.toFumadocsSource(),
    openapi: await openapi.staticSource({
      groupBy: 'tag',
      baseDir: 'api',
    }),
  },
  {
    baseUrl: '/docs',
    plugins: [openapi.loaderPlugin(), lucideIconsPlugin()],
  },
);
