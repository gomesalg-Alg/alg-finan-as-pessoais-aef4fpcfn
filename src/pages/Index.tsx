import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Lock } from 'lucide-react'
import { Hero } from '@/components/home/Hero'
import { Duality } from '@/components/home/Duality'
import { ServicesPreview } from '@/components/home/ServicesPreview'
import { Audience } from '@/components/home/Audience'

export default function Index() {
  return (
    <>
      <div className="lg:hidden flex justify-center pt-24 pb-4">
        <Button asChild variant="outline" className="w-full max-w-sm">
          <Link to="/login">
            <Lock className="w-4 h-4 mr-2" />
            Área restrita
          </Link>
        </Button>
      </div>
      <Hero />
      <Duality />
      <ServicesPreview />
      <Audience />
    </>
  )
}
