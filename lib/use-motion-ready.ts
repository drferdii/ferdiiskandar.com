'use client'

import { useSyncExternalStore } from 'react'

function subscribe() {
  return () => {}
}

export function useMotionReady() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
}
