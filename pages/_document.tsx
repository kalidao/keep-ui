import React from 'react'
import Document, { DocumentContext, DocumentInitialProps, Html, Head, Main, NextScript } from 'next/document'

interface Props {
  theme: string
}

export default class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps & Props> {
    const initialProps = await Document.getInitialProps(ctx)

    let theme = 'dark'
    const cookies = ctx?.req?.headers?.cookie
    if (cookies) {
      const themeCookie = cookies.split(';').find((c) => c.trim().startsWith('mode='))
      if (themeCookie) {
        theme = themeCookie.split('=')[1]
      }
    }

    return { ...initialProps, theme }
  }

  render() {
    return (
      <Html
        lang="en"
        style={{
          backgroundColor: this.props.theme === 'dark' ? '#000' : '#fff',
        }}
      >
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={'true'} />
          <link
            href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;0,6..96,600;0,6..96,700;0,6..96,800;0,6..96,900;1,6..96,400;1,6..96,500;1,6..96,600;1,6..96,700;1,6..96,800;1,6..96,900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
