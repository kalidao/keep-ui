import { useEffect } from 'react'

import { useMediaQuery } from 'react-responsive'
import { useThemeStore } from '~/hooks'

import * as styles from './castle.css'

export const Castle = () => {
  const mode = useThemeStore((state) => state.mode)
  const sm = useMediaQuery({ query: '(min-width: 640px)' })
  const md = useMediaQuery({ query: '(min-width: 768px)' })
  const lg = useMediaQuery({ query: '(min-width: 1024px)' })
  const xl = useMediaQuery({ query: '(min-width: 1280px)' })
  const twoXl = useMediaQuery({
    query: '(min-width: 1900pxS)',
  })

  useEffect(() => {
    let path = document.querySelector(`.${styles.path}`) as SVGPathElement
    let length = path.getTotalLength()

    console.log('path', length)

    // Clear any previous transition
    path.style.transition = path.style.transition = 'none'
    // Set up the starting positions
    path.style.strokeDasharray = length + ' ' + length
    path.style.strokeDashoffset = length.toString()
    // Trigger a layout so styles are calculated & the browser
    // picks up the starting position before animating
    path.getBoundingClientRect()
    // Define our transition
    path.style.transition = path.style.transition = 'stroke-dashoffset 2s ease-in-out'
    // Go!
    path.style.strokeDashoffset = '0'
  }, [])

  // set size for all screen sizes
  let size = 500
  // set size for small screens
  if (sm) {
    size = 700
  }
  // set size for medium screens
  if (md) {
    size = 800
  }
  // set size for large screens
  if (lg) {
    size = 900
  }
  // set size for extra large screens
  if (xl) {
    size = 1000
  }
  if (twoXl) {
    size = 2000
  }

  return (
    <svg
      version="1.1"
      id="svg190"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="layer1">
        <path
          className={styles.path}
          strokeWidth="0.26458332"
          stroke={mode === 'dark' ? '#fff' : '#000'}
          fill={mode === 'dark' ? '#fff' : '#000'}
          d="m 45.255193,766.73367 14.325385,-62.83635 -4.558077,-14.65096 8.465,-43.95289 -14.325385,-19.53461 0.325577,-18.23231 v -2.93019 l 20.836924,0.32557 18.961767,-95.60134 5.370546,-7.12594 2.331452,0.46629 1.865161,5.59548 1.865157,-8.33145 3.13342,-45.07268 10.98435,-22.468 8.98721,24.46516 -0.99858,17.97441 41.94028,-10.48507 2.99573,-37.44668 10.98436,-46.93317 6.49076,51.92606 -0.99858,29.95734 32.95307,-6.49076 0.99858,-17.47511 -6.49076,-7.98863 22.9673,-66.40544 -4.4936,-12.98151 3.49502,-3.49502 -5.99147,-8.98721 1.99716,-29.95734 5.99147,-13.98009 9.48649,16.97583 -2.49645,24.96445 4.4936,6.99005 15.97725,-48.93033 8.48792,-26.46232 41.94027,155.27889 -5.49218,4.99289 1.49787,28.95876 -4.99289,2.49645 0.99858,44.43672 12.48222,1.99715 1.49787,-18.47369 13.4808,36.4481 25.96303,-0.99858 15.47796,-62.91041 12.48223,36.44809 3.49502,-17.47511 3.49502,35.44952 9.4865,9.48649 2.74203,9.06778 -2.9116,22.56486 5.0953,0.7279 -0.7279,9.46269 -7.27899,1.45579 v 26.93226 l 21.83696,-2.18369 -0.7279,-22.56487 -5.09529,-7.27899 1.4558,-20.38117 -6.55109,-6.55108 -2.1837,-11.64639 10.91849,-6.55109 -2.9116,-18.19747 25.47646,-58.9598 26.20436,54.59241 3.63949,-34.21125 12.37428,31.29965 5.0953,-13.10218 5.82319,13.10218 V 503.706 l 3.63949,5.0953 -0.7279,18.92537 7.27899,6.55109 2.9116,-2.9116 v -35.66704 l 5.82319,-6.55109 7.27899,10.91848 v 27.66016 l 10.19058,5.09529 v -18.19747 l 13.10218,-45.12973 23.29276,37.85074 v 5.82319 l 14.55798,-5.09529 -2.9116,-53.13662 -7.27898,-2.1837 V 442.5625 l -7.27899,-1.4558 13.83007,-33.48334 15.28588,30.57175 v -40.03444 l -10.91848,-5.09529 27.66015,-64.783 31.29965,42.94603 1.4558,17.46958 -6.55109,4.36739 1.4558,13.83008 2.9116,2.91159 1.45579,23.29277 8.00689,2.18369 -1.4558,-21.83696 7.27899,-14.55798 10.91848,23.29276 v 40.76234 l -8.00688,11.64638 1.45579,37.12284 43.67394,-12.37428 v -15.28587 l 13.10218,-29.84386 22.56486,27.66016 -0.7279,22.56486 h 9.46269 l -1.4558,-15.28587 14.55798,5.09529 5.82319,60.4156 16.74167,6.55109 1.4558,21.83697 29.84385,1.4558 9.46269,14.55797 v 10.19059 l 34.21124,-3.6395 120.10331,24.74856 22.56485,32.75545 5.8232,28.38806 27.6602,18.92537 13.83,26.20436 4.3674,30.57175"
          id="path571"
        />
      </g>
    </svg>
  )
}
