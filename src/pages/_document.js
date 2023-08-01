import { Html, Head, Main, NextScript } from 'next/document'
import dynamic from 'next/dynamic.js';
import Script from 'next/script'


// const DynamicComponentWithNoSSR = dynamic(
//   () => import('../../public/flowbite.min.js'),
//   { ssr: false }
// )

export default function Document() {
  
  return (
    <Html lang="en" className='dark'>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;1,300;1,400&display=swap
" rel="stylesheet" />
        <meta name="twitter:description" content="Coindeck - A cryptocurrency exchange"/>
        <meta name="twitter:image" content="/thumbnail.png"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
