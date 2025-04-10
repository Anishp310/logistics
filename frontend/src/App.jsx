import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './Auth/Register';
import Login from './Auth/Login';
import Admin from './components/Admin'; // Correct casing for import
import Product from './components/AdminPages/product/Product';
import ProductNature from './components/AdminPages/product/ProductNature';
import ProductType from './components/AdminPages/product/ProductType';
import Dashboard from './components/AdminPages/dashboard/DashBoard';
import ProductDetails from './components/AdminPages/product/ProductDetails';
import User from './components/AdminPages/User/User/User';
import AddRole from './components/AdminPages/User/AddRole/AddRole';
import EditUser from './components/AdminPages/User/User/EditUser';
import Job from './components/AdminPages/Job/Job';
import RequestJob from './components/AdminPages/Job/RequestJob';
import RequestEdit from './components/AdminPages/Job/RequestEdit';

const App = () => {
  return (
    <Routes>
      {/* Default route */}
      <Route index element={<Login />} />
      
      {/* Authentication routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Admin routes with nested pages */}
      <Route path="/admin" element={<Admin />}>
  <Route index element={<Dashboard />} />
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="users" element={<User />} />
  <Route path="user/:id" element={<EditUser />} />
  <Route path="role" element={<AddRole />} />
  <Route path="product" element={<Product />} />
  <Route path="product/nature" element={<ProductNature />} />
  <Route path="product/type" element={<ProductType />} />
  <Route path="product/:id" element={<ProductDetails />} /> Define the new route
  <Route path="job" element={<Job />} />
  <Route path="request" element={<RequestJob />} />
  <Route path="request/:id" element={<RequestEdit />} />

</Route>

    </Routes>
  );
}

export default App;
