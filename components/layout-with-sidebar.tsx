import Header from "./header"
import Sidebar from "./sidebar"
import type { ReactNode } from "react"

interface LayoutWithSidebarProps {
  children: ReactNode
}

export default function LayoutWithSidebar({ children }: LayoutWithSidebarProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      <main className="pt-16 pl-60 min-h-screen">{children}</main>
    </div>
  )
}

