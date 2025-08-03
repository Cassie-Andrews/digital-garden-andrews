import '../styles/globals.css'
import { PlantProvider } from '../context'

export default function MyApp({ Component, pageProps }) {
  return (
    <PlantProvider>
      <Component {...pageProps} />
    </PlantProvider>
  )
}