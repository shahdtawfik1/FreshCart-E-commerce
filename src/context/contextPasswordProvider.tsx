"use client"
import React, { createContext, useState } from 'react'
import { showPassType } from './../types/showPass.type';
import { PasswordContextType } from '@/types/context.type';

export const passwordContext = createContext<PasswordContextType>({
  showPass: {
    loginPass: "password",
    password: "password",
    repassword: "password",
    resetPass: "password",
    currentPass: "password",
    newPass: "password",
    confirmPass: "password",
  },
  ShowPassandHide: () => {},
})

const ContextPasswordProvider = ({ children }: { children: React.ReactNode }) => {
  const [showPass, setShowPass] = useState<showPassType>({
    loginPass: "password",
    password: "password",
    repassword: "password",
    resetPass: "password",
    currentPass: "password",
    newPass: "password",
    confirmPass: "password",
  })
  function ShowPassandHide(passName: keyof showPassType) {
    setShowPass((prev) => ({
      ...prev,
      [passName]: prev[passName] === "password" ? "text" : "password",
    }));
  }
  const value = {
    showPass,
    ShowPassandHide
  }
  return (
    <passwordContext.Provider value={value}>

      {children}

    </passwordContext.Provider>
  )
}

export default ContextPasswordProvider
