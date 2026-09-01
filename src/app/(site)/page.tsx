import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { getSiteContent } from '@/lib/content'
import DirectionsSection from '../components/DirectionsSection'
import Hero from '../components/Hero'
import JsonLd from '../components/JsonLd'
import {
  createPageMetadata,
  howToJsonLd,
  localBusinessJsonLd,
  offerJsonLd,
  organizationJsonLd,
  PAGE_SEO,
  webPageJsonLd,
  websiteJsonLd,
} from '../seo'

const FormatsSection = dynamic(() => import('../components/FormatsSection'))
const PricingSection = dynamic(() => import('../components/PricingSection'))
const LessonSection = dynamic(() => import('../components/LessonSection'))
const GallerySection = dynamic(() => import('../components/GallerySection'))
const ContactSection = dynamic(() => import('../components/ContactSection'))

export const metadata: Metadata = createPageMetadata(PAGE_SEO.home)

export default async function LexiPage() {
  const content = await getSiteContent()

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
            steps: content.lesson.steps.map((step) => ({
              title: step.title,
              text: step.text,
            })),
          }),
        ]}
      />
      <main>
        <Hero hero={content.hero} />
        <DirectionsSection content={content.directions} />
        <FormatsSection content={content.formats} />
        <PricingSection pricing={content.pricing} />
        <LessonSection content={content.lesson} />
        <GallerySection content={content.gallery} />
        <ContactSection brand={content.brand} content={content.contact} />
      </main>
    </>
  )
}
