import { Html, Head, Main, NextScript } from 'next/document'
import dynamic from 'next/dynamic.js';
import Script from 'next/script'
import { useEffect } from 'react';


// const DynamicComponentWithNoSSR = dynamic(
//   () => import('../../public/flowbite.min.js'),
//   { ssr: false }
// )

export default function Document() {

  // useEffect(() => {
  //   var aScript = document.createElement('script');
  // aScript.type = 'text/javascript';
  // aScript.src = "https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.4/flowbite.min.js";
  // aScript.async = true;

  // document.body.appendChild(aScript);
  // console.log("inside kjlsjsldj");
  // },[]);
  

  
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        {/* <script src="flowbite.min.js" defer></script>  */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.4/flowbite.min.js" defer></script>
      </body>
    </Html>
  )
}
