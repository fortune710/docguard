import Features from '@/components/landing-page/features'
import Footer from '@/components/landing-page/footer'
import GetStartedSection from '@/components/landing-page/get-started'
import Header from '@/components/landing-page/header'
import Hero from '@/components/landing-page/hero'
import Testimonials from '@/components/landing-page/testimonials'
import sendEmail from '@/services/ses/sendEmail'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Seamless Storage with Docguard',
  description: 'Docguard is the the onestop platform for storing your important documents'
}

export default function Home() {
  sendEmail(['fortunealebiosu710@gmail.com'], 'Testing', 'This is a test https://linkedin.com/in/fortunealebiosu')
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
