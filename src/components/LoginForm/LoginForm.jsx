'use client'
import React from 'react'
import useAuth from '../Hooks/useAuth'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import SocialLogin from '../Authentication/SocialLogin'

const LoginForm = () => {
  let { signIn } = useAuth()
    let router = useRouter();


  const handleLoginSubmit = e => {
    e.preventDefault()
    let email = e.target.email.value
    let password = e.target.password.value
    let loadingToast = toast.loading('Logging In...')
    signIn(email, password)
      .then(userCredential => {
        const user = userCredential.user
        console.log(user)
        toast.dismiss(loadingToast)
        toast.success('Logged In Successfully!')
        router.push('/')
      })
      .catch(error => {
        let errorCode = error.code
        console.log(errorCode)
        if (errorCode === 'auth/invalid-credential') {
          toast.dismiss(loadingToast)
          return toast.error('Invalid Username or Password')
        }
      })
  }

  return (
    <form onSubmit={handleLoginSubmit} className='max-w-md md:ml-auto w-full'>
      <h3 className='text-[#242627] lg:text-3xl text-2xl font-bold mb-8'>
        Sign in
      </h3>

      <div className='space-y-6'>
        <div>
          <label className='text-sm text-slate-800 font-medium mb-2 block'>
            Email
          </label>
          <input
            name='email'
            type='email'
            required
            className='bg-slate-100 w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-none border focus:border-blue-600 focus:bg-transparent'
            placeholder='Enter Email'
          />
        </div>
        <div>
          <label className='text-sm text-slate-800 font-medium mb-2 block'>
            Password
          </label>
          <input
            name='password'
            type='password'
            required
            className='bg-slate-100 w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-none border focus:border-blue-600 focus:bg-transparent'
            placeholder='Enter Password'
          />
        </div>
      </div>

      <div className='mt-12'>
        <button
          type='submit'
          className='w-full cursor-pointer shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none'
        >
          Log in
        </button>
      </div>

      <SocialLogin></SocialLogin>
    </form>
  )
}

export default LoginForm
