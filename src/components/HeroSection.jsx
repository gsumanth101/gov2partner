import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Icon from './Icon'
import SplineScene from './SplineScene'

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

export default function HeroSection({ hero, onNav }) {
  return (
    <section id="hero" className="hero-section">
      <motion.div className="hero-copy-block" initial="hidden" animate="visible" variants={stagger}>
        <motion.div className="hero-kicker" variants={fadeUp}>
          <Icon name="sparkles" size={16} />
          {hero.eyebrow}
        </motion.div>

        <motion.h1 variants={fadeUp}>
          {hero.title} <span>{hero.highlight}</span>
        </motion.h1>

        <motion.p className="hero-copy" variants={fadeUp}>
          {hero.copy}
        </motion.p>

        {/* <motion.div className="hero-actions" variants={fadeUp}>
          <button className="primary-button" onClick={() => onNav('contact')}>
            {hero.primaryCta}
            <ArrowRight size={18} aria-hidden="true" />
          </button>
          <button className="secondary-button" onClick={() => onNav('think-tank')}>
            {hero.secondaryCta}
          </button>
        </motion.div> */}

        <motion.div className="hero-metrics" variants={stagger}>
          {hero.metrics.map((metric) => (
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
          <span>{hero.panels[0].label}</span>
          <strong>{hero.panels[0].value}</strong>
        </div>
        <div className="mini-block panel-b">
          <span>{hero.panels[1].label}</span>
          <strong>{hero.panels[1].value}</strong>
        </div>
        {/* <div className="hero-console">
          <div>
            <span>Signal map</span>
            <strong>Leaders / Labs / Agencies</strong>
          </div>
          <div className="console-bars" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div> */}
      </motion.div>
    </section>
  )
}
