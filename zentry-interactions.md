# Zentry-Style Web Interactions — Build Guide for Antigravity

> **Context untuk Antigravity Agent**
> Dokumen ini berisi instruksi lengkap untuk membangun tiga interaksi utama bergaya Zentry.com:
> preloader logo animasi, card zoom-in scroll, dan smooth scrolling dengan Lenis.
> Baca seluruh dokumen sebelum mulai. Semua dependency, struktur file, dan kode implementasi sudah tersedia di sini.

---

## 1. Project Context

### Tech Stack yang Digunakan

| Layer | Pilihan | Alasan |
|---|---|---|
| Framework | **Next.js 14+ (App Router)** | SSR support, sudah umum di proyek modern |
| Smooth Scroll | **Lenis v1** | Dipakai Zentry, paling smooth di kelasnya |
| Animation | **GSAP 3 + ScrollTrigger** | Industry standard, 41 instance di Zentry asli |
| Language | **TypeScript** | Type safety untuk animasi yang kompleks |
| Styling | **Tailwind CSS** | Utility-first, cocok untuk rapid build |

### Tiga Fitur yang Dibangun

1. **Preloader Logo** — Overlay fullscreen dengan animasi logo SVG dua bagian, muncul saat pertama load, lalu exit ke halaman utama
2. **Card Zoom-In** — Card kecil yang terikat ke scroll, membesar sampai fullscreen saat di-scroll
3. **Lenis Smooth Scroll** — Smooth scroll yang di-sync ke GSAP ScrollTrigger sebagai fondasi semua animasi

---

## 2. Persiapan: Install Dependencies

Jalankan command berikut di root project:

```bash
npm install gsap lenis
npm install --save-dev @types/gsap
```

### Verifikasi `package.json`

Pastikan entry berikut ada setelah install:

```json
{
  "dependencies": {
    "gsap": "^3.13.0",
    "lenis": "^1.1.0"
  }
}
```

> **Note untuk Antigravity:** Jangan import library lain untuk animasi. Tidak perlu Framer Motion atau react-spring — semua handled oleh GSAP.

---

## 3. Struktur File yang Perlu Dibuat

```
src/
├── app/
│   ├── layout.tsx          ← tambahkan LenisProvider di sini
│   └── page.tsx            ← demo page dengan semua sections
│
├── components/
│   ├── Preloader.tsx        ← BUAT BARU — animasi logo fullscreen
│   ├── LenisProvider.tsx    ← BUAT BARU — smooth scroll wrapper
│   └── CardZoom.tsx         ← BUAT BARU — card zoom-in section
│
├── hooks/
│   └── useGSAP.ts           ← BUAT BARU — custom hook untuk GSAP cleanup
│
└── styles/
    └── globals.css          ← tambahkan CSS variables di sini
```

---

## 4. CSS Variables (globals.css)

Tambahkan ke `src/styles/globals.css`:

```css
:root {
  --color-black: #000000;
  --color-lavender: #DFDFF2;
  --color-purple: #5729FF;
  --color-card-bg: #240E4B;
}

[data-theme="dark"] {
  --bg: var(--color-black);
  --text: var(--color-lavender);
}

[data-theme="light"] {
  --bg: var(--color-lavender);
  --text: var(--color-black);
}

/* Wajib: sembunyikan scrollbar native saat Lenis aktif */
html.lenis,
html.lenis body {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}
```

---

## 5. Implementasi: LenisProvider

**File:** `src/components/LenisProvider.tsx`

Ini adalah fondasi utama. Harus dipasang sebelum komponen lain.

```tsx
'use client'

import { useEffect, useRef, createContext, useContext } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LenisContext = createContext<Lenis | null>(null)

export const useLenis = () => useContext(LenisContext)

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    lenisRef.current = lenis

    // Sync Lenis dengan GSAP ScrollTrigger
    // INI WAJIB — tanpa ini semua ScrollTrigger akan offset posisinya
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    // Lag smoothing dimatikan agar tidak ada jitter
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
    }
  }, [])

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  )
}
```

**Pasang di `src/app/layout.tsx`:**

```tsx
import LenisProvider from '@/components/LenisProvider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
```

---

## 6. Implementasi: Preloader Logo

**File:** `src/components/Preloader.tsx`

### Cara Kerja
1. Komponen mount → overlay hitam fullscreen muncul
2. Dua bagian logo SVG animate masuk (atas dari atas, bawah dari bawah)
3. Logo hold sebentar, lalu kedua bagian split keluar ke atas/bawah
4. Overlay fade out → `onComplete` dipanggil → komponen unmount

### Logo SVG
Logo menggunakan dua path (persis seperti Zentry — huruf Z yang terbagi dua):

- **Top half:** segitiga kiri-atas ke kanan
- **Bottom half:** segitiga kebalikannya

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface PreloaderProps {
  onComplete: () => void
}

// SVG paths dari logo Zentry (huruf Z terbagi dua)
const LOGO_TOP_PATH =
  'm338.88,214.91H0L617.26,0l-246.08,384.58-32.32-169.69.02.02Z'
const LOGO_BOTTOM_PATH =
  'm321.14,444.52h338.87L42.75,659.99l246.07-385.58,32.32,170.13v-.02Z'

export default function Preloader({ onComplete }: PreloaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const topRef = useRef<SVGPathElement>(null)
  const bottomRef = useRef<SVGPathElement>(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (!overlayRef.current || !topRef.current || !bottomRef.current) return

    const tl = gsap.timeline()

    // State awal: kedua bagian logo di luar layar
    gsap.set(topRef.current, { y: -120, opacity: 0 })
    gsap.set(bottomRef.current, { y: 120, opacity: 0 })

    tl
      // Fase 1: kedua bagian masuk ke posisi logo utuh
      .to([topRef.current, bottomRef.current], {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.05,
      })
      // Hold sebentar
      .to({}, { duration: 0.5 })
      // Fase 2: split keluar
      .to(topRef.current, {
        y: -150,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.in',
      }, '<')
      .to(bottomRef.current, {
        y: 150,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.in',
      }, '<')
      // Fase 3: overlay fade out
      .to(overlayRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.inOut',
        onComplete: () => {
          setVisible(false)
          onComplete()
        },
      })

    return () => {
      tl.kill()
    }
  }, [onComplete])

  if (!visible) return null

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#000000',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <svg
        viewBox="0 0 661 660"
        style={{ width: '160px', height: '160px', color: '#5729FF' }}
        fill="currentColor"
        aria-label="Logo"
      >
        {/* Top half of Z */}
        <path ref={topRef} d={LOGO_TOP_PATH} />
        {/* Bottom half of Z */}
        <path ref={bottomRef} d={LOGO_BOTTOM_PATH} />
      </svg>
    </div>
  )
}
```

### Cara Pakai di Page

```tsx
'use client'

import { useState } from 'react'
import Preloader from '@/components/Preloader'

export default function Page() {
  const [preloaderDone, setPreloaderDone] = useState(false)

  return (
    <>
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}
      <main style={{ opacity: preloaderDone ? 1 : 0, transition: 'opacity 0.3s' }}>
        {/* konten halaman */}
      </main>
    </>
  )
}
```

---

## 7. Implementasi: Card Zoom-In

**File:** `src/components/CardZoom.tsx`

### Cara Kerja
1. Section ini punya height `300vh` — tinggi sengaja dibuat 3× viewport supaya scroll range panjang
2. Card kecil dimulai dari tengah, dengan `scale(0.3)` dan sedikit `rotate`
3. Saat user scroll, `scrub: true` membuat card grow smooth mengikuti scroll progress
4. Di akhir scroll, card memenuhi seluruh layar (`scale: 1`)

### Struktur CSS Penting
- `.frame` → container relatif, `inset: 0`
- `.frame__mask` → overflow hidden (krusial untuk clip effect)
- `.frame__content` → element yang di-scale, `will-change: transform`

```tsx
'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

interface CardZoomProps {
  /** Konten yang ada di dalam card */
  children?: React.ReactNode
  /** Background color card */
  cardBg?: string
}

export default function CardZoom({
  children,
  cardBg = '#240E4B',
}: CardZoomProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        {
          scale: 0.3,
          rotate: -8,
          borderRadius: '2rem',
        },
        {
          scale: 1,
          rotate: 0,
          borderRadius: '0rem',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,        // card mengikuti scroll 1:1
            pin: false,         // section tidak di-pin, content yang scale
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    // Section dengan height 300vh — ini yang memberi ruang scroll
    <section
      ref={sectionRef}
      style={{ position: 'relative', height: '300vh' }}
    >
      {/* Sticky wrapper: tetap di viewport saat section di-scroll */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',   // frame__mask equivalent
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Card yang di-scale */}
        <div
          ref={contentRef}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: cardBg,
            willChange: 'transform',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {children ?? (
            <p style={{ color: '#DFDFF2', fontSize: '2rem', fontWeight: 600 }}>
              Your Content Here
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
```

---

## 8. Custom Hook: useGSAP Cleanup

**File:** `src/hooks/useGSAP.ts`

Penting untuk mencegah memory leak dan animasi dobel saat React Strict Mode:

```ts
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
```

---

## 9. Demo Page Lengkap

**File:** `src/app/page.tsx`

Gabungkan semua komponen menjadi satu halaman demo:

```tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Preloader from '@/components/Preloader'
import CardZoom from '@/components/CardZoom'

export default function DemoPage() {
  const [preloaderDone, setPreloaderDone] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  // Hero text entrance setelah preloader selesai
  useEffect(() => {
    if (!preloaderDone || !heroRef.current) return

    gsap.from('.hero-word', {
      opacity: 0,
      y: 24,
      stagger: 0.06,
      duration: 0.7,
      ease: 'power2.out',
    })
  }, [preloaderDone])

  return (
    <>
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}

      <div
        data-theme="dark"
        style={{
          opacity: preloaderDone ? 1 : 0,
          transition: 'opacity 0.4s ease',
          backgroundColor: 'var(--bg)',
          color: 'var(--text)',
        }}
      >
        {/* Hero Section */}
        <section
          ref={heroRef}
          style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <h1 style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', fontWeight: 800, textAlign: 'center' }}>
            {'REDEFINE'.split('').map((char, i) => (
              <span key={i} className="hero-word" style={{ display: 'inline-block' }}>
                {char}
              </span>
            ))}
          </h1>
          <p style={{ opacity: 0.5, fontSize: '1rem' }}>Scroll ke bawah ↓</p>
        </section>

        {/* Card Zoom Section */}
        <CardZoom cardBg="#240E4B">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h2 style={{ color: '#DFDFF2', fontSize: '3rem', fontWeight: 700 }}>
              Into the Metagame
            </h2>
            <p style={{ color: '#DFDFF2', opacity: 0.6, marginTop: '1rem' }}>
              The card expands as you scroll
            </p>
          </div>
        </CardZoom>

        {/* Section setelah card */}
        <section
          data-theme="light"
          style={{
            height: '100vh',
            backgroundColor: '#DFDFF2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h2 style={{ color: '#000', fontSize: '2rem' }}>Next Section</h2>
        </section>
      </div>
    </>
  )
}
```

---

## 10. Checklist Sebelum Build

Sebelum Antigravity mulai generate kode, pastikan:

- [ ] Next.js 14+ sudah terinstall dengan App Router (`/src/app/`)
- [ ] TypeScript aktif (`tsconfig.json` ada)
- [ ] Tailwind CSS sudah dikonfigurasi (opsional, tapi recommended)
- [ ] Jalankan `npm install gsap lenis` dan verifikasi di `package.json`
- [ ] File `src/styles/globals.css` sudah ada dan di-import di `layout.tsx`
- [ ] `'use client'` wajib ada di semua komponen yang pakai GSAP (karena GSAP butuh DOM)

---

## 11. Troubleshooting Umum

### ScrollTrigger posisinya salah / tidak akurat

**Penyebab:** Lenis belum di-sync ke ScrollTrigger.

**Fix:** Pastikan baris ini ada di `LenisProvider.tsx`:
```ts
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.lagSmoothing(0)
```

### Animasi jalan dua kali di development

**Penyebab:** React Strict Mode memanggil `useEffect` dua kali.

**Fix:** Selalu gunakan `gsap.context()` dan return cleanup `ctx.revert()`:
```ts
const ctx = gsap.context(() => { /* animasi */ }, containerRef)
return () => ctx.revert()
```

### Card zoom terlalu cepat atau terlalu lambat

**Penyebab:** Section height terlalu pendek/panjang.

**Fix:** Adjust `height: '300vh'` di section CardZoom. Lebih tinggi = scroll lebih lambat.

### Preloader tidak muncul di production

**Penyebab:** State `preloaderDone` diinisialisasi `true` di server.

**Fix:** Inisialisasi dengan `false` dan handle di `useEffect` jika perlu cek localStorage.

---

## 12. Catatan Performa

- `will-change: transform` sudah ada di `CardZoom` — jangan tambahkan ke semua element
- Gunakan `gsap.context()` untuk scoping dan automatic cleanup
- Semua animasi scroll menggunakan `scrub: true` bukan `scrub: 0.5` untuk feel yang lebih 1:1 dengan scroll Zentry
- Lenis `duration: 1.2` adalah sweet spot — lebih tinggi = terlalu mengambang, lebih rendah = tidak ada beda dengan native scroll

---

*Source: Reverse-engineered dari zentry.com — May 2026*
*Target platform: Google Antigravity (VS Code-based, Next.js + TypeScript project)*
