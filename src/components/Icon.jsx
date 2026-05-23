import { Sparkles } from 'lucide-react'
import { icons } from './visuals'

export default function Icon({ name, size = 22 }) {
  const LucideIcon = icons[name] || Sparkles
  return <LucideIcon size={size} aria-hidden="true" />
}
