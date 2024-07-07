"use client";

import { DeviceSettings, VideoPreview, useCall } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';

const MeetingSetup = ({setIsSetupComplete}: {setIsSetupComplete : (value : boolean) => void}) => {

    const [isMicCamToggleOn, setisMicCamToggleOn] = useState(false);
    const call = useCall();
    
    
    useEffect(() => {
        if(!call)  {
            return;
        }
        
        if(isMicCamToggleOn){
                call.camera.disable();
                call?.microphone.disable();
            }
            else{
                call?.camera.enable();
                call?.microphone.enable();
            }
    },[isMicCamToggleOn, call])

  return (
    <div className='flex h-screen flex-col gap-3 text-white justify-center items-center w-full'>
        <h1 className='text-2xl font-bold'>
            SetUp
            {call && 
            <VideoPreview/>}

            <div className='flex h-16 items-center justify-center gap-3'>
                <label className='flex items-center justify-center font-medium gap-2'>
                    <input type="checkbox"
                    checked={isMicCamToggleOn}
                    onChange={(e) => setisMicCamToggleOn(e.target.checked)} />
                    Join with mic and camera OFF !
                </label>
                <DeviceSettings/>
                <Button className='rounded-md bg-green-500 px-4 py-2.5'
                onClick={() => {
                    call?.join();
                    setIsSetupComplete(true)}}>
                    Join meeting
                </Button>
            </div>
        </h1>
    </div>
  )
}

export default MeetingSetup