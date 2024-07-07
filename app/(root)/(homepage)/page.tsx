import MeetingList from '@/components/MeetingList';
import React from 'react'

const Home = () => {

  let time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  let date = new Date().toDateString();

  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
        <div className='flex flex-col h-full justify-between max-md:px-5 max-md:py-8 lg:p-11 '>
          <h2 className='glassmorphism py-2 max-w-[270px] rounded text-center text-base font-normal'>
            Upcoming meeting at 12:30 PM
          </h2>

            <div className='flex flex-col gap-2'>
              <h1 className='text-4xl font-extrabold lg:text-7xl'>
                {time}
              </h1>
              <p className='text-lg font-medium text-sky-100'>
                {date}
              </p>
            </div>
        </div>
      </div>
      <MeetingList/>
    </section>
  )
}

export default Home