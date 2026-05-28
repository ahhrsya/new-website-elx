'use client'

import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Activity, Users, Cpu, Terminal, Sparkles, CheckCircle2 } from 'lucide-react'

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

interface ProcessStep {
  id: number
  number: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 0,
    number: '01',
    title: 'Breach & Analyze',
    description: 'We gather deep system telemetry, inspect your existing codebases, and map out bottlenecks in UX performance and server scaling.',
    icon: <Activity className="w-5 h-5" />,
    color: '#0052FF',
  },
  {
    id: 1,
    number: '02',
    title: 'Strategy & Co-create',
    description: 'We initiate rapid interactive sprint cycles with your key stakeholders, crafting high-fidelity design prototypes and defining code architectures.',
    icon: <Users className="w-5 h-5" />,
    color: '#7C3AED',
  },
  {
    id: 2,
    number: '03',
    title: 'Deploy & Optimize',
    description: 'Our team ships production-ready modules, hooks them up to robust CI/CD pipelines, and monitors performance targets with sub-millisecond precision.',
    icon: <Cpu className="w-5 h-5" />,
    color: '#10B981',
  },
]

export default function OurProcess() {
  const [activeStep, setActiveStep] = useState<number>(0)
  
  // Refs for tracking DOM elements on desktop sticky scroll
  const containerRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  // Setup GSAP ScrollTrigger for Desktop Vertical Scroll-Linking
  useEffect(() => {
    // Only run on desktop screen sizes (match lg: breakpoint 1024px)
    const isDesktop = window.innerWidth >= 1024
    if (!isDesktop) return

    const ctx = gsap.context(() => {
      stepRefs.current.forEach((el, index) => {
        if (!el) return

        ScrollTrigger.create({
          trigger: el,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => setActiveStep(index),
          onEnterBack: () => setActiveStep(index),
        })
      })
    }, containerRef)

    return () => {
      ctx.revert()
    }
  }, [])

  // Smooth scroll click handler for desktop navigation
  const handleStepClick = (index: number) => {
    const isDesktop = window.innerWidth >= 1024
    
    if (isDesktop) {
      const el = stepRefs.current[index]
      if (el) {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
        setActiveStep(index)
      }
    } else {
      // Simple instant state change on mobile
      setActiveStep(index)
    }
  }

  // Helper component to render Step 1 Content
  const renderMockup1 = () => (
    <div className="w-full h-full flex flex-col justify-between p-6">
      {/* Header Metrics */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[#121216]/95 border border-[#222226] p-3 rounded-xl flex flex-col">
          <span className="text-[9px] font-mono text-neutral-500 uppercase">SYSTEM EFFICIENCY</span>
          <span className="text-white text-base sm:text-lg font-black mt-1 text-[#0052FF]">94.2%</span>
        </div>
        <div className="bg-[#121216]/95 border border-[#222226] p-3 rounded-xl flex flex-col">
          <span className="text-[9px] font-mono text-neutral-500 uppercase">CPU FREQUENCY</span>
          <span className="text-white text-base sm:text-lg font-black mt-1">4.88 GHz</span>
        </div>
        <div className="bg-[#121216]/95 border border-[#222226] p-3 rounded-xl flex flex-col">
          <span className="text-[9px] font-mono text-neutral-500 uppercase">TELEMETRY STATS</span>
          <span className="text-green-400 text-xs font-bold mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
            ACTIVE
          </span>
        </div>
      </div>

      {/* SVG Live Line Chart Graph */}
      <div className="flex-grow flex items-center justify-center my-4 relative min-h-[140px]">
        <svg className="w-full h-full max-h-[160px]" viewBox="0 0 400 150" fill="none">
          <line x1="0" y1="30" x2="400" y2="30" stroke="#1d1d26" strokeDasharray="3 3" />
          <line x1="0" y1="75" x2="400" y2="75" stroke="#1d1d26" strokeDasharray="3 3" />
          <line x1="0" y1="120" x2="400" y2="120" stroke="#1d1d26" strokeDasharray="3 3" />
          
          <path
            d="M0 150 L0 120 L80 90 L160 110 L240 60 L320 40 L400 15 L400 150 Z"
            fill="url(#gradient-blue)"
            opacity="0.15"
          />

          <path
            d="M0 120 L80 90 L160 110 L240 60 L320 40 L400 15"
            stroke="#0052FF"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <circle cx="80" cy="90" r="4.5" fill="#0052FF" stroke="#050508" strokeWidth="1.5" />
          <circle cx="240" cy="60" r="4.5" fill="#0052FF" stroke="#050508" strokeWidth="1.5" />
          <circle cx="320" cy="40" r="5.5" fill="#ffffff" stroke="#0052FF" strokeWidth="2" />
          <circle cx="400" cy="15" r="4.5" fill="#0052FF" stroke="#050508" strokeWidth="1.5" />

          <defs>
            <linearGradient id="gradient-blue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0052FF" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        
        <div className="absolute top-[20px] left-[65%] bg-[#0052FF] text-white text-[9px] font-mono px-2 py-0.5 rounded shadow-lg flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5" />
          PEAK DETECTED (+18.4%)
        </div>
      </div>

      {/* Status Console Footer */}
      <div className="w-full bg-[#111115] px-4 py-2 rounded-xl border border-[#1b1b22] flex items-center justify-between text-[10px] font-mono text-neutral-400">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          METRICS SCAN COMPLETED
        </span>
        <span>SYS_SECURE // OK</span>
      </div>
    </div>
  )

  // Helper component to render Step 2 Content
  const renderMockup2 = () => (
    <div className="w-full h-full flex flex-col justify-between p-6">
      {/* Top Workspace Tools Bar */}
      <div className="w-full flex items-center justify-between bg-[#121216]/90 border border-[#222226] p-2 rounded-xl">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-5 h-5 rounded bg-[#7C3AED]/20 text-[#7C3AED]">
            <Users className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] font-bold text-white font-mono">SPRINT ROOM #04</span>
        </div>
        {/* Active Co-creators Avatars */}
        <div className="flex items-center -space-x-1.5">
          <div className="w-5 h-5 rounded-full bg-[#7C3AED] text-white text-[8px] font-black flex items-center justify-center border border-[#050508]">SP</div>
          <div className="w-5 h-5 rounded-full bg-[#0052FF] text-white text-[8px] font-black flex items-center justify-center border border-[#050508]">AL</div>
          <div className="w-5 h-5 rounded-full bg-green-500 text-white text-[8px] font-black flex items-center justify-center border border-[#050508]">DV</div>
        </div>
      </div>

      {/* Slide Mockups Workspace Grid */}
      <div className="flex-grow grid grid-cols-12 gap-3 items-center my-4">
        {/* Canvas Left Sidebar */}
        <div className="col-span-3 flex flex-col gap-2 h-full justify-center">
          <div className="bg-[#121216]/80 p-1.5 rounded border border-[#222226] text-[8px] font-mono text-neutral-400">
            ■ HERO
          </div>
          <div className="bg-[#7C3AED]/15 p-1.5 rounded border border-[#7C3AED]/40 text-[8px] font-mono text-[#a78bfa] font-bold">
            ■ PROCESS
          </div>
          <div className="bg-[#121216]/80 p-1.5 rounded border border-[#222226] text-[8px] font-mono text-neutral-400">
            ■ SHOWCASE
          </div>
        </div>

        {/* Active Presentation Canvas Edit Card */}
        <div className="col-span-9 bg-gradient-to-br from-[#1b1030] to-[#0a0715] h-full min-h-[160px] rounded-xl border border-[#7C3AED]/30 p-3.5 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

          <div className="flex justify-between items-start relative z-10">
            <div className="flex flex-col">
              <span className="text-[7px] font-mono text-[#a78bfa] tracking-widest font-bold">// SPRINTS Stage</span>
              <h4 className="text-white text-xs sm:text-sm font-black uppercase">Co-creating MVP</h4>
            </div>
            <div className="bg-white/10 text-white text-[7px] font-mono px-2 py-0.5 rounded-full uppercase">
              Active
            </div>
          </div>

          <div className="w-full h-10 border border-dashed border-[#7C3AED]/40 rounded-lg flex items-center justify-center relative z-10 bg-black/40">
            <span className="text-[7px] text-[#a78bfa] font-mono">[Drag & Drop Wireframe]</span>
          </div>

          <div className="absolute top-[48%] left-[65%] bg-[#7C3AED] text-white text-[7px] font-mono px-1.5 py-0.5 rounded flex items-center gap-1 shadow-md z-20">
            <svg className="w-1.5 h-1.5 fill-current" viewBox="0 0 24 24">
              <path d="M21 3l-18 8 7 3 3 7z" />
            </svg>
            SOPHIA
          </div>

          <div className="flex items-center justify-between text-[8px] text-neutral-400 relative z-10">
            <span>SLIDE 2 OF 12</span>
            <span>GEIST SANS</span>
          </div>
        </div>
      </div>

      {/* System Feedback Alert */}
      <div className="w-full bg-[#111115] px-4 py-2 rounded-xl border border-[#1b1b22] flex items-center justify-between text-[10px] font-mono text-neutral-400">
        <span className="flex items-center gap-1.5 text-neutral-300">
          <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
          ALL CHANGES AUTO-SAVED
        </span>
        <span className="text-[#a78bfa]">STAGE_02_READY</span>
      </div>
    </div>
  )

  // Helper component to render Step 3 Content
  const renderMockup3 = () => (
    <div className="w-full h-full flex flex-col justify-between p-6">
      {/* Header Build Indicator */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#121216]/90 border border-[#222226] p-3 rounded-xl flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] font-mono text-neutral-500 uppercase">DEPLOY TARGET</span>
            <span className="text-white text-xs sm:text-sm font-bold font-mono mt-0.5">aws-prod-cluster</span>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        <div className="bg-[#121216]/90 border border-[#222226] p-3 rounded-xl flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] font-mono text-neutral-500 uppercase">OPTIMIZATION BOOST</span>
            <span className="text-emerald-400 text-xs sm:text-sm font-black mt-0.5">+412.8% SPEED</span>
          </div>
          <Cpu className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
        </div>
      </div>

      {/* Virtual Interactive Shell Terminal */}
      <div className="flex-grow bg-[#0c0c10] border border-[#1b1b22] p-3.5 rounded-xl font-mono text-[9px] sm:text-[10px] text-neutral-300 my-4 flex flex-col gap-1.5 overflow-hidden text-left shadow-inner">
        <div className="flex items-center justify-between text-neutral-500 border-b border-[#1b1b22]/80 pb-1 mb-0.5">
          <span>bash - consult-ai@deploy-pipe</span>
          <span>#8891</span>
        </div>
        <div className="text-neutral-500">&gt; npm run deploy --prod</div>
        <div className="text-neutral-400">✓ Compiling asset packages... (811ms)</div>
        <div className="text-blue-400">⚡ Pushing deployment to cloud nodes... [100%]</div>
        <div className="text-emerald-400 font-bold flex items-center gap-1.5">
          <span>●</span> Deployed successfully to 18 locations!
        </div>
        <div className="text-white font-bold">&gt; latency avg 14ms (OPTIMAL)</div>
      </div>

      {/* Pipeline Footer Details */}
      <div className="w-full bg-[#111115] px-4 py-2 rounded-xl border border-[#1b1b22] flex items-center justify-between text-[10px] font-mono text-neutral-400">
        <span className="flex items-center gap-1.5 text-emerald-400">
          <Terminal className="w-3.5 h-3.5" />
          LIVE PRODUCTION PIPELINE ACTIVE
        </span>
        <span className="text-emerald-400 font-bold">SYS_ONLINE</span>
      </div>
    </div>
  )

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-[#050508] text-white py-[100px] px-6 sm:px-12 select-none overflow-hidden"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Ambient background glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#7C3AED]/5 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#0052FF]/5 rounded-full blur-[130px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <header className="w-full flex flex-col items-start mb-16 text-left">
          <span className="text-[#0052FF] text-[10px] font-mono font-bold tracking-[0.35em] uppercase mb-2 animate-pulse">
            // OPERATIONAL PIPELINE
          </span>
          <h2 className="text-white text-3xl sm:text-[2.6rem] lg:text-[3.2rem] font-headline font-black tracking-tight leading-none uppercase">
            HOW WE BUILD SYSTEMS
          </h2>
          <div className="w-16 h-0.5 bg-[#0052FF]/50 mt-4 rounded-full" />
        </header>

        {/* ── DESKTOP LAYOUT (Sticky Scroll Interaction) ────────────────── */}
        <div className="hidden lg:grid grid-cols-12 gap-16 relative w-full">
          
          {/* LEFT COLUMN: Vertical Scroll Steps */}
          <div className="col-span-5 flex flex-col w-full relative">
            {PROCESS_STEPS.map((step, index) => {
              const isActive = step.id === activeStep

              return (
                <div
                  key={step.id}
                  ref={(el) => {
                    stepRefs.current[index] = el
                  }}
                  onClick={() => handleStepClick(step.id)}
                  className={`group relative flex flex-col p-8 rounded-2xl border transition-all duration-500 cursor-pointer h-[80vh] justify-center ${
                    isActive 
                      ? 'bg-[#121216]/95 border-[#222226] shadow-xl shadow-black/35 scale-[1.01] opacity-100' 
                      : 'bg-transparent border-transparent opacity-30 hover:opacity-70'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Step Number & Icon */}
                    <div 
                      className="flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-500"
                      style={{
                        backgroundColor: isActive ? `${step.color}15` : '#16161a',
                        color: isActive ? step.color : '#a3a3a3',
                        boxShadow: isActive ? `0 0 15px ${step.color}10` : 'none',
                      }}
                    >
                      {step.icon}
                    </div>

                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono tracking-wider font-semibold opacity-40 uppercase">Step {step.number}</span>
                      <h3 className="text-white text-xl font-headline font-bold tracking-tight mt-0.5 transition-colors duration-300">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  {/* Step Description */}
                  <div className="mt-4">
                    <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>

                  {/* Horizontal Bar Visual Indicator */}
                  <div className="w-full h-[2px] bg-neutral-800/40 rounded-full mt-6 overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: isActive ? '100%' : '0%',
                        backgroundColor: step.color,
                        boxShadow: `0 0 8px ${step.color}80`,
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* RIGHT COLUMN: Sticky macOS Mockup Panel */}
          <div className="col-span-7 sticky top-[20vh] w-full h-[450px] flex items-center justify-center">
            
            {/* Ambient visual glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#7C3AED]/10 via-transparent to-[#0052FF]/10 rounded-3xl blur-[40px] pointer-events-none" />

            {/* Premium Window Mockup container */}
            <div className="w-full h-full rounded-2xl bg-[#09090c]/85 backdrop-blur-xl border border-[#1b1b22] shadow-2xl shadow-black/85 flex flex-col overflow-hidden relative z-10 select-none">
              
              {/* macOS Window Title Bar */}
              <div className="w-full bg-[#0d0d12] px-5 py-3 border-b border-[#1b1b22] flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56] opacity-80" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E] opacity-80" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F] opacity-80" />
                </div>
                <div className="text-[10px] font-mono text-neutral-500 tracking-wider uppercase">
                  consult-ai // workflow_engine.sys
                </div>
                <div className="w-12" />
              </div>

              {/* Dynamic Step Mockups (Transitions styled purely in CSS for fast performance) */}
              <div className="relative flex-grow w-full h-full">
                
                {/* Step 1 Mockup Container */}
                <div 
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    activeStep === 0 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
                  }`}
                >
                  {renderMockup1()}
                </div>

                {/* Step 2 Mockup Container */}
                <div 
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    activeStep === 1 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
                  }`}
                >
                  {renderMockup2()}
                </div>

                {/* Step 3 Mockup Container */}
                <div 
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    activeStep === 2 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
                  }`}
                >
                  {renderMockup3()}
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ── MOBILE / TABLET LAYOUT (Tappable Tab Interface) ───────────── */}
        <div className="block lg:hidden w-full relative">
          
          {/* Horizontal Pill Selectors */}
          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-4 scrollbar-none border-b border-[#1b1b22] mb-8 justify-start sm:justify-center">
            {PROCESS_STEPS.map((step) => {
              const isActive = step.id === activeStep

              return (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(step.id)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full border text-xs sm:text-sm font-semibold transition-all duration-300 flex-shrink-0 cursor-pointer ${
                    isActive 
                      ? 'bg-white text-black border-white shadow-lg' 
                      : 'bg-[#121216] text-neutral-400 border-[#222226]'
                  }`}
                >
                  <span className="font-mono text-[9px] opacity-60">Step {step.number}</span>
                  <span>{step.title}</span>
                </button>
              )}
            )}
          </div>

          {/* Active Tab Text Narrative */}
          <div className="mb-8 text-left bg-[#121216]/50 border border-[#222226]/50 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div 
                className="flex items-center justify-center w-8 h-8 rounded-lg"
                style={{
                  backgroundColor: `${PROCESS_STEPS[activeStep].color}15`,
                  color: PROCESS_STEPS[activeStep].color,
                }}
              >
                {PROCESS_STEPS[activeStep].icon}
              </div>
              <h3 className="text-white text-lg font-headline font-black uppercase">
                {PROCESS_STEPS[activeStep].title}
              </h3>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed">
              {PROCESS_STEPS[activeStep].description}
            </p>
          </div>

          {/* Active Tab Mockup Content Panel */}
          <div className="w-full h-[360px] sm:h-[400px] rounded-2xl bg-[#09090c]/85 border border-[#1b1b22] relative overflow-hidden select-none">
            <div className="w-full bg-[#0d0d12] px-4 py-2.5 border-b border-[#1b1b22] flex items-center justify-between text-[9px] font-mono text-neutral-500 uppercase">
              <span>consult-ai // mobile_mock.sys</span>
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            </div>

            <div className="relative w-full h-[calc(100%-35px)]">
              {activeStep === 0 && renderMockup1()}
              {activeStep === 1 && renderMockup2()}
              {activeStep === 2 && renderMockup3()}
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
