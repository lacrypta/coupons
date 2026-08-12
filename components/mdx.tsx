import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import {
  NostrConnectBanner,
  Nip98SignButton,
  BearerSessionCard,
  NostrAuthProvider,
} from './nostr-auth';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    NostrConnectBanner,
    Nip98SignButton,
    BearerSessionCard,
    NostrAuthProvider,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
