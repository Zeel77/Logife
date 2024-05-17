import React from 'react'

const Header = () => {
  return (
    <div className='h-[10%] bg-orange-200 w-[80%] flex justify-between px-[2vmax] fixed top-0 right-0 z-50'>
        <div className='flex items-center'>
            <p className='text-[1.8vmax] font-semibold'>Hi, Aayush Parekh!</p>
        </div>
        <div className='flex items-center'>
            <img src="profile.png" height={40} width={40} alt="" />
        </div>
    </div>
  )
}

export default Header