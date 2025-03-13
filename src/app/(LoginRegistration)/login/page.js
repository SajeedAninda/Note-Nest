import LoginForm from '@/components/LoginForm/LoginForm';
import Link from 'next/link';
import React from 'react';

const page = () => {
    return (
        <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
            <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl max-md:max-w-md w-full">
                <div>
                    <h2 className="lg:text-5xl text-3xl font-bold lg:leading-[57px] text-[#242627]">
                        Get Logged In & Start Using Note-Nest
                    </h2>
                    <p className="text-sm mt-12 text-slate-500">Don't have an account <Link href={"/register"} className="text-blue-600 font-medium hover:underline ml-1">Register here</Link></p>
                </div>

                <LoginForm />
            </div>
        </div>
    );
};

export default page;