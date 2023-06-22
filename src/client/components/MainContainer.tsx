import React from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'
import NavbarComponent from './NavbarComponent'

/**
 * The root component for the browser router. Components that will be displayed
 * where the <Outlet> component is placed.
 * 
 * "namespaces" refers to the namespace(s) of the K8s cluster.
 */

type ContextType = {
  namespaces: string[] | null,
  setNamespaces: (namespaces: string[]) => void,
}

export default function MainContainer() {
  const [namespaces, setNamespaces] = React.useState<String[] | null>([]);
  
  /**
   * By providing Outlet with a context, we're able to share the values and
   * functions we pass into context with any component that uses the appropriate
   * functions. For this instance, the function necessary for retrieval of namespaces and setNamespaces is useNamespaces(), which returns a context provider with the type ContextType, which is a type that expects an array of strings and a setNamespaces function.
   */

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