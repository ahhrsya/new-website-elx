'use client'

import { ArrowRight } from 'lucide-react'

const BG_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_155101_f2540600-6fe9-433e-8e48-b3f4b72f0727.mp4'

const TITLE_TEXT = 'WHERE PRECISION FINDS ITS EDGE AND VISION REWRITES WHAT COMES NEXT'
const SUB_TEXT = 'a seamless bridge - where raw ambition and machine clarity converge as one'

export default function VelorixPage() {
  return (
    <div
      className="relative w-full h-full min-h-screen bg-black flex flex-col justify-between py-6 px-5 sm:px-8 overflow-y-auto"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* 1. Video Player Container: Elegant, top-aligned framed video */}
      <div className="w-full flex-grow-0 flex items-center justify-center pt-4 z-10">
        <div className="w-full max-w-2xl aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950">
          <video
            className="w-full h-full object-cover"
            src={BG_VIDEO}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </div>

      {/* 2. Content Area: Clean darkmode typography with scroll-reveal words */}
      <div className="relative z-10 w-full flex-grow flex flex-col justify-center items-center text-center max-w-3xl mx-auto my-6 gap-6">
        
        {/* h1: Words split and styled with initial 0.15 opacity */}
        <h1
          className="text-white font-headline font-normal leading-[1.18] tracking-tight text-center"
          style={{
            fontSize: 'clamp(1.5rem, 4.5vw, 2.3rem)',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            willChange: 'transform, opacity',
          }}
        >
          {TITLE_TEXT.split(' ').map((word, i) => (
            <span
              key={i}
              className="velorix-word inline-block mr-2 select-none"
              style={{
                opacity: 0.15,
                willChange: 'opacity',
              }}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* p: Words split and styled with initial 0.15 opacity */}
        <p
          className="mt-1 text-white/50 text-xs sm:text-sm leading-relaxed max-w-md mx-auto text-center"
          style={{
            fontFamily: "'Courier New', Courier, monospace",
            letterSpacing: '0.01em',
            textShadow: '0 1px 5px rgba(0,0,0,0.5)',
            willChange: 'transform, opacity',
          }}
        >
          {SUB_TEXT.split(' ').map((word, i) => (
            <span
              key={i}
              className="velorix-word-sub inline-block mr-1.5 select-none"
              style={{
                opacity: 0.15,
                willChange: 'opacity',
              }}
            >
              {word}
            </span>
          ))}
        </p>

        {/* button: Fades in and slides up at the end of the text reveal */}
        <button
          className="velorix-btn-reveal mt-3 flex items-center gap-2.5 px-6 py-2.5 rounded-full text-black text-sm font-medium transition-all duration-300 hover:opacity-90 hover:scale-[1.03] group cursor-pointer"
          style={{
            fontFamily: 'Inter, sans-serif',
            backgroundColor: '#ffffff',
            opacity: 0,
            willChange: 'transform, opacity',
          }}
        >
          Watch it unfold
          <ArrowRight
            size={15}
            className="group-hover:translate-x-0.5 transition-transform duration-200"
          />
        </button>
      </div>

      {/* 3. Footer info/attribution */}
      <div className="relative z-10 w-full py-2 text-center text-[10px] text-white/30 tracking-wider font-mono">
        VELORIX CORE v1.0.2 // PRECISION EDGE SYSTEM
      </div>
    </div>
  )
}
