import Image from 'next/image'
import Link from 'next/link'


export default function Hero() {
    return (
    <section className='text-center font-inter items-center flex flex-col gap-6 text-gray-900 pt-16 md:pt-20 lg:pt-24'>
        <h1 className='text-5xl font-semibold font-ppmori'>
          No more paper documents<br/> in a briefcase
        </h1>
        <p className='text-xl font-regular font-inter'>
          Seamless storage of your most important documents all in one app, <br/> so you never have to carry them with you
        </p>


        <Link 
          className='py-2.5 px-7 self-center text-xl font-semibold rounded-[36px] bg-zinc-900 text-white' 
          href='/register'
        >
          Get Started
        </Link>
        
        <Image
          src='/docguard-mockup.svg'
          alt='DocGuard in full flow!'
          width={800}
          height={1300}
          className='max-sm:hidden h-auto mt-10 lg:mt-14'
          priority={true}
        />

        <Image
          src='/home-mockup.svg'
          alt='DocGuard in full flow!'
          width={300}
          height={800}
          className='sm:hidden mt-10 h-auto w-auto max-sm:px-6 box-border lg:mt-14'
          priority={true}
        />

    </section>

    )
}