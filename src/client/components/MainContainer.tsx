import React from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'
import NavbarComponent from './NavbarComponent'

type ContextType = {
  namespaces: string[] | null,
  setNamespaces: (namespaces: string[]) => void,
}

export default function MainContainer() {
  const [namespaces, setNamespaces] = React.useState<String[] | null>([]);

  return (
    <>
      <NavbarComponent />
      <Outlet context={{namespaces, setNamespaces}} />
    </>
  )
}

export function useNamespaces() {
  return useOutletContext<ContextType>();
}