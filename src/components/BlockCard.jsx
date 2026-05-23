import { motion } from 'framer-motion'
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

export default function BlockCard({ icon, title, copy, meta, illustration, className = '' }) {
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
