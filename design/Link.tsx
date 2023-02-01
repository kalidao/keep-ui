import Link from 'next/link'
import type { LinkProps as NextLinkProps } from 'next/link'

import { link } from './Link.css'

type LinkProps = {
  children: React.ReactNode
}

export default function CustomLink({ href, children, ...props }: LinkProps & NextLinkProps) {
  return (
    <Link href={href} {...props} passHref legacyBehavior>
      <a className={link}>{children}</a>
    </Link>
  )
}
