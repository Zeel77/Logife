'use client'
import React, { useEffect,useState } from 'react'
import Sidenav from '@/Components/Sidenav'
import Header from '@/Components/Header'
import DonutChart from '@/Components/admin/DonutChart'
import BarChart from '@/Components/admin/BarChart'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { DeleteOutlineOutlined } from '@mui/icons-material'
import { useRouter} from 'next/navigation';


const page = () => {
    const token = sessionStorage.getItem("authtoken")
    const router=useRouter()

    const columns = [
        { field: 'id', headerName: 'ID', width: 70,headerClassName:'bg-orange-100', },
        { field: 'firstName', headerName: 'First name', width: 130,headerClassName:'bg-orange-100', },
        { field: 'lastName', headerName: 'Last name', width: 130,headerClassName:'bg-orange-100', },
        {
          field: 'email',
          headerName: 'Email',
          headerClassName:'bg-orange-100',
        },
        {
          field: 'mobileNo',
          headerName: 'Mobile',
          headerClassName:'bg-orange-100',
        },
        {
          field: 'status',
          headerName: 'Status',
          headerClassName:'bg-orange-100',
        },
        {
            field: 'updatedAt',
            headerName: 'UpdatedAT',
            headerClassName:'bg-orange-100',
            width:200
          },
          { field: 'edit', headerName: 'Edit', headerClassName:'bg-orange-100',renderCell: (params) => (
            <button onClick={()=>{}}>
              <ModeEditOutlineOutlinedIcon />
            </button>
          ), },
          { field: 'delete', headerName: 'Delete', headerClassName:'bg-orange-100',renderCell: (params) => (
            <button onClick={()=>{}}>
              <DeleteOutlineOutlined />
            </button>
          ), }

      ];
      
      const [users, setUsers] = useState([])
      const [activeusers, setActiveusers] = useState(0);
      const [inactiveusers, setInactiveusers] = useState(0);

      

      useEffect(() => {
        const getTop5users = async ()=>{
          try {
            var {data} = await axios.get('https://localhost:7127/api/user/recentusers', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if(data.status!==200){
          router.push('/login')
        }
        console.log(data)
        setUsers(data.data)
          } catch (error) {
            router.push('/login')
          }
            
        }
        getTop5users()

        const getAllUsers = async ()=>{
          try {
            var {data} = await axios.get('https://localhost:7127/api/user/getallusers', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if(data.status!==200){
          router.push('/login')
        }
        console.log(data)
        var activeu = Array.from(data.data).filter(x=>x.status==='Active').length;
        var inactiveu = Array.from(data.data).filter(x=>x.status==='Inactive').length;
        setActiveusers(activeu);
        setInactiveusers(inactiveu);
          } catch (error) {
            router.push('/login')
          }
            
        }
        getAllUsers()
      }, [])
      

  return (
    <div className='flex'>
        <Sidenav isAdmin={true}/>
        <div className='w-[81%]'>
            <Header/>
            <div className='w-[100%] ml-[24%] mt-[5%] h-[100%] bg-gray-100'>
                <div className='p-[2vmax]'>
                    <p className='py-[1vmax] text-[1.6vmax] font-semibold'>Dashboard</p>
                    <div className='flex gap-4'>
                        <div className='bg-white rounded-md'>
                            <p className='p-2 font-semibold'>Users:{activeusers+inactiveusers}</p>
                            <DonutChart active={activeusers} inactive={inactiveusers}/>
                        </div>
                        <div className='bg-white rounded-md'>
                        <p className='p-2 font-semibold'>Jobs</p>
                            <BarChart/>
                        </div>
                    </div>
                </div>
                <div>
                    <p className='py-[1vmax] px-[2vmax] text-[1.6vmax] font-semibold'>Recently Added</p>
                <div className='flex justify-center'>
       <div style={{ height: 400, width: '95%' }} className='shadow-md shadow-slate bg-white rounded-md'>
      <DataGrid
        rows={users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default page