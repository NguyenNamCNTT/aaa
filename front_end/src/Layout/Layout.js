import React from 'react'
import NavBar from './NavBar/Navbar'
import Footer from './Footer/Footer'

function Layout({children}) {
  return (
    <>
        <div className="bg-main text-white">
            <NavBar />
            {children}
            <Footer />
        </div>
    </>
  )
}

export default Layout
