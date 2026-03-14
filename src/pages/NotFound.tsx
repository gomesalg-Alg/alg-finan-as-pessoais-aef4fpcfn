import { useLocation, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

const NotFound = () => {
  const location = useLocation()

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname)
  }, [location.pathname])

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-display font-bold mb-4 text-primary">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Página não encontrada ou em construção.
        </p>
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link to="/">Voltar ao Início</Link>
        </Button>
      </div>
    </div>
  )
}

export default NotFound
