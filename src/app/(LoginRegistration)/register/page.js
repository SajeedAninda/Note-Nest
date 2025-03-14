'use client'
import SocialLogin from '@/components/Authentication/SocialLogin';
import useAuth from '@/components/Hooks/useAuth';
import useAxiosInstance from '@/components/Hooks/useAxiosInstance';
import { useRouter } from "next/navigation";
import React from 'react';
import toast from 'react-hot-toast';

const page = () => {
    let axiosInstance = useAxiosInstance()
    let { signUp } = useAuth()
    const router = useRouter()


    let handleRegisterSubmit = async e => {
        e.preventDefault();
        let firstName = e.target.name.value;
        let lastName = e.target.lname.value;
        let fullName = firstName + ' ' + lastName;
        let email = e.target.email.value;
        let password = e.target.password.value;
        let imgUrl = e.target.imgUrl.value;

        if (password.length < 6) {
            return toast.error('Password must be at least 6 characters!')
        }
        if (!/[A-Z]/.test(password)) {
            return toast.error('Password must contain at least one capital letter!')
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return toast.error(
                'Password must contain at least one special character!'
            )
        }

        let loadingToast = toast.loading('Registering...')

        try {
            let userCredential = await signUp(email, password)
            let user = userCredential.user

            let userDetails = { fullName, email, imgUrl }
            let res = await axiosInstance.post('/userRegister', userDetails)

            if (res.data.insertedId) {
                toast.dismiss(loadingToast)
                toast.success('Registration Successful. Please Login')
                router.push('/login')
            }
        } catch (error) {
            console.error(error)
            toast.dismiss(loadingToast)
            toast.error(error.message)
        }
    }

    return (
        <div className="max-w-4xl max-sm:max-w-lg mx-auto p-6 mt-2">
            <div className="text-center mb-12 sm:mb-16">
                <h4 className="text-[#242627] text-[30px] font-bold mt-6">Sign up to use Note-Nest</h4>
            </div>

            <form onSubmit={handleRegisterSubmit}>
                <div className="grid sm:grid-cols-2 gap-8">
                    <div>
                        <label className="text-[#242627] text-sm font-medium mb-2 block">First Name</label>
                        <input name="name" type="text" className="bg-slate-100 w-full text-[#242627] text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter name" required/>
                    </div>
                    <div>
                        <label className="text-[#242627] text-sm font-medium mb-2 block">Last Name</label>
                        <input name="lname" type="text" className="bg-slate-100 w-full text-[#242627] text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter last name" required/>
                    </div>
                    <div>
                        <label className="text-[#242627] text-sm font-medium mb-2 block">Email Id</label>
                        <input name="email" type="text" className="bg-slate-100 w-full text-[#242627] text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter email" required/>
                    </div>
                    <div>
                        <label className="text-[#242627] text-sm font-medium mb-2 block">Password</label>
                        <input name="password" type="password" className="bg-slate-100 w-full text-[#242627] text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter password" required/>
                    </div>

                </div>
                <div className='mt-8'>
                    <label className="text-[#242627] text-sm font-medium mb-2 block">Image Url</label>
                    <input name="imgUrl" type="text" className="bg-slate-100 w-full text-[#242627] text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter Image Url" required/>
                </div>

                <div className="mt-6">
                    <button type="submit" className="cursor-pointer mx-auto block py-4 text-[18px] px-12 text-sm font-medium tracking-wider rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                        Sign up
                    </button>
                </div>
            </form>

            <SocialLogin></SocialLogin>
        </div>
    );
};

export default page;