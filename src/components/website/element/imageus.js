import React, { Fragment, useState, useEffect, Component } from 'react';
// import Breadcrumb from '../common/breadcrumb';
import axios from 'axios';
// import '../website/layout/contact.css'
import '../layout/contact.css'
// import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/mohandess1.jpg';
import Image from '../../../assets/images/man.png';
import screen from '../../../assets/images/screenshotmohandess.png'
import google from '../../../assets/images/googleplay.png'
import app from '../../../assets/images/app.png'
import appimage from '../../../assets/images/images.png'
import Slider1 from './slider-1';

// import logo from '../../../../assets/images'

class  ImageUs extends Component {

  render() {
    return (
      <div>
        <div className='div_main'>
          <div style={{ backgroundImage: `url(${logo})` }} className='img'>
          <Slider1 />
            </div>          
        </div>       
      </div>
    );
  }
}

export default  ImageUs;