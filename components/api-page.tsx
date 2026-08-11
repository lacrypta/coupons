'use client';

import { createOpenAPIPage } from 'fumadocs-openapi/ui';
import { withScalar } from 'fumadocs-openapi/scalar';

export const OpenAPIPage = createOpenAPIPage(
  withScalar({
    playground: {
      enabled: true,
    },
  }),
);
