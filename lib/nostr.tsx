'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import type { ReactNode } from 'react';

const NIP98_KIND = 27235;
const MERCHANT_URL = 'https://merchant.lacrypta.ar';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Nip07Extension {
  getPublicKey(): Promise<string>;
  signEvent(event: {
    kind: number;
    created_at: number;
    tags: string[][];
    content: string;
    pubkey?: string;
  }): Promise<{
    id: string;
    pubkey: string;
    sig: string;
    kind: number;
    created_at: number;
    tags: string[][];
    content: string;
  }>;
}

declare global {
  interface Window {
    nostr?: Nip07Extension;
  }
}

export type Nip07Status = 'idle' | 'connecting' | 'connected' | 'error' | 'not-found';

export interface Nip98SignedEvent {
  id: string;
  pubkey: string;
  sig: string;
  kind: number;
  created_at: number;
  tags: string[][];
  content: string;
}

export interface SessionState {
  token: string | null;
  expiresAt: number | null;
  loading: boolean;
  error: string | null;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface NostrContextValue {
  // NIP-07
  status: Nip07Status;
  pubkey: string | null;
  error: string | null;
  extension: Nip07Extension | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  // NIP-98
  signEvent: (
    method: string,
    url: string,
    body?: string,
  ) => Promise<Nip98SignedEvent>;
  encodeAuthorization: (event: Nip98SignedEvent) => string;
  // Session
  session: SessionState;
  createSession: (authHeader: string) => Promise<string | null>;
  clearSession: () => void;
}

const NostrContext = createContext<NostrContextValue | null>(null);

export function useNostr(): NostrContextValue {
  const ctx = useContext(NostrContext);
  if (!ctx) throw new Error('useNostr must be used inside <NostrProvider>');
  return ctx;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function nowSeconds(): number {
  return Math.floor(Date.now() / 1000);
}

function randomNonce(): string {
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

async function sha256Hex(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest), (b) =>
    b.toString(16).padStart(2, '0'),
  ).join('');
}

export function truncatePubkey(pubkey: string): string {
  if (pubkey.length <= 16) return pubkey;
  return `${pubkey.slice(0, 8)}…${pubkey.slice(-8)}`;
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function NostrProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<Nip07Status>('idle');
  const [pubkey, setPubkey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [extension, setExtension] = useState<Nip07Extension | null>(null);
  const [session, setSession] = useState<SessionState>({
    token: null,
    expiresAt: null,
    loading: false,
    error: null,
  });

  const connect = useCallback(async () => {
    setStatus('connecting');
    setError(null);

    if (typeof window === 'undefined' || !window.nostr) {
      setStatus('not-found');
      setError(
        'No Nostr extension found. Install Alby, nos2x, or another NIP-07 signer.',
      );
      return;
    }

    try {
      const pk = await window.nostr.getPublicKey();
      setPubkey(pk);
      setExtension(window.nostr);
      setStatus('connected');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Failed to get public key');
    }
  }, []);

  const disconnect = useCallback(() => {
    setStatus('idle');
    setPubkey(null);
    setError(null);
    setExtension(null);
    setSession({ token: null, expiresAt: null, loading: false, error: null });
  }, []);

  const signEvent = useCallback(
    async (
      method: string,
      url: string,
      body?: string,
    ): Promise<Nip98SignedEvent> => {
      if (!extension) throw new Error('Not connected — call connect() first');

      const tags: string[][] = [
        ['u', url],
        ['method', method],
        ['nonce', randomNonce()],
      ];

      if (body) {
        tags.push(['payload', await sha256Hex(body)]);
      }

      const unsigned = {
        kind: NIP98_KIND,
        created_at: nowSeconds(),
        tags,
        content: '',
      };

      return extension.signEvent(unsigned);
    },
    [extension],
  );

  const encodeAuthorization = useCallback(
    (event: Nip98SignedEvent): string => btoa(JSON.stringify(event)),
    [],
  );

  const createSession = useCallback(
    async (authHeader: string): Promise<string | null> => {
      setSession({ token: null, expiresAt: null, loading: true, error: null });

      try {
        const res = await fetch(`${MERCHANT_URL}/api/auth/session`, {
          method: 'POST',
          headers: {
            Authorization: `Nostr ${authHeader}`,
            'Content-Type': 'application/json',
          },
          body: '{}',
        });

        if (!res.ok) {
          const data = await res.json().catch(() => null);
          throw new Error(
            data?.message || data?.reason || `Session failed (${res.status})`,
          );
        }

        const data = await res.json();
        setSession({
          token: data.token,
          expiresAt: data.expiresAt ?? null,
          loading: false,
          error: null,
        });
        return data.token as string;
      } catch (err) {
        setSession({
          token: null,
          expiresAt: null,
          loading: false,
          error: err instanceof Error ? err.message : 'Session creation failed',
        });
        return null;
      }
    },
    [],
  );

  const clearSession = useCallback(() => {
    setSession({ token: null, expiresAt: null, loading: false, error: null });
  }, []);

  return (
    <NostrContext.Provider
      value={{
        status,
        pubkey,
        error,
        extension,
        connect,
        disconnect,
        signEvent,
        encodeAuthorization,
        session,
        createSession,
        clearSession,
      }}
    >
      {children}
    </NostrContext.Provider>
  );
}
