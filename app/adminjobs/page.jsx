"use client"
import { React, useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Sidenav from '@/Components/Sidenav';
import Header from '@/Components/Header';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { DeleteOutlineOutlined } from '@mui/icons-material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';



const page = () => {
  const router = useRouter();

  if(sessionStorage.getItem("userType")==0){
    router.push('/login');
  }
  const token = sessionStorage.getItem("authtoken")
  const columns = [
    { field: 'jobId', headerName: 'Job ID', headerClassName: 'bg-orange-100' },
    { field: 'userId', width: 85, headerName: 'User ID', headerClassName: 'bg-orange-100' },
    { field: 'craftName', headerName: 'Craft Name', headerClassName: 'bg-orange-100', width: 100 },
    {
      field: 'vesselName',
      headerName: 'Vessel Name',
      headerClassName: 'bg-orange-100',
      width: 130
    },
    {
      field: 'serviceRequestTime',
      headerName: 'Service Request Time',
      headerClassName: 'bg-orange-100',
      width: 170
    },
    { field: 'jobType', headerName: 'Job Type', headerClassName: 'bg-orange-100' },
    { field: 'jobStatus', headerName: 'Job Status', headerClassName: 'bg-orange-100' },
    {
      field: 'action', width: 50, headerName: 'View', headerClassName: 'bg-orange-100', renderCell: (params) => (
        <button onClick={() => handleClick(params.row)}>
          <RemoveRedEyeOutlinedIcon />
        </button>
      ),
    },

    {
      field: 'edit', width: 50, headerName: 'Edit', headerClassName: 'bg-orange-100', renderCell: (params) => (
        <button onClick={() => handleEdit(params.row)}>
          <ModeEditOutlineOutlinedIcon />
        </button>
      ),
    },

    {
      field: 'delete', width: 50, headerName: 'Delete', headerClassName: 'bg-orange-100', renderCell: (params) => (
        <button onClick={() => handleDelete(params.row)}>
          <DeleteOutlineOutlined />
        </button>
      ),
    },



  ];


  const [userId, setUserId] = useState(1);
  const [jobList, setJobList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [open, setOpen] = useState(false);
  const [deleteFlag, setDeleteFlag] = useState(true)
  const [editFlag, setEditFlag] = useState(false)

  useEffect(() => {
    const getAllJobs = async () => {
      try {
        var { data } = await axios.get('https://localhost:7127/api/jobdetails/getalljobs', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(data)

        setJobList(data.data)
        setIsLoading(false);
      } catch (error) {
        console.log(error)
        if (error.response.status === 401) {
          router.push(`/login`)
        }
      }

    }
    getAllJobs();

  }, [open, deleteFlag])

  const [formData, setFormData] = useState({
    id: 0,
    jobId: 0,
    userId: '',
    vesselName: '',
    craftName: '',
    jobType: '',
    jobStatus: '',
    adviceCode: '',
    serviceRequestTime: '',
    tugPickUpLocation: '',
    tugLetGoLocation: '',
    locationFrom: '',
    locationTo: '',
    pilotCode: '',
    remarks: ''
  });

  const handleEdit = async (row) => {
    setEditFlag(true);


    setFormData({
      id: row.id,
      jobId: row.jobId,
      userId: parseInt(row.userId) || 1,
      vesselName: row.vesselName,
      craftName: row.craftName,
      jobType: row.jobType,
      jobStatus: row.jobStatus,
      adviceCode: row.adviceCode,
      serviceRequestTime: new Date(row.serviceRequestTime).toISOString() || new Date().toISOString(),
      tugPickUpLocation: row.tugPickUpLocation,
      tugLetGoLocation: row.tugLetGoLocation,
      locationFrom: row.locationFrom,
      locationTo: row.locationTo,
      pilotCode: row.pilotCode,
      remarks: row.remarks
    })
    setOpen(true);
  }

  const handleDelete = async (row) => {
    const jid = row.jobId;
    var res = await axios.delete(`https://localhost:7127/api/jobdetails/deletejob?jid=${jid}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    setDeleteFlag(!deleteFlag);
    console.log(res);
  }

  const handleClick = (row) => {
    console.log(row);

    router.push(`/jobdetails?jobid=${row.jobId}`)
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (editFlag) {
      var res = await axios.put('https://localhost:7127/api/JobDetails/updatejob', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
    } else {

      // Here you would usually handle the form submission (e.g., API call)
      const apiPayload = {
        id: 0, // Assuming `id` is auto-generated; set to 0 if creating a new job
        jobId: formData.jobId || '',
        userId: parseInt(formData.userId) || 0, // Convert to integer
        vesselName: formData.vesselName || '',
        craftName: formData.craftName || '',
        jobType: formData.jobType || '',
        jobStatus: formData.jobStatus || '', // Correct casing to match API
        adviceCode: formData.adviceCode || '',
        serviceRequestTime: new Date(formData.serviceRequestTime).toISOString() || new Date().toISOString(), // Use current time as default
        tugPickUpLocation: formData.tugPickUpLocation || '',
        tugLetGoLocation: formData.tugLetGoLocation || '',
        locationFrom: formData.locationFrom || '',
        locationTo: formData.locationTo || '',
        pilotCode: formData.pilotCode || '',
        remarks: formData.remarks || ''
      };

      var res = await axios.post('https://localhost:7127/api/JobDetails/CreateJob', apiPayload, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      console.log("res: ", res)
    }
    setEditFlag(false);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div className='flex'>
      <Sidenav isAdmin={true}/>
      <div className='w-[81%]'>
        <Header />
        <div className='w-[100%] ml-[24%] mt-[5%] h-[100%] bg-gray-100'>
          <div className='ml-[5%]'>
            <div className='flex justify-between w-[73vmax] py-[2vmax]'>
              <p className='text-[1.5vmax] font-semibold'>Jobs</p>
              <button onClick={handleOpen} className='p-2 flex justify-center items-center bg-orange-500 rounded text-white font-semibold'>
                <AddOutlinedIcon />
                Create New Job
              </button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
              >
                <form
                  onSubmit={handleSubmit}
                  className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full overflow-auto"
                  style={{ maxHeight: '80vh' }}
                >
                  <h2 className="text-xl font-semibold mb-6">Enter Job Details</h2>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col space-y-4">
                      {/* Column 1 */}
                      <div className="flex flex-col">
                        <label htmlFor="jobId" className="font-medium">Job ID:</label>
                        <input type="text" name="jobId" id="jobId" value={formData.jobId} onChange={handleChange} className="border p-2 rounded-md" />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="vesselName" className="font-medium">Vessel Name:</label>
                        <input type="text" name="vesselName" id="vesselName" value={formData.vesselName} onChange={handleChange} className="border p-2 rounded-md" />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="jobType" className="font-medium">Job Type:</label>
                        <input type="text" name="jobType" id="jobType" value={formData.jobType} onChange={handleChange} className="border p-2 rounded-md" />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="tugPickUpLocation" className="font-medium">Tug Pick Up Location:</label>
                        <input type="text" name="tugPickUpLocation" id="tugPickUpLocation" value={formData.tugPickUpLocation} onChange={handleChange} className="border p-2 rounded-md" />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="locationFrom" className="font-medium">Location From:</label>
                        <input type="text" name="locationFrom" id="locationFrom" value={formData.locationFrom} onChange={handleChange} className="border p-2 rounded-md" />
                      </div>
                    </div>

                    <div className="flex flex-col space-y-4">
                      {/* Column 2 */}
                      <div className="flex flex-col">
                        <label htmlFor="userId" className="font-medium">User ID:</label>
                        <input type="number" name="userId" id="userId" value={formData.userId} onChange={handleChange} className="border p-2 rounded-md" />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="craftName" className="font-medium">Craft Name:</label>
                        <input type="text" name="craftName" id="craftName" value={formData.craftName} onChange={handleChange} className="border p-2 rounded-md" />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="jobStatus" className="font-medium">Job Status:</label>
                        <input type="text" name="jobStatus" id="jobStatus" value={formData.jobStatus} onChange={handleChange} className="border p-2 rounded-md" />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="tugLetGoLocation" className="font-medium">Tug Let Go Location:</label>
                        <input type="text" name="tugLetGoLocation" id="tugLetGoLocation" value={formData.tugLetGoLocation} onChange={handleChange} className="border p-2 rounded-md" />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="locationTo" className="font-medium">Location To:</label>
                        <input type="text" name="locationTo" id="locationTo" value={formData.locationTo} onChange={handleChange} className="border p-2 rounded-md" />
                      </div>
                    </div>

                    <div className="flex flex-col space-y-4">
                      {/* Column 3 */}
                      <div className="flex flex-col">
                        <label htmlFor="adviceCode" className="font-medium">Advice Code:</label>
                        <input type="text" name="adviceCode" id="adviceCode" value={formData.adviceCode} onChange={handleChange} className="border p-2 rounded-md" />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="serviceRequestTime" className="font-medium">Service Request Time:</label>
                        <input type="datetime-local" name="serviceRequestTime" id="serviceRequestTime" value={formData.serviceRequestTime} onChange={handleChange} className="border p-2 rounded-md" />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="pilotCode" className="font-medium">Pilot Code:</label>
                        <input type="text" name="pilotCode" id="pilotCode" value={formData.pilotCode} onChange={handleChange} className="border p-2 rounded-md" />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="remarks" className="font-medium">Remarks:</label>
                        <textarea name="remarks" id="remarks" value={formData.remarks} onChange={handleChange} className="border p-2 rounded-md" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end gap-4">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                    <button type="button" onClick={handleCancel} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
                  </div>
                </form>
              </Modal>


            </div>
          </div>
          {(!isLoading) ?
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
            </div>) : (<h1>Lodaing........</h1>)}
        </div>
      </div>
    </div>
  )
}

export default page