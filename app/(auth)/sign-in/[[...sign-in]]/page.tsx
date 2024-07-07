import { SignIn } from '@clerk/nextjs'
import React from 'react'

const SignInPage = () => {
  return (
    <main className='h-screen w-full flex items-center justify-center'>
        <SignIn/>
    </main>
  )
}

export default SignInPage