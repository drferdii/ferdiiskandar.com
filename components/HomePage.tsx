'use client'

import AbbyWidget from '@/components/AbbyWidget'
import BlueprintStory from '@/components/BlueprintStory'
import Contact from '@/components/Contact'
import Expertise from '@/components/Expertise'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Impact from '@/components/Impact'
import Manifesto from '@/components/Manifesto'
import Navbar from '@/components/Navbar'
import PortfolioStory from '@/components/PortfolioStory'
import ScrollEnter from '@/components/ScrollEnter'
import ScrollReveal from '@/components/ScrollReveal'

export default function HomePage() {
  return (
    <div id="ferdi-editorial-site">
      <div aria-hidden="true" id="top" />
      <ScrollEnter />
      <Navbar />
      <main className="fi-shell" id="main-content">
        <Hero />
        <ScrollReveal direction="fade">
          <Manifesto />
        </ScrollReveal>
        <ScrollReveal direction="left">
          <Impact />
        </ScrollReveal>
        <ScrollReveal direction="scale">
          <Expertise />
        </ScrollReveal>
        <BlueprintStory />
        <PortfolioStory />
        <ScrollReveal direction="fade" delay={0.15}>
          <Contact />
        </ScrollReveal>
        <AbbyWidget />
      </main>
      <Footer />
    </div>
  )
}
