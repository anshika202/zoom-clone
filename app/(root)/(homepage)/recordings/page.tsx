import CallList from '@/components/CallList'
import React from 'react'

const Recordings = () => {
  return (
    <div className='flex size-full flex-col gap-10 text-white'>
      <div className='text-3xl font-semibold'>
        Recordings
      </div>
      <CallList type='recordings'/>
    </div>
  )
}

export default Recordings