import {
  AppProps,
  ErrorComponent,
  useRouter,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
} from "blitz"
import { ErrorBoundary } from "react-error-boundary"
import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import React from "react"
import { ApolloProvider } from "@apollo/client"

import ApolloClient from "../core/graphql"
import LoginForm from "app/auth/components/LoginForm"

//You can customize this as you want and even move it out to a separate file
const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  const router = useRouter()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApolloProvider client={ApolloClient}>
        <ErrorBoundary
          FallbackComponent={RootErrorFallback}
          resetKeys={[router.asPath]}
          onReset={useQueryErrorResetBoundary().reset}
        >
          {getLayout(<Component {...pageProps} />)}
        </ErrorBoundary>
      </ApolloProvider>
    </ThemeProvider>
  );
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  }
}
