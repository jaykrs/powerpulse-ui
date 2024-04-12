import React ,{ Fragment, useState, useEffect } from 'react';
import { withRouter } from "react-router";
import Header from './layout/header';
import Aboutus from './element/aboutus';
import Footer from './layout/footer';
import Contactpage from '../website/contactpage';
const Aboutpage = ({ history }) => {
  return (
    <>
      <Header />
      
      <div className="page-content bg-white" id="top">
        <Aboutus />
       <Contactpage/>
	   <Footer />
        </div>
    </>
);
};

export default withRouter(Aboutpage);