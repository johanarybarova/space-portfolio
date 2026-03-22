import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

export const FlashIcon = ({ className, ...props }: IconProps) => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
    {...props}
  >
    <g clipPath='url(#clip0_1008_482)'>
      <path
        d='M16.8606 3.03996L2.85889 10.3813L11.2729 13.8709L7.23614 20.9623L21.2379 13.621L12.8239 10.1314L16.8606 3.03996Z'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='square'
      />
    </g>
    <defs>
      <clipPath id='clip0_1008_482'>
        <rect width='24' height='24' fill='white' />
      </clipPath>
    </defs>
  </svg>
)
