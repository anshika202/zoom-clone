import { cn } from '@/lib/utils';
import { CallControls, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout } from '@stream-io/video-react-sdk'
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, Users } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import EndCall from './EndCall';


const MeetingRoom = () => {

  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal')

  type CallLayout = 'grid' | 'speaker-left' | 'speaker-right'

  const [layout, setLayout] = useState<CallLayout>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);

  const CallLayout = () =>{
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout/>

      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition='left'/>
        
      default:
        return <SpeakerLayout participantsBarPosition='right'/>;
    }
  }

  return (
    <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
      <div className='relative flex size-full justify-center items-center'>
        <div className='flex size-full max-w-[1000px] items-center'>
        <CallLayout/>
        </div>

        <div className={cn('h-[calc(100vh-86px)] ml-2 hidden', {'show-block' : showParticipants})}>
          <CallParticipantsList onClose={() => setShowParticipants(false)}/>
        </div>
      </div>

      <div className='fixed bottom-0 w-full items-center flex justify-center gap-5 flex-wrap'>
        <CallControls/>


        <DropdownMenu>
        <div className='flex items-center'>
        <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
          <LayoutList className='text-white' size={20}/>
        </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent className='text-white border-dark-1 bg-dark-1'>
          {['Grid', 'Speaker-Right', 'Speaker-Left'].
          map((item, index) => (
            <div key={index}>
              <DropdownMenuItem className='cursor-pointer'
              onClick={() => setLayout(item.toLocaleLowerCase() as CallLayout)}>
                {item}
              </DropdownMenuItem>
              <DropdownMenuSeparator className='border-dark-1'/>
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <CallStatsButton/>    

          <button onClick={() => setShowParticipants(!showParticipants)}>
            <div className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
              <Users/>
            </div>
          </button>

          {!isPersonalRoom && <EndCall/>}

      </div>

    </section>
  )
}

export default MeetingRoom