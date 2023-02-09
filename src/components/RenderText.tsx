import { Text } from '@kalidao/reality'
import { vars } from '@kalidao/reality'
import Linkify from 'linkify-react'

export const RenderText = ({ children }: { children: React.ReactNode }) => {
  return (
    <Linkify
      options={{
        attributes: {
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        format: {
          url: (value: string) => {
            // format url to be aesthetically pleasing
            // e.g. https://www.twitter.com/user/nerderlyne => twitter.com/user/nerderlyne
            const url = new URL(value)

            return url.hostname + url.pathname
          },
        },
        style: {
          color: '#fff',
          textDecoration: 'underline',
        },
      }}
    >
      <Text>{children}</Text>
    </Linkify>
  )
}
