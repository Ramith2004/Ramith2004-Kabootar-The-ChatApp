import React from 'react'
import { BiLogOut } from "react-icons/bi";
import useLogout from '../../hooks/useLogout';

const LogoutButton = () => {
  const { loading, logout } = useLogout(); // Move this inside the component

  return (
    <div className='mt-auto'>
       {!loading ? (
          <BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />
       ) : (
          <span className='loading loading-spinner'>Logging out...</span>
       )}
    </div>
  )
}

export default LogoutButton