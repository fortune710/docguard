import MenuButton from '@/components/landing-page/menu-btn'
import Image from 'next/image'


export default async function Header() {
    
    return (
        <header className='px-4 md:px-9 lg:px-12 pt-3 md:pt-5'>
            <nav className='flex items-center justify-between w-full'>
                <Image 
                    src='/docguard.png' 
                    className='h-auto' 
                    alt='DocGuard Logo' 
                    priority={true}
                    width={180} height={60}
                />

                <MenuButton/>
            </nav>
        </header>
    )
}