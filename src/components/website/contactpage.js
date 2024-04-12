import React ,{ Fragment, useState, useEffect } from 'react';
import { withRouter } from "react-router";
import image from './img/about.jpg'
import data from '../../jsonData/data.json';
import './layout/style.css'
import ContactUs from './element/contactus';
// import Contactpage from '../website/contactpage';
import Header from './layout/header';




const ContactPage = (props) => {
 
  return (
    <>
    {/* <Header /> */}
    
    <div className="page-content bg-white" id="top">
      {/* <Aboutus /> */}
     <ContactUs/>
      </div>
  </>
   
);
};
export default withRouter(ContactPage);