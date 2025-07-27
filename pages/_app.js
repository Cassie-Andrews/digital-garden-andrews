import '../styles/globals.css'
import { PlantProvider } from '../context'

function MyApp({ Component, pageProps }) {
  return (
    <PlantProvider>
      <Component {...pageProps} />
    </PlantProvider>
  )
}

export default MyApp
