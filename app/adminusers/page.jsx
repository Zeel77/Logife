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
import Modal from '@mui/material/Modal';

const page = () => {
    const router = useRouter();

    if(sessionStorage.getItem("userType")==0){
        router.push('/login');
      }
    const token = sessionStorage.getItem("authtoken")
  const columns = [
    { field: 'id', headerName: 'ID', headerClassName: 'bg-orange-100' },
    { field: 'firstName', headerName: 'First Name', headerClassName: 'bg-orange-100' },
    { field: 'lastName', headerName: 'Last Name', headerClassName: 'bg-orange-100'},
    {
      field: 'roleId',
      headerName: 'Role ID',
      headerClassName: 'bg-orange-100'
    },
    {
      field: 'email',
      headerName: 'Email',
      headerClassName: 'bg-orange-100'
    },
    { field: 'mobileNo', headerName: 'Mobile', headerClassName: 'bg-orange-100' },
    { field: 'status', headerName: 'Status', headerClassName: 'bg-orange-100' },
    { field: 'updatedAt', headerName: 'Updated At', headerClassName: 'bg-orange-100' },
    {
      field: 'edit', width: 50, headerName: 'Edit', headerClassName: 'bg-orange-100', renderCell: (params) => (
        <button onClick={() => handleEdit(params.row)}>
          <ModeEditOutlineOutlinedIcon />
        </button>
      ),
    },

    {
      field: 'delete', width: 85, headerName: 'Delete', headerClassName: 'bg-orange-100', renderCell: (params) => (
        <button onClick={() => handleDelete(params.row)}>
          <DeleteOutlineOutlined />
        </button>
      ),
    },



  ];


  const [userList, setUserList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [open, setOpen] = useState(false);
  const [deleteFlag, setDeleteFlag] = useState(true)
  const [editFlag, setEditFlag] = useState(false)

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        var { data } = await axios.get('https://localhost:7127/api/user/getallusers', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(data)

        setUserList(data.data)
        setIsLoading(false);
      } catch (error) {
        console.log(error)
        if (error.response.status === 401) {
          router.push(`/login`)
        }
      }

    }
    getAllUsers();

  }, [open, deleteFlag])

  const [formData, setFormData] = useState({
    id: 0,
    firstName: '',
    lastName: '',
    password: '',
    roleId: 0,
    email: '',
    mobileNo: '',
    status: '',
    shiftDetail: '',
    updatedAt: ''
  });

  const handleEdit = async (row) => {
    setEditFlag(true);


    setFormData({
        id: parseInt(row.id),
        firstName: row.firstName,
        lastName: row.lastName,
        password: row.password,
        roleId: parseInt(row.roleId),
        email: row.email,
        mobileNo: row.mobileNo,
        status: row.status,
        shiftDetail: row.shiftDetail,
        updatedAt: row.updatedAt
    })
    setOpen(true);
  }

  const handleDelete = async (formData) => {
    const id = formData.id;
    var res = await axios.delete(`https://localhost:7127/api/user/deleteuser?id=${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    setDeleteFlag(!deleteFlag);
    console.log(res);
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
      var res = await axios.put('https://localhost:7127/api/user/updateuser', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
    } else {

      // Here you would usually handle the form submission (e.g., API call)
      const apiPayload = {
        id: parseInt(formData.id),
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: formData.password,
        roleId: parseInt(formData.roleId),
        email: formData.email,
        mobileNo: formData.mobileNo,
        status: formData.status,
        shiftDetail: formData.shiftDetail,
        updatedAt: null
      };

      var res = await axios.post('https://localhost:7127/api/user/Createuser', apiPayload, {
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
              <p className='text-[1.5vmax] font-semibold'>Users</p>
              <button onClick={handleOpen} className='p-2 flex justify-center items-center bg-orange-500 rounded text-white font-semibold'>
                <AddOutlinedIcon />
                Create New User
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
                  <h2 className="text-xl font-semibold mb-6">Enter User Details</h2>
                  <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col space-y-4">
            {/* Column 1 */}
            <div className="flex flex-col">
              <label htmlFor="firstName" className="font-medium">First Name:</label>
              <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} className="border p-2 rounded-md" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastName" className="font-medium">Last Name:</label>
              <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} className="border p-2 rounded-md" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="roleId" className="font-medium">Role ID:</label>
              <input type="number" name="roleId" id="roleId" value={formData.roleId} onChange={handleChange} className="border p-2 rounded-md" />
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            {/* Column 2 */}
            <div className="flex flex-col">
              <label htmlFor="email" className="font-medium">Email:</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="border p-2 rounded-md" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="mobileNo" className="font-medium">Mobile No:</label>
              <input type="text" name="mobileNo" id="mobileNo" value={formData.mobileNo} onChange={handleChange} className="border p-2 rounded-md" />
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            {/* Column 3 */}
            <div className="flex flex-col">
              <label htmlFor="status" className="font-medium">Status:</label>
              <input type="text" name="status" id="status" value={formData.status} onChange={handleChange} className="border p-2 rounded-md" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="shiftDetail" className="font-medium">Shift Detail:</label>
              <input type="text" name="shiftDetail" id="shiftDetail" value={formData.shiftDetail} onChange={handleChange} className="border p-2 rounded-md" />
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
                  rows={userList}
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