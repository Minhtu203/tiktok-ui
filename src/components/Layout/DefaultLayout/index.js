import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

export default function DefaultLayout({ children }) {
  return (
    <>
        <Header />
        <div className='container'>
            <Sidebar />
            <div className='content'>
                {children}
            </div>
        </div>
    
    </>
  )
}
