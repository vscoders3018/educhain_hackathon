import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  const NavItems = [];

  if (token) {
    NavItems.push({ path: '/patientdash', label: 'DASHBOARD' })
    NavItems.push({ path: '/report', label: 'UPLOAD REPORT' })
    NavItems.push({ path: '/store', label: 'STORES' })
  }

  const renderNavLinks = (isMobile = false) => (
    NavItems.map((item, index) => (
      <NavLink 
        key={index} 
        to={item.path} 
        onClick={() => isMobile && setShowMenu(false)}
        className={({ isActive }) => `
          relative group transition-all duration-300 
          ${isMobile 
            ? 'px-4 py-2 rounded-full inline-block w-full text-center' 
            : 'py-1 hover:text-primary'
          }
          ${isActive && !isMobile ? 'text-primary' : ''}
        `}
      >
        <span>{item.label}</span>
        {!isMobile && (
          <hr className='absolute bottom-0 left-0 right-0 mx-auto w-0 group-hover:w-3/5 h-0.5 bg-primary transition-all duration-300' />
        )}
      </NavLink>
    ))
  );

  return (
    <div className='relative z-50'>
      <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#ADADAD] px-4 md:px-8 lg:px-16'>
        <img 
          onClick={() => navigate('/')} 
          className='w-36 md:w-44 cursor-pointer' 
          src={assets.logo} 
          alt="Logo" 
        />
        
        {/* Desktop Navigation */}
        <ul className='md:flex items-center gap-6 lg:gap-8 font-medium hidden'>
          {renderNavLinks()}
        </ul>

        <div className='flex items-center gap-4'>
          {token && userData ? (
            <div className='flex items-center gap-2 cursor-pointer group relative'>
              <img 
                className='w-8 h-8 rounded-full object-cover' 
                src={userData.image} 
                alt="Profile" 
              />
              <img 
                className='w-2.5' 
                src={assets.dropdown_icon} 
                alt="Dropdown" 
              />
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-white shadow-lg rounded-lg flex flex-col gap-4 p-4 border border-gray-100'>
                  <p 
                    onClick={() => navigate('/my-profile')} 
                    className='hover:text-primary cursor-pointer transition-colors'
                  >
                    My Profile
                  </p>
                  <p 
                    onClick={() => navigate('/my-reports')} 
                    className='hover:text-primary cursor-pointer transition-colors'
                  >
                    My Reports
                  </p>
                  <p 
                    onClick={logout} 
                    className='hover:text-primary cursor-pointer transition-colors'
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => navigate('/login')} 
              className='bg-primary text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-light hidden md:block hover:bg-blue-700 transition-colors'
            >
              Create account
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <img 
            onClick={() => setShowMenu(true)} 
            className='w-6 md:hidden' 
            src={assets.menu_icon} 
            alt="Menu" 
          />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`
          md:hidden fixed inset-0 z-50 bg-white overflow-hidden transition-all duration-300 
          ${showMenu ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className='flex items-center justify-between px-5 py-6'>
          <img src={assets.logo} className='w-36' alt="Logo" />
          <img 
            onClick={() => setShowMenu(false)} 
            src={assets.cross_icon} 
            className='w-7' 
            alt="Close" 
          />
        </div>
        
        <div className='flex flex-col items-center gap-4 mt-10 px-5 text-lg font-medium'>
          {renderNavLinks(true)}
          {!token && (
            <button 
              onClick={() => {
                navigate('/login');
                setShowMenu(false);
              }} 
              className='bg-primary text-white px-8 py-3 rounded-full w-full'
            >
              Create account
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar