"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import Loading from './Loading'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from './ui/textarea'
import ReactDatePicker from "react-datepicker";


const MeetingList = () => {

    const router = useRouter();

    const [meetingState, setMeetingState] = useState<'isJoiningMeeting' | 'isScheduleMeeting' | 'isInstantMeeting' | undefined>();

    const [values, setValues] = useState({
      dateTime : new Date(),
      description : '',
      link : ''
    });

    const [callDetails, setCallDetails] = useState<Call>();
    const { toast } = useToast();

    const {user} = useUser();
    const client = useStreamVideoClient();
    const callType = 'default';

    const createMeeting = async() => {
      if(!client || !user)  return;

      try {

        if(!values.dateTime){
          toast({
            title: "Please select date and time !"
          });
          return;
        }

        const callId = crypto.randomUUID();
        const call = client.call(callType, callId);

        if(!call) throw new Error("No call generated");

        const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString ;
        const description = values.description || "Instant Meeting";

        await call.getOrCreate({
          data:{
            starts_at : String(startsAt),
            custom:{
              description
            }
          }
        })

        setCallDetails(call);

        if(!values.description){
          router.push(`/meeting/${call?.id}`)
        }

        toast({
          title: "Meeting Created !"
        });

      } catch (error) {
        console.log(error);
        toast({
          title: "Failed to start meeting !"
        });
      }
    };

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
        <HomeCard
        img= "/icons/add-meeting.svg"
        title = "New meeting"
        description="Start instant meeting"
        handleClick= {() => setMeetingState('isInstantMeeting')}
        className="bg-orange-1"
        />

        <HomeCard
        img= "/icons/schedule.svg"
        title = "Schedule meeting"
        description="Plan your meeting"
        handleClick= {() => setMeetingState('isScheduleMeeting')}
        className="bg-blue-1"
        />

        <HomeCard
        img= "/icons/recordings.svg"
        title = "View recordings"
        description="Check out your recordings"
        handleClick= {() => router.push('/recordings')}
        className="bg-yellow-1"
        />

        {!callDetails ? (
          <MeetingModal
          isOpen = {meetingState === 'isScheduleMeeting'}
          onClose = {() => setMeetingState(undefined)}
          title = "Create Meeting !" 
          handleClick = {createMeeting}>

            <div className='flex flex-col gap-2.5'>
            <label className='text-base font-normal leading-[22px] text-sky-2'>Add a description</label>
            <Textarea className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0'
            onChange={(e) => setValues({...values, description : e.target.value})}/>
            </div>

            <div className='flex flex-col w-full gap-2.5'>
            <label className='text-base font-normal leading-[22px] text-sky-2'>Select Date</label>
            <ReactDatePicker className='bg-dark-3 p-2 w-full rounded focus:outline-none' 
            selected={values?.dateTime}
            onChange={(date) => setValues({...values, dateTime: date!})}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption='time'
            dateFormat="MMMM d, yyyy, h:mm aa"/>
            </div>

          </MeetingModal>
        )
      :
      (
        <MeetingModal
        isOpen = {meetingState === 'isScheduleMeeting'}
        onClose = {() => setMeetingState(undefined)}
        title = "Meeting created !"
        className = "text-center"
        buttonText = "Copy meeting Link"
        handleClick = {() => {
          navigator.clipboard.writeText(meetingLink);
          toast({title: "meeting link copied !"});
        }}
        image="/icons/checked.svg"
        buttonIcon='/icons/copy.svg'/>
      )}

        <MeetingModal
        isOpen = {meetingState === 'isInstantMeeting'}
        onClose = {() => setMeetingState(undefined)}
        title = "Start an instant meeting !"
        className = "text-center"
        buttonText = "Start meeting"
        handleClick = {createMeeting}/>
    </section>
  )
}

export default MeetingList