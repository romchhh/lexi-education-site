import type { Metadata } from 'next'
import { LESSON_STEPS } from './brand'
import DirectionsSection from './components/DirectionsSection'
import Hero from './components/Hero'
import FormatsSection from './components/FormatsSection'
import PricingSection from './components/PricingSection'
import LessonSection from './components/LessonSection'
import GallerySection from './components/GallerySection'
import ContactSection from './components/ContactSection'
import JsonLd from './components/JsonLd'
import {
  createPageMetadata,
  howToJsonLd,
  localBusinessJsonLd,
  offerJsonLd,
  organizationJsonLd,
  PAGE_SEO,
  webPageJsonLd,
  websiteJsonLd,
} from './seo'

export const metadata: Metadata = createPageMetadata(PAGE_SEO.home)

export default function LexiPage() {
  return (
    <>
      <JsonLd
        data={[
          organizationJsonLd(),
          localBusinessJsonLd(),
          websiteJsonLd(),
          webPageJsonLd(PAGE_SEO.home),
          offerJsonLd({
            name: 'Безкоштовне пробне заняття',
            description:
              'Пробне заняття в LEXI.education — безкоштовно. Визначимо рівень, обговоримо цілі та підберемо формат.',
            path: '/kontakty',
          }),
          howToJsonLd({
            name: 'Як проходить пробне заняття в LEXI.education',
            description:
              'Чотири кроки від першої зустрічі до підбору програми навчання.',
            steps: LESSON_STEPS.map((step) => ({
              title: step.title,
              text: step.text,
            })),
          }),
        ]}
      />
      <main>
        <Hero />
        <DirectionsSection />
        <FormatsSection />
        <PricingSection />
        <LessonSection />
        <GallerySection />
        <ContactSection />
      </main>
    </>
  )
}
