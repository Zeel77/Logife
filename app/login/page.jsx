"use client"
import React, { useState } from 'react'
import Signup from '@/Components/Signup';
import Signin from '@/Components/Signin';

const page = () => {

    const [isLogin, setIsLogin] = useState(false);

    const handleSignup=()=>{
        setIsLogin(false);
    }

    const handleSignin=()=>{
        setIsLogin(true);
    }

    return (
        <div className='flex h-screen '>
            <div className='w-1/2 flex justify-center items-center'>
                <img src="logo.png" alt="" className='w-[30vmax] h-[20vmax]' />
            </div>
            <div className='w-1/2 flex flex-col justify-center items-center p-[4vmax] '>
                <div className='w-full flex justify-between '>
                    <button className={`${isLogin?'bg-slate-100 text-slate-500':'bg-blue-500 shadow-sm shadow-blue-300 text-white'} w-1/2 h-[7vh]  text-[1.1vmax] `} onClick={handleSignup}>Sign-Up</button>
                    <button className={`${isLogin?'bg-blue-500 shadow-sm shadow-blue-300 text-white':'bg-slate-100 text-slate-500'} w-1/2 h-[7vh] text-[1.1vmax]`} onClick={handleSignin}>Sign-In</button>
                </div>
                {(isLogin)?<Signin/>:<Signup/>}
            </div>
        </div>
    )
}

export default page