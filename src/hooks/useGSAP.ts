import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * Custom hook yang otomatis cleanup GSAP context saat komponen unmount.
 * Gunakan ini sebagai pengganti useEffect untuk semua GSAP animations.
 */
export function useGSAPEffect(
  callback: (context: gsap.Context) => void,
  deps: React.DependencyList = []
) {
  const contextRef = useRef<gsap.Context | null>(null)
  const containerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    contextRef.current = gsap.context(() => {
      callback(contextRef.current!)
    }, containerRef)

    return () => {
      contextRef.current?.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return containerRef
}
