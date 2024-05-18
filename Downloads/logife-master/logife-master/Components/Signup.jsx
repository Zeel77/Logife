'use client'
import React, { useState } from 'react'
import axios from 'axios';


const Signup = () => {
    const [userRegistration, setUserRegistration] = useState({
        id: 0,
        firstName: "",
        lastName: "",
        password: "",
        roleId: 0,
        email: "",
        mobileNo: "",
        status: "",
        shiftDetail: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserRegistration({ ...userRegistration, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const userObj = {
        //     firstName: userRegistration.firstName,
        //     lastName: userRegistration.lastName,
        //     email: userRegistration.email,
        //     mobile: userRegistration.mobile,
        //     password: userRegistration.password,
        //     confirmPassword: userRegistration.confirmPassword
        //   };
        console.log(userRegistration);
        const headers = {
            'Content-Type': 'application/json'
        }


        try {
            const response = await axios.post('http://ec2-184-169-195-8.us-west-1.compute.amazonaws.com/api/auth/register', userRegistration, { headers: headers });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }



    }
    return (
        <div className='shadow-md shadow-blue-300 h-full w-full flex flex-col items-center p-2 overflow-y-scroll'>
            <p className='text-[2.5vmax] text-blue-500 font-bold'>Welcome to AquaOPS!</p>
            <p className='text-[1.3vmax] text-slate-500 mb-[3vmax]'>Fill out the registration form below to sign up</p>
            <form className='flex flex-col w-full px-[5vmax] gap-[0.5vmax]' onSubmit={handleSubmit}>
                <label className='text-[1.2vmax] text-blue-500'>First Name</label>
                <input className='outline-none bg-slate-100 h-[6vh] rounded-lg p-[0.7vmax]' type="text" name="firstName" value={userRegistration.firstName} onChange={handleChange} />
                <label className='text-[1.2vmax] text-blue-500'>Last Name</label>
                <input className='outline-none bg-slate-100 h-[6vh] rounded-lg p-[0.7vmax]' type="text" name="lastName" value={userRegistration.lastName} onChange={handleChange} />
                <label className='text-[1.2vmax] text-blue-500'>Email</label>
                <input className='outline-none bg-slate-100 h-[6vh] rounded-lg p-[0.7vmax]' type="email" name="email" value={userRegistration.email} onChange={handleChange} />
                <label className='text-[1.2vmax] text-blue-500'>Mobile Number</label>
                <input className='outline-none bg-slate-100 h-[6vh] rounded-lg p-[0.7vmax]' type="text" name="mobileNo" value={userRegistration.mobileNo} onChange={handleChange} />
                <label className='text-[1.2vmax] text-blue-500'>Password</label>
                <input className='outline-none bg-slate-100 h-[6vh] rounded-lg p-[0.7vmax]' type="text" name="password" value={userRegistration.password} onChange={handleChange} />
                <input className='w-full bg-blue-500 self-center h-[6vh] rounded-xl text-white my-[2vmax]' type="submit" value="Submit" />
            </form>
            <p className='text-[1.4vmax] text-slate-400'>Or sign-up with another account</p>
            <div className='w-full flex gap-2 justify-between px-[5vmax] my-[1vmax]'>
                <button className='bg-red-600 w-3/4 h-[5vh] text-white rounded text-[1.1vmax]'>Google</button>
                <button className='bg-blue-600 w-3/4 h-[5vh] text-white rounded text-[1.1vmax]'>Facebook</button>
            </div>
            <p className='text-[1.3vmax] text-slate-700 mb-[2vmax]'>Already have an account? <span className='text-blue-500 underline'><a href="">Sign in</a></span></p>
        </div>
    )
}

export default Signup