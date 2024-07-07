// @ts-nocheck

"use client";

import { useGetCalls } from '@/hooks/useGetCalls'
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React ,{useEffect, useState} from 'react'
import MeetingCard from './MeetingCard';
import Loading from './Loading';

const CallList = ({type} : {type : 'upcoming' | 'ended' | 'recordings'}) => {

    const {callRecordings,
        endedCalls,
        upcomingCalls,
        isLoading} = useGetCalls();
        const router = useRouter();
        const [recordings, setRecordings] = useState<CallRecording[]>([])

        const getCalls = () => {
            switch (type) {
                case 'ended':
                    return endedCalls;
                case 'recordings':
                    return recordings;
                case 'upcoming':
                    return upcomingCalls;
            
                default:
                    return [];
            }
        };

        const getNoCallsMessage = () => {
            switch (type) {
                case 'ended':
                    return "No Previous Calls";
                case 'recordings':
                    return "No recorded calls";
                case 'upcoming':
                    return "No Upcoming calls";
            
                default:
                    return '';
            }
        };

        useEffect(() => {
            const fetchRecordings = async() => {
                const callData = await Promise.all(callRecordings.map((meeting) => meeting.queryRecordings()))

                const recordings = callData.filter((meeting) => meeting.recordings.length > 0).flatMap(call => call.recordings)

                setRecordings(recordings)
            };

            type === 'recordings' ? fetchRecordings() : null
        },[type, callRecordings])

        const calls = getCalls();
        const callMsg = getNoCallsMessage();

        if(!calls)  return <Loading/>


  return (
    <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
        {calls && calls.length > 0 ?
        calls.map((meeting : Call | CallRecording) => (
            <MeetingCard
            key={(meeting as Call).id}
            title={(meeting as Call)?.state?.custom?.description || (meeting as Call)?.filename?.substring(0,20) || 'no description'}
            date={(meeting as Call)?.state?.startsAt.toLocaleString() || (meeting as Call)?.startsAt?.toLocaleString()}
            icon={type === 'ended' ? 
                '/icons/previous.svg'
                : type === 'upcoming'
                ?
                '/icons/upcoming.svg'
                : '/icons/recordings.svg'
            }
            isPreviousMeeting = {type === 'ended'}
            buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
            buttonText={type === "recordings" ? 'Play' : "start"}
            handleClick={type === 'recordings' ? () => {router.push(meeting.url)} : () => {router.push(`/meeting/${meeting.id}`)}}
            link={type === 'recordings' ? meeting?.url : 
                `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting?.id}`
            }/>
        ))
        :(
        <h1>{callMsg}</h1>
        )}
        </div>
  )
}

export default CallList