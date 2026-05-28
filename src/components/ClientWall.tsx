'use client'

import React from 'react'

interface LogoItem {
  id: string
  content: React.ReactNode
}

// Logo Row 1
const ROW1_LOGOS: LogoItem[] = [
  { id: '1-1', content: <span className="font-extrabold tracking-tighter text-xl sm:text-2xl font-sans text-neutral-300">aiaiaiai™</span> },
  { 
    id: '1-2', 
    content: (
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-neutral-400"></span>
        <span className="font-semibold text-lg sm:text-xl font-sans text-neutral-300">Strobe™</span>
      </div>
    ) 
  },
  { id: '1-3', content: <span className="font-bold tracking-tight text-lg sm:text-xl font-serif text-neutral-300">Monolith™</span> },
  { 
    id: '1-4', 
    content: (
      <div className="flex items-center gap-2">
        <svg className="w-4 h-4 fill-neutral-400" viewBox="0 0 24 24">
          <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
        </svg>
        <span className="font-normal text-lg sm:text-xl font-serif tracking-wide text-neutral-300">Sophia</span>
      </div>
    ) 
  },
  { id: '1-5', content: <span className="font-bold tracking-widest uppercase text-xs sm:text-sm font-sans text-neutral-400">Vektor.co</span> },
  { 
    id: '1-6', 
    content: (
      <div className="flex items-center gap-1.5">
        <svg className="w-3.5 h-3.5 fill-white animate-pulse" viewBox="0 0 24 24">
          <path d="M12 2l2.4 7.2h7.6l-6.2 4.5 2.4 7.3-6.2-4.5-6.2 4.5 2.4-7.3-6.2-4.5h7.6z" />
        </svg>
        <span className="font-medium text-lg sm:text-xl font-mono text-neutral-300">Zenith</span>
      </div>
    ) 
  },
]

// Logo Row 2
const ROW2_LOGOS: LogoItem[] = [
  { id: '2-1', content: <span className="font-semibold tracking-[0.12em] uppercase text-base sm:text-lg font-sans text-neutral-300">Forerunner™</span> },
  { 
    id: '2-2', 
    content: (
      <div className="flex items-center gap-2">
        <svg className="w-4 h-4 text-neutral-400 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <path d="M12 2l8.66 5v10L12 22l-8.66-5V7z" />
        </svg>
        <span className="font-bold tracking-normal text-lg sm:text-xl font-sans text-neutral-300">Human.IN</span>
      </div>
    ) 
  },
  { 
    id: '2-3', 
    content: (
      <div className="flex items-center gap-1">
        <span className="font-serif italic font-bold text-xl sm:text-2xl text-neutral-400">&</span>
        <span className="font-sans font-bold text-lg sm:text-xl text-neutral-300">Fold™</span>
      </div>
    ) 
  },
  { id: '2-4', content: <span className="font-extrabold tracking-[0.15em] uppercase text-xs sm:text-sm font-sans text-neutral-300">Greyhound™</span> },
  { id: '2-5', content: <span className="font-light tracking-[0.2em] uppercase text-base sm:text-lg font-serif text-neutral-400">Aura</span> },
  { 
    id: '2-6', 
    content: (
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
        <span className="font-black tracking-tighter text-lg sm:text-xl font-mono text-neutral-300">Shift™</span>
      </div>
    ) 
  },
]

// Logo Row 3
const ROW3_LOGOS: LogoItem[] = [
  { id: '3-1', content: <span className="font-medium tracking-tight text-lg sm:text-xl font-sans text-neutral-300">For:Human™</span> },
  { 
    id: '3-2', 
    content: (
      <span 
        className="font-black tracking-wide uppercase text-xl sm:text-2xl font-sans"
        style={{
          WebkitTextStroke: '1px rgba(255, 255, 255, 0.45)',
          color: 'transparent',
        }}
      >
        Hollow
      </span>
    ) 
  },
  { id: '3-3', content: <span className="font-normal text-base sm:text-lg tracking-wide font-serif text-neutral-400">Halden Miller</span> },
  { id: '3-4', content: <span className="font-light tracking-wide text-lg sm:text-xl font-serif text-neutral-300">Hummingbird™</span> },
  { id: '3-5', content: <span className="font-medium tracking-normal text-lg sm:text-xl font-mono text-neutral-400">vapor.io</span> },
  { 
    id: '3-6', 
    content: (
      <div className="flex items-center gap-2">
        <svg className="w-4 h-4 text-blue-500 fill-current" viewBox="0 0 24 24">
          <polygon points="12,2 22,8.5 22,17.5 12,22 2,17.5 2,8.5" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <span className="font-bold tracking-tight text-lg sm:text-xl font-sans text-neutral-300">Nexus</span>
      </div>
    ) 
  },
]

export default function ClientWall() {
  // We duplicate the list to make scrolling infinite and seamless
  const duplicatedRow1 = [...ROW1_LOGOS, ...ROW1_LOGOS, ...ROW1_LOGOS]
  const duplicatedRow2 = [...ROW2_LOGOS, ...ROW2_LOGOS, ...ROW2_LOGOS]
  const duplicatedRow3 = [...ROW3_LOGOS, ...ROW3_LOGOS, ...ROW3_LOGOS]

  return (
    <section 
      className="relative w-full bg-[#050508] py-[100px] overflow-hidden flex flex-col justify-center select-none"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Dynamic Keyframe Animations for infinite looping marquee */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marqueeLeft {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.3333%, 0, 0);
          }
        }
        @keyframes marqueeRight {
          0% {
            transform: translate3d(-33.3333%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
        .animate-marquee-left {
          animation: marqueeLeft 38s linear infinite;
        }
        .animate-marquee-right {
          animation: marqueeRight 34s linear infinite;
        }
        .animate-marquee-left-slow {
          animation: marqueeLeft 44s linear infinite;
        }
      `}} />

      {/* Visual Accent Glow (Subtle ambient light behind heading) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#0052FF]/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 w-full text-center mb-16 relative z-10">
        <h2 
          className="text-white text-3xl sm:text-[2.8rem] lg:text-[3.4rem] font-headline font-black tracking-tight leading-tight select-none uppercase"
          style={{ letterSpacing: '-0.02em' }}
        >
          THIS COULD BE YOUR CLIENT WALL
        </h2>
        <div className="w-12 h-0.5 bg-neutral-800 mx-auto mt-4 rounded-full" />
      </div>

      {/* Marquee Rows Container */}
      <div className="flex flex-col gap-5 sm:gap-6 w-full overflow-hidden relative z-10">
        
        {/* Row 1: Leftward Marquee */}
        <div className="relative flex w-full overflow-hidden">
          <div className="flex gap-4 sm:gap-5 w-max animate-marquee-left will-change-transform py-1 px-2">
            {duplicatedRow1.map((logo, idx) => (
              <div 
                key={`r1-${logo.id}-${idx}`}
                className="h-16 sm:h-20 md:h-22 min-w-[180px] sm:min-w-[210px] md:min-w-[240px] px-8 sm:px-10 md:px-12 flex items-center justify-center rounded-xl sm:rounded-2xl border border-[#222226] bg-[#121214]/90 hover:bg-[#1a1a1e] hover:border-neutral-700 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer shadow-lg shadow-black/10 select-none"
              >
                {logo.content}
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Rightward Marquee (Opposing direction) */}
        <div className="relative flex w-full overflow-hidden">
          <div className="flex gap-4 sm:gap-5 w-max animate-marquee-right will-change-transform py-1 px-2">
            {duplicatedRow2.map((logo, idx) => (
              <div 
                key={`r2-${logo.id}-${idx}`}
                className="h-16 sm:h-20 md:h-22 min-w-[180px] sm:min-w-[210px] md:min-w-[240px] px-8 sm:px-10 md:px-12 flex items-center justify-center rounded-xl sm:rounded-2xl border border-[#222226] bg-[#121214]/90 hover:bg-[#1a1a1e] hover:border-neutral-700 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer shadow-lg shadow-black/10 select-none"
              >
                {logo.content}
              </div>
            ))}
          </div>
        </div>

        {/* Row 3: Leftward Marquee (Opposing, slower velocity) */}
        <div className="relative flex w-full overflow-hidden">
          <div className="flex gap-4 sm:gap-5 w-max animate-marquee-left-slow will-change-transform py-1 px-2">
            {duplicatedRow3.map((logo, idx) => (
              <div 
                key={`r3-${logo.id}-${idx}`}
                className="h-16 sm:h-20 md:h-22 min-w-[180px] sm:min-w-[210px] md:min-w-[240px] px-8 sm:px-10 md:px-12 flex items-center justify-center rounded-xl sm:rounded-2xl border border-[#222226] bg-[#121214]/90 hover:bg-[#1a1a1e] hover:border-neutral-700 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer shadow-lg shadow-black/10 select-none"
              >
                {logo.content}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
