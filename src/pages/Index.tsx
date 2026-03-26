import { Hero } from '@/components/home/Hero'
import { Duality } from '@/components/home/Duality'
import { ServicesPreview } from '@/components/home/ServicesPreview'
import { Audience } from '@/components/home/Audience'

export default function Index() {
  return (
    <>
      <Hero />
      <Duality />
      <ServicesPreview />
      <Audience />
    </>
  )
}
