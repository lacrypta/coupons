'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, ExternalLink, Github, Zap, KeyRound } from 'lucide-react';
import { MERCHANT_URL } from '@/lib/layout.shared';
import {
  NostrLoginIllustration,
  CouponOptionsIllustration,
  LightningIllustration,
} from '@/components/illustrations';

const ease = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    number: '01',
    title: 'Login with Nostr',
    body: 'Connect with your keys. No passwords — your npub is your identity.',
    illustration: NostrLoginIllustration,
  },
  {
    number: '02',
    title: 'Create coupons',
    body: 'Percent off, free items, fixed discounts — whatever your offer needs.',
    illustration: CouponOptionsIllustration,
  },
  {
    number: '03',
    title: 'Use your lightning address',
    body: 'Linked to your npub. Payment Gateways find your coupon manager from NIP-05 and start redeeming.',
    illustration: LightningIllustration,
  },
];

const flow = [
  {
    from: 'Merchant',
    to: 'Coupon Manager',
    text: 'Adds coupons into the Coupon Manager service.',
  },
  {
    from: 'Merchant',
    to: 'Nostr',
    text: 'Signs an updatable event assigning the manager — API URLs and npub.',
  },
  {
    from: 'Coupon Manager',
    to: '',
    text: 'Handles coupons and redeem status internally.',
  },
  {
    from: 'Merchant',
    to: 'Payment Gateway',
    text: 'Signs in via lightning address (payments) and NIP-05 to retrieve the npub event identifying the manager.',
  },
  {
    from: 'Payment Gateway',
    to: 'Coupon Manager',
    text: 'Connects to the manager from the announced API URLs.',
  },
  {
    from: 'User',
    to: 'Payment Gateway',
    text: 'Inserts the coupon at checkout.',
  },
  {
    from: 'Payment Gateway',
    to: 'Coupon Manager',
    text: 'Claims the coupon using the manager API.',
  },
];

const standards = [
  {
    icon: Zap,
    title: 'NIP-99',
    subtitle: 'Classified Listings',
    body: 'Products and coupon definitions are created as Nostr-native listings — portable, signed, and discoverable.',
  },
  {
    icon: KeyRound,
    title: 'NIP-98',
    subtitle: 'HTTP Auth',
    body: 'Manager and gateway endpoints authenticate with signed Nostr events instead of passwords or API keys.',
  },
];

export default function HomePage() {
  return (
    <main className="relative flex flex-1 flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-backdrop" />
      <div className="pointer-events-none absolute inset-0 hero-glow" />

      {/* Hero */}
      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-3.5rem)] w-full max-w-6xl flex-col justify-center px-6 py-20">
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
          className="max-w-4xl text-5xl leading-[0.95] font-bold tracking-tight sm:text-7xl md:text-8xl"
        >
          <span className="text-[var(--color-fd-primary)]">coupons</span>
          <span className="text-[var(--color-fd-foreground)]"> for Nostr</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease }}
          className="mt-6 max-w-2xl text-lg text-[var(--color-fd-muted-foreground)] sm:text-xl"
        >
          Advertise offers on Nostr, mint from any till, and redeem once. Lightning-native,
          key-native, and open by default.
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
            className="group inline-flex items-center gap-2 rounded-md bg-[var(--color-fd-primary)] px-8 py-4 text-base font-semibold text-[var(--color-fd-primary-foreground)] transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            Try it on Merchant
            <ExternalLink className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            href="/docs"
            className="group inline-flex items-center gap-2 rounded-md border border-[var(--color-fd-border)] bg-transparent px-6 py-4 text-sm font-semibold text-[var(--color-fd-foreground)] transition-colors duration-300 hover:border-[var(--color-fd-primary)] hover:text-[var(--color-fd-primary)]"
          >
            Read the protocol
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </section>

      {/* 3 simple steps */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease }}
        className="relative z-10 border-t border-[var(--color-fd-border)] bg-[var(--color-fd-background)]"
      >
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="mb-14 max-w-2xl">
            <p className="text-sm font-medium tracking-[0.2em] text-[var(--color-fd-primary)] uppercase">
              Simple by design
            </p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Three steps. That&apos;s it.
            </h2>
            <p className="mt-4 text-lg text-[var(--color-fd-muted-foreground)]">
              From Nostr login to a redeemable coupon in minutes — no new accounts, no
              platform lock-in.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => {
              const Illustration = step.illustration;
              return (
                <motion.article
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.1 * i, ease }}
                  className="group rounded-2xl border border-[var(--color-fd-border)] bg-[var(--color-fd-card)] p-6 transition-colors duration-300 hover:border-[var(--color-fd-primary)]"
                >
                  <div className="mb-5 h-48 overflow-hidden rounded-xl border border-[var(--color-fd-border)] bg-[var(--color-fd-background)]">
                    <Illustration />
                  </div>
                  <p className="text-sm font-medium tracking-wide text-[var(--color-fd-primary)]">
                    {step.number}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-fd-muted-foreground)]">
                    {step.body}
                  </p>
                </motion.article>
              );
            })}
          </div>

          <div className="mt-12">
            <Link
              href={MERCHANT_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 rounded-md bg-[var(--color-fd-primary)] px-8 py-4 text-base font-semibold text-[var(--color-fd-primary-foreground)] transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Try it on Merchant
              <ExternalLink className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* How it works */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease }}
        className="relative z-10 border-t border-[var(--color-fd-border)] bg-[var(--color-fd-background)]"
      >
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="mb-14 max-w-2xl">
            <p className="text-sm font-medium tracking-[0.2em] text-[var(--color-fd-primary)] uppercase">
              How does this work?
            </p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              A protocol flow between three parties
            </h2>
            <p className="mt-4 text-lg text-[var(--color-fd-muted-foreground)]">
              Merchant, Coupon Manager, and Payment Gateway coordinate over Nostr and a
              small HTTP API.
            </p>
          </div>

          <ol className="relative space-y-6 border-l border-[var(--color-fd-border)] pl-8">
            {flow.map((item, i) => (
              <motion.li
                key={item.text}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.06 * i, ease }}
                className="relative"
              >
                <span className="absolute top-1 -left-[41px] flex size-5 items-center justify-center rounded-full border border-[var(--color-fd-border)] bg-[var(--color-fd-background)] text-[10px] font-semibold text-[var(--color-fd-primary)]">
                  {i + 1}
                </span>
                <div className="rounded-xl border border-[var(--color-fd-border)] bg-[var(--color-fd-card)] p-4">
                  <p className="text-sm text-[var(--color-fd-muted-foreground)]">
                    <span className="font-semibold text-[var(--color-fd-foreground)]">
                      {item.from}
                    </span>
                    {item.to && (
                      <>
                        {' → '}
                        <span className="font-semibold text-[var(--color-fd-primary)]">
                          {item.to}
                        </span>
                      </>
                    )}
                    {' — '}
                    {item.text}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </motion.section>

      {/* Nostr native standards */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease }}
        className="relative z-10 border-t border-[var(--color-fd-border)] bg-[var(--color-fd-background)]"
      >
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="mb-14 max-w-2xl">
            <p className="text-sm font-medium tracking-[0.2em] text-[var(--color-fd-primary)] uppercase">
              Nostr native
            </p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Built on standards, not silos
            </h2>
            <p className="mt-4 text-lg text-[var(--color-fd-muted-foreground)]">
              Everything is a signed Nostr event — portable across relays, clients, and
              implementations.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {standards.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i, ease }}
                  className="rounded-2xl border border-[var(--color-fd-border)] bg-[var(--color-fd-card)] p-6 transition-colors duration-300 hover:border-[var(--color-fd-primary)]"
                >
                  <div className="mb-4 inline-flex size-11 items-center justify-center rounded-lg border border-[var(--color-fd-border)] bg-[var(--color-fd-background)] text-[var(--color-fd-primary)]">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {item.title}{' '}
                    <span className="text-[var(--color-fd-muted-foreground)] font-normal">
                      — {item.subtitle}
                    </span>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-fd-muted-foreground)]">
                    {item.body}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-14 rounded-2xl border border-[var(--color-fd-primary)]/40 bg-[color-mix(in_srgb,var(--color-fd-primary)_6%,transparent)] p-8 text-center sm:p-10">
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Ready to run it yourself?
            </h3>
            <p className="mx-auto mt-2 max-w-md text-[var(--color-fd-muted-foreground)]">
              The live Coupon Manager is running on Merchant. Connect your Nostr keys and
              mint your first coupon.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={MERCHANT_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-md bg-[var(--color-fd-primary)] px-8 py-4 text-base font-semibold text-[var(--color-fd-primary-foreground)] transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                Try it on Merchant
                <ExternalLink className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="https://github.com/lacrypta/merchant"
                target="_blank"
                rel="noreferrer"
                aria-label="Merchant on GitHub"
                className="inline-flex items-center justify-center rounded-md border border-[var(--color-fd-border)] p-4 text-[var(--color-fd-foreground)] transition-colors duration-300 hover:border-[var(--color-fd-primary)] hover:text-[var(--color-fd-primary)]"
              >
                <Github className="size-5" />
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      <footer className="relative z-10 border-t border-[var(--color-fd-border)] bg-[var(--color-fd-background)]">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 py-10 text-sm text-[var(--color-fd-muted-foreground)] sm:flex-row sm:justify-between">
          <p>
            Made by{' '}
            <Link
              href="https://github.com/agustinkassis"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-[var(--color-fd-foreground)] transition-colors hover:text-[var(--color-fd-primary)]"
            >
              El Gorila
            </Link>
          </p>
          <p>
            Powered by{' '}
            <Link
              href="https://lacrypta.ar"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-[var(--color-fd-primary)] transition-opacity hover:opacity-80"
            >
              La Crypta
            </Link>
          </p>
        </div>
      </footer>
    </main>
  );
}
