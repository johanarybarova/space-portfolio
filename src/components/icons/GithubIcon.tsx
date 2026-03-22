import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

export const GithubIcon = ({ className, ...props }: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    width='24'
    height='24'
    fill='none'
    viewBox='0 0 24 24'
    className={className}
    {...props}
  >
    <g stroke='currentColor' strokeLinecap='square' strokeWidth='2' clipPath='url(#clip0_215_208)'>
      <path d='M9.324 19.244C3.961 21.622 3.378 16.865 1 16.865' />
      <path d='M16.46 24v-4.756c-.096-.737-.155-1.486-.357-2.2a5.6 5.6 0 0 0-1.011-1.962c3.567 0 7.135-2.379 7.135-6.54a4.13 4.13 0 0 0-1.094-2.795c.083-.738.226-2.2-.155-3.747 0 0-1.189 0-4.28 1.784a12.4 12.4 0 0 0-3.378-.463c-1.142 0-2.283.154-3.378.463C6.85 2 5.662 2 5.662 2c-.381 1.546-.239 3.01-.155 3.747A4.13 4.13 0 0 0 4.413 8.54c0 4.162 3.567 6.54 7.135 6.54a5.6 5.6 0 0 0-1.01 1.963c-.203.713-.263 1.463-.358 2.2v4.757' />
    </g>
    <defs>
      <clipPath id='clip0_215_208'>
        <path fill='#fff' d='M0 0h24v24H0z' />
      </clipPath>
    </defs>
  </svg>
)
