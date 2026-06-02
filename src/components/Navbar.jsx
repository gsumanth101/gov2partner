import { motion } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import Icon from './Icon'

export default function Navbar({ brand, nav, navCta, activeSection, menuOpen, onNav, onToggleMenu }) {
  return (
    <>
      <header className={`navbar ${menuOpen ? 'is-scrolled' : ''}`}>
        <button className="brand" onClick={() => onNav('hero')} aria-label="Go to top">
          <span className="brand-mark">
            <Icon name={brand.icon} size={18} />
          </span>
          <span>{brand.name}</span>
        </button>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map((item) => (
            <button
              key={item.id}
              className={activeSection === item.id ? 'is-active' : ''}
              onClick={() => onNav(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* <button className="nav-cta" onClick={() => onNav('contact')}>
          {navCta}
          <ArrowRight size={16} aria-hidden="true" />
        </button> */}

        <button
          className="menu-button"
          onClick={onToggleMenu}
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
        {nav.map((item) => (
          <button key={item.id} onClick={() => onNav(item.id)}>
            {item.label}
          </button>
        ))}
      </motion.div>
    </>
  )
}
