import { Html, Head, Main, NextScript } from 'next/document'
import dynamic from 'next/dynamic.js';
import Script from 'next/script'
import { useEffect } from 'react';


// const DynamicComponentWithNoSSR = dynamic(
//   () => import('../../public/flowbite.min.js'),
//   { ssr: false }
// )

export default function Document() {
  
  return (
    <Html lang="en" className='dark'>
      <Head />
      
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
