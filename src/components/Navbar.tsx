"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import DesktopNavbar from './DesktopNavbar'
import MobileNavbar from './MobileNavbar'
import { useAuth } from '@clerk/nextjs'

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { userId } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      // Change opacity when scrolled more than 10px
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <nav className={`sticky top-0 w-full border-b z-50 transition-all duration-200 ${scrolled 
      ? 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80' 
      : 'bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/30'}`}>
        <div className='max-w-7xl mx-auto px-4'>
             <div className='flex items-center justify-between h-16'>
                <div className='flex items-center'>
                    <Link href={'/'} className='text-2xl font-bold text-primary font-mono tracking-wider'>
                        <div className='flex'>
                          <p className='text-blue-600'>M</p>
                          <p>Social</p>
                        </div>
                    </Link>

                </div>
                <DesktopNavbar/>
                <MobileNavbar />
             </div>
        </div>
    </nav>
  )
}

export default Navbar
