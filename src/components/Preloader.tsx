'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useLenis } from '@/components/LenisProvider'

const LOGO_TOP_PATH =
  'm338.88,214.91H0L617.26,0l-246.08,384.58-32.32-169.69.02.02Z'
const LOGO_BOTTOM_PATH =
  'm321.14,444.52h338.87L42.75,659.99l246.07-385.58,32.32,170.13v-.02Z'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const maskGroupRef = useRef<SVGGElement>(null)
  const logoGroupRef = useRef<SVGGElement>(null)
  const [visible, setVisible] = useState(true)
  const lenis = useLenis()

  useEffect(() => {
    // Disable scrolling when preloader starts
    lenis?.stop()
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    if (!maskGroupRef.current || !logoGroupRef.current || !containerRef.current) {
      return
    }

    const tl = gsap.timeline({
      onComplete: () => {
        // Re-enable scrolling when preloader finishes
        lenis?.start()
        document.documentElement.style.overflow = ''
        document.body.style.overflow = ''
        setVisible(false)
        onComplete()
      },
    })

    // Initial state: centered, normal size (scale: 0.15) and invisible (opacity: 0)
    gsap.set([maskGroupRef.current, logoGroupRef.current], {
      transformOrigin: '330.5px 330px',
      scale: 0.15,
      opacity: 0,
    })

    tl
      // Step 1: Smoothly fade in the black logo and the mask hole to normal size
      .to([maskGroupRef.current, logoGroupRef.current], {
        opacity: 1,
        duration: 0.9,
        ease: 'power2.out',
      })

      // Step 2: Hold the logo at normal size for a premium breath moment
      .to({}, { duration: 0.4 })

      // Step 3: Zoom in the mask hole and black logo together massively
      .to([maskGroupRef.current, logoGroupRef.current], {
        scale: 25,
        duration: 2.2,
        ease: 'power4.inOut',
      })

      // Step 4: Fade out the black logo during the zoom to reveal the hero section underneath
      .to(logoGroupRef.current, {
        opacity: 0,
        duration: 1.1,
        ease: 'power2.out',
      }, '-=1.6')

      // Step 5: Smoothly fade out the rest of the white overlay at the end
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
      }, '-=0.5')

    return () => {
      // Ensure scroll is re-enabled on unmount/cleanup
      lenis?.start()
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      tl.kill()
    }
  }, [onComplete, lenis])

  if (!visible) return null

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 100,
        pointerEvents: 'none',
      }}
    >
      <svg
        width="100%"
        height="100%"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <defs>
          {/* Mask that defines the visibility of the white overlay.
              White (#ffffff) = visible white overlay.
              Black (#000000) = transparent hole (revealing the hero section behind). */}
          <mask id="preloader-mask">
            <rect width="100%" height="100%" fill="#ffffff" />
            
            {/* Nested SVG positioned at center 50% 50% of the screen.
                We apply a translation of -330.5, -330 so the center of the Z logo is exactly at the screen center. */}
            <svg x="50%" y="50%" overflow="visible">
              <g
                ref={maskGroupRef}
                transform="translate(-330.5, -330)"
              >
                <path d={LOGO_TOP_PATH} fill="#000000" />
                <path d={LOGO_BOTTOM_PATH} fill="#000000" />
              </g>
            </svg>
          </mask>
        </defs>

        {/* White screen overlay, masked with our preloader mask */}
        <rect
          width="100%"
          height="100%"
          fill="#ffffff"
          mask="url(#preloader-mask)"
        />
      </svg>

      {/* Black logo overlay that covers the mask hole initially so it looks like a solid black logo on white.
          Fades out as it zooms to reveal the hero section below. */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          viewBox="0 0 661 660"
          style={{
            width: '661px',
            height: '660px',
            overflow: 'visible',
          }}
        >
          <g
            ref={logoGroupRef}
          >
            <path d={LOGO_TOP_PATH} fill="#000000" />
            <path d={LOGO_BOTTOM_PATH} fill="#000000" />
          </g>
        </svg>
      </div>
    </div>
  )
}
