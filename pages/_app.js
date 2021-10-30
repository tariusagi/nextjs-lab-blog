import '../styles/global.css'

// Note: Override the default Next's App component.
// See https://nextjs.org/docs/advanced-features/custom-app
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
