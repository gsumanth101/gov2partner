import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import { siteContent } from './content/siteContent'
import './App.css'
import BlockCard from './components/BlockCard'
import ContactSection from './components/ContactSection'
import HeroSection from './components/HeroSection'
import Icon from './components/Icon'
import Navbar from './components/Navbar'
import SectionHeader from './components/SectionHeader'
import SplineScene from './components/SplineScene'
import { illustrations } from './components/visuals'

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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

  return (
    <div className="site-shell">
      <Navbar
        brand={siteContent.brand}
        nav={siteContent.nav}
        navCta={siteContent.navCta}
        activeSection={activeSection}
        menuOpen={menuOpen}
        onNav={handleNav}
        onToggleMenu={() => setMenuOpen((open) => !open)}
      />

      <main>
        <HeroSection hero={siteContent.hero} onNav={handleNav} />

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
            className="block-grid three"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {siteContent.thinkTank.timeline.map((item) => (
              <motion.article className="block-card think-card" key={item.title} variants={fadeUp}>
                <span aria-hidden="true" className="think-dot" />
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </motion.article>
            ))}
          </motion.div>
        </section>

        <section id="frontier" className="content-section tinted-section">
          <SectionHeader {...siteContent.frontier.header} />
          <motion.div
            className="block-grid three"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {siteContent.frontier.cards.map((sector) => (
              <motion.article className="block-card think-card" key={sector.title} variants={fadeUp}>
                <span aria-hidden="true" className="think-dot" />
                <h3>{sector.title}</h3>
                <p>{sector.copy}</p>
              </motion.article>
            ))}
          </motion.div>
        </section>

        {/* <section id="universities" className="content-section partner-section">
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
        </section> */}

        <ContactSection contact={siteContent.contact} />
      </main>

      <footer className="footer block-card">
        <button className="brand" onClick={() => handleNav('hero')}>
          <span className="brand-mark">
            <img src="/image.png" alt={`${siteContent.brand.name} logo`} className="brand-logo" />
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
