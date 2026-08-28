import Hero from './components/Hero'
import FormatsSection from './components/FormatsSection'
import PricingSection from './components/PricingSection'
import LessonSection from './components/LessonSection'
import FaqSection from './components/FaqSection'
import ContactSection from './components/ContactSection'

export default function LexiPage() {
  return (
    <main>
      <Hero />
      <FormatsSection />
      <PricingSection />
      <LessonSection />
      <FaqSection />
      <ContactSection />
    </main>
  )
}
