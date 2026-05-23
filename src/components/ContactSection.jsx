import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SectionHeader from './SectionHeader'
import Icon from './Icon'
import { illustrations } from './visuals'

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

export default function ContactSection({ contact }) {
  return (
    <section id="contact" className="content-section contact-section">
      <SectionHeader {...contact.header} />

      <div className="contact-layout">
        <motion.form
          className="block-card contact-form"
          initial="hidden"
          whileInView="visible"
          variants={stagger}
          viewport={{ once: true, amount: 0.25 }}
        >
          {contact.fields.map((field) => (
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
            {contact.submitLabel}
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
          <img src={illustrations[contact.illustration]} alt="" />
          <div className="icon-tile">
            <Icon name="mail" />
          </div>
          <span>{contact.directLabel}</span>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <p>{contact.asideCopy}</p>
        </motion.aside>
      </div>
    </section>
  )
}
