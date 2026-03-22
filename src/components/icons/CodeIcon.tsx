import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

export const CodeIcon = ({ className, ...props }: IconProps) => (
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
      strokeLinecap='square'
      d='M6.444 7.425 2 11.869l4.444 4.445M17.556 7.425 22 11.869l-4.444 4.445M14.583 3.079 12 11.869l-2.583 8.792'
    />
  </svg>
)
