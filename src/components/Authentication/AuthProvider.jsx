'use client'
import React, { createContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth'
import { app } from './firebase.config'

const googleProvider = new GoogleAuthProvider()

export let AuthContext = createContext()
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
  let [loading, setLoading] = useState(true)
  let [loggedInUser, setLoggedInUser] = useState(null)

  let signUp = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  let signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  let googleLogin = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

  let logOut = () => {
    setLoading(true)
    return signOut(auth)
  }

  useEffect(() => {
    let unSubscribe = onAuthStateChanged(auth, user => {
      setLoggedInUser(user)
      console.log('Current User', user)
      setLoading(false)
    })
    return () => {
      unSubscribe()
    }
  }, [])

  let authentication = {
    signUp,
    signIn,
    loading,
    loggedInUser,
    googleLogin,
    logOut
  }

  return (
    <AuthContext.Provider value={authentication}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
