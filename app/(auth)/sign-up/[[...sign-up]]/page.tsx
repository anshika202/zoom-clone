import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
  return (
    <main className='h-screen w-full flex items-center justify-center'>
        <SignUp/>
    </main>
  )
}

export default SignUpPage