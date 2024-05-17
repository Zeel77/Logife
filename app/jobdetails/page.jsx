'use client'
import {React,useState,useEffect} from 'react'
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import OpenWithOutlinedIcon from '@mui/icons-material/OpenWithOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DirectionsBoatOutlinedIcon from '@mui/icons-material/DirectionsBoatOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import MonitorWeightOutlinedIcon from '@mui/icons-material/MonitorWeightOutlined';
import StraightenOutlinedIcon from '@mui/icons-material/StraightenOutlined';
import Sidenav from '@/Components/Sidenav';
import Header from '@/Components/Header';
import { useSearchParams } from 'next/navigation'
import axios from 'axios';


const page = () => {
    
  const [jobDetail, setJobDetail] = useState({})
  const [vesselDetail, setVesselDetail] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [token, setToken] = useState("")
    const [jobid,setJobid] = useState("")

      useEffect(() => {
        const tokenn = sessionStorage.getItem("authtoken")
        setToken(tokenn);
        const searchParams = useSearchParams()
 
  const jobId = searchParams.get('jobid')
  setJobid(jobid);
      }, [])
    useEffect(() => {
      const getJobDetails = async ()=>{
        var {data} = await axios.get(`https://logistic-backend.azurewebsites.net/api/jobdetails/id?jid=${jobId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(data.data)
        setJobDetail(data.data);

        var {data} = await axios.get(`https://logistic-backend.azurewebsites.net/api/vessel/name?name=${data.data.vesselName}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log("vessel: ",data.data)
        setVesselDetail(data.data)
        setIsLoading(false);
      }
      getJobDetails()
    }, [])
    

  return (
    <div className='flex'>
    <Sidenav/>
    <div className='w-[100%] bg-slate-100'>
        <Header/>
        <div className='p-[2vmax] ml-[22%] mt-[5%]'>
            <div className='h-[10vmax]  flex justify-between items-center'>
                <div className='w-[50%] flex justify-between'>
                    <div className='flex flex-col gap-2 items-center justify-center text-green-600'>
                        <AssignmentIndOutlinedIcon sx={{fontSize:30}}/>
                        <p className='text-[1vmax]'>Assign</p>
                    </div>
                    
                    <p>................</p>
                    <div className='flex flex-col gap-2 items-center justify-center'>
                        <OpenWithOutlinedIcon sx={{fontSize:30}}/>
                        <p className='text-[1vmax]'>Move</p>
                    </div>
                    <p>................</p>
                    <div className='flex flex-col gap-2 items-center justify-center'>
                        <LocationOnOutlinedIcon sx={{fontSize:30}}/>
                        <p className='text-[1vmax]'>Arrive</p>
                    </div>
                    <p>................</p>
                    <div className='flex flex-col gap-2 items-center justify-center'>
                        <PlayArrowOutlinedIcon sx={{fontSize:30}}/>
                        <p className='text-[1vmax]'>Start</p>
                    </div>
                </div>
                <div>
                    <button className='bg-orange-500 w-[9vmax] h-[3vmax] rounded text-[1.1vmax] text-white'>Start</button>
                </div>
            </div>
            {(isLoading)?(<p>Loading......</p>):(<div>
                <p className='text-[1.5vmax] font-semibold'>Job Details</p>
                <div className='grid grid-cols-3 gap-8 bg-white p-[2vmax] rounded-md'>
                    <div className='flex items-center gap-2'>
                        <div className='bg-slate-100 p-[1vmax] rounded-full flex justify-center items-center'>
                            <DescriptionOutlinedIcon sx={{fontSize:25}}/>
                        </div>
                        <div>
                            <p className='text-slate-500 text-[1.1vmax]'>Job Id</p>
                            <p className='text-[1.2vmax] font-semibold'>{jobDetail.jobId}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='bg-slate-100 p-[1vmax] rounded-full flex justify-center items-center'>
                            <DirectionsBoatOutlinedIcon sx={{fontSize:25}}/>
                        </div>
                        <div>
                            <p className='text-slate-500 text-[1.1vmax]'>Vessel Name</p>
                            <p className='text-[1.2vmax] font-semibold'>{jobDetail.vesselName}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='bg-slate-100 p-[1vmax] rounded-full flex justify-center items-center'>
                            <BusinessCenterOutlinedIcon sx={{fontSize:25}}/>
                        </div>
                        <div>
                            <p className='text-slate-500 text-[1.1vmax]'>Job Type</p>
                            <p className='text-[1.2vmax] font-semibold'>{jobDetail.jobType}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='bg-slate-100 p-[1vmax] rounded-full flex justify-center items-center'>
                            <DirectionsBoatOutlinedIcon sx={{fontSize:25}}/>
                        </div>
                        <div>
                            <p className='text-slate-500 text-[1.1vmax]'>Advice Code</p>
                            <p className='text-[1.2vmax] font-semibold'>{jobDetail.adviceCode}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='bg-slate-100 p-[1vmax] rounded-full flex justify-center items-center'>
                            <AccessTimeOutlinedIcon sx={{fontSize:25}}/>
                        </div>
                        <div>
                            <p className='text-slate-500 text-[1.1vmax]'>Service Request Time (SRT)</p>
                            <p className='text-[1.2vmax] font-semibold'>{jobDetail.serviceRequestTime}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='bg-slate-100 p-[1vmax] rounded-full flex justify-center items-center'>
                            <LocationOnOutlinedIcon sx={{fontSize:25}}/>
                        </div>
                        <div>
                            <p className='text-slate-500 text-[1.1vmax]'>Tug Pickup Location</p>
                            <p className='text-[1.2vmax] font-semibold'>{jobDetail.tugPickUpLocation}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='bg-slate-100 p-[1vmax] rounded-full flex justify-center items-center'>
                            <LocationOnOutlinedIcon sx={{fontSize:25}}/>
                        </div>
                        <div>
                            <p className='text-slate-500 text-[1.1vmax]'>Tug Let Go Location</p>
                            <p className='text-[1.2vmax] font-semibold'>{jobDetail.tugLetGoLocation}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='bg-slate-100 p-[1vmax] rounded-full flex justify-center items-center'>
                            <LocationOnOutlinedIcon sx={{fontSize:25}}/>
                        </div>
                        <div>
                            <p className='text-slate-500 text-[1.1vmax]'>Location From (Alongside Indicator)</p>
                            <p className='text-[1.2vmax] font-semibold'>{jobDetail.locationFrom}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='bg-slate-100 p-[1vmax] rounded-full flex justify-center items-center'>
                            <LocationOnOutlinedIcon sx={{fontSize:25}}/>
                        </div>
                        <div>
                            <p className='text-slate-500 text-[1.1vmax]'>Location To (Alongside Indicator)</p>
                            <p className='text-[1.2vmax] font-semibold'>{jobDetail.locationTo}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='bg-slate-100 p-[1vmax] rounded-full flex justify-center items-center'>
                            <DescriptionOutlinedIcon sx={{fontSize:25}}/>
                        </div>
                        <div>
                            <p className='text-slate-500 text-[1.1vmax]'>Pilot Code</p>
                            <p className='text-[1.2vmax] font-semibold'>{jobDetail.pilotCode}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='bg-slate-100 p-[1vmax] rounded-full flex justify-center items-center'>
                            <AssignmentOutlinedIcon sx={{fontSize:25}}/>
                        </div>
                        <div>
                            <p className='text-slate-500 text-[1.1vmax]'>Remarks</p>
                            <p className='text-[1.2vmax] font-semibold'>{jobDetail.remarks}</p>
                        </div>
                    </div>
                    
                </div>
            </div>)}
            
            {(isLoading)?(<p>Loading......</p>):(<div>
            <p className='text-[1.5vmax] font-semibold mt-[2vmax]'>Vessel Details</p>
                <div className='grid grid-cols-3 gap-8 bg-white p-[2vmax] rounded-md'>
                    <div className='flex items-center gap-2'>
                        <div className='bg-slate-100 p-[1vmax] rounded-full flex justify-center items-center'>
                            <DirectionsBoatOutlinedIcon sx={{fontSize:25}}/>
                        </div>
                        <div>
                            <p className='text-slate-500 text-[1.1vmax]'>Name and CallSign</p>
                            <p className='text-[1.2vmax] font-semibold'>{vesselDetail.vesselName}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='bg-slate-100 p-[1vmax] rounded-full flex justify-center items-center'>
                            <MonitorWeightOutlinedIcon sx={{fontSize:25}}/>
                        </div>
                        <div>
                            <p className='text-slate-500 text-[1.1vmax]'>Gross Tonnage (GRT)</p>
                            <p className='text-[1.2vmax] font-semibold'>{vesselDetail.grossTonnage}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='bg-slate-100 p-[1vmax] rounded-full flex justify-center items-center'>
                            <StraightenOutlinedIcon sx={{fontSize:25}}/>
                        </div>
                        <div>
                            <p className='text-slate-500 text-[1.1vmax]'>Length Overall (LOA)</p>
                            <p className='text-[1.2vmax] font-semibold'>{vesselDetail.lengthOverall}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='bg-slate-100 p-[1vmax] rounded-full flex justify-center items-center'>
                            <StraightenOutlinedIcon sx={{fontSize:25}}/>
                        </div>
                        <div>
                            <p className='text-slate-500 text-[1.1vmax]'>Beam</p>
                            <p className='text-[1.2vmax] font-semibold'>{vesselDetail.beam}</p>
                        </div>
                    </div>
                    
                    
                </div>
            </div>)}
        </div>
    </div>
</div>
  )
}

export default page