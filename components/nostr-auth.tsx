'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  KeyRound,
  Zap,
  Copy,
  Check,
  Loader2,
  ShieldCheck,
  Unplug,
  ExternalLink,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import {
  NostrProvider,
  useNostr,
  truncatePubkey,
  type Nip98SignedEvent,
} from '@/lib/nostr';

const MERCHANT_URL = 'https://merchant.lacrypta.ar';

// ---------------------------------------------------------------------------
// Shared UI pieces
// ---------------------------------------------------------------------------

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-fd-border)] bg-[var(--color-fd-secondary)] px-2.5 py-1.5 text-xs font-medium text-[var(--color-fd-secondary-foreground)] transition-colors hover:bg-[var(--color-fd-accent)]"
    >
      {copied ? (
        <Check className="size-3.5 text-[var(--color-fd-primary)]" />
      ) : (
        <Copy className="size-3.5" />
      )}
      {label ?? (copied ? 'Copied' : 'Copy')}
    </button>
  );
}

function Badge({
  children,
  variant = 'default',
}: {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning';
}) {
  const colors = {
    default:
      'bg-[var(--color-fd-secondary)] text-[var(--color-fd-secondary-foreground)] border-[var(--color-fd-border)]',
    success:
      'bg-[var(--color-fd-primary)]/10 text-[var(--color-fd-primary)] border-[var(--color-fd-primary)]/30',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${colors[variant]}`}
    >
      {children}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Connect Banner (must be inside NostrProvider)
// ---------------------------------------------------------------------------

export function NostrConnectBanner() {
  const { status, pubkey, error, connect, disconnect } = useNostr();

  if (status === 'connected' && pubkey) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="not-prose mb-8 rounded-xl border border-[var(--color-fd-primary)]/30 bg-[color-mix(in_srgb,var(--color-fd-primary)_4%,transparent)] p-4 sm:p-5"
      >
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-[var(--color-fd-primary)]/10">
              <ShieldCheck className="size-5 text-[var(--color-fd-primary)]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-fd-foreground)]">
                Connected via NIP-07
              </p>
              <p className="text-xs text-[var(--color-fd-muted-foreground)] font-mono">
                {truncatePubkey(pubkey)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="success">Ready to sign</Badge>
            <button
              type="button"
              onClick={disconnect}
              className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-fd-border)] px-2.5 py-1.5 text-xs font-medium text-[var(--color-fd-muted-foreground)] transition-colors hover:bg-[var(--color-fd-accent)] hover:text-[var(--color-fd-accent-foreground)]"
            >
              <Unplug className="size-3.5" />
              Disconnect
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="not-prose mb-8 rounded-xl border border-[var(--color-fd-border)] bg-[var(--color-fd-card)] p-4 sm:p-5"
    >
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-[var(--color-fd-secondary)]">
            <KeyRound className="size-5 text-[var(--color-fd-muted-foreground)]" />
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--color-fd-foreground)]">
              Connect your Nostr extension
            </p>
            <p className="text-xs text-[var(--color-fd-muted-foreground)]">
              {status === 'not-found'
                ? 'No NIP-07 extension detected'
                : 'Sign events to authenticate API calls'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {status === 'not-found' ? (
            <a
              href="https://github.com/nostr-protocol/nips/blob/master/07.md"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-fd-border)] px-3 py-1.5 text-xs font-medium text-[var(--color-fd-foreground)] transition-colors hover:bg-[var(--color-fd-accent)]"
            >
              <ExternalLink className="size-3.5" />
              Get an extension
            </a>
          ) : (
            <button
              type="button"
              onClick={connect}
              disabled={status === 'connecting'}
              className="inline-flex items-center gap-1.5 rounded-md bg-[var(--color-fd-primary)] px-3 py-1.5 text-xs font-semibold text-[var(--color-fd-primary-foreground)] transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {status === 'connecting' ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <Zap className="size-3.5" />
              )}
              {status === 'connecting' ? 'Connecting…' : 'Connect'}
            </button>
          )}
        </div>
      </div>
      {error && <p className="mt-3 text-xs text-red-400">{error}</p>}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// NIP-98 Sign & Copy (must be inside NostrProvider)
// ---------------------------------------------------------------------------

interface SignRequestProps {
  method: string;
  path: string;
  body?: string;
  label?: string;
}

export function Nip98SignButton({ method, path, body, label }: SignRequestProps) {
  const { status, signEvent, encodeAuthorization } = useNostr();
  const [signed, setSigned] = useState<Nip98SignedEvent | null>(null);
  const [signing, setSigning] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const url = `${MERCHANT_URL}${path}`;

  const handleSign = useCallback(async () => {
    setSigning(true);
    setError(null);
    try {
      const event = await signEvent(method, url, body);
      setSigned(event);
      setExpanded(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signing failed');
    } finally {
      setSigning(false);
    }
  }, [method, url, body, signEvent]);

  if (status !== 'connected') {
    return (
      <div className="not-prose my-4 rounded-lg border border-dashed border-[var(--color-fd-border)] p-4 text-center">
        <p className="text-xs text-[var(--color-fd-muted-foreground)]">
          Connect NIP-07 above to sign this request
        </p>
      </div>
    );
  }

  const authHeader = signed ? `Nostr ${encodeAuthorization(signed)}` : null;

  return (
    <div className="not-prose my-4 rounded-lg border border-[var(--color-fd-border)] bg-[var(--color-fd-card)] overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-2 min-w-0">
          <Badge>{method}</Badge>
          <code className="text-xs text-[var(--color-fd-muted-foreground)] truncate">
            {path}
          </code>
        </div>
        <button
          type="button"
          onClick={handleSign}
          disabled={signing}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-[var(--color-fd-primary)] px-3 py-1.5 text-xs font-semibold text-[var(--color-fd-primary-foreground)] transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {signing ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <Zap className="size-3.5" />
          )}
          {signing ? 'Signing…' : (label ?? 'Sign with NIP-98')}
        </button>
      </div>

      {error && (
        <div className="border-t border-[var(--color-fd-border)] px-4 py-2">
          <p className="text-xs text-red-400">{error}</p>
        </div>
      )}

      <AnimatePresence>
        {signed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="border-t border-[var(--color-fd-border)]">
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="flex w-full items-center gap-1.5 px-4 py-2 text-xs text-[var(--color-fd-muted-foreground)] transition-colors hover:text-[var(--color-fd-foreground)]"
              >
                {expanded ? (
                  <ChevronDown className="size-3.5" />
                ) : (
                  <ChevronRight className="size-3.5" />
                )}
                Signed event
                <Badge variant="success">kind {signed.kind}</Badge>
              </button>

              {expanded && (
                <div className="px-4 pb-3 space-y-3">
                  <div>
                    <p className="mb-1 text-xs font-medium text-[var(--color-fd-muted-foreground)]">
                      Authorization header
                    </p>
                    <div className="flex items-start gap-2">
                      <code className="flex-1 break-all rounded-md bg-[var(--color-fd-secondary)] p-2 text-xs font-mono text-[var(--color-fd-foreground)]">
                        {authHeader}
                      </code>
                      <CopyButton text={authHeader!} />
                    </div>
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-medium text-[var(--color-fd-muted-foreground)]">
                      curl
                    </p>
                    <div className="flex items-start gap-2">
                      <code className="flex-1 break-all rounded-md bg-[var(--color-fd-secondary)] p-2 text-xs font-mono text-[var(--color-fd-foreground)] whitespace-pre">
{`curl -X ${method} ${url} \\
  -H "Authorization: ${authHeader}"${body ? ` \\
  -H "Content-Type: application/json" \\
  -d '${body}'` : ''}`}
                      </code>
                      <CopyButton
                        text={`curl -X ${method} ${url} -H "Authorization: ${authHeader}"${body ? ` -H "Content-Type: application/json" -d '${body}'` : ''}`}
                      />
                    </div>
                  </div>

                  <details className="text-xs">
                    <summary className="cursor-pointer text-[var(--color-fd-muted-foreground)] hover:text-[var(--color-fd-foreground)]">
                      Raw event JSON
                    </summary>
                    <div className="mt-2 flex items-start gap-2">
                      <pre className="flex-1 overflow-auto rounded-md bg-[var(--color-fd-secondary)] p-2 font-mono text-[var(--color-fd-foreground)]">
                        {JSON.stringify(signed, null, 2)}
                      </pre>
                      <CopyButton text={JSON.stringify(signed, null, 2)} />
                    </div>
                  </details>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Bearer Session (must be inside NostrProvider)
// ---------------------------------------------------------------------------

export function BearerSessionCard() {
  const {
    status,
    signEvent,
    encodeAuthorization,
    session,
    createSession,
    clearSession,
  } = useNostr();
  const [signing, setSigning] = useState(false);
  const [signError, setSignError] = useState<string | null>(null);

  const handleCreateSession = useCallback(async () => {
    setSigning(true);
    setSignError(null);
    try {
      const url = `${MERCHANT_URL}/api/auth/session`;
      const event = await signEvent('POST', url, '{}');
      const authHeader = encodeAuthorization(event);
      await createSession(authHeader);
    } catch (err) {
      setSignError(err instanceof Error ? err.message : 'Signing failed');
    } finally {
      setSigning(false);
    }
  }, [signEvent, encodeAuthorization, createSession]);

  if (status !== 'connected') {
    return (
      <div className="not-prose my-4 rounded-lg border border-dashed border-[var(--color-fd-border)] p-4 text-center">
        <p className="text-xs text-[var(--color-fd-muted-foreground)]">
          Connect NIP-07 above to create a Bearer session
        </p>
      </div>
    );
  }

  if (session.token) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="not-prose my-4 rounded-lg border border-[var(--color-fd-primary)]/30 bg-[color-mix(in_srgb,var(--color-fd-primary)_4%,transparent)] overflow-hidden"
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-[var(--color-fd-primary)]" />
            <span className="text-sm font-medium text-[var(--color-fd-foreground)]">
              Bearer session active
            </span>
            <Badge variant="success">12h</Badge>
          </div>
          <button
            type="button"
            onClick={clearSession}
            className="text-xs text-[var(--color-fd-muted-foreground)] transition-colors hover:text-[var(--color-fd-foreground)]"
          >
            Clear
          </button>
        </div>
        <div className="border-t border-[var(--color-fd-primary)]/20 px-4 py-3 space-y-2">
          <div>
            <p className="mb-1 text-xs font-medium text-[var(--color-fd-muted-foreground)]">
              Token
            </p>
            <div className="flex items-start gap-2">
              <code className="flex-1 break-all rounded-md bg-[var(--color-fd-secondary)] p-2 text-xs font-mono text-[var(--color-fd-foreground)]">
                Bearer {session.token}
              </code>
              <CopyButton text={`Bearer ${session.token}`} />
            </div>
          </div>
          {session.expiresAt && (
            <p className="text-xs text-[var(--color-fd-muted-foreground)]">
              Expires: {new Date(session.expiresAt * 1000).toLocaleString()}
            </p>
          )}
          <p className="text-xs text-[var(--color-fd-muted-foreground)]">
            Use in place of NIP-98 for management + mint calls.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="not-prose my-4 rounded-lg border border-[var(--color-fd-border)] bg-[var(--color-fd-card)] overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div>
          <p className="text-sm font-medium text-[var(--color-fd-foreground)]">
            Create Bearer session
          </p>
          <p className="text-xs text-[var(--color-fd-muted-foreground)]">
            Sign one NIP-98 event → get a 12h JWT token
          </p>
        </div>
        <button
          type="button"
          onClick={handleCreateSession}
          disabled={signing || session.loading}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-[var(--color-fd-primary)] px-3 py-1.5 text-xs font-semibold text-[var(--color-fd-primary-foreground)] transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {signing || session.loading ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <Zap className="size-3.5" />
          )}
          {signing
            ? 'Signing…'
            : session.loading
              ? 'Creating…'
              : 'Create session'}
        </button>
      </div>
      {(signError || session.error) && (
        <div className="border-t border-[var(--color-fd-border)] px-4 py-2">
          <p className="text-xs text-red-400">{signError || session.error}</p>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Provider wrapper — wrap all auth components in MDX with this
// ---------------------------------------------------------------------------

export function NostrAuthProvider({ children }: { children: React.ReactNode }) {
  return <NostrProvider>{children}</NostrProvider>;
}
