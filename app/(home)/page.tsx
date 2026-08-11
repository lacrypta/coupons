'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { MERCHANT_URL } from '@/lib/layout.shared';

const ease = [0.22, 1, 0.36, 1] as const;

export default function HomePage() {
  return (
    <main className="relative flex flex-1 flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-backdrop" />
      <div className="pointer-events-none absolute inset-0 hero-glow" />

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-3.5rem)] w-full max-w-5xl flex-col justify-center px-6 py-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-6 text-sm font-medium tracking-[0.2em] text-[var(--color-fd-muted-foreground)] uppercase"
        >
          La Crypta
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease }}
          className="max-w-3xl text-5xl leading-[0.95] font-bold tracking-tight sm:text-7xl md:text-8xl"
        >
          <span className="text-[var(--color-fd-primary)]">coupons</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease }}
          className="mt-6 max-w-xl text-lg text-[var(--color-fd-muted-foreground)] sm:text-xl"
        >
          Coupons that any till can mint — advertised on Nostr, redeemed once.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3, ease }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link
            href={MERCHANT_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-md bg-[var(--color-fd-primary)] px-5 py-3 text-sm font-semibold text-[var(--color-fd-primary-foreground)] transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            Try it on Merchant
            <ExternalLink className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            href="/docs"
            className="group inline-flex items-center gap-2 rounded-md border border-[var(--color-fd-border)] bg-transparent px-5 py-3 text-sm font-semibold text-[var(--color-fd-foreground)] transition-colors duration-300 hover:border-[var(--color-fd-primary)] hover:text-[var(--color-fd-primary)]"
          >
            Read the protocol
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease }}
        className="relative z-10 border-t border-[var(--color-fd-border)]"
      >
        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 sm:grid-cols-3">
          {[
            {
              title: 'Announce',
              body: 'Merchant signs kind 30078. Tills find mint and claim URLs on relays.',
            },
            {
              title: 'Mint',
              body: 'Authorized npubs issue a nonce and a manager-signed voucher.',
            },
            {
              title: 'Claim',
              body: 'The nonce is the credential. Redeem once — no key required.',
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i, ease }}
            >
              <p className="text-sm font-medium tracking-wide text-[var(--color-fd-primary)]">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-fd-muted-foreground)]">
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}
