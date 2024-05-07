import Features from '@/components/landing-page/features'
import Footer from '@/components/landing-page/footer'
import GetStartedSection from '@/components/landing-page/get-started'
import Header from '@/components/landing-page/header'
import Hero from '@/components/landing-page/hero'
import Testimonials from '@/components/landing-page/testimonials'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Seamless Storage with Docguard',
  description: 'Docguard is the the onestop platform for storing your important documents'
}

export default function Home() {
  return (
    <>
      <Header/>
      <Hero/>
      <Features/>
      <Testimonials/>
      <GetStartedSection/>
      <Footer/>

    </>
  )
}
