'use client'
import React from 'react'
import Sidenav from '@/Components/Sidenav'
import Header from '@/Components/Header'
import Jobtable from '@/Components/Jobtable'

const page = () => {
  return (
    <div className='flex'>
        <Sidenav/>
        <div className='w-[85%]'>
            <Header/>
            <Jobtable/>
        </div>
    </div>
  )
}

export default page