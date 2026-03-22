import { Outlet } from 'react-router-dom'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { ERPSidebar } from './ERPSidebar'
import { ERPHeader } from './ERPHeader'

export function ERPLayout() {
  return (
    <SidebarProvider>
      <ERPSidebar />
      <SidebarInset className="bg-[#0b1015]">
        <ERPHeader />
        <main className="flex-1 p-4 md:p-6 text-foreground overflow-y-auto w-full">
          <div className="mx-auto w-full max-w-7xl animate-fade-in">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
