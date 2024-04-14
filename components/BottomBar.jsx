'use client';
import { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Menu from './Menu';
import useUserStore from '@/store/userStore';
import Link from 'next/link';

const BottomBar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isLoggedIn = useUserStore((state) => state.isSignedIn);

    const handleCloseMenu = () => {
        setMobileMenuOpen(false);
    };

    if (!isLoggedIn) return null;

    return (
        <>
            <header className='fixed bottom-0 p2 w-full flex bg-slate-50 z-50 shadow-up rounded-t-md lg:max-w-md lg:left-1/2 lg:-translate-x-1/2'>
                <nav className='flex justify-evenly w-full'>
                    <Link href='/' className='p-2'>
                        Team
                    </Link>
                    <Link href='/list' className='p-2'>
                        Players
                    </Link>
                    <Link href='' className='p-2'>
                        Competitors
                    </Link>
                </nav>
                <div className='p-2 pr-5 flex justify-end'>
                    <button onClick={() => setMobileMenuOpen(true)}>
                        <Bars3Icon className='h-6 w-6' aria-hidden='true' />
                    </button>
                </div>
            </header>
            {mobileMenuOpen && (
                <Menu onCloseMenu={handleCloseMenu} isLoggedIn={isLoggedIn} />
            )}
        </>
    );
};

export default BottomBar;
