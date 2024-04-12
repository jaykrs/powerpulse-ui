import React ,{ Fragment, useState, useEffect } from 'react';
import { withRouter } from "react-router";
import Header from './layout/header';
import Footer from './layout/footer';
import Slider1 from './element/slider-1';
import ClientSlider from './element/clientSlider';
import Clients from './element/clients';
import Contactus from './element/contactus';
const Homepage = ({ history }) => {
  return (
    <div>
      <Header />
      
      <div className="page-content bg-white" id="top">
        <Slider1 />
        <ClientSlider />
          <Clients />
        </div>
        <Footer />
    </div>
);
};

export default withRouter(Homepage);