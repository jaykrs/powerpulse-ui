import React, { Fragment, useState, useEffect, Component } from 'react';
// import Breadcrumb from '../common/breadcrumb';
import axios from 'axios';
// import '../website/layout/contact.css'
import '../layout/contact.css'
// import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/mohandess1.png';
import Image from '../../../assets/images/man.png';
import screen from '../../../assets/images/screenshotmohandess.png'
import google from '../../../assets/images/googleplay.png'
import app from '../../../assets/images/app.png'
import appimage from '../../../assets/images/images.png'

// import logo from '../../../../assets/images'

class Header2 extends Component {

    render() {
        return (
            <div className='header-main_div'>
                <div className='Div_header1'>
                    <div className='header_text_size1'>
                    <img className='header_img' src="http://mohandess.com/wp-content/uploads/2022/09/Ar-l@2x-e1663342400324.png" alt="" />
                    </div>
                    <div className='header_text_size1'>
                    <text className='Text_size'> Survey</text><i className="fa fa-chevron-down"/>
                    </div>
                    <div className='header_text_size1'>
                    <text className='Text_size'>Design</text><i className="fa fa-chevron-down"/>

                    </div>
                    <div className='header_text_size1'>
                   <text className='Text_size'>Supervision</text><i className="fa fa-chevron-down"/>
                    </div>
                </div>
                <div className='Div_header'>
                    <div className='header_text_size'>
                        <text className='header_icon'><i class="fa fa-times-circle-o" aria-hidden="true"></i></text><text className='Text_size'>Offers</text>
                    </div>
                    <div className='header_text_size'>
                   <text className='header_icon1'><i class="fa fa-phone" aria-hidden="true"></i></text> <text className='Text_size'>Coustomer Service</text>

                    </div>
                    <div className='header_text_size'>
                    <text className='header_icon'><i class="fa fa-user" aria-hidden="true"></i></text><Link to="/login"><text className='Text_size'>Login/SignUp</text></Link>

                    </div>
                </div>
            </div>
        );
    }
}

export default Header2;