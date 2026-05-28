'use client'

import { useState, useEffect, useRef } from 'react'
import { Play, Pause, Volume2, Maximize, ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const SCENARIOS = [
  {
    id: 1,
    num: '01',
    tag: 'You are short on hands',
    title: "YOU NEED TO SHIP FAST, BUT YOUR TEAM'S AT CAPACITY.",
    desc: 'We step in with clear ownership from UX to build-ready UI. You get focused sprints, fast feedback, and delivery that keeps your roadmap moving without delays.',
    cta: 'Extend my team',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop',
    duration: '2:15',
    bg: 'bg-[#0D0D14]',
  },
  {
    id: 2,
    num: '02',
    tag: 'Adoption is slowing down',
    title: "YOU'RE GROWING, BUT UX FRICTION IS HOLDING USERS BACK.",
    desc: "We run an audit to identify what's breaking the experience, then redesign the flows that matter most so users move faster and your product scales cleanly. Less friction, faster adoption, and a UX system your team can build on.",
    cta: 'Redesign my product',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=600&auto=format&fit=crop',
    duration: '3:40',
    bg: 'bg-[#09090E]',
  },
  {
    id: 3,
    num: '03',
    tag: 'You need an MVP',
    title: "YOU NEED AN MVP THAT'S CREDIBLE ENOUGH TO LAUNCH, SELL, OR RAISE.",
    desc: 'We cut scope to what matters, design for trust, and ship a launch-ready MVP without wasted cycles. Clear UX, solid UI, and build support to get you live.',
    cta: 'Ship my mvp',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=600&auto=format&fit=crop',
    duration: '1:58',
    bg: 'bg-[#07070B]',
  },
  {
    id: 4,
    num: '04',
    tag: 'You need funding',
    title: "THE STORY IS STRONG, BUT THE PRODUCT DOESN'T FEEL INVESTOR-READY.",
    desc: 'We design the surfaces that signal credibility fast, so you look ready when it counts. You get pitch-ready flows, sharper product pages, and a product experience that feels fundable.',
    cta: 'Polish for investors',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop',
    duration: '2:45',
    bg: 'bg-[#050508]',
  },
]

export default function ProblemToSolution() {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  const togglePlay = (index: number) => {
    if (playingIndex === index) {
      setPlayingIndex(null)
    } else {
      setPlayingIndex(index)
    }
  }

  // Smooth click scroll to center a specific stacked card
  const scrollToCard = (index: number) => {
    if (!triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const triggerStart = rect.top + scrollTop
    const triggerHeight = triggerRef.current.clientHeight

    // Scroll targets driven by timeline triggers
    const targetScroll = triggerStart + triggerHeight * (index / 3) * 0.78
    window.scrollTo({ top: targetScroll, behavior: 'smooth' })
  }

  // Setup GSAP ScrollTrigger Pinned Stacking (staggered shifts changed to 16px increments to prevent collisions)
  useEffect(() => {
    if (!triggerRef.current) return

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[]
    
    // Set initial off-screen offsets for layered cards
    gsap.set(cards.slice(1), { y: '100vh' })

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        }
      })

      // Step 1: Card 2 slides up, Card 1 scales down & dims & shifts slightly up
      tl.to(cards[1], { y: '0px', ease: 'power1.inOut' }, 0)
      tl.to(cards[0], { 
        scale: 0.95, 
        y: '-16px', 
        opacity: 0.85, 
        filter: 'brightness(0.65) blur(0.5px)', 
        ease: 'power1.inOut' 
      }, 0)

      // Step 2: Card 3 slides up, Card 2 scales & shifts, Card 1 scales & shifts further
      tl.to(cards[2], { y: '0px', ease: 'power1.inOut' }, 1)
      tl.to(cards[1], { 
        scale: 0.95, 
        y: '-16px', 
        opacity: 0.85, 
        filter: 'brightness(0.65) blur(0.5px)', 
        ease: 'power1.inOut' 
      }, 1)
      tl.to(cards[0], { 
        scale: 0.90, 
        y: '-32px', 
        opacity: 0.70, 
        filter: 'brightness(0.45) blur(1px)', 
        ease: 'power1.inOut' 
      }, 1)

      // Step 3: Card 4 slides up, Card 3 scales/shifts, Card 2 scales/shifts, Card 1 scales/shifts further
      tl.to(cards[3], { y: '0px', ease: 'power1.inOut' }, 2)
      tl.to(cards[2], { 
        scale: 0.95, 
        y: '-16px', 
        opacity: 0.85, 
        filter: 'brightness(0.65) blur(0.5px)', 
        ease: 'power1.inOut' 
      }, 2)
      tl.to(cards[1], { 
        scale: 0.90, 
        y: '-32px', 
        opacity: 0.70, 
        filter: 'brightness(0.45) blur(1px)', 
        ease: 'power1.inOut' 
      }, 2)
      tl.to(cards[0], { 
        scale: 0.85, 
        y: '-48px', 
        opacity: 0.55, 
        filter: 'brightness(0.25) blur(1.5px)', 
        ease: 'power1.inOut' 
      }, 2)

    }, triggerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={triggerRef}
      className="relative w-full h-[360vh] bg-[#FFFFFF] text-black select-none"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Viewport-Pinned Sticky Frame (py-12 changed to py-[100px]) */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-start py-[100px] px-6 sm:px-12 overflow-hidden bg-[#FFFFFF]">
        
        {/* 1. Header: Curator Editorial Title */}
        <header className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center text-center pb-4 z-10">
          <span className="text-[#0052FF] text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] uppercase mb-1.5 animate-pulse">
            // Problem to Solution
          </span>
          <h2 className="text-black font-headline font-black select-none max-w-6xl">
            BUILDING IS HARD. THE RIGHT
            <br />
            PARTNER MAKES IT SIMPLER AND
            <br />
            FASTER.
          </h2>
          <p className="text-black/60 text-xs sm:text-sm max-w-xl mx-auto mt-5 leading-relaxed font-medium">
            Pick the situation you're in. These are the most common founder cases, and the fastest path to get it shipped.
          </p>
        </header>

        {/* 2. Absolute Stacking Cards Container (height compact to prevent subtitle collisions) */}
        <div className="w-full max-w-5xl h-[48vh] min-h-[380px] lg:h-[45vh] mx-auto relative flex items-center justify-center mt-8 sm:mt-12">
          {SCENARIOS.map((item, index) => {
            const isPlaying = playingIndex === item.id
            
            return (
              <div 
                key={item.id}
                ref={(el) => { cardsRef.current[index] = el }}
                className={`absolute inset-0 w-full ${item.bg} text-white rounded-[2rem] border border-white/5 shadow-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 overflow-hidden will-change-transform`}
                style={{
                  zIndex: (index + 1) * 10,
                  transformOrigin: 'top center',
                }}
              >
                {/* Left Column: Text description and clean white hover button */}
                <div className="w-full lg:w-[48%] flex flex-col items-start text-left gap-3.5 z-10">
                  <div className="flex items-center gap-4">
                    <span className="text-[11px] sm:text-xs font-mono font-bold px-2 py-0.5 rounded border border-white/10 bg-white/5 text-white/50">
                      {item.num}
                    </span>
                    <span className="text-[#0052FF] text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] uppercase">
                      {item.tag}
                    </span>
                  </div>
                  
                  <h3 className="text-white text-lg sm:text-xl lg:text-[1.55rem] font-headline font-black leading-tight tracking-tight">
                    {item.title}
                  </h3>
                  
                  <p className="text-white/70 text-[11px] sm:text-[13px] leading-relaxed font-medium max-w-xl">
                    {item.desc}
                  </p>
                  
                  <button
                    onClick={() => scrollToCard((index + 1) % SCENARIOS.length)} // Anchors and scrolls to next card
                    className="mt-1 flex items-center gap-2.5 px-5 py-2.5 rounded-full text-black text-[9px] sm:text-[11px] font-bold uppercase tracking-widest transition-all duration-300 hover:scale-[1.03] bg-white hover:bg-white/90 shadow-lg shadow-black/10 group cursor-pointer"
                  >
                    {item.cta}
                    <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#0052FF] text-white transition-transform duration-300 group-hover:translate-x-0.5">
                      <ArrowRight size={10} strokeWidth={3} />
                    </span>
                  </button>
                </div>

                {/* Right Column: Premium Mock Video Player */}
                <div className="w-full lg:w-[48%] flex items-center justify-center z-10">
                  <div 
                    onClick={() => togglePlay(item.id)}
                    className="w-full max-w-[400px] aspect-video relative rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-zinc-950 group cursor-pointer"
                  >
                    {/* High-res Unsplash Presenter Image */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className={`w-full h-full object-cover select-none pointer-events-none transition-all duration-700 ${
                        isPlaying ? 'scale-105 brightness-[35%]' : 'group-hover:scale-[1.02] brightness-90'
                      }`}
                    />
                    
                    {/* Subtle vignette layer */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />

                    {/* Centered Translucent Play/Pause Button */}
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <button 
                        className={`w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 transition-all duration-300 shadow-lg cursor-pointer ${
                          isPlaying 
                            ? 'scale-90 bg-white/20 border-white/30' 
                            : 'group-hover:scale-110 group-hover:bg-white/20 group-hover:border-white/30'
                        }`}
                      >
                        {isPlaying ? (
                          <Pause size={16} fill="currentColor" className="text-white" />
                        ) : (
                          <Play size={16} fill="currentColor" className="ml-0.5 text-white" />
                        )}
                      </button>
                    </div>

                    {/* Play Active Visuals: Animated Wave Overlay */}
                    {isPlaying && (
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md text-[9px] font-mono tracking-widest text-[#0052FF] flex items-center gap-1.5 uppercase font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0052FF] animate-ping" />
                        <span>Live Presentation</span>
                      </div>
                    )}

                    {/* Video Control Bar (Reveals on Hover) */}
                    <div 
                      className={`absolute bottom-0 inset-x-0 h-10 bg-black/55 backdrop-blur-sm px-3 flex items-center justify-between z-20 transition-all duration-300 ${
                        isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                      onClick={(e) => e.stopPropagation()} // Prevents toggling play when clicking controls
                    >
                      {/* Left: Play status / Timer */}
                      <div className="flex items-center gap-2.5">
                        <button 
                          onClick={() => togglePlay(item.id)}
                          className="text-white hover:text-[#0052FF] transition-colors"
                        >
                          {isPlaying ? <Pause size={10} fill="currentColor" /> : <Play size={10} fill="currentColor" />}
                        </button>
                        <span className="text-[9px] text-white/85 font-mono">
                          {isPlaying ? '0:14' : '0:00'} / {item.duration}
                        </span>
                      </div>

                      {/* Center: Flat seekbar progress */}
                      <div className="flex-grow mx-3 h-0.5 bg-white/20 rounded-full overflow-hidden relative cursor-pointer">
                        <div 
                          className={`h-full bg-[#0052FF] rounded-full transition-all duration-[600ms] ${
                            isPlaying ? 'w-[32%] animate-pulse' : 'w-0'
                          }`} 
                        />
                      </div>

                      {/* Right: Controls */}
                      <div className="flex items-center gap-2.5">
                        <Volume2 size={10} className="text-white hover:text-[#0052FF] cursor-pointer transition-colors" />
                        <Maximize size={10} className="text-white hover:text-[#0052FF] cursor-pointer transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* 3. Footer indicator */}
        <footer className="w-full flex justify-center text-[10px] text-black/35 font-mono tracking-widest uppercase mt-6">
          ▲ Scroll to stack solution cards ▲
        </footer>
      </div>
    </section>
  )
}
