import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarComponent from './NavbarComponent'
export default function MainContainer() {
  return (
    <>
      <NavbarComponent />
      <Outlet />
    </>
  )
}
