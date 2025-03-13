'use clint'
import React, { useContext } from 'react'
import { AuthContext } from '../Authentication/AuthProvider'

const useAuth = () => {
  let auth = useContext(AuthContext)
  return auth
}

export default useAuth
