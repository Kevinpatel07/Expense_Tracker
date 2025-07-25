import React from 'react'
import { DollarSign } from 'lucide-react';
import { Landmark } from 'lucide-react';
import { ArrowBigUpDash } from 'lucide-react';
import { Mail } from 'lucide-react';
import myImage from '../assets/budget-planning-notes-3d-icon-download-in-png-blend-fbx-gltf-file-formats--financial-expense-recording-personal-finance-management-budgeting-accounting-pack-business-icons-12460312.webp'
import playStore from '../assets/images (1).png'
import Iphone from '../assets/download.png'
import Overview from '../assets/web_overview.png'
import transaction from '../assets/web_transactions_dark.png'
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const navigate = useNavigate()

  const handleLogIn = ()=>{
    navigate('/LogIn')
  }

  const handleSignUp =  ()=>{
    navigate('/SignUp')
  }

  return (
    <div>

      {/* Navigation Bar */}
      <nav className='nav-bar'>
        <div className='nav-logo'>
          <div className='logo-image'>
            <img src={myImage} alt="logo" />
          </div>
          <h2>Spendy</h2>
        </div>

        <div className='nav-buttons'>
          <button onClick={handleLogIn}>Log in</button>
          <button onClick={handleSignUp}>Sign up</button>
        </div>
      </nav>


      {/* Body Headers */}
      <div className='body'>
        <div className='main-body'>
          <div className='body-image'>
            <img src={myImage} alt="logo" />
          </div>
          <div className='body-headers'>
            <h1>SPENDY</h1>
            <h1>EXPENSE MANAGER</h1>
            <h3>Manage your personal finances and easily track your money , expenses and budget</h3>
          </div>
        </div>
        <hr />

        <div>
          <div className='body-web-headers'>
            <h2>Try the web app or download the app for your device</h2>
          </div>

          <div className='body-buttons'>
            <button className='body-button'>
              <div className='button-img-1'>
                <img src={myImage} alt="logo" />
              </div>
              <div>
                <h3>Try the</h3>
                <h2>WEB APP</h2>
              </div>
            </button>

            <button className='body-button'>
              <div className='button-img-2'>
                <img src={playStore} alt="PlayStore" />
              </div>
              <div>
                <h3>GET IT ON</h3>
                <h2>Google Play</h2>
              </div>

            </button>

            <button className='body-button'>
              <div className='button-img-3'>
                <img src={Iphone} alt="Iphone" />
              </div>
              <div>
                <h3>Download on the</h3>
                <h2>App Store</h2>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* OverView */}

      <div className='overview'>
        <div className='overview-section'>
          <h1>Overview</h1>
        </div>

        <div className='overview-img'>
          <div>
            <p>Visualize the flow of your money at a glance with a fully customizable Overview page.
              Here you can find the balance of your last days together with the accounts, cards and budgets you use most frequently.</p>
          </div>

          <div>
            <img src={Overview} alt="overView" />
          </div>
        </div>
      </div>

      <div className='transaction'>

        <div className='transaction-img'>
          <div>
            <p>Manage your daily expenses as you wish. You can create unlimited categories and subcategories to track them better. Scheduled transactions and transaction templates will help you to speed up the insertion of new transactions.</p>
          </div>

          <div>
            <img src={transaction} alt="transaction" />
          </div>

        </div>

        <div className='transaction-section'>
          <h1>Transactions</h1>
        </div>

      </div>

      <div className='functions'>

        <div className='function-1'>
          <div className='lucide-icon'>
           <DollarSign/>
          </div>

          <div>
            <h2>Fast Budget Web</h2>
            <p>Take advantage of a larger screen to better analyze your financial movements</p>
          </div>
        </div>


        <div className='function-1'>
           <div className='lucide-icon'>
           <ArrowBigUpDash/>
          </div>

          <div>
            <h2>Easy import</h2>
            <p>Coming from another app? Easily import your data as a CSV file on the web app</p>
          </div>
        </div>


       <div className='function-1'>
           <div className='lucide-icon'>
           <Landmark/>
          </div>

          <div>
            <h2>Bank sync</h2>
            <p>Download automatically your transactions from your bank account</p>
          </div>
        </div>
        

        <div className='function-1'>
           <div className='lucide-icon'>
           <Mail/>
          </div>

          <div>
            <h2>Contact us</h2>
            <p>If you have any questions, contact our customer support by email at patelkevin@gmai.com</p>
          </div>
        </div>
      </div>


      <footer className='footer'>
         
         <h2>Copyright ©2020-2030 - All rights reserved</h2>

      </footer>

    </div>
  )
}

export default Dashboard
