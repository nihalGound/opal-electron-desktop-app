import React from 'react'
import { cn } from "@/lib/utils"

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
  className?: string
}

export default function Loader({ size = 'md', color = '#FF0C00', className }: LoaderProps) {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  }

  return (
    <div className={cn("flex items-center justify-center", className)} role="status">
      <svg
        className={cn("animate-spin", sizeMap[size])}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        fill="none"
      >
        <defs>
          <radialGradient id="loader-gradient" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)">
            <stop offset="0" stopColor={color}></stop>
            <stop offset=".3" stopColor={color} stopOpacity=".9"></stop>
            <stop offset=".6" stopColor={color} stopOpacity=".6"></stop>
            <stop offset=".8" stopColor={color} stopOpacity=".3"></stop>
            <stop offset="1" stopColor={color} stopOpacity="0"></stop>
          </radialGradient>
        </defs>
        <circle
          transform-origin="center"
          stroke="url(#loader-gradient)"
          strokeWidth="15"
          strokeLinecap="round"
          strokeDasharray="200 1000"
          strokeDashoffset="0"
          cx="100"
          cy="100"
          r="70"
        >
          <animateTransform
            type="rotate"
            attributeName="transform"
            calcMode="spline"
            dur="2"
            values="360;0"
            keyTimes="0;1"
            keySplines="0 0 1 1"
            repeatCount="indefinite"
          ></animateTransform>
        </circle>
        <circle
          transform-origin="center"
          opacity=".2"
          stroke={color}
          strokeWidth="15"
          strokeLinecap="round"
          cx="100"
          cy="100"
          r="70"
        ></circle>
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  )
}