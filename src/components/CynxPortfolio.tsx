'use client'

import { useState, useEffect, useRef } from 'react'

const PROJECTS = [
  {
    id: 1,
    title: 'JUSTDIGGIT | OUR WORLD',
    category: '2024 — Motion, Development',
    image: '/assets/featured/shot1.mp4',
  },
  {
    id: 2,
    title: 'AETHER | CYBERNETIC SPACE',
    category: '2025 — WebGL, Creative Direction',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'NOVALIS | ORGANIC IDENTITY',
    category: '2024 — Brand, Interactive Design',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'HELIOS | SOLAR SYSTEM UI',
    category: '2024 — Design, Hardware Sync',
    image: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'VELORIX | PRECISION ENGINE',
    category: '2026 — Motion, Tech Stack',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'KRYPTON | BLOCKCHAIN NODE',
    category: '2025 — Web3, Security Advisory',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 7,
    title: 'NEBULA | GENERATIVE AUDIO',
    category: '2024 — WebGL, Audio Synthesis',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 8,
    title: 'CHRONOS | KINETIC IDENTITY',
    category: '2026 — Motion, Creative Brand',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
  },
]

// Render 3 sets of projects to allow seamless infinite wrapping
const TRIPLE_PROJECTS = [...PROJECTS, ...PROJECTS, ...PROJECTS]
const N = PROJECTS.length // Original length (8)

export default function CynxPortfolio() {
  const [activeIndex, setActiveIndex] = useState(N) // Default to first item of the middle set

  // Dragging and animation physics states
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  // Physics animation variables
  const targetX = useRef(0)
  const currentX = useRef(0)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const dragStartX = useRef(0)

  // Desktop hover check vs mobile swipe snap
  const isHoveringCards = useRef(false)
  const activeIndexRef = useRef(N)
  const animationRef = useRef<number | null>(null)

  // Center the middle set of cards perfectly on load
  useEffect(() => {
    const centerTimer = setTimeout(() => {
      if (containerRef.current && trackRef.current) {
        const containerWidth = containerRef.current.clientWidth
        const cards = trackRef.current.children
        
        // Target card index N (the 9th card, first of the middle set)
        const targetCard = cards[N] as HTMLElement
        if (targetCard) {
          const centerPos = containerWidth / 2 - (targetCard.offsetLeft + targetCard.clientWidth / 2)
          targetX.current = centerPos
          currentX.current = centerPos
        }
      }
    }, 100)

    return () => clearTimeout(centerTimer)
  }, [])

  // Smooth animation physics and infinite loop wrapping
  useEffect(() => {
    const animatePhysics = () => {
      // 1. Lerp Carousel Drag Translation (0.08 damping creates a weighted feel)
      currentX.current += (targetX.current - currentX.current) * 0.08

      // 2. Infinite Wrapping Logic
      if (trackRef.current && containerRef.current) {
        const cards = trackRef.current.children
        if (cards.length >= 2 * N) {
          const containerWidth = containerRef.current.clientWidth
          const startMiddleCard = cards[N] as HTMLElement // start of middle set
          const endMiddleCard = cards[2 * N] as HTMLElement // start of last set

          if (startMiddleCard && endMiddleCard) {
            // One full set width
            const setWidth = endMiddleCard.offsetLeft - startMiddleCard.offsetLeft
            
            // Standard centered translate point for the middle set
            const baseCenterTranslate = containerWidth / 2 - (startMiddleCard.offsetLeft + startMiddleCard.clientWidth / 2)

            // If we drag too far left (scrolling right, translate decreases)
            if (currentX.current < baseCenterTranslate - setWidth) {
              currentX.current += setWidth
              targetX.current += setWidth
            }
            // If we drag too far right (scrolling left, translate increases)
            else if (currentX.current > baseCenterTranslate + setWidth) {
              currentX.current -= setWidth
              targetX.current -= setWidth
            }
          }
        }
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${currentX.current}px)`
      }

      // 3. Proximity-based snaps (only runs when the user is not actively hovering cards, e.g. mobile swipe or outer dragging)
      if (!isHoveringCards.current && trackRef.current && containerRef.current) {
        const containerCenter = containerRef.current.getBoundingClientRect().left + containerRef.current.clientWidth / 2
        const cards = trackRef.current.children
        let closestIndex = N
        let minDistance = Infinity

        for (let i = 0; i < cards.length; i++) {
          const card = cards[i] as HTMLElement
          const cardRect = card.getBoundingClientRect()
          const cardCenter = cardRect.left + cardRect.width / 2
          const distance = Math.abs(cardCenter - containerCenter)

          if (distance < minDistance) {
            minDistance = distance
            closestIndex = i
          }
        }

        if (closestIndex !== activeIndexRef.current) {
          activeIndexRef.current = closestIndex
          setActiveIndex(closestIndex)
        }
      }

      animationRef.current = requestAnimationFrame(animatePhysics)
    }

    animationRef.current = requestAnimationFrame(animatePhysics)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  // Mouse / Touch Drag Events
  const handleDragStart = (clientX: number) => {
    isDragging.current = true
    startX.current = clientX
    dragStartX.current = targetX.current
  }

  const handleDragMove = (clientX: number) => {
    if (!isDragging.current) return
    const deltaX = clientX - startX.current
    
    // Drag multiplier (1.25 for quick responsive feedback)
    targetX.current = dragStartX.current + deltaX * 1.25
  }

  const handleDragEnd = () => {
    isDragging.current = false
  }

  // Modulo index mapping back to original projects list
  const displayIndex = activeIndex % N

  return (
    <section
      className="relative w-full min-h-screen bg-[#050508] text-white flex flex-col justify-between py-[100px] px-6 sm:px-12 select-none overflow-hidden"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Dynamic Keyframe Animations for slide reveals */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes cynxSlideUp {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-cynx-slide-up {
          animation: cynxSlideUp 0.7s cubic-bezier(0.25, 1, 0.3, 1) forwards;
        }
      `}} />

      {/* 1. Header: Grand Editorial curator Headline */}
      <header className="w-full flex flex-col items-center justify-center text-center pt-4 pb-2 z-10">
        <span className="text-[#0052FF] text-[10px] font-mono font-bold tracking-[0.35em] uppercase mb-1.5 animate-pulse">
          // Selected Curation
        </span>
        <h2 className="text-white text-3xl sm:text-[2.6rem] lg:text-[3rem] font-headline font-black tracking-tight uppercase leading-tight select-none">
          Featured Works
        </h2>
        <div className="w-10 h-0.5 bg-white/10 mt-3 rounded-full" />
      </header>

      {/* 2. Horizontal Accordion Container (Viewport Overlap & Infinite Drag Loop) */}
      <div
        ref={containerRef}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={() => {
          handleDragEnd()
          isHoveringCards.current = false
        }}
        onTouchStart={(e) => e.touches[0] && handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => e.touches[0] && handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
        className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] flex-grow flex items-center justify-start py-6 cursor-grab active:cursor-grabbing overflow-visible"
      >
        {/* Horizontal sliding track (seamlessly looped) */}
        <div
          ref={trackRef}
          className="flex flex-row items-center gap-2 md:gap-3 select-none w-max will-change-transform"
          style={{ pointerEvents: 'auto' }}
        >
          {TRIPLE_PROJECTS.map((project, index) => {
            const isActive = index === activeIndex
            return (
              <div
                key={`${project.id}-${index}`}
                onMouseEnter={() => {
                  isHoveringCards.current = true
                  setActiveIndex(index)
                  activeIndexRef.current = index
                }}
                onMouseLeave={() => {
                  isHoveringCards.current = false
                }}
                className={`h-[48vh] min-h-[300px] lg:min-h-[460px] relative overflow-hidden rounded-none border-none shadow-none flex-shrink-0 transition-all duration-[750ms] cursor-pointer ${
                  isActive
                    ? 'w-[290px] sm:w-[460px] lg:w-[580px] z-20'
                    : 'w-[90px] sm:w-[130px] lg:w-[160px] z-10'
                }`}
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.3, 1)',
                }}
              >
                {/* Visual Cover Asset (Image or Video) - Full Color & Brightness */}
                {project.image.endsWith('.mp4') ? (
                  <video
                    src={project.image}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-[1200ms]"
                    style={{
                      transform: isActive ? 'scale(1.03)' : 'scale(1.15)',
                      transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.3, 1)',
                    }}
                  />
                ) : (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-[1200ms]"
                    style={{
                      transform: isActive ? 'scale(1.03)' : 'scale(1.15)',
                      transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.3, 1)',
                    }}
                    loading="eager"
                  />
                )}

                {/* Subtle vignette on active card */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
              </div>
            )
          })}
        </div>
      </div>

      {/* 3. Footer details (Left: Active title/category, Right: Pagination indices + Vertical bars menu) */}
      <footer className="w-full flex items-center justify-between text-white select-none z-10 pb-4">

        {/* Dynamic Project Title/Category Reveal (Left Aligned) */}
        <div className="flex flex-col text-left overflow-hidden h-[74px] sm:h-[84px] justify-center">
          <h2
            key={`title-${displayIndex}`}
            className="text-white text-xl sm:text-2xl lg:text-3xl font-headline font-black tracking-tight leading-none animate-cynx-slide-up select-none"
          >
            {PROJECTS[displayIndex].title}
          </h2>

          <p
            key={`cat-${displayIndex}`}
            className="text-white/50 text-[10px] sm:text-xs mt-2 font-mono tracking-[0.25em] uppercase animate-cynx-slide-up select-none"
            style={{ animationDelay: '0.05s' }}
          >
            {PROJECTS[displayIndex].category}
          </p>
        </div>

        {/* Dynamic Pagination / Pagination index info (Right Aligned) */}
        <div className="flex items-center gap-12 text-sm font-medium">
          <span
            key={`index-${displayIndex}`}
            className="opacity-40 animate-cynx-slide-up inline-block text-white"
          >
            {displayIndex + 1}
          </span>
          <span className="font-bold text-white">8</span>

          {/* Cynx standard 3 vertical bars menu icon */}
          <div className="flex flex-row gap-0.5 items-center justify-center h-4 cursor-pointer">
            <span className="w-0.5 h-3.5 bg-white" />
            <span className="w-0.5 h-3.5 bg-white" />
            <span className="w-0.5 h-3.5 bg-white" />
          </div>
        </div>
      </footer>
    </section>
  )
}
