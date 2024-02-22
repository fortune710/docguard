//import Image from "next/image";
import Link from "next/link";

export default function GetStartedSection() {
    return (
        <section className="py-24 sm:py-32 grid grid-cols-1 place-items-center">
            <div className="bg-blue-600 text-white text-center rounded-2xl w-5/6 p-6 lg:py-10 mx-auto">
                <h1 className="font-ppmori text-3xl font-semibold">
                    Join for free today
                </h1>
                <p className="my-6 text-lg">
                    Leave the paper documents behind, and take charge of your identity.
                </p>
                <Link 
                    className='py-2.5 px-7 self-center text-xl mx-auto font-semibold rounded-[36px] bg-zinc-900 text-white' 
                    href='/register'
                >
                    Get Started
                </Link>
            </div>

            {
                /*
                
                <div>
                    <Image
                        src='/home-mockup.svg'
                        alt="Home Page"
                        width={350}
                        height={1200}
                    />
                </div>
                
                */
            }
        </section>
    )
}