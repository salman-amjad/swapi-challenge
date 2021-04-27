import { ReactNode } from "react"
import { Head, Header } from "./components"


type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head title={title || "providers-choice-challenge"} />
      <Header />
      {children}
    </>
  )
}

export default Layout
