import { Text } from '@kalidao/reality'
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
