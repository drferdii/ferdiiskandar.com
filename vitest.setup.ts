import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

vi.mock('framer-motion', async () => {
  const React = await import('react')
  type MotionElementProps = {
    children?: React.ReactNode
    className?: string
    style?: React.CSSProperties
    id?: string
    role?: string
  } & Record<string, unknown>

  const makeMotion = (tag: string) =>
    React.forwardRef(function MotionEl(
      { children, className, style, id, role, ...rest }: MotionElementProps,
      ref: React.Ref<unknown>,
    ) {
      const htmlAttrs: Record<string, unknown> = {}
      for (const [key, val] of Object.entries(rest)) {
        if (
          key.startsWith('data-') ||
          key.startsWith('aria-') ||
          ['href', 'target', 'rel', 'onClick', 'onKeyDown', 'tabIndex'].includes(key)
        ) {
          htmlAttrs[key] = val
        }
      }
      return React.createElement(tag, { className, style, id, role, ref, ...htmlAttrs }, children)
    })

  const tags = [
    'div',
    'span',
    'p',
    'h1',
    'h2',
    'h3',
    'h4',
    'section',
    'article',
    'aside',
    'header',
    'footer',
    'ul',
    'li',
    'a',
    'nav',
    'main',
    'blockquote',
    'time',
    'figure',
  ]
  const motion = Object.fromEntries(tags.map((tag) => [tag, makeMotion(tag)]))

  return {
    motion,
    m: motion,
    LazyMotion: ({ children }: { children: React.ReactNode }) => children,
    domAnimation: {},
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    useReducedMotion: () => false,
    useInView: () => true,
    useScroll: () => ({ scrollY: 0, scrollYProgress: 0 }),
    useTransform: () => 0,
    useMotionValue: (v: unknown) => v,
    useAnimation: () => ({ start: vi.fn(), stop: vi.fn() }),
  }
})

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})

Element.prototype.scrollIntoView = vi.fn()

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: MockIntersectionObserver,
})
