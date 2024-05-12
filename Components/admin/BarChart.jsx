import React,{useState,useEffect} from 'react'
import { ResponsivePie } from '@nivo/pie'
import axios from 'axios'


const BarChart = () => {
    const token = sessionStorage.getItem("authtoken")
    const [Towing, setTowing] = useState(0)
    const [unberthing, setUnberthing] = useState(0)
    const [emergency, setEmergency] = useState(0)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const getAllJobs=async ()=>{
            try {
                var {data} = await axios.get('https://localhost:7127/api/jobdetails/getalljobs', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(data)
    
            var tow = Array.from(data.data).filter(item=>item.jobType==='Tow').length;
            var unb = Array.from(data.data).filter(item=>item.jobType==='Escort').length;
            var emer = Array.from(data.data).filter(item=>item.jobType==='Salvage').length;
            var total =data.data.length;
            setTotal(total);
            setTowing(Math.floor(tow/total*100));
            setUnberthing(Math.floor(unb/total*100));
            setEmergency(Math.floor(emer/total*100));
            } catch (error) {
                console.log(error)
                
            }
            
          }
          getAllJobs();
    }, [])
    

  return (
    <div className='w-[50vmax] h-[20vmax] flex flex-col justify-between pb-[2vmax]'>
        <div className='px-[1vmax]'>
            <div className='flex justify-between'>
                <p>Towing</p>
                <p>{Towing/100*total}/{total}</p>
            </div>
            <div className='h-[2.5vmax] w-[100%] bg-gray-100 mt-[0.3vmax] rounded'>
                <div className={'h-[100%]  bg-green-400 rounded'} style={{width:Towing+'%'}}></div>
            </div>
        </div>
        <div className='px-[1vmax]'>
        <div className='flex justify-between'>
                <p>Unberthing</p>
                <p>{unberthing/100*total}/{total}</p>
            </div>
            <div className='h-[2.5vmax] w-[100%] bg-gray-100 mt-[0.3vmax] rounded'>
                <div className={'h-[100%]  bg-blue-400 rounded'} style={{width:Towing+'%'}}></div>
            </div>
        </div>
        <div className='px-[1vmax]'>
        <div className='flex justify-between'>
                <p>Emergency</p>
                <p>{emergency/100*total}/{total}</p>
            </div>
            <div className='h-[2.5vmax] w-[100%] bg-gray-100 mt-[0.3vmax] rounded'>
                <div className={'h-[100%]  bg-red-400 rounded'} style={{width:Towing+'%'}}></div>
            </div>
        </div>
    </div>
  )
}

export default BarChart