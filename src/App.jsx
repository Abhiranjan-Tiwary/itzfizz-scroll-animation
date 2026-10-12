import { useLayoutEffect, useRef, useState } from 'react'
import { ArrowRight, Gauge, Menu, MonitorCog, MoveUpRight, Route, X, Zap } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const navLinks = [
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Motion', href: '#motion' },
  { label: 'Contact', href: '#contact' },
]

const impactMetrics = [
  { value: '58%', label: 'demo lift in product discovery' },
  { value: '23%', label: 'demo reduction in support friction' },
  { value: '40%', label: 'demo gain in conversion clarity' },
]

const capabilities = [
  {
    icon: MonitorCog,
    eyebrow: 'Interface Systems',
    title: 'Responsive frontend builds',
    body: 'React, Vite, and Tailwind foundations shaped into fast, maintainable product experiences.',
  },
  {
    icon: Route,
    eyebrow: 'Motion Direction',
    title: 'Scroll-led storytelling',
    body: 'GSAP timelines connect user intent to visual momentum without relying on autoplay effects.',
  },
  {
    icon: Gauge,
    eyebrow: 'Performance Polish',
    title: 'Production-minded detail',
    body: 'Transform-based animation, reduced-motion support, semantic markup, and careful responsive testing.',
  },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)

  return (
    <header className="site-header" aria-label="Primary navigation">
      <a className="brand-mark focus-ring" href="#top" aria-label="Itzfizz Digital home">
        <span className="brand-symbol">IF</span>
        <span>Itzfizz</span>
      </a>

      <nav className="desktop-nav" aria-label="Main navigation">
        {navLinks.map((link) => (
          <a className="focus-ring" href={link.href} key={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <a className="nav-cta focus-ring" href="#contact">
        Start project
        <ArrowRight aria-hidden="true" size={16} />
      </a>

      <button
        className="mobile-menu-button focus-ring"
        type="button"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
      </button>

      <div className={`mobile-nav ${isOpen ? 'is-open' : ''}`}>
        {navLinks.map((link) => (
          <a className="focus-ring" href={link.href} key={link.href} onClick={closeMenu}>
            {link.label}
          </a>
        ))}
        <a className="mobile-cta focus-ring" href="#contact" onClick={closeMenu}>
          Start project
        </a>
      </div>
    </header>
  )
}

function ImpactMetrics() {
  return (
    <ul className="impact-grid" aria-label="Illustrative demonstration metrics">
      {impactMetrics.map((metric) => (
        <li className="impact-card metric-item" key={metric.label}>
          <strong>{metric.value}</strong>
          <span>{metric.label}</span>
        </li>
      ))}
    </ul>
  )
}

function HeroSection() {
  const heroRef = useRef(null)
  const carRef = useRef(null)
  const trackRef = useRef(null)
  const progressRef = useRef(null)

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const root = heroRef.current

    if (!root) return undefined

    const ctx = gsap.context(() => {
      gsap.set(['.hero-kicker', '.hero-title', '.hero-copy', '.hero-action', '.metric-item', '.car-stage'], {
        autoAlpha: 0,
        y: 26,
      })
      gsap.set('.car-stage', { scale: 0.94, y: 36 })

      if (prefersReducedMotion) {
        gsap.set(['.hero-kicker', '.hero-title', '.hero-copy', '.hero-action', '.metric-item', '.car-stage'], {
          autoAlpha: 1,
          y: 0,
          scale: 1,
        })
        gsap.set(progressRef.current, { scaleX: 1 })
        return
      }

      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
      intro
        .to('.hero-kicker', { autoAlpha: 1, y: 0, duration: 0.6 })
        .to('.hero-title', { autoAlpha: 1, y: 0, duration: 0.9 }, '-=0.32')
        .to('.hero-copy', { autoAlpha: 1, y: 0, duration: 0.68 }, '-=0.48')
        .to('.metric-item', { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.12 }, '-=0.28')
        .to('.hero-action', { autoAlpha: 1, y: 0, duration: 0.52 }, '-=0.34')
        .to('.car-stage', { autoAlpha: 1, y: 0, scale: 1, duration: 0.9 }, '-=0.68')

      const mm = gsap.matchMedia()

      mm.add(
        {
          desktop: '(min-width: 900px)',
          mobile: '(max-width: 899px)',
        },
        (context) => {
          const { desktop } = context.conditions

          const timeline = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: root,
              start: 'top top',
              end: desktop ? '+=180%' : '+=120%',
              pin: trackRef.current,
              scrub: 0.75,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })

          timeline
            .fromTo(
              carRef.current,
              {
                xPercent: desktop ? -18 : -10,
                yPercent: desktop ? 14 : 10,
                rotate: desktop ? -4 : -3,
                scale: desktop ? 0.86 : 0.82,
              },
              {
                xPercent: desktop ? 30 : 18,
                yPercent: desktop ? -18 : -10,
                rotate: desktop ? 7 : 5,
                scale: desktop ? 1.12 : 1,
                duration: 1,
              },
              0,
            )
            .fromTo(progressRef.current, { scaleX: 0.02 }, { scaleX: 1, duration: 1 }, 0)
            .to('.hero-title', { yPercent: desktop ? -14 : -7, opacity: 0.36, duration: 0.7 }, 0.12)
            .to('.hero-copy', { y: desktop ? -24 : -10, opacity: 0.24, duration: 0.58 }, 0.18)
            .to('.metric-item', { y: desktop ? -44 : -18, opacity: 0.92, stagger: 0.04, duration: 0.45 }, 0.26)
            .fromTo(
              '.route-line',
              { scaleX: 0, opacity: 0.2 },
              { scaleX: 1, opacity: 1, duration: 0.72 },
              0.1,
            )
            .fromTo('.motion-note', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.35 }, 0.58)

          return () => {
            timeline.kill()
          }
        },
      )
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero-section" id="top" ref={heroRef}>
      <div className="hero-track" ref={trackRef}>
        <Navbar />

        <div className="hero-shell" id="motion">
          <div className="hero-content">
            <p className="hero-kicker">Digital craft for kinetic brands</p>
            <h1 className="hero-title" aria-label="Welcome Itzfizz">
              <span>W E L C O M E</span>
              <span>I T Z F I Z Z</span>
            </h1>
            <p className="hero-copy">
              A premium automotive landing page concept built to show scroll-linked motion,
              responsive layout discipline, and polished frontend implementation.
            </p>

            <div className="hero-action">
              <a className="primary-link focus-ring" href="#capabilities">
                Explore capabilities
                <MoveUpRight aria-hidden="true" size={18} />
              </a>
              <span className="metric-disclaimer">Illustrative demo metrics, not business claims.</span>
            </div>
          </div>

          <div className="hero-visual" aria-label="Scroll-controlled vehicle animation">
            <div className="car-stage">
              <div className="road-panel" aria-hidden="true">
                <span className="road-grid" />
                <span className="route-line" />
                <span className="progress-line" ref={progressRef} />
              </div>
              <img
                ref={carRef}
                className="hero-car"
                src="/assets/top-view-car-vector.svg"
                alt="Top-view sports car used as the central scroll animation visual"
                width="359"
                height="789"
                decoding="async"
                fetchPriority="high"
              />
              <div className="motion-note">
                <Zap aria-hidden="true" size={16} />
                Scroll to drive the sequence
              </div>
            </div>
          </div>

          <ImpactMetrics />
        </div>
      </div>
    </section>
  )
}

function CapabilitiesSection() {
  return (
    <section className="capabilities-section" id="capabilities">
      <div className="section-shell">
        <div className="section-heading">
          <p className="section-kicker">Capabilities</p>
          <h2>Frontend systems that feel sharp, fast, and intentional.</h2>
          <p>
            Itzfizz Digital needs more than a static landing page. This build focuses on practical
            implementation quality: clean React structure, resilient layout, and motion that follows
            the user’s scroll.
          </p>
        </div>

        <div className="capability-grid">
          {capabilities.map((item) => {
            const Icon = item.icon

            return (
              <article className="capability-item" key={item.title}>
                <div className="capability-icon" aria-hidden="true">
                  <Icon size={24} />
                </div>
                <p>{item.eyebrow}</p>
                <h3>{item.title}</h3>
                <span>{item.body}</span>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ClosingSection() {
  return (
    <section className="closing-section" id="contact">
      <div className="closing-shell">
        <p className="section-kicker">Ready for review</p>
        <h2>Built as a focused internship assignment, ready to deploy.</h2>
        <p>
          The project is intentionally compact: a premium hero, GSAP ScrollTrigger animation,
          capability content, and a clean footer with accessible navigation.
        </p>
        <a className="primary-link focus-ring" href="mailto:hello@itzfizz.com">
          Contact Itzfizz
          <ArrowRight aria-hidden="true" size={18} />
        </a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <a className="brand-mark focus-ring" href="#top" aria-label="Back to top">
        <span className="brand-symbol">IF</span>
        <span>Itzfizz</span>
      </a>
      <p>Frontend internship assignment · React, Tailwind CSS, GSAP ScrollTrigger</p>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <main>
        <HeroSection />
        <CapabilitiesSection />
        <ClosingSection />
      </main>
      <Footer />
    </>
  )
}
