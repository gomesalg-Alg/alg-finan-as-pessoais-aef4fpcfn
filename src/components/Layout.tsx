import { Outlet } from 'react-router-dom'
import { Header } from './layout/Header'
import { Footer } from './layout/Footer'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary selection:text-background">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
