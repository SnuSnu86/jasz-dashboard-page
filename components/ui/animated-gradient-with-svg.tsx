import React from 'react'

interface AnimatedGradientProps {
  colors: string[]
  speed?: number
  blur?: 'small' | 'medium' | 'large'
  className?: string
}

export const AnimatedGradient: React.FC<AnimatedGradientProps> = ({
  colors,
  speed = 0.05,
  blur = 'medium',
  className = ''
}) => {
  const blurClasses = {
    small: 'blur-sm',
    medium: 'blur-md', 
    large: 'blur-lg'
  }

  const gradientStyle = {
    background: `linear-gradient(45deg, ${colors.join(', ')})`,
    animation: `gradient-shift ${1 / speed}s ease infinite`,
    backgroundSize: '300% 300%'
  }

  return (
    <>
      <style jsx>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      <div
        className={`absolute inset-0 ${blurClasses[blur]} ${className}`}
        style={gradientStyle}
      />
    </>
  )
}