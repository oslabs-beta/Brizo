import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function NavbarComponent() {
  const navigateTo = useNavigate();

  return (
      <div>NavbarComponent
        <button onClick={() => navigateTo('/structure')}>HREF but without the link</button></div>
  )
}
