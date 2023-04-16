import { ThemeProvider, createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    color: ${({ theme }) => theme.colors.primary};
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  p { 
    margin:0px;
  }
`;

const theme = {
  colors: {
    primary: "#111",
    secondary: "#0070f3",
    successful: "#2E8B57",
    failed: "#FF5733 ",
    upcoming: "#5f501d",
  },
  backgroundColors: {
    successful: "#90ee9050",
    failed: "#FF573350",
    upcoming: "#FFC30050",
  },
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
