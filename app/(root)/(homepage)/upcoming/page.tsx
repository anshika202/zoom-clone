import CallList from '@/components/CallList'
import React from 'react'

const Upcoming = () => {
  return (
    <div className='flex size-full flex-col gap-10 text-white'>
      <div className='text-3xl font-semibold mb-5'>
        Upcoming
        <CallList type ="upcoming"/>
      </div>
    </div>
  )
}

export default Upcoming