"use client"

import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
  

const MobileNav = () => {

  const pathName = usePathname();

  return (
    <section className='w-full max-w-[264px]'>
        <Sheet>
        <SheetTrigger asChild>
            <Image
            src="/icons/hamburger.svg"
            width={36}
            height={36}
            alt='hamburger icon'
            className='cursor-pointer sm:hidden'/>
        </SheetTrigger>
        <SheetContent side='left' className='bg-dark-1 border-none'>
            <Link
            href="/"
            className='flex items-center gap-1'>
                <Image
                src="/icons/logo.svg"
                width={32}
                height={32}
                alt='Yoom Logo'
                className='max-sm:size-10'/>
                <p className='text-[26px] font-extrabold text-white'>Yoom</p>
            </Link>

            <div className='flex flex-col h-[calc(100vh-72px] justify-between overflow-y-auto'>
              <SheetClose>
                <section className='flex flex-col h-full text-white p-16 gap-6'>
                  {sidebarLinks.map((el) =>{
                      const isActive = pathName === el.route;
                      return (
                        <SheetClose asChild key={el.route}>
                          <Link
                          href={el.route}
                          key={el.label}
                          className={cn('flex gap-4 item-center p-4 rounded-lg w-full',{
                              'bg-blue-1': isActive
                          })}>
                        <Image
                        src={el?.imgUrl}
                        alt={el?.label}
                        height={20}
                        width={20}/> 
                        <p className='font-semibold'>
                          {el?.label}
                        </p>
                          </Link>
                        </SheetClose>
                      )
                  })}
                </section>
              </SheetClose>
            </div>

        </SheetContent>
        </Sheet>

    </section>
  )
}

export default MobileNav