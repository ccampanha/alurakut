import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from '../src/lib/AlurakutCommons'

const GlobalStyle = createGlobalStyle`

  /* Reset CSS  */
   * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  } 

  body {
    font-family: sans-serif;
    background-color: #D9E6F6;
    background-image: url("https://images.pexels.com/photos/1000653/pexels-photo-1000653.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
    background-size: cover;
  }

  #__next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

 ${AlurakutStyles}

`

const theme = {
  colors: {
    primary: 'red'
  }
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
