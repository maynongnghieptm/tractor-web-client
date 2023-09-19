import React from 'react';
import Header from '../../_common/AppHeader/Home_header';
import Footer from '../../_common/AppFooter/Home_footer';
import './Home_layout.css'
function Layout({ children }) {
  return (
    <div style={{fontFamily:''}} >
    <Header />
    <main style={{minHeight:'100vh'}}>{children}</main>
    <Footer />
  </div>
  );
}

export default Layout;
