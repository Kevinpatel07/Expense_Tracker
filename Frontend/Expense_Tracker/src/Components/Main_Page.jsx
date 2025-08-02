import React, { useContext, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { TableOfContents, LayoutDashboard, Landmark, Calculator, ChartPie, Settings, AlignJustify, EllipsisVertical } from 'lucide-react';
import myImage from '../assets/budget-planning-notes-3d-icon-download-in-png-blend-fbx-gltf-file-formats--financial-expense-recording-personal-finance-management-budgeting-accounting-pack-business-icons-12460312.webp'
import { path } from '../ContextAPI/path.context';
import { AuthContext } from '../ContextAPI/Auth';


const Main_Page = () => {

  const navigate = useNavigate()
  const { title } = useContext(path)
  const { setisLogin } = useContext(AuthContext)
  const [showDropdown, setShowDropdown] = useState(false)
  const [isSidebarOpen , setisSidebarOpen] = useState(true)

  // Sign Out //
  const handleSignOut = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')

    setisLogin(false)

    navigate('/Login')
  }



  return (
    <div>
      <div className='main-page'>

        <div className={isSidebarOpen ? 'sidebar' : 'sidebar-hidden' }>

          <div className='sidebar-logo'>
            <div className='sidebar-img'>
              <img src={myImage} alt="logo" />
            </div>
            <div className='sidebar-name'>
              <h2>Spendy</h2>
            </div>
          </div>

          <hr />

          <div className='sidebar-page'>
            <ol className='sidebar-ol'>
              <li><LayoutDashboard /> <NavLink className='navlink' to='/Main_page/Overview'>Overview</NavLink></li>
              <li><TableOfContents /> <NavLink className='navlink' to='/Main_page/Transaction'>Transaction</NavLink></li>
              <li><Landmark /> <NavLink className='navlink' to='/Main_page/Accounts'>Accounts</NavLink></li>
              <li><Calculator /> <NavLink className='navlink' to='/Main_page/Budgets'>Budgets</NavLink></li>
              <li> <ChartPie /> <NavLink className='navlink' to='/Main_page/Charts'>Charts</NavLink></li>
              <li><Settings /> <NavLink className='navlink' to='/Main_page/Settings'>Settings</NavLink></li>
            </ol>
          </div>

        </div>

        <div className={isSidebarOpen? 'main-page-body' : 'main-page-body-full'}>
          <nav className='main-page-body-nav'>
            <div className='nav-slider'>
              <button onClick={()=> setisSidebarOpen(!isSidebarOpen)}><AlignJustify /></button>
            </div>
            <div className='nav-title'>
              <h1>{title}</h1>
              <div className='dropdown-container'>
                <button onClick={() => setShowDropdown(!showDropdown)} ><EllipsisVertical /></button>

                {showDropdown && (
                  <div className='dropdown-menu'>
                    <ul>
                      <li onClick={handleSignOut}>Sign Out</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </nav>
          <Outlet />
        </div>

      </div>
    </div>
  )
}

export default Main_Page
