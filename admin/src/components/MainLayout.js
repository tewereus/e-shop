import React, { useState } from 'react';
import {
   MenuFoldOutlined,
   MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Link, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineDashboard, AiOutlineLaptop, AiOutlineForm } from 'react-icons/ai'
import { BiCategory, BiColorFill } from 'react-icons/bi'
import { RiCouponLine } from 'react-icons/ri'
import { FiPlusCircle } from 'react-icons/fi'
import { CiViewList } from 'react-icons/ci'
import { PiUserList, PiNewspaperClipping } from 'react-icons/pi'
import { SiBrandfolder } from 'react-icons/si'
import { IoBagCheckOutline } from 'react-icons/io5'
import { IoIosNotifications } from 'react-icons/io'
import { MdOutlineLogout } from 'react-icons/md'
import { Layout, Menu, Button, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
   const [collapsed, setCollapsed] = useState(false);
   const {
      token: { colorBgContainer },
   } = theme.useToken();
   const navigate = useNavigate();
   return (
      <Layout>
         <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo">
               <h2 className='text-white fs-5 text-center py-3 mb-0'>
                  <span className='sm-logo'>FD</span>
                  <span className='lg-logo'>F-Digitic</span>
               </h2>
            </div>
            <Menu
               theme="dark"
               mode="inline"
               defaultSelectedKeys={['']}
               onClick={({ key }) => {
                  if (key === "signout") {
                     localStorage.clear()
                     window.location.reload()
                  } else {
                     navigate(key);
                  }
               }}
               items={[
                  {
                     key: '',
                     icon: <AiOutlineDashboard className='fs-4' />,
                     label: 'Dashboard',
                  },
                  {
                     key: 'customers',
                     icon: <PiUserList className='fs-4' />,
                     label: 'Customers',
                  },
                  {
                     key: 'catalog',
                     icon: <AiOutlineLaptop className='fs-4' />,
                     label: 'Catalog',
                     children: [
                        {
                           key: 'product',
                           icon: <FiPlusCircle className='fs-4' />,
                           label: 'Add Product',
                        },
                        {
                           key: 'list-product',
                           icon: <CiViewList className='fs-4' />,
                           label: 'Product List',
                        },
                        {
                           key: 'brand',
                           icon: <SiBrandfolder className='fs-4' />,
                           label: 'Brand',
                        },
                        {
                           key: 'list-brand',
                           icon: <CiViewList className='fs-4' />,
                           label: 'Brand List',
                        },
                        {
                           key: 'category',
                           icon: <BiCategory className='fs-4' />,
                           label: 'Category',
                        },
                        {
                           key: 'list-category',
                           icon: <CiViewList className='fs-4' />,
                           label: 'Category List',
                        },
                        {
                           key: 'color',
                           icon: <BiColorFill className='fs-4' />,
                           label: 'Color',
                        },
                        {
                           key: 'list-color',
                           icon: <CiViewList className='fs-4' />,
                           label: 'Color List',
                        },
                     ]
                  },
                  {
                     key: 'orders',
                     icon: <IoBagCheckOutline className='fs-4' />,
                     label: 'Orders',
                  },
                  {
                     key: 'marketing',
                     icon: <RiCouponLine className='fs-4' />,
                     label: 'Marketing',
                     children: [
                        {
                           key: 'coupon',
                           icon: <FiPlusCircle className='fs-4' />,
                           label: 'Add Coupon',
                        },
                        {
                           key: 'list-coupon',
                           icon: <CiViewList className='fs-4' />,
                           label: 'Coupon List',
                        },
                     ]
                  },
                  {
                     key: 'blogs',
                     icon: <PiNewspaperClipping className='fs-4' />,
                     label: 'Blogs',
                     children: [
                        {
                           key: 'blog',
                           icon: <FiPlusCircle className='fs-4' />,
                           label: 'Add Blog',
                        },
                        {
                           key: 'list-blog',
                           icon: <CiViewList className='fs-4' />,
                           label: 'Blog List',
                        },
                        {
                           key: 'blog-category',
                           icon: <FiPlusCircle className='fs-4' />,
                           label: 'Add Blog Category',
                        },
                        {
                           key: 'list-blog-category',
                           icon: <CiViewList className='fs-4' />,
                           label: 'Blog Category List',
                        },
                     ]
                  },
                  {
                     key: 'enquiries',
                     icon: <AiOutlineForm className='fs-4' />,
                     label: 'Enquiries',
                  },
                  {
                     key: 'signout',
                     icon: <MdOutlineLogout className='fs-4' />,
                     label: 'Sign Out',
                  },
               ]}
            />
         </Sider>
         <Layout>
            <Header
               className='d-flex justify-content-between ps-1 pe-5'
               style={{
                  padding: 0,
                  background: colorBgContainer,
               }}
            >
               <Button
                  type="text"
                  icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                     fontSize: '16px',
                     width: 64,
                     height: 64,
                  }}
               />
               <div className='d-flex gap-3 align-items-center'>
                  <div className='position-relative'>
                     <IoIosNotifications className='fs-4' />
                     <span className='badge bg-warning rounded-circle p-1 position-absolute'>3</span>
                  </div>
                  <div className='d-flex gap-3 align-items-center dropdown' >
                     <div>
                        <img src="https://icons.iconarchive.com/icons/custom-icon-design/pretty-office-2/128/man-icon.png" width="32" height="32" alt="" />
                     </div>
                     <div role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                        <h5 className='mb-0'>Bin Nguyen</h5>
                        <p className='mb-0'>lebin642@gmail.com</p>
                     </div>
                     <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li>
                           <Link className="dropdown-item py-1 mb-1" style={{ "height": "auto", "lineHeight": "20px" }} to="/">View Profile</Link>
                        </li>
                        <li>
                           <Link className="dropdown-item py-1 mb-1" style={{ "height": "auto", "lineHeight": "20px" }} to="/">Signout</Link>
                        </li>
                     </div>
                  </div>
               </div>
            </Header>
            <Content
               style={{
                  margin: '24px 16px',
                  padding: 24,
                  minHeight: 280,
                  background: colorBgContainer,
               }}
            >
               <ToastContainer
                  position="top-right"
                  autoClose={250}
                  hideProgressBar={false}
                  newestOnTop={true}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  theme="light"
               />
               <Outlet />
            </Content>
         </Layout>
      </Layout>
   );
};
export default MainLayout;