import { useRouter } from 'next/router'

import { Button, IconLink } from '@kalidao/reality'
import { host } from '~/constants/about'

import toast from '@design/Toast'

export const CopyURL = () => {
  const router = useRouter()

  const copy = () => {
    const currentUrl = `${host}${router.asPath}`
    navigator.clipboard.writeText(currentUrl)
    toast('success', 'Copied link to clipboard!')
  }

  return (
    <Button variant="transparent" size="small" onClick={copy}>
      <IconLink />
    </Button>
  )
}
