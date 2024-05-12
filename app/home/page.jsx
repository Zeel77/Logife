'use client'
import React from 'react'
import Sidenav from '@/Components/Sidenav'
import Header from '@/Components/Header'
import Jobtable from '@/Components/Jobtable'
import { useRouter } from 'next/navigation'
import Faq from '@/Components/Faq'


const page = () => {
  const router=useRouter()

  const currtab = sessionStorage.getItem("usertab");
  if(sessionStorage.getItem("userType")==1){
    router.push('/login');
  }
  return (
    <div className='flex'>
        <Sidenav/>
        <div className='w-[85%]'>
            <Header/>
            {(currtab!='home')?<Faq/>:<Jobtable/>}
        </div>
    </div>
  )
}

export default page