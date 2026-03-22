import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

export const MessageIcon = ({ className, ...props }: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    fill='none'
    viewBox='0 0 24 24'
    className={className}
    {...props}
  >
    <g clipPath='url(#clip0_215_412)'>
      <path d='M1 4.117h22v15.766H1z' stroke='currentColor' strokeWidth='2' />
      <path d='M21.586 4.117 12 12.904 2.414 4.117z' stroke='currentColor' strokeWidth='2' />
    </g>
    <defs>
      <clipPath id='clip0_215_412'>
        <path fill='#fff' d='M0 1h24v22H0z' />
      </clipPath>
    </defs>
  </svg>
)
