"use client"

import Loading from '@/components/Loading';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'

const Meeting = ({ params: {id} }: { params: { id: string } }) => {

  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const {user , isLoaded} = useUser();
  const {call, isCallLoading} = useGetCallById(id);

  if(!isLoaded || isCallLoading)  return <Loading/>

  return (
    <main className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? 
          <MeetingSetup setIsSetupComplete = {setIsSetupComplete}/>
        :
        <MeetingRoom/>}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting