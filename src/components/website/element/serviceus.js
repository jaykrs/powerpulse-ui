import React ,{ Fragment, useState, useEffect } from 'react';
import { withRouter } from "react-router";
import image from '../img/about.jpg'
import data from '../../../jsonData/data.json';
import '../layout/style.css'

const ServiceUS = (props) => {
  const [landingPageData, setLandingPageData] = useState({...data});
  return (
    <div id='services' className='text-center'>
      <div className=' main_container'>
        <div className='section-title'>
          <h2>Our Services</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
            dapibus leonec.
          </p>
        </div>
        <div className='row'>
          {landingPageData.Services
            ? landingPageData.Services.map((d, i) => (
                <div key={`${d.name}-${i}`} className='col-md-4'>
                  {' '}
                  <i className={d.icon}></i>
                  <div className='service-desc'>
                    <h3>{d.name}</h3>
                    <p>{d.text}</p>
                  </div>
                </div>
              ))
            : 'loading'}
        </div>
      </div>
    </div>
  
);
};
export default withRouter(ServiceUS);