"use client"

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
   const pathName = usePathname();
  return (
    <div className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between pt-28 text-white bg-dark-1 p-6 max-sm:hidden lg:w-[264px]'>
        <div className='flex flex- flex-col gap-6'>
            {sidebarLinks.map((el) =>{
                const isActive = pathName === el.route; 
                return (
                    <Link
                    href={el.route}
                    key={el.label}
                    className={cn('flex gap-4 item-center p-4 rounded-lg justify-start',{
                        'bg-blue-1': isActive
                    })}>
                   <Image
                   src={el?.imgUrl}
                   alt={el?.label}
                   height={24}
                   width={24}/>
                   <p className='text-lg font-semibold max-lg:hidden'>
                    {el?.label}
                   </p>
                    </Link>
                )
            })}
        </div>
        </div>
  )
}

export default Sidebar