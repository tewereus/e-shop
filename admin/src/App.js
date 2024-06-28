import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import Enquiries from './pages/Enquiries';
import Bloglist from './pages/Bloglist';
import Blogcatlist from './pages/Blogcatlist';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Colorlist from './pages/Colorlist';
import Categorylist from './pages/Categorylist';
import Brandlist from './pages/Brandlist';
import Productlist from './pages/Productlist';
import Addblog from './pages/Addblog';
import Addblogcat from './pages/Addblogcat';
import Addcolor from './pages/Addcolor';
import Addcat from './pages/Addcat';
import Addbrand from './pages/Addbrand';
import Addproduct from './pages/Addproduct';
import Addcoupon from './pages/Addcoupon';
import Couponlist from './pages/Couponlist';
import Viewenq from './pages/Viewenq';
import Vieworder from './pages/Vieworder';
import { PrivateRoutes } from './routing/PrivateRoutes';
import { OpenRoutes } from './routing/OpenRoutes';

function App() {
   return (
      <Router>
         <Routes>
            <Route path='/' element={<OpenRoutes><Login /></OpenRoutes>} />
            <Route path='/admin' element={<PrivateRoutes><MainLayout /></PrivateRoutes>}>
               <Route index element={<Dashboard />} />
               <Route path='enquiries' element={<Enquiries />} />
               <Route path='enquiries/:id' element={<Viewenq />} />
               <Route path='blog' element={<Addblog />} />
               <Route path='blog/:id' element={<Addblog />} />
               <Route path='list-blog' element={<Bloglist />} />
               <Route path='list-blog-category' element={<Blogcatlist />} />
               <Route path='blog-category' element={<Addblogcat />} />
               <Route path='blog-category/:id' element={<Addblogcat />} />
               <Route path='orders' element={<Orders />} />
               <Route path='orders/:id' element={<Vieworder />} />
               <Route path='customers' element={<Customers />} />
               <Route path='color' element={<Addcolor />} />
               <Route path='color/:id' element={<Addcolor />} />
               <Route path='list-color' element={<Colorlist />} />
               <Route path='category' element={<Addcat />} />
               <Route path='category/:id' element={<Addcat />} />
               <Route path='list-category' element={<Categorylist />} />
               <Route path='brand' element={<Addbrand />} />
               <Route path='brand/:id' element={<Addbrand />} />
               <Route path='list-brand' element={<Brandlist />} />
               <Route path='product' element={<Addproduct />} />
               <Route path='product/:id' element={<Addproduct />} />
               <Route path='list-product' element={<Productlist />} />
               <Route path='coupon' element={<Addcoupon />} />
               <Route path='coupon/:id' element={<Addcoupon />} />
               <Route path='list-coupon' element={<Couponlist />} />
            </Route>
         </Routes>
      </Router>
   );
}

export default App;
