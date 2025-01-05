import React, { useContext } from 'react'
import { DoctorContext } from './context/DoctorContext';
import { AdminContext } from './context/AdminContext';
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Admin/Dashboard';
import Marketplace from './pages/Admin/Marketplace';

import Login from './pages/Login';
// import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import AllCompanies from './pages/Admin/CompanyList';
// import Report from './pages/Doctor/PatientReport';
import ReportsDash from './pages/Doctor/ReportsDash';

const App = () => {

  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)

  
  return dToken || aToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          {/* <Route path='/doctor-dashboard' element={<DoctorDashboard {...sampleProps} />} /> */}
          <Route path='/doctor-profile' element={<DoctorProfile />} />
          <Route path='/all-appointments' element={<AllCompanies />} />
          <Route path='/marketplace' element={<Marketplace />} />
          {/* <Route path="/report/:id" element={<Report />} /> */}
          <Route path="/reports-dash" element={<ReportsDash />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <ToastContainer />
      <Login />
    </>
  )
}

export default App

