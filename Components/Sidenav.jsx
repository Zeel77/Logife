import React,{useState} from 'react'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import DirectionsBoatOutlinedIcon from '@mui/icons-material/DirectionsBoatOutlined';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LiveHelpOutlinedIcon from '@mui/icons-material/LiveHelpOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useRouter} from 'next/navigation';
import axios from 'axios';


const Sidenav = ({isAdmin}) => {
    const [selectedTab, setSelectedTab] = useState('Dashboard');

    const handleUserTab = (arg)=>{
        if(arg=='home'){
            sessionStorage.setItem("usertab","home");
        }else{
            sessionStorage.setItem("usertab","faq");
        }
    }

    const handleSelectTab = (tabName) => {
        setSelectedTab(tabName);
        if(tabName==='Dashboard'){
            router.push('/admindashboard')
        }else if(tabName==='Jobs'){
            router.push('/adminjobs')
        }else if(tabName==='Users'){
            router.push('/adminusers')
        }
    };

    const isSelected = (tabName) => {
        return selectedTab === tabName ? 'bg-orange-500 text-white cursor-pointer' : 'hover:bg-slate-100 cursor-pointer';
    };

    const router=useRouter()
    const token = sessionStorage.getItem("authtoken")
    const handleLogout = async ()=>{
        const userId = parseInt(sessionStorage.getItem("userId"));
        var {data} = await axios.post('https://localhost:7127/api/auth/logout?userId='+userId,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(data)
        if(data.status===200){
            sessionStorage.clear()
            router.push('/login')
        }
    }

  return (
    (isAdmin)?
        <div className='w-[20%] h-screen bg-white flex flex-col justify-between fixed z-50'>
            <div className='h-[30%]'>
                <img src="logo.png" alt="" />
            </div>
            <div className='h-[60%] flex flex-col items-center gap-3 text-[1.3vmax] font-semibold'>
                <div className={`flex gap-2 w-[80%] p-[10px] rounded ${isSelected('Dashboard')}`} onClick={() => handleSelectTab('Dashboard')}>
                    <DashboardOutlinedIcon/>
                    <p>Dashboard</p>
                </div>
                <div className={`flex gap-2 w-[80%] p-[10px] rounded ${isSelected('Jobs')}`} onClick={() => handleSelectTab('Jobs')}>
                    <DirectionsBoatOutlinedIcon/>
                    <p>Jobs</p>
                </div>
                <div className={`flex gap-2 w-[80%] p-[10px] rounded ${isSelected('Users')}`} onClick={() => handleSelectTab('Users')}>
                    <PersonOutlineOutlinedIcon/>
                    <p>Users</p>
                </div>
                
            </div>
            <div className='h-[20%] flex items-center justify-center '>
                <div className='flex gap-2 justify-center hover:bg-slate-100 cursor-pointer' onClick={handleLogout}>
                    <LogoutOutlinedIcon/>
                    <p>Log Out</p>
                </div>
            </div>
        </div>:
        <div className='w-[20%] h-screen bg-white flex flex-col justify-between fixed'>
        <div className='h-[30%]'>
            <img src="logo.png" alt="" />
        </div>
        <div className='h-[60%] flex flex-col items-center gap-3 text-[1.3vmax] font-semibold'>
            <div className={`flex gap-2 w-[80%] p-[10px] rounded ${isSelected('Dashboard')}`} onClick={() => handleUserTab('home')}>
                <DashboardOutlinedIcon/>
                <p>Home</p>
            </div>
            <div className={`flex gap-2 w-[80%] p-[10px] rounded ${isSelected('Dashboard')}`} onClick={() => handleUserTab('faq')}>
                <LiveHelpOutlinedIcon/>
                <p>Faqs</p>
            </div>
        </div>
        <div className='h-[20%] flex items-center justify-center hover:bg-slate-100'>
            <div className='flex gap-2 justify-center'>
                <LogoutOutlinedIcon/>
                <p>Log Out</p>
            </div>
        </div>
    </div>
  )
}

export default Sidenav