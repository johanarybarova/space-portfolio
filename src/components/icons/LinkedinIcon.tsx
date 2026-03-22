import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

export const LinkedinIcon = ({ className, ...props }: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    fill='none'
    viewBox='0 0 24 24'
    className={className}
    {...props}
  >
    <path
      stroke='currentColor'
      strokeWidth='2'
      d='M5.215 21.934h-4.21V8.288h4.21zM3.11 5.244C1.943 5.244 1 4.294 1 3.122S1.943 1 3.11 1c1.163 0 2.105.95 2.105 2.122A2.117 2.117 0 0 1 3.11 5.244ZM23 21.934h-4.204V16.31c0-1.58-.028-3.618-2.188-3.618-2.189 0-2.521 1.726-2.521 3.507v5.735H9.888V8.288h4.033v.931s1.625-.878 3.579-.93c4.26 0 5.5 2.484 5.5 6.158z'
    />
  </svg>
)
