import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { getOrderById } from "../features/auth/authSlice";
const columns = [
   {
      title: "SNo",
      dataIndex: "key",
   },
   {
      title: "Product Name",
      dataIndex: "name",
   },
   {
      title: "Brand",
      dataIndex: "brand",
   },
   {
      title: "Quantity",
      dataIndex: "quantity",
   },
   {
      title: "Color",
      dataIndex: "color",
   },
   {
      title: "Amount",
      dataIndex: "amount",
   },
   {
      title: "Date",
      dataIndex: "date",
   },
];

const getTokenFromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

const config3 = {
   headers: {
      'Authorization': `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""}`,
      'Accept': 'application/json'
   }
}

const Vieworder = () => {
   const location = useLocation();
   const orderId = location.pathname.split("/")[3];
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(getOrderById({ orderId: orderId, config3: config3 }));
   }, []);
   const orderState = useSelector((state) => state.auth?.singleOrder?.orders);
   const data1 = [];
   if (orderState) {
      for (let i = 0; i < orderState?.orderItems?.length; i++) {
         data1.push({
            key: i + 1,
            name: orderState?.orderItems[0]?.product?.title,
            brand: orderState?.orderItems[0]?.product?.brand,
            quantity: orderState?.orderItems[0]?.quantity,
            amount: orderState?.orderItems[0]?.price,
            color: orderState?.orderItems[0]?.color?.title,
            date: new Date(orderState?.createdAt).toLocaleString(),
         });
      }
   }
   return (
      <div>
         <h3 className="mb-4 title">View Order</h3>
         <div>
            <Table columns={columns} dataSource={data1} />
         </div>
      </div>
   );
};

export default Vieworder;