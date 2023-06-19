import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function NavbarComponent() {
  const navigateTo = useNavigate();

  const refreshPage = () => {
    navigateTo('/');
    window.location.reload();
  }

  return (
    <>
    <div className='navbar-container'>
      <div>
          <button className='secondary-button'>brizo logo</button>
        <button onClick={() => navigateTo('/')} className='primary-button'>structure</button>
        <button onClick={() => navigateTo('/metrics')} className='primary-button'>metrics</button>
        </div>
      <div>
        <button onClick={() => refreshPage()} className='refresh-button'>
          <i className="fa-solid fa-arrow-rotate-right fa-2xl"></i>
        </button>
      </div>
      </div>
      <hr />
    </>
  )
}
