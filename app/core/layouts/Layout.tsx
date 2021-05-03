import { FC, ReactNode } from "react"
import { Container } from "@material-ui/core"
import { Head, Header } from "../components"

interface ComponentProps {
  title?: string
}

const Layout: FC<ComponentProps> = ({ title, children }) => {
  return (
    <>
      <Head title={title || "providers-choice-challenge"} />
      <Header />
      <Container fixed style={{ paddingTop: "80px" }}>
        <>
          {children}
        </>
      </Container>
    </>
  )
}

export default Layout
