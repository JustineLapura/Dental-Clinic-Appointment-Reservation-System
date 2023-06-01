import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import Footer from './Footer';
import Sidebar from './AdminSideBar';

function AdminLayout() {
  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <div className='position-fixed h-100 w-100 mb-5'>
        <AdminHeader />
      </div>
      <div className="flex-grow-1 d-flex py-3">
        <div className="col-md-2 position-fixed h-100 my-5 py-3">
          <Sidebar />
        </div>
        <div className="col-md-10 offset-md-2 overflow-auto my-5 py-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;


