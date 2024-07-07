import CallList from '@/components/CallList'
import React from 'react'

const Previous = () => {
  return (
    <div className='flex size-full flex-col gap-10 text-white'>
      <div className='text-3xl font-semibold'>
        Previous    
      </div>
      <CallList type ="ended"/>
    </div>
  )
}

export default Previous