'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ChevronDown } from 'lucide-react'
import Preloader from '@/components/Preloader'
import CardZoom from '@/components/CardZoom'
import VelorixPage from '@/components/VelorixPage'
import ParticleSphere from '@/components/ParticleSphere'
import CynxPortfolio from '@/components/CynxPortfolio'
import ProblemToSolution from '@/components/ProblemToSolution'
import ClientWall from '@/components/ClientWall'
import OurProcess from '@/components/OurProcess'

gsap.registerPlugin(ScrollTrigger)

const NAV_ITEMS = [
  { name: 'Homepages', hasDropdown: true },
  { name: 'About', hasDropdown: true },
  { name: 'Case studies', hasDropdown: false },
  { name: 'Other', hasDropdown: true },
  { name: 'Template', hasDropdown: true },
]

export default function DemoPage() {
  const [preloaderDone, setPreloaderDone] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  // Hero text entrance after preloader completes
  useEffect(() => {
    if (!preloaderDone || !heroRef.current) return

    const tl = gsap.timeline()

    tl.from('.hero-nav-item', {
      opacity: 0,
      y: -20,
      duration: 0.8,
      stagger: 0.08,
      ease: 'power3.out',
    })
      .from(
        '.hero-left-reveal',
        {
          opacity: 0,
          x: -40,
          duration: 1.0,
          stagger: 0.12,
          ease: 'power4.out',
        },
        '-=0.5'
      )
      .from(
        '.hero-right-canvas',
        {
          opacity: 0,
          scale: 0.8,
          duration: 1.2,
          ease: 'power3.out',
        },
        '-=0.8'
      )
  }, [preloaderDone])

  return (
    <>
      {!preloaderDone && (
        <Preloader
          onComplete={() => setPreloaderDone(true)}
        />
      )}

      {/* The main container MUST be fully visible (no opacity: 0)
          so it can be seen through the preloader's SVG mask cut-out hole. */}
      <div
        data-theme="dark"
        style={{
          backgroundColor: '#050508', // Premium deep darkmode background
          color: '#ffffff',
          position: 'relative',
        }}
      >
        {/* ── Consult-AI Darkmode Hero Section ───────────────────────────── */}
        <section
          ref={heroRef}
          className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden"
          style={{
            // Glowing radial gradient behind the Three.js sphere on the right
            background: 'radial-gradient(circle at 75% 50%, rgba(0, 82, 255, 0.1) 0%, transparent 60%)',
          }}
        >
          {/* Header Navigation */}
          <header className="hero-nav-item w-full flex items-center justify-between px-6 py-5 lg:px-12 lg:py-6 z-50">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer">
              <span className="text-white text-xl font-bold tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
                consult
              </span>
              <span className="text-[#0052FF] text-xl font-bold tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
                — ai
              </span>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-7">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.name}
                  href="#"
                  className="flex items-center gap-1 text-white/70 hover:text-white text-sm font-medium transition-colors duration-200"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {item.name}
                  {item.hasDropdown && <ChevronDown size={14} className="opacity-60" />}
                </a>
              ))}
            </nav>

            {/* Buy Template CTA Button */}
            <button
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-medium transition-all duration-300 hover:opacity-90 hover:scale-[1.03] group cursor-pointer"
              style={{
                fontFamily: 'Inter, sans-serif',
                backgroundColor: '#0052FF',
                boxShadow: '0 4px 15px rgba(0, 82, 255, 0.25)',
              }}
            >
              Buy template
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white text-[#0052FF] transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight size={12} strokeWidth={2.5} />
              </span>
            </button>
          </header>

          {/* Hero Content Body (Grid Split) */}
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 flex-grow flex flex-col lg:flex-row items-center justify-between gap-12 py-10 lg:py-0 z-20">
            
            {/* Left Column: Staggered text content */}
            <div className="w-full lg:w-1/2 flex flex-col items-start text-left gap-6">
              
              {/* Award Tag pill */}
              <div
                className="hero-left-reveal flex items-center px-4 py-1.5 rounded-md border-l-2 border-r-2 border-[#0052FF] bg-[#0052FF]/5"
                style={{ willChange: 'transform, opacity' }}
              >
                <span
                  className="text-white/80 text-[10px] sm:text-xs font-mono uppercase tracking-[0.1em]"
                  style={{ letterSpacing: '0.1em' }}
                >
                  awarded the most influential company of 2024
                </span>
              </div>

              {/* Headline */}
              <h1
                className="hero-left-reveal text-white font-headline font-extrabold tracking-tight leading-[1.08]"
                style={{
                  fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
                  willChange: 'transform, opacity',
                }}
              >
                WHERE AI TECH
                <br />
                <span className="text-[#0052FF]">MEETS CONSULTING</span>
              </h1>

              {/* Subtitle description paragraph */}
              <p
                className="hero-left-reveal text-white/60 text-sm sm:text-base leading-relaxed max-w-lg"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  willChange: 'transform, opacity',
                }}
              >
                Consult Ai offers the highest quality consulting services in the area of technology and business. We merge artificial intelligence and strategic advisory into one unified growth engine.
              </p>

              {/* Learn More Button */}
              <button
                className="hero-left-reveal mt-2 flex items-center gap-2.5 px-6 py-3 rounded-full text-white text-sm font-semibold transition-all duration-300 hover:opacity-90 hover:scale-[1.03] group cursor-pointer"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  backgroundColor: '#0052FF',
                  willChange: 'transform, opacity',
                  boxShadow: '0 4px 15px rgba(0, 82, 255, 0.25)',
                }}
              >
                learn more
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white text-[#0052FF] transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight size={12} strokeWidth={2.5} />
                </span>
              </button>
            </div>

            {/* Right Column: Three.js Canvas Container with stable pixel sizing */}
            <div className="hero-right-canvas w-full lg:w-1/2 flex items-center justify-center relative">
              <div className="w-[350px] h-[350px] sm:w-[420px] sm:h-[420px] lg:w-[480px] lg:h-[480px] relative">
                <ParticleSphere />
              </div>
            </div>
          </div>

          {/* Simple scroll indicator footer */}
          <footer className="hero-nav-item w-full py-6 flex justify-center text-xs text-white/35 font-mono tracking-widest uppercase">
            ▼ Scroll down to engage system interface ▼
          </footer>
        </section>

        {/* ── Client Logo Wall Section ───────────────────────────────────── */}
        <ClientWall />

        {/* ── Section 2: Card Zoom ───────────────────────────────────────── */}
        <CardZoom
          cardBg="#080808" // Dark card background for premium contrast
          headline={
            <div className="flex flex-col items-center">
              <p
                className="text-black/40 uppercase tracking-[0.25em] text-[10px] font-mono"
                style={{ letterSpacing: '0.25em' }}
              >
                // PROTOCOL CORE SETUP
              </p>
              <h2
                className="text-black text-2xl sm:text-3xl font-headline font-light leading-tight mt-2 uppercase tracking-tight max-w-lg"
                style={{ letterSpacing: '-0.01em' }}
              >
                THE VELORIX INTERFACE
              </h2>
            </div>
          }
          subheadline={
            <div className="flex flex-col items-center animate-pulse">
              <p
                className="text-black/45 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.25em]"
                style={{ letterSpacing: '0.25em' }}
              >
                ▲ Scroll to breach connection link ▲
              </p>
            </div>
          }
        >
          <VelorixPage />
        </CardZoom>

        {/* ── Section 3: Cynx Featured Portfolio (Accordian Showcase) ────── */}
        <CynxPortfolio />

        {/* ── Section 4: Problem to Solution Showcase ────────────────────── */}
        <ProblemToSolution />

        {/* ── Section 5: Our Process ─────────────────────────────────────── */}
        <OurProcess />
      </div>
    </>
  )
}
