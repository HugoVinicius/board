import type { AppProps } from 'next/app'
import '../styles/globals.scss'
import { Header } from '../components/Header'
import { SessionProvider as NextAuthProvide } from "next-auth/react"

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <NextAuthProvide session={session}>
      <Header/>
      <Component {...pageProps} />      
    </NextAuthProvide>
  );
}
