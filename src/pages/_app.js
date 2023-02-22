import { SessionProvider } from "next-auth/react"
import '../styles/globals.css'
import { useRouter } from "next/router"
import { useState,useEffect } from "react"

function Loading(){
  const router = useRouter();
  const [loading, setLoading]= useState(false);
  useEffect(()=>{
    const handleStart = (url)=>(url !==router.asPath) && setLoading(true);
    const handleComplete=(url)=>(url ===router.asPath) && setTimeout(()=>{setLoading(false)},5000);
    router.events.on('routeChangeStart',handleStart);
    router.events.on('routeChangeComplete',handleComplete);
    router.events.on('routeChangeError',handleComplete);
    return()=>{
      router.events.off('routeChangeStart',handleStart);
    router.events.off('routeChangeComplete',handleComplete);
    router.events.off('routeChangeError',handleComplete);
    }
    // routeChangeStart
    // routeChangeComplete
    // routeChangeError
  })
  return loading && (
    <div class="progress-bar">
  <span class="bar">
    <span class="progress"></span>
  </span>
</div>
  )
}

export default function App({ Component, pageProps: { session, ...pageProps },}) {
  
  return (<>
  
    <SessionProvider session={session}>
    <Loading/>
      <Component {...pageProps} />
    </SessionProvider>
    </>
  )
}
