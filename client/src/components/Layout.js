import React from 'react'
import Header from './Header/Header'

const Layout = ({ children }) => (
  <div>
    <Header />
    <div className="main-view">{children}</div>
  </div>
)

export default Layout
