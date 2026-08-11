import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { ExternalLink } from 'lucide-react';

export const MERCHANT_URL = 'https://merchant.lacrypta.ar';

export function Logo() {
  return (
    <span className="inline-flex items-baseline gap-1.5 font-semibold tracking-tight">
      <span className="text-[var(--color-fd-primary)]">coupons</span>
      <span className="text-[var(--color-fd-muted-foreground)] text-xs font-medium tracking-wide">
        by La Crypta
      </span>
    </span>
  );
}

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Logo />,
      url: '/',
    },
    links: [
      {
        text: 'Docs',
        url: '/docs',
        active: 'nested-url',
      },
      {
        text: 'API',
        url: '/docs/api',
        active: 'nested-url',
      },
      {
        type: 'icon',
        icon: <ExternalLink className="size-4" />,
        text: 'Live implementation',
        url: MERCHANT_URL,
        external: true,
      },
    ],
  };
}
