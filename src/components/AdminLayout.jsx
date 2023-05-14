import React from 'react'
import { Outlet } from "react-router-dom"
import AdminHeader from './AdminHeader'
import Footer from './Footer'
import Sidebar from './AdminSideBar'

function AdminLayout() {

  return (
    <div>
      <AdminHeader/>
      <div className='row'>
        <div className="col-md-3">
          <Sidebar />
        </div >
        <div className='col-md-9'>
          <Outlet />
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default AdminLayout
