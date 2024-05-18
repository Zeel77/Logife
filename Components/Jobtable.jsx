"use client"
import {React,useState,useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import axios from 'axios';
import { useRouter } from 'next/navigation';






const Jobtable = () => {
    const router = useRouter();
    const columns = [
        { field: 'jobId', headerName: 'Job ID',headerClassName:'bg-orange-100' },
        { field: 'craftName', headerName: 'Craft Name', headerClassName:'bg-orange-100',width:130 },
        { field: 'adviceCode', headerName: 'Advice Code', headerClassName:'bg-orange-100',width:130 },
        {
          field: 'vesselName',
          headerName: 'Vessel Name',
          headerClassName:'bg-orange-100',
          width:130
        },
        {
          field: 'serviceRequestTime',
          headerName: 'Service Request Time',
          headerClassName:'bg-orange-100',
          width:170
        },
        { field: 'jobType', headerName: 'Job Type', headerClassName:'bg-orange-100' },
        { field: 'jobStatus', headerName: 'Job Status', headerClassName:'bg-orange-100' },
        { field: 'action', headerName: 'Action', headerClassName:'bg-orange-100',renderCell: (params) => (
          <button onClick={()=>handleClick(params.row)}>
            <RemoveRedEyeOutlinedIcon />
          </button>
        ), },
      
      
      
      ];


    const [userId, setUserId] = useState(2);
    const [jobList, setJobList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [token, setToken] = useState("")
    var tkn="";

      useEffect(() => {
        const tokenn = sessionStorage.getItem("authtoken")
        tkn=tokenn;
        setToken(tokenn);
      }, [])
    useEffect(() => {
      const getAllJobs=async ()=>{
        try {
            var {data} = await axios.get('http://ec2-184-169-195-8.us-west-1.compute.amazonaws.com/api/jobdetails/getalljobs', {
            headers: {
                'Authorization': `Bearer ${tkn}`
            }
        });
        console.log(data)

        var currJobList = Array.from(data.data).filter(item=>item.userId===userId);
        setJobList(currJobList)
        setIsLoading(false);
        } catch (error) {
            console.log(error)
            if(error.response.status===401){
                router.push(`/login`)
            }
        }
        
      }
      getAllJobs();
    
    }, [])
    
    const handleClick = (row)=>{
        console.log(row);
        
        router.push(`/jobdetails?jobid=${row.jobId}`)
    }

  return (
    <div className='ml-[22%] pt-[5%] pb-4 bg-slate-100 w-[95%] h-[100%]'>
        <div className='w-[23%] h-[60px] p-2 bg-slate-200 ml-[5%] mt-[1.5vmax] flex justify-center items-center rounded'>
            <div className='flex h-[100%] w-[100%]'>
                <div className='flex justify-center items-center text-white font-semibold text-[1.1vmax] bg-orange-500 w-[50%] rounded'>Your Jobs</div>
                <div className='flex justify-center items-center font-semibold text-[1.1vmax] bg-white rounded w-[50%]'>Job History</div>
            </div>
        </div>
    <div className='ml-[5%]'>
        <p className='text-[1.5vmax] font-semibold'>Jobs</p>
    </div>
    {(!isLoading)?
    (<div className='flex justify-center'>
       <div style={{ height: 400, width: '90%' }} className='shadow-md shadow-slate'>
      <DataGrid
      className='bg-white'
        rows={jobList}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
    </div>):(<h1>Lodaing........</h1>)}
    </div>
  )
}

export default Jobtable
