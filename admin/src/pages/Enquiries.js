import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAnEnquiry, getEnquiries, resetState, updateAnEnquiry } from '../features/enquiry/enquirySlice';
import { Link } from 'react-router-dom'
import { AiFillDelete, AiOutlineEye } from 'react-icons/ai'
import CustomModal from '../components/CustomModal';

const columns = [
   {
      title: 'SNo',
      dataIndex: 'key',
   },
   {
      title: 'Name',
      dataIndex: 'name',
   },
   {
      title: 'Email',
      dataIndex: 'email',
   },
   {
      title: 'Mobile',
      dataIndex: 'mobile',
   },
   {
      title: 'Status',
      dataIndex: 'status',
   },
   {
      title: 'Action',
      dataIndex: 'action',
   }
];

const Enquiries = () => {
   const [open, setOpen] = useState(false);
   const [enqId, setEnqId] = useState('');
   const showModal = (e) => {
      setOpen(true);
      setEnqId(e)
   };

   const hideModal = () => {
      setOpen(false);
   };

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(resetState())
      dispatch(getEnquiries())
   }, [])

   const enquiryState = useSelector((state) => state.enquiry.enquiries)
   const data1 = [];
   for (let i = 0; i < enquiryState.length; i++) {
      data1.push({
         key: i + 1,
         name: enquiryState[i].name,
         email: enquiryState[i].email,
         mobile: enquiryState[i].mobile,
         status: (
            <>
               <select
                  name=""
                  defaultValue={enquiryState[i].status ? enquiryState[i].status : "Submitted"}
                  className="form-control form-select"
                  id=""
                  onChange={(e) => setEnquiryStatus(e.target.value, enquiryState[i]._id)}
               >
                  <option value="Submitted">Submitted</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
               </select>
            </>
         ),
         action: (
            <>
               <Link to={`/admin/enquiries/${enquiryState[i]._id}`} className='ms-3 fs-3 text-danger'>
                  <AiOutlineEye />
               </Link>
               <button to='/' className='ms-3 fs-3 text-danger bg-transparent border-0' onClick={() => showModal(enquiryState[i]._id)}>
                  <AiFillDelete />
               </button>
            </>
         )
      });
   }
   const setEnquiryStatus = (e, i) => {
      console.log(e, i);
      const data = { id: i, enqData: e };
      dispatch(updateAnEnquiry(data));
   };
   const deleteEnq = (e) => {
      dispatch(deleteAnEnquiry(e))
      setOpen(false)
      setTimeout(() => {
         dispatch(getEnquiries())
      }, 500)
   }
   return (
      <div>
         <h3 className="mb-4 title">Enquiries</h3>
         <div>
            <Table columns={columns} dataSource={data1} />
         </div>
         <CustomModal
            hideModal={hideModal}
            open={open}
            performAction={() => { deleteEnq(enqId) }}
            title='Are you sure to delete this enquiry?'
         />
      </div>
   )
}

export default Enquiries