'use client';

import { motion } from 'motion/react';

const lime = 'var(--color-fd-primary)';
const muted = 'var(--color-fd-muted-foreground)';
const border = 'var(--color-fd-border)';

export function NostrLoginIllustration() {
  return (
    <svg viewBox="0 0 320 200" fill="none" className="h-full w-full">
      <defs>
        <linearGradient id="nl-glow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={lime} stopOpacity="0.18" />
          <stop offset="100%" stopColor={lime} stopOpacity="0" />
        </linearGradient>
      </defs>

      <circle cx="160" cy="88" r="72" fill="url(#nl-glow)" />

      {/* Relay nodes */}
      {[
        { x: 60, y: 46, d: 0 },
        { x: 262, y: 40, d: 0.4 },
        { x: 42, y: 132, d: 0.8 },
        { x: 276, y: 140, d: 1.2 },
      ].map((n, i) => (
        <g key={i}>
          <motion.circle
            cx={n.x}
            cy={n.y}
            r="7"
            stroke={border}
            fill="#0f0f0f"
            animate={{ stroke: [border, lime, border], strokeOpacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.4, delay: n.d, repeat: Infinity }}
          />
          <motion.circle
            cx={n.x}
            cy={n.y}
            r="2.5"
            fill={lime}
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 2.4, delay: n.d, repeat: Infinity }}
          />
        </g>
      ))}

      {/* Beams to center */}
      {[
        'M60 46 L148 78',
        'M262 40 L172 78',
        'M42 132 L148 98',
        'M276 140 L172 98',
      ].map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke={lime}
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 1], opacity: [0, 0.7, 0] }}
          transition={{ duration: 2.4, delay: 0.2 * i, repeat: Infinity, times: [0, 0.4, 1] }}
        />
      ))}

      {/* Floating keys */}
      {[
        { x: 84, y: 24, d: 0.6 },
        { x: 224, y: 164, d: 1.4 },
      ].map((k, i) => (
        <motion.g
          key={i}
          animate={{ y: [0, -6, 0], rotate: [0, 8, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 3.2, delay: k.d, repeat: Infinity }}
        >
          <circle cx={k.x} cy={k.y} r="4" stroke={muted} strokeWidth="1.5" />
          <path d={`M${k.x + 4} ${k.y} h10 M${k.x + 10} ${k.y} v4`} stroke={muted} strokeWidth="1.5" strokeLinecap="round" />
        </motion.g>
      ))}

      {/* Profile card */}
      <motion.g
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 2.6, repeat: Infinity }}
      >
        <rect x="104" y="56" width="112" height="72" rx="12" fill="#0f0f0f" stroke={lime} strokeOpacity="0.9" strokeWidth="1.5" />
        <circle cx="132" cy="88" r="14" fill={lime} fillOpacity="0.15" stroke={lime} strokeWidth="1.5" />
        <path d="M132 84 v8 M128 88 h8" stroke={lime} strokeWidth="1.5" strokeLinecap="round" />
        <rect x="154" y="78" width="46" height="6" rx="3" fill={lime} fillOpacity="0.8" />
        <rect x="154" y="90" width="30" height="6" rx="3" fill={muted} fillOpacity="0.5" />
        <rect x="154" y="102" width="38" height="6" rx="3" fill={muted} fillOpacity="0.3" />
      </motion.g>

      {/* Connect pill */}
      <motion.rect
        x="124"
        y="140"
        width="72"
        height="24"
        rx="12"
        fill={lime}
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      />
      <text
        x="160"
        y="156"
        textAnchor="middle"
        fill="#0a0a0a"
        fontSize="10"
        fontWeight="700"
        letterSpacing="0.08em"
      >
        CONNECT
      </text>
    </svg>
  );
}

export function CouponOptionsIllustration() {
  return (
    <svg viewBox="0 0 320 200" fill="none" className="h-full w-full">
      <defs>
        <linearGradient id="co-glow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={lime} stopOpacity="0.16" />
          <stop offset="100%" stopColor={lime} stopOpacity="0" />
        </linearGradient>
      </defs>

      <circle cx="160" cy="92" r="76" fill="url(#co-glow)" />

      {/* Percent coupon */}
      <motion.g
        animate={{ y: [0, -5, 0], rotate: [-3, -5, -3] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <rect x="38" y="64" width="100" height="56" rx="10" fill="#0f0f0f" stroke={lime} strokeWidth="1.5" />
        <path d="M38 88 h100" stroke={border} strokeDasharray="4 4" />
        <text x="58" y="84" fill={lime} fontSize="18" fontWeight="700">%20</text>
        <rect x="52" y="96" width="52" height="5" rx="2.5" fill={muted} fillOpacity="0.4" />
        <circle cx="88" cy="80" r="0" fill="none" />
      </motion.g>

      {/* Free item coupon */}
      <motion.g
        animate={{ y: [0, 5, 0], rotate: [2.5, 4, 2.5] }}
        transition={{ duration: 3.4, delay: 0.4, repeat: Infinity }}
      >
        <rect x="146" y="46" width="104" height="60" rx="10" fill="#0f0f0f" stroke={border} strokeWidth="1.5" />
        <circle cx="168" cy="76" r="11" stroke={lime} strokeWidth="1.5" />
        <path d="M168 71 v10 M163 76 h10" stroke={lime} strokeWidth="1.5" strokeLinecap="round" />
        <rect x="188" y="66" width="44" height="6" rx="3" fill={lime} fillOpacity="0.7" />
        <rect x="188" y="78" width="30" height="6" rx="3" fill={muted} fillOpacity="0.4" />
        <rect x="188" y="90" width="38" height="6" rx="3" fill={muted} fillOpacity="0.25" />
      </motion.g>

      {/* Gift coupon */}
      <motion.g
        animate={{ y: [0, -4, 0], rotate: [-1, 1, -1] }}
        transition={{ duration: 3.8, delay: 0.8, repeat: Infinity }}
      >
        <rect x="96" y="116" width="128" height="58" rx="10" fill="#0f0f0f" stroke={lime} strokeOpacity="0.8" strokeWidth="1.5" />
        <rect x="114" y="134" width="14" height="14" rx="3" stroke={lime} strokeWidth="1.5" />
        <path d="M121 134 v-6 M121 128 c-4-6 4-10 5-4 M121 128 c4-6-4-10-5-4" stroke={lime} strokeWidth="1.5" strokeLinecap="round" />
        <rect x="140" y="130" width="60" height="7" rx="3.5" fill={lime} fillOpacity="0.8" />
        <rect x="140" y="144" width="42" height="6" rx="3" fill={muted} fillOpacity="0.4" />
        <rect x="140" y="156" width="52" height="6" rx="3" fill={muted} fillOpacity="0.25" />
      </motion.g>

      {/* Small sparkle tags */}
      {[
        { x: 66, y: 42, d: 0 },
        { x: 258, y: 120, d: 0.5 },
        { x: 46, y: 156, d: 1 },
      ].map((s, i) => (
        <motion.g
          key={i}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 2.2, delay: s.d, repeat: Infinity }}
        >
          <path d={`M${s.x} ${s.y - 5} L${s.x} ${s.y + 5} M${s.x - 5} ${s.y} L${s.x + 5} ${s.y}`} stroke={lime} strokeWidth="1.5" strokeLinecap="round" />
        </motion.g>
      ))}
    </svg>
  );
}

export function LightningIllustration() {
  return (
    <svg viewBox="0 0 320 200" fill="none" className="h-full w-full">
      <defs>
        <linearGradient id="ln-glow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={lime} stopOpacity="0.18" />
          <stop offset="100%" stopColor={lime} stopOpacity="0" />
        </linearGradient>
      </defs>

      <circle cx="160" cy="88" r="72" fill="url(#ln-glow)" />

      {/* npub identity chip */}
      <motion.g animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 2.8, repeat: Infinity }}>
        <rect x="88" y="42" width="144" height="34" rx="17" fill="#0f0f0f" stroke={border} strokeWidth="1.5" />
        <circle cx="112" cy="59" r="9" fill={lime} fillOpacity="0.15" stroke={lime} strokeWidth="1.5" />
        <path d="M108 59 a4 4 0 1 1 8 0 M112 63 v4" stroke={lime} strokeWidth="1.5" strokeLinecap="round" />
        <rect x="130" y="53" width="44" height="5" rx="2.5" fill={muted} fillOpacity="0.6" />
        <rect x="130" y="62" width="72" height="5" rx="2.5" fill={muted} fillOpacity="0.35" />
      </motion.g>

      {/* Bolt */}
      <motion.path
        d="M160 88 L146 122 H160 L148 156 L184 116 H168 L180 88 Z"
        fill={lime}
        animate={{ opacity: [0.85, 1, 0.85], scale: [1, 1.04, 1] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        style={{ transformOrigin: '160px 122px' }}
      />

      {/* Lightning address pill */}
      <motion.g
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2.4, repeat: Infinity }}
      >
        <rect x="76" y="150" width="168" height="28" rx="14" fill="#0f0f0f" stroke={lime} strokeOpacity="0.8" strokeWidth="1.5" />
        <text x="160" y="168" textAnchor="middle" fill={lime} fontSize="11" fontWeight="600" letterSpacing="0.04em">
          you@lacrypta.ar
        </text>
      </motion.g>

      {/* Pulses */}
      {[0, 0.5, 1].map((d, i) => (
        <motion.circle
          key={i}
          cx="160"
          cy="122"
          r="30"
          stroke={lime}
          strokeWidth="1"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: [0.5, 0], scale: [0.7, 1.6] }}
          transition={{ duration: 2, delay: d, repeat: Infinity }}
          style={{ transformOrigin: '160px 122px' }}
        />
      ))}
    </svg>
  );
}
