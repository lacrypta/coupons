import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'coupons — La Crypta',
    template: '%s — coupons',
  },
  description:
    'Nostr protocol for merchant coupons: discovery, vouchers, and the Coupon Manager Service API.',
  metadataBase: new URL('https://coupons.lacrypta.ar'),
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col antialiased">
        <RootProvider
          theme={{
            enabled: false,
            defaultTheme: 'dark',
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
