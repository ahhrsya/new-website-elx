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
        {/* ── Light Editorial Hero Section ─────────────────────────────── */}
        <section
          ref={heroRef}
          className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden border-y border-[#ded8ca]"
          style={{
            backgroundColor: '#f3efe5',
            color: '#0b0a07',
          }}
        >
          {/* Header Navigation */}
          <header className="hero-nav-item w-full flex items-center justify-between px-6 py-5 lg:px-14 lg:py-7 z-50 border-b border-[#ded8ca]">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer">
              <span className="text-[#0b0a07] text-xl font-bold tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
                elux
              </span>
              <span className="text-[#3152FF] text-xl font-bold tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
                — ai
              </span>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-7">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.name}
                  href="#"
                  className="flex items-center gap-1 text-[#0b0a07]/55 hover:text-[#0b0a07] text-sm font-medium transition-colors duration-200"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {item.name}
                  {item.hasDropdown && <ChevronDown size={14} className="opacity-60" />}
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <button
              className="flex items-center gap-2 px-5 py-2.5 text-white text-sm font-bold uppercase transition-all duration-300 hover:opacity-90 hover:translate-x-0.5 group cursor-pointer"
              style={{
                fontFamily: 'Inter, sans-serif',
                backgroundColor: '#3152FF',
              }}
            >
              Start a project
              <ArrowRight size={14} strokeWidth={2.5} className="-rotate-45 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </header>

          {/* Hero Content Body */}
          <div className="w-full flex-grow grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,0.8fr)] items-center gap-10 px-6 lg:px-14 py-12 lg:py-8 z-20">
            {/* Left Column */}
            <div className="w-full max-w-3xl flex flex-col items-start text-left">
              <div
                className="hero-left-reveal inline-flex items-center gap-2 bg-white border border-[#ded8ca] px-4 py-2 mb-10"
                style={{ willChange: 'transform, opacity' }}
              >
                <span className="w-2 h-2 rounded-full bg-[#3152FF]" />
                <span
                  className="text-[#0b0a07]/55 text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  The digital studio
                </span>
              </div>

              <h1
                className="hero-left-reveal text-[#0b0a07] font-headline font-black max-w-3xl"
                style={{
                  fontSize: 'clamp(4rem, 7vw, 8.5rem)',
                  willChange: 'transform, opacity',
                }}
              >
                THE DESIGN
                <br />
                PARTNER THAT
                <br />
                SHIPS WHILE
                <br />
                <span className="inline-block bg-[#3152FF] text-white px-4 pb-2">YOU PITCH.</span>
              </h1>

              <div className="hero-left-reveal mt-4 max-w-xl" style={{ willChange: 'transform, opacity' }}>
                <p
                  className="text-[#0b0a07]/55 text-base sm:text-lg leading-[1.65] font-medium"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  We design and build AI-native products for founders who need to move fast and look credible — from Figma to deployed, without the handoff chaos.
                </p>
                <p
                  className="mt-3 text-[#0b0a07]/50 text-sm sm:text-base italic leading-relaxed"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  UX, UI, and front-end under one roof. No drama.
                </p>
              </div>

              <div className="hero-left-reveal mt-9 flex flex-col sm:flex-row gap-3" style={{ willChange: 'transform, opacity' }}>
                <button
                  className="flex items-center justify-center gap-2 px-7 py-4 text-white text-sm font-black uppercase transition-all duration-300 hover:opacity-90 hover:translate-x-0.5 group cursor-pointer"
                  style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#3152FF' }}
                >
                  Start a project
                  <ArrowRight size={15} strokeWidth={2.5} className="-rotate-45 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
                <button
                  className="flex items-center justify-center px-7 py-4 text-[#0b0a07] text-sm font-black uppercase border border-[#ded8ca] bg-transparent transition-all duration-300 hover:bg-white cursor-pointer"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  See recent work
                </button>
              </div>

              <div
                className="hero-left-reveal mt-9 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#0b0a07]/50"
                style={{ fontFamily: 'Inter, sans-serif', willChange: 'transform, opacity' }}
              >
                <span className="text-[#3152FF] tracking-[-0.08em] text-lg">★★★★★</span>
                <span className="font-black text-[#0b0a07]">5.0</span>
                <span>on Clutch</span>
                <span className="hidden sm:inline text-[#ded8ca]">|</span>
                <span>40+ founders shipped</span>
                <span className="hidden sm:inline text-[#ded8ca]">|</span>
                <span>Dribbble 2.9K</span>
              </div>
            </div>

            {/* Right Column: Black particle sphere replacing graph */}
            <div className="hero-right-canvas w-full flex items-center justify-center relative">
              <div className="w-full max-w-[620px] border border-[#d7d0c2] bg-white/45 shadow-[0_30px_90px_rgba(20,16,10,0.08)]">
                <div className="h-11 border-b border-[#d7d0c2] flex items-center gap-2 px-5 text-[#0b0a07]/45 font-mono text-xs tracking-[0.18em] lowercase">
                  <span className="w-3 h-3 rounded-full bg-[#ef6351]" />
                  <span className="w-3 h-3 rounded-full bg-[#e8a33d]" />
                  <span className="w-3 h-3 rounded-full bg-[#54c68a]" />
                  <span className="ml-3">elux — live intelligence</span>
                </div>
                <div className="h-[380px] sm:h-[460px] lg:h-[520px] p-8 flex items-center justify-center bg-[#f7f4ec]">
                  <ParticleSphere variant="black" />
                </div>
              </div>
            </div>
          </div>

          {/* Trust bar */}
          <footer className="hero-nav-item w-full border-t border-[#ded8ca] px-6 lg:px-14 py-5 flex flex-wrap items-center gap-x-10 gap-y-3 text-xs sm:text-sm uppercase tracking-[0.08em] text-[#0b0a07]/45" style={{ fontFamily: 'Inter, sans-serif' }}>
            <span>Trusted by <strong className="text-[#0b0a07]">40+ founders</strong></span>
            <span className="hidden sm:inline text-[#ded8ca]">·</span>
            <span>Clutch <strong className="text-[#0b0a07]">5.0</strong></span>
            <span className="hidden sm:inline text-[#ded8ca]">·</span>
            <span>Contra <strong className="text-[#0b0a07]">5.0</strong></span>
            <span className="hidden sm:inline text-[#ded8ca]">·</span>
            <span>Dribbble <strong className="text-[#0b0a07]">2.9K</strong></span>
            <span className="hidden sm:inline text-[#ded8ca]">·</span>
            <span>Designrush <strong className="text-[#0b0a07]">verified</strong></span>
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
