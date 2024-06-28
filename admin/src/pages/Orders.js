import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, updateAnOrder } from '../features/auth/authSlice';
import { Link } from 'react-router-dom'

const columns = [
   {
      title: 'SNo',
      dataIndex: 'key',
   },
   {
      title: 'Order By',
      dataIndex: 'name',
   },
   {
      title: 'Products',
      dataIndex: 'products',
   },
   {
      title: 'Amount',
      dataIndex: 'amount',
   },
   {
      title: 'Date Ordered',
      dataIndex: 'date',
   },
   {
      title: 'Action',
      dataIndex: 'action',
   },
];

const getTokenFromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

const config3 = {
   headers: {
      'Authorization': `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""}`,
      'Accept': 'application/json'
   }
}

const Orders = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(getOrders(config3))
   }, [])

   const orderState = useSelector((state) => state.auth.orders.orders)

   const data1 = [];
   for (let i = 0; i < orderState?.length; i++) {
      data1.push({
         key: i + 1,
         name: orderState[i]?.user?.firstname + " " + orderState[i]?.user?.lastname,
         products:
            <Link to={`/admin/orders/${orderState[i]?._id}`}>
               View Orders
            </Link>,
         amount: orderState[i]?.totalPrice,
         date: new Date(orderState[i]?.createdAt).toLocaleString(),
         action: (
            <>
               <select name="" defaultValue={orderState[i]?.orderStatus} onChange={(e) => updateOrderStatus(orderState[i]?._id, e.target.value)} className='form-control form-select' id="">
                  <option value="Ordered" disabled selected>Ordered</option>
                  <option value="Processed">Processed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out For Delivery">Out For Delivery</option>
                  <option value="Delivered">Delivered</option>
               </select>
            </>
         )
      });
   }

   const updateOrderStatus = (a, b) => {
      dispatch(updateAnOrder({ id: a, status: b }))
   }

   return (
      <div>
         <h3 className="mb-4 title">Orders</h3>
         <div>
            <Table columns={columns} dataSource={data1} />
         </div>
      </div>
   )
}

export default Orders