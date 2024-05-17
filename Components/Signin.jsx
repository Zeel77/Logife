"use client"
import React,{useState,useRef, useEffect} from 'react'
import axios from 'axios';
import { useRouter} from 'next/navigation';

const Signin = () => {

    // const dispatch = useDispatch();

    const signInBtn=useRef();
    
    const router=useRouter()

    const [userRegistration, setUserRegistration] = useState({
        Email: "",
        Password: ""
    });

    const [userEmail, setUserEmail] = useState('')

    useEffect(() => {
      
    }, [])
    
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserRegistration({ ...userRegistration, [name]: value });
    }

    const handleSubmit = async (e) => {
        signInBtn.textConnect='Loading...'
        e.preventDefault();
        console.log(e.target.Email.value);
        setUserEmail(e.target.Email.value);
        const headers = {
            'Content-Type': 'application/json'
        }

        try {
            const {data} = await axios.post('https://logistic-backend.azurewebsites.net/api/auth/login', userRegistration, { headers: headers });
            // const token = response.data.data;
            // const status =await response.data.statusCode;
            console.log(data.data)
            const authToken = data.data.token;
            sessionStorage.setItem("authtoken",authToken);
            sessionStorage.setItem("uname",data.data.username);
            if(data.status===200){
                (data.data.userType===1)?
                router.push('/admindashboard'):
                router.push(`/home`)
                // localStorage.setItem("token",token)
            }else{
                alert("Wrong credentials!")
            }

        } catch (error) {
            console.log(error);
            alert("Something went wrong!")
        }



    }
    return (
        <div className='shadow-md shadow-blue-300 h-full w-full flex flex-col items-center p-2'>
            <p className='text-[2.5vmax] text-blue-500 font-bold'>Welcome to AquaOPS!</p>
            <p className='text-[1.3vmax] text-slate-500 mb-[3vmax]'>Fill out the registration form below to sign up</p>
            <form className='flex flex-col w-full px-[5vmax] gap-[0.5vmax]' onSubmit={handleSubmit}>
                <label className='text-[1.2vmax] text-blue-500'>Email</label>
                <input className='outline-none bg-slate-100 h-[6vh] rounded-lg p-[0.7vmax]' type="email" name="Email" value={userRegistration.email} onChange={handleChange} />
                <label className='text-[1.2vmax] text-blue-500'>Password</label>
                <input className='outline-none bg-slate-100 h-[6vh] rounded-lg p-[0.7vmax]' type="password" name="Password" value={userRegistration.password} onChange={handleChange} />
                <button className='w-full bg-blue-500 self-center h-[6vh] rounded-xl text-white my-[2vmax] cursor-pointer hover:bg-blue-600' type="submit" >Submit</button>
            </form>
            <p className='text-[1.4vmax] text-slate-400'>Or sign-in with another account</p>
            <div className='w-full flex gap-2 justify-between px-[5vmax] my-[1vmax]'>
                <button className='bg-red-600 w-3/4 h-[5vh] text-white rounded text-[1.1vmax]'>Google</button>
                <button ref={signInBtn} className='bg-blue-600 w-3/4 h-[5vh] text-white rounded text-[1.1vmax]'>Facebook</button>
            </div>
            <p className='text-[1.3vmax] text-slate-700 mb-[2vmax]'>Not have an account? <span className='text-blue-500 underline'><a href="">Sign Up</a></span></p>
        </div>
    )
}

export default Signin
