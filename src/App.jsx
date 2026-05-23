import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Atom,
  BrainCircuit,
  CalendarDays,
  Cpu,
  DatabaseZap,
  Fingerprint,
  FlaskConical,
  Globe2,
  GraduationCap,
  Handshake,
  Mail,
  Menu,
  Orbit,
  Play,
  Rocket,
  Satellite,
  Shield,
  ShieldCheck,
  Sparkles,
  Users,
  X,
  Zap,
} from 'lucide-react'
import undrawAiResearch from './assets/undraw_ai_research_assistant.svg'
import undrawCollaboration from './assets/undraw_real_time_collaboration.svg'
import undrawDataProcessing from './assets/undraw_data_processing.svg'
import undrawSetupWizard from './assets/undraw_setup-wizard_45kx.svg'
import undrawWebsiteSetup from './assets/undraw_website_setup.svg'
import { siteContent } from './content/siteContent'
import './App.css'

const icons = {
  atom: Atom,
  brain: BrainCircuit,
  calendar: CalendarDays,
  cpu: Cpu,
  database: DatabaseZap,
  fingerprint: Fingerprint,
  flask: FlaskConical,
  globe: Globe2,
  graduation: GraduationCap,
  handshake: Handshake,
  mail: Mail,
  orbit: Orbit,
  play: Play,
  rocket: Rocket,
  satellite: Satellite,
  shield: Shield,
  shieldCheck: ShieldCheck,
  sparkles: Sparkles,
  users: Users,
  zap: Zap,
}

const illustrations = {
  ai: undrawAiResearch,
  collaboration: undrawCollaboration,
  data: undrawDataProcessing,
  setup: undrawSetupWizard,
  website: undrawWebsiteSetup,
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] },
  },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function Icon({ name, size = 22 }) {
  const LucideIcon = icons[name] || Sparkles
  return <LucideIcon size={size} aria-hidden="true" />
}

function SplineScene() {
  return (
    <div className="spline-scene" aria-hidden="true">
      <div className="stage-grid" />
      <div className="axis-ring ring-a" />
      <div className="axis-ring ring-b" />
      <div className="core-stack">
        <div className="core-layer layer-top" />
        <div className="core-layer layer-mid" />
        <div className="core-layer layer-base" />
      </div>
      <div className="data-panel data-a">
        <span />
        <span />
        <span />
      </div>
      <div className="data-panel data-b">
        <span />
        <span />
      </div>
      <div className="floating-chip chip-a">AI</div>
      <div className="floating-chip chip-b">SPACE</div>
      <div className="floating-chip chip-c">SECURE</div>
    </div>
  )
}

function SectionHeader({ eyebrow, title, copy }) {
  return (
    <motion.div
      className="section-header block-card"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </motion.div>
  )
}

function BlockCard({ icon, title, copy, meta, illustration, className = '' }) {
  return (
    <motion.article className={`block-card feature-block ${className}`} variants={fadeUp}>
      {illustration ? (
        <div className="card-illustration">
          <img src={illustrations[illustration]} alt="" />
        </div>
      ) : null}
      <div className="icon-tile">
        <Icon name={icon} />
      </div>
      {meta ? <span className="card-meta">{meta}</span> : null}
      <h3>{title}</h3>
      <p>{copy}</p>
    </motion.article>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const currentYear = useMemo(() => new Date().getFullYear(), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveSection(visible[0].target.id)
      },
      { rootMargin: '-28% 0px -58% 0px', threshold: [0.15, 0.35, 0.65] },
    )

    ;['hero', ...siteContent.nav.map((item) => item.id)].forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const handleNav = (id) => {
    setMenuOpen(false)
    scrollToSection(id)
  }

  return (
    <div className="site-shell">
      <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
        <button className="brand" onClick={() => handleNav('hero')} aria-label="Go to top">
          <span className="brand-mark">
            <Icon name={siteContent.brand.icon} size={18} />
          </span>
          <span>{siteContent.brand.name}</span>
        </button>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {siteContent.nav.map((item) => (
            <button
              key={item.id}
              className={activeSection === item.id ? 'is-active' : ''}
              onClick={() => handleNav(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button className="nav-cta" onClick={() => handleNav('contact')}>
          {siteContent.navCta}
          <ArrowRight size={16} aria-hidden="true" />
        </button>

        <button
          className="menu-button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      <motion.div
        className={`mobile-drawer ${menuOpen ? 'is-open' : ''}`}
        initial={false}
        animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : -14 }}
      >
        {siteContent.nav.map((item) => (
          <button key={item.id} onClick={() => handleNav(item.id)}>
            {item.label}
          </button>
        ))}
      </motion.div>

      <main>
        <section id="hero" className="hero-section">
          <motion.div
            className="hero-copy-block"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div className="hero-kicker" variants={fadeUp}>
              <Icon name="sparkles" size={16} />
              {siteContent.hero.eyebrow}
            </motion.div>
            <motion.h1 variants={fadeUp}>
              {siteContent.hero.title} <span>{siteContent.hero.highlight}</span>
            </motion.h1>
            <motion.p className="hero-copy" variants={fadeUp}>
              {siteContent.hero.copy}
            </motion.p>
            <motion.div className="hero-actions" variants={fadeUp}>
              <button className="primary-button" onClick={() => handleNav('contact')}>
                {siteContent.hero.primaryCta}
                <ArrowRight size={18} aria-hidden="true" />
              </button>
              <button className="secondary-button" onClick={() => handleNav('think-tank')}>
                {siteContent.hero.secondaryCta}
              </button>
            </motion.div>
            <motion.div className="hero-metrics" variants={stagger}>
              {siteContent.hero.metrics.map((metric) => (
                <motion.div className="metric-pill" key={metric.label} variants={fadeUp}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-visual-block"
            initial={{ opacity: 0, scale: 0.98, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="visual-orbit orbit-one" aria-hidden="true" />
            <div className="visual-orbit orbit-two" aria-hidden="true" />
            <SplineScene />
            <div className="mini-block panel-a">
              <span>{siteContent.hero.panels[0].label}</span>
              <strong>{siteContent.hero.panels[0].value}</strong>
            </div>
            <div className="mini-block panel-b">
              <span>{siteContent.hero.panels[1].label}</span>
              <strong>{siteContent.hero.panels[1].value}</strong>
            </div>
            <div className="hero-console">
              <div>
                <span>Signal map</span>
                <strong>Leaders / Labs / Agencies</strong>
              </div>
              <div className="console-bars" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            </div>
          </motion.div>
        </section>

        <section id="about" className="content-section">
          <SectionHeader {...siteContent.about.header} />
          <motion.div
            className="block-grid three"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            {siteContent.about.cards.map((card, index) => (
              <BlockCard key={card.title} {...card} className={index === 0 ? 'wide-block' : ''} />
            ))}
          </motion.div>
        </section>

        <section id="work" className="content-section tinted-section">
          <SectionHeader {...siteContent.work.header} />
          <motion.div
            className="block-grid three"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            {siteContent.work.cards.map((card, index) => (
              <BlockCard key={card.title} {...card} className={index === 1 ? 'tall-block' : ''} />
            ))}
          </motion.div>
        </section>

        <section id="media" className="content-section">
          <SectionHeader {...siteContent.media.header} />
          <motion.div
            className="media-grid"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {siteContent.media.cards.map((item, index) => (
              <motion.article
                className={`block-card media-block ${index === 0 ? 'wide-media' : ''}`}
                key={item.title}
                variants={fadeUp}
              >
                <div className="media-illustration">
                  <img src={illustrations[item.illustration]} alt="" />
                </div>
                <div className="icon-tile">
                  <Icon name={item.icon} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </motion.article>
            ))}
          </motion.div>
        </section>

        <section id="think-tank" className="content-section">
          <SectionHeader {...siteContent.thinkTank.header} />
          <motion.div
            className="think-layout"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div className="block-card timeline-block" variants={fadeUp}>
              {siteContent.thinkTank.timeline.map((item) => (
                <div className="timeline-row" key={item.title}>
                  <span aria-hidden="true" />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div className="stats-grid" variants={stagger}>
              {siteContent.thinkTank.stats.map((item) => (
                <motion.div className="block-card stat-card" key={item.label} variants={fadeUp}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        <section id="frontier" className="content-section tinted-section">
          <SectionHeader {...siteContent.frontier.header} />
          <motion.div
            className="frontier-grid"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {siteContent.frontier.cards.map((sector, index) => (
              <motion.article
                className="block-card frontier-card"
                key={sector.title}
                variants={fadeUp}
                whileHover={{ y: -7, rotate: index % 2 ? -0.4 : 0.4 }}
              >
                <div className="icon-tile">
                  <Icon name={sector.icon} />
                </div>
                <h3>{sector.title}</h3>
                <p>{sector.copy}</p>
              </motion.article>
            ))}
          </motion.div>
        </section>

        <section id="universities" className="content-section partner-section">
          <SectionHeader {...siteContent.partners.header} />
          <motion.div
            className="partner-grid"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            {siteContent.partners.cards.map((card) => (
              <BlockCard key={card.title} {...card} className="partner-card" />
            ))}
          </motion.div>
        </section>

        <section id="contact" className="content-section contact-section">
          <SectionHeader {...siteContent.contact.header} />
          <div className="contact-layout">
            <motion.form
              className="block-card contact-form"
              initial="hidden"
              whileInView="visible"
              variants={stagger}
              viewport={{ once: true, amount: 0.25 }}
            >
              {siteContent.contact.fields.map((field) => (
                <motion.label key={field.label} variants={fadeUp}>
                  <span>{field.label}</span>
                  {field.type === 'textarea' ? (
                    <textarea rows="5" placeholder=" " />
                  ) : (
                    <input type={field.type} placeholder=" " />
                  )}
                </motion.label>
              ))}
              <motion.button className="primary-button" type="button" variants={fadeUp}>
                {siteContent.contact.submitLabel}
                <ArrowRight size={18} aria-hidden="true" />
              </motion.button>
            </motion.form>

            <motion.aside
              className="block-card contact-aside"
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              viewport={{ once: true, amount: 0.25 }}
            >
              <img src={illustrations[siteContent.contact.illustration]} alt="" />
              <div className="icon-tile">
                <Icon name="mail" />
              </div>
              <span>{siteContent.contact.directLabel}</span>
              <a href={`mailto:${siteContent.contact.email}`}>{siteContent.contact.email}</a>
              <p>{siteContent.contact.asideCopy}</p>
            </motion.aside>
          </div>
        </section>
      </main>

      <footer className="footer block-card">
        <button className="brand" onClick={() => handleNav('hero')}>
          <span className="brand-mark">
            <Icon name="atom" size={18} />
          </span>
          <span>{siteContent.brand.name}</span>
        </button>
        <div className="footer-links">
          {siteContent.nav.slice(0, 5).map((item) => (
            <button key={item.id} onClick={() => handleNav(item.id)}>
              {item.label}
            </button>
          ))}
        </div>
        <p>
          &copy; {currentYear} {siteContent.brand.name}. {siteContent.footerTagline}
        </p>
      </footer>
    </div>
  )
}

export default App
