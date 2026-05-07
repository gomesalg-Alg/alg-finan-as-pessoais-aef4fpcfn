import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { SidebarTrigger } from '@/components/ui/sidebar'
import logoUrl from '@/assets/logoescolhidoalg-b2e91.jpeg'

export function ERPHeader() {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b bg-blue-900 px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-white hover:text-amber-500 transition-colors" />
        <div className="flex items-center gap-3">
          <img
            src={logoUrl}
            alt="ALG Finanças"
            className="w-8 h-8 rounded-full object-cover border border-amber-500/30 shadow-sm"
          />
          <h1 className="text-lg font-bold text-white">ALG ERP Dashboard</h1>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="destructive"
          size="sm"
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white shadow-md flex items-center gap-2 rounded-full px-4 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span className="font-semibold">Desconectar</span>
        </Button>
      </div>
    </header>
  )
}
