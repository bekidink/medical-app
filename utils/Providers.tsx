"use client"
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import React, { ReactNode } from 'react'
import  { Toaster } from 'react-hot-toast';
export default function Providers({children}:{children:ReactNode}) {
  return (
    <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    <Toaster position="top-center" reverseOrder={false}/>
    <SessionProvider>

   
    {/* <Provider store={store}> */}
    {children}
    {/* </Provider> */}
    </SessionProvider>
    </ThemeProvider>
  )
}

