import { useMemo, useState } from 'react'
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
  const fieldNames = useMemo(
    () =>
      contact.fields.map((field) => ({
        ...field,
        key: field.name || field.label.toLowerCase().replace(/[^a-z0-9]+/gi, '_'),
      })),
    [contact.fields],
  )

  const [formData, setFormData] = useState(
    fieldNames.reduce((acc, field) => ({ ...acc, [field.key]: '' }), {}),
  )
  const [status, setStatus] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (key) => (event) => {
    setFormData((current) => ({ ...current, [key]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus(null)
    setSubmitting(true)

    try {
      const response = await fetch('https://cust.gov2partner.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || 'Unable to submit form')
      }

      setStatus({ type: 'success', message: 'Message sent successfully.' })
      setFormData(fieldNames.reduce((acc, field) => ({ ...acc, [field.key]: '' }), {}))
    } catch (error) {
      setStatus({
        type: 'error',
        message: error?.message || 'Submission failed. Please try again later.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="content-section contact-section">
      <SectionHeader {...contact.header} />

      {/* Additional Contact Categories */}
      {contact.sections?.length > 0 && (
        <motion.div
          className="contact-categories"
          initial="hidden"
          whileInView="visible"
          variants={stagger}
          viewport={{ once: true, amount: 0.25 }}
        >
          {contact.sections.map((section) => (
            <motion.div
              key={section.title}
              className="block-card category-card"
              variants={fadeUp}
            >
              <h3>{section.title}</h3>
              <p>{section.copy}</p>
            </motion.div>
          ))}
        </motion.div>
      )}

      <div className="contact-layout">
        <motion.form
          className="block-card contact-form"
          initial="hidden"
          whileInView="visible"
          variants={stagger}
          viewport={{ once: true, amount: 0.25 }}
          onSubmit={handleSubmit}
        >
          {fieldNames.map((field) => (
            <motion.label key={field.key} variants={fadeUp}>
              <span>{field.label}</span>
              {field.type === 'textarea' ? (
                <textarea
                  rows="5"
                  placeholder=" "
                  value={formData[field.key]}
                  onChange={handleChange(field.key)}
                />
              ) : (
                <input
                  type={field.type}
                  placeholder=" "
                  value={formData[field.key]}
                  onChange={handleChange(field.key)}
                />
              )}
            </motion.label>
          ))}

          {status && (
            <p className={`form-status ${status.type}`}>{status.message}</p>
          )}

          <motion.button
            className="primary-button"
            type="submit"
            disabled={submitting}
            variants={fadeUp}
          >
            {submitting ? 'Sending…' : contact.submitLabel}
            <ArrowRight size={18} />
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