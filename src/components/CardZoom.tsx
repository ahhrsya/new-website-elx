'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface CardZoomProps {
  children?: React.ReactNode
  cardBg?: string
  headline?: React.ReactNode
  subheadline?: React.ReactNode
}

export default function CardZoom({
  children,
  cardBg = '#ffffff',
  headline,
  subheadline,
}: CardZoomProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const zoomRef = useRef<HTMLDivElement>(null)
  const tiltRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const scrollProgressRef = useRef(0)

  useEffect(() => {
    if (!sectionRef.current || !stickyRef.current || !zoomRef.current || !tiltRef.current || !glareRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    // ── Unified Scroll-Driven Timeline (Zoom + Headline Fade + Scroll Word Reveal) ──
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onUpdate: (self) => {
            // Track the scroll progress in a ref to check in mouse events
            scrollProgressRef.current = self.progress

            // If card zoom has started (progress > 0.01), lock/disable 3D tilt instantly
            if (self.progress > 0.01) {
              gsap.to(tiltRef.current, {
                rotateX: 0,
                rotateY: 0,
                scale: 1.0,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                duration: 0.4,
                ease: 'power2.out',
                overwrite: 'auto',
              })
              gsap.to(glareRef.current, {
                opacity: 0,
                duration: 0.4,
                ease: 'power2.out',
              })
            }
          },
        },
      })

      // 1. Zoom and rotate the card element
      tl.fromTo(
        zoomRef.current,
        { scale: 0.3, rotate: -8, borderRadius: '2rem' },
        {
          scale: 1,
          rotate: 0,
          borderRadius: '0rem',
          ease: 'none',
        },
        0
      )

      // 2. Fade out headline (slides up slightly) as card zooms in
      tl.fromTo(
        '.velorix-header-fade',
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -40,
          ease: 'power1.out',
        },
        0
      )

      // 3. Fade out subheadline (slides down slightly) as card zooms in
      tl.fromTo(
        '.velorix-footer-fade',
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: 40,
          ease: 'power1.out',
        },
        0
      )

      // 4. Scroll-Linked Title Word Reveal:
      // Words animate from translucent 0.15 opacity to full bright white one-by-one
      // Starts at 35% of the scroll progress and completes around 65%
      tl.fromTo(
        '.velorix-word',
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.03,
          ease: 'none',
        },
        0.35
      )

      // 5. Scroll-Linked Paragraph Word Reveal:
      // Starts at 62% of the scroll progress and completes around 88%
      tl.fromTo(
        '.velorix-word-sub',
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.02,
          ease: 'none',
        },
        0.62
      )

      // 6. Watch It Unfold Button Fade & Slide Up:
      // Slides up cleanly from the bottom at the very end of the scroll (85% to 95%)
      tl.fromTo(
        '.velorix-btn-reveal',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
        },
        0.85
      )
    }, sectionRef)

    // ── Framer/Bundui Style Premium 3D Mouse Tilt & Lift Effect ─────────────
    const card = zoomRef.current // The zoom container acts as the card element
    const tilt = tiltRef.current
    const glare = glareRef.current
    const MAX_TILT = 8 // Very subtle, 8 degrees maximum tilt rotation for a clean premium feel

    // Set 3D perspective depth on the tilt wrapper
    gsap.set(tilt, { transformPerspective: 1200 })

    // quickSetter for high-performance style updates (dynamic glare radial gradient location)
    const setGlareX = gsap.quickSetter(glare, 'style', '--glare-x')
    const setGlareY = gsap.quickSetter(glare, 'style', '--glare-y')

    const handleMouseEnter = () => {
      // Deactivate tilt/lift entirely if card is sticky / zooming (progress > 0.01)
      if (scrollProgressRef.current > 0.01) return

      // 3D Lift: scale up by 5%, add soft subtle shadow, and fade in the glare reflection
      gsap.to(tilt, {
        scale: 1.05,
        boxShadow: '0 25px 45px rgba(0, 0, 0, 0.12)',
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto',
      })
      gsap.to(glare, {
        opacity: 0.7, // Subtle glare opacity for light mode
        duration: 0.3,
        ease: 'power1.out',
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Deactivate tilt entirely if card is sticky / zooming (progress > 0.01)
      if (scrollProgressRef.current > 0.01) return

      // Get the stable bounding box of the card
      const rect = card.getBoundingClientRect()
      
      // Calculate normalized mouse positions (-1 to +1) relative to the card's center
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const nx = (e.clientX - cx) / (rect.width / 2)
      const ny = (e.clientY - cy) / (rect.height / 2)

      // Clamp values between -1 and 1 to prevent extreme off-card tilt overshoot
      const clampedNx = Math.max(-1, Math.min(1, nx))
      const clampedNy = Math.max(-1, Math.min(1, ny))
      
      // Rotate the card in 3D based on clamped coordinates
      gsap.to(tilt, {
        rotateY: clampedNx * MAX_TILT,
        rotateX: -clampedNy * MAX_TILT,
        duration: 0.45,
        ease: 'power2.out',
        overwrite: 'auto',
      })

      // Calculate percentage positions (0% to 100%) for glare tracking inside the card
      const px = ((e.clientX - rect.left) / rect.width) * 100
      const py = ((e.clientY - rect.top) / rect.height) * 100
      
      setGlareX(`${px}%`)
      setGlareY(`${py}%`)
    }

    const handleMouseLeave = () => {
      // Deactivate mouse leave reset if card is sticky / zooming (progress > 0.01)
      if (scrollProgressRef.current > 0.01) return

      // Restore card back to neutral flat state, normal scale, and subtle shadow
      gsap.to(tilt, {
        rotateX: 0,
        rotateY: 0,
        scale: 1.0,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
        duration: 0.55,
        ease: 'power2.out',
        overwrite: 'auto',
      })
      
      // Fade out glare reflection
      gsap.to(glare, {
        opacity: 0,
        duration: 0.45,
        ease: 'power2.out',
      })
    }

    // Attach native event listeners directly to the card
    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      ctx.revert()
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '300vh',
        backgroundColor: '#DFDFF2', // Light lavender theme background for Section 2
      }}
    >
      {/* Sticky viewport */}
      <div
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '100px 2rem',
          overflow: 'hidden',
        }}
      >
        {/* Headline at the top of the viewport */}
        {headline && (
          <div
            className="velorix-header-fade z-10"
            style={{
              textAlign: 'center',
              willChange: 'transform, opacity',
            }}
          >
            {headline}
          </div>
        )}

        {/* Zoom layer: Controlled 1:1 by ScrollTrigger */}
        <div
          ref={zoomRef}
          style={{
            width: '100vw',
            height: '100vh',
            willChange: 'transform',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'visible', // Crucial to prevent 3D flattening/clipping
            perspective: '1200px', // Crucial: sets 3D depth perspective for child elements
            transformStyle: 'preserve-3d',
            position: 'absolute',
            inset: 0,
            zIndex: 0, // Behind relative header/footer overlays but covers them on scale 1.0!
          }}
        >
          {/* Tilt layer: Rotated in 3D using mouse coordinates */}
          <div
            ref={tiltRef}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: cardBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transformStyle: 'preserve-3d',
              position: 'relative',
              willChange: 'transform',
              borderRadius: 'inherit', // Inherits border radius (2rem -> 0rem) from zoomRef
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)', // Subtle light mode shadow
            }}
          >
            {/* Dynamic Glare Overlay */}
            <div
              ref={glareRef}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255, 255, 255, 0.25) 0%, transparent 55%)',
                pointerEvents: 'none',
                opacity: 0,
                zIndex: 2,
                mixBlendMode: 'overlay',
                borderRadius: 'inherit',
              }}
            />

            {/* Parallax Container */}
            <div
              style={{
                width: '100%',
                height: '100%',
                transform: 'translateZ(75px)',
                transformStyle: 'preserve-3d',
                zIndex: 1,
              }}
            >
              {children}
            </div>
          </div>
        </div>

        {/* Sub-headline below the card */}
        {subheadline && (
          <div
            className="velorix-footer-fade z-10"
            style={{
              textAlign: 'center',
              willChange: 'transform, opacity',
            }}
          >
            {subheadline}
          </div>
        )}
      </div>
    </section>
  )
}
