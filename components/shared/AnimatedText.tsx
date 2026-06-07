'use client'

import { motion } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
}

export default function AnimatedText({ text, className = '', delay = 0 }: AnimatedTextProps) {
  const letters = text.split('')

  return (
    <span className={className} style={{ perspective: '1000px', display: 'inline-block' }}>
      {letters.map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          initial={{ y: 80, opacity: 0, rotateX: -90 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.04,
            ease: [0.2, 0.65, 0.3, 0.9],
          }}
          style={{ display: 'inline-block', transformOrigin: 'bottom' }}
        >
          {letter === ' ' ? ' ' : letter}
        </motion.span>
      ))}
    </span>
  )
}
