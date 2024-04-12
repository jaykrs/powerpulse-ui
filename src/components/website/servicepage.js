import React ,{ Fragment, useState, useEffect } from 'react';
import { withRouter } from "react-router";
import image from './img/about.jpg'
import data from '../../jsonData/data.json';
import './layout/style.css'
import ContactUS from './element/contactus'
import Serviceus from './element/serviceus';
import Header from './layout/header';


const ServicePage = (props) => {
  const [landingPageData, setLandingPageData] = useState({...data});
  return (
    <>
    <Header />
    
    <div className="page-content bg-white" id="top">
      {/* <Aboutus /> */}
     <Serviceus/>
     <ContactUS/>
      </div>
  </>
);
};
export default withRouter(ServicePage);