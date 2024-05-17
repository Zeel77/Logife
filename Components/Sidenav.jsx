import React from 'react'
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import LiveHelpOutlinedIcon from '@mui/icons-material/LiveHelpOutlined';

const Sidenav = ({isAdmin}) => {
  return (
    <div className='w-[20%] h-screen bg-white flex flex-col justify-between fixed'>
        <div className='h-[30%]'>
            <img src="logo.png" alt="" />
        </div>
        <div className='h-[60%] flex flex-col items-center gap-3 text-[1.3vmax] font-bold'>
            <div className='flex gap-2 w-[80%] p-[10px] bg-orange-400 rounded'>
                <WidgetsOutlinedIcon/>
                <p>Home</p>
            </div>
            <div className='flex gap-2 w-[80%] p-[10px] bg-orange-400 rounded'>
                <LiveHelpOutlinedIcon/>
                <p>FAQs</p>
            </div>
        </div>
        <div className='h-[20%] flex items-center justify-center'>
            <div className='flex gap-2 justify-center'>
                <img src="logout.png" height={20} width={20} alt="" />
                <p>Log Out</p>
            </div>
        </div>
    </div>
  )
}

export default Sidenav