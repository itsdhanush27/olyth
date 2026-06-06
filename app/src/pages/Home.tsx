import { lazy, Suspense } from 'react'
import { useScrollToTop } from '@/hooks/useScrollToTop'

const HeroSection = lazy(() => import('@/sections/HeroSection'))
const PlatformOverviewSection = lazy(() => import('@/sections/PlatformOverviewSection'))
const MeetThalSection = lazy(() => import('@/sections/MeetThalSection'))
const ProcessSection = lazy(() => import('@/sections/ProcessSection'))
const ImpactStatsSection = lazy(() => import('@/sections/ImpactStatsSection'))
const TestimonialsSection = lazy(() => import('@/sections/TestimonialsSection'))
const IntegrationsSection = lazy(() => import('@/sections/IntegrationsSection'))
const PricingPreviewSection = lazy(() => import('@/sections/PricingPreviewSection'))
const ComparisonTableSection = lazy(() => import('@/sections/ComparisonTableSection'))
const CTAWaveSection = lazy(() => import('@/sections/CTAWaveSection'))

const SectionFallback = () => (
  <div className="min-h-[400px] bg-gray-50 animate-pulse" />
)

export default function Home() {
  useScrollToTop()
  
  return (
    <main>
      <Suspense fallback={<SectionFallback />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <PlatformOverviewSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <MeetThalSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ProcessSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ImpactStatsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <TestimonialsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <IntegrationsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <PricingPreviewSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ComparisonTableSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <CTAWaveSection />
      </Suspense>
    </main>
  )
}
