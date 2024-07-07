import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

interface HomeCardProps  {
    className : string,
    img : string,
    title : string,
    description : string,
    handleClick : () => void
}

const HomeCard = ({img, className, title, description, handleClick}: HomeCardProps) => {
  return (
    <div className={cn('bg-orange-1 px-4 py-6 justify-between w-full flex flex-col xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer', className)} onClick={handleClick}>
    {/* // <div className={`${className} px-4 py-6 justify-between w-full flex flex-col xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer`} onClick={handleClick}> */} 
           <div className='flex-center rounded-[10px] size-12 glassmorphism'>
            <Image 
            src="/icons/add-meeting.svg" alt='meeting' width={27} height={27}/>
            </div>  
            <div>
               <h1 className='text-2xl font-bold'>
                {title}
                </h1> 
                <p className='text-lg font-normal'>
                    {description}
                </p>
            </div>  
        </div>
  )
}

export default HomeCard