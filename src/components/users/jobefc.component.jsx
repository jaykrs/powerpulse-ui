import React, { Fragment, useState, useEffect, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import axios from 'axios';
import '../website/layout/contact.css'
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/mohandess1.png';
import Image from '../../assets/images/man.png';
import screen from '../../assets/images/screenshotmohandess.png'
import google from '../../assets/images/googleplay.png'
import app from '../../assets/images/app.png'
import appimage from '../../assets/images/images.png'

class jobEfc extends Component {

  render() {
    return (
      <div>
        <div className='div_main'>
          <img className='img' src={logo} />
        </div>
        <div className='main_row'>
          <text className='bold'>Engineering Services <text className='text_size'>Platform</text></text>

        </div>
        <div className='div_sec'>
          <div className='main_div'>
            <div className='div-main'>
              <div className='row_div'>
                <div className='Box'>
                  <i style={{ color: "rgb(234, 234, 18)", fontSize: '20px', marginRight: '5px' }} class="fa fa-paper-plane" aria-hidden="true"></i>
                  <text className='bold_text'>Requirement</text>
                </div>
                <text>Post your Requirement for Survey ,<br /> Supervision and Design</text>

              </div>
              <div className='row_div1'>
                <div className='Box'>
                  <i style={{ color: "rgb(234, 234, 18)", fontSize: '20px', marginRight: '5px' }} class="fa fa-paper-plane" aria-hidden="true"></i>
                  <text className='bold_text'>Get the quotation</text>
                </div>
                <text>Get the quotation from various <br /> Engineering firm serving through out <br /> Saudi Arabia</text>
              </div>

            </div>
            <div className='div-main'>
              <div className='row_div1'>
                <div className='Box'>
                  <i style={{ color: "rgb(234, 234, 18)", fontSize: '20px', marginRight: '5px' }} class="fa fa-paper-plane" aria-hidden="true"></i>
                  <text className='bold_text'>Proceed with an engineering Firm</text>
                </div>
                <text>Recharge your wallet and proceed with an <br /> Engineering firm.</text>
              </div>
              <div className='row_div'>
                <div className='Box'>
                  <i style={{ color: "rgb(234, 234, 18)", fontSize: '20px', marginRight: '5px' }} class="fa fa-paper-plane" aria-hidden="true"></i>
                  <text className='bold_text'>Colloborate</text>
                </div>
                <text>Start colloborate with the engineering <br /> firm and engineers.</text>
              </div>

            </div>

          </div>
          <div className='main_div1'>
            <img className='image' src={Image} />
          </div>
        </div>
        <div className='row_main'>
          <div className='row-main-div'>
            <div>
              <text className='bold'>Start New Project Today...</text>
              <div>
                {/* <text>WE have some </text> */}
              </div>
            </div>

          </div>
          <div className='main-row-div'>
            <button className='button'>Contact Us Today</button>
          </div>
        </div>
        <div className='main_row_div'>
          <div className='div_row-main'>
            <img className='screen' src={screen} />
          </div>

          <div className='div_row-main1'>
            <div className='contant'>
              <div>
                <text>Get the app Google play & App Store</text>
              </div>
            </div>
            <div className='contant1'>
              <div className='contant_div'>
                <img src={google} />
              </div>
              <div className='contant_div'>
                <img src={app} />
              </div>
              <div className='contant_div'>
                <img src={appimage} />
              </div>
            </div>
          </div>

        </div>
        <div className='footer'>
          <div className='div_footer'>
            <div className='main_footer'>
            <text className='footer_text'>The Company</text>
            </div>
            <div className='text_contant'>
              <text className='text_footer'>we are an engineering platform and</text><br/>
              <text className='text_footer'>app which is called mohandess,</text><br/>
              <text className='text_footer'>which makes the connection</text><br/>
              <text className='text_footer'>between the customer, engineering</text><br/>
              <text className='text_footer'>firms, engineers, surveyors, and</text><br/>
              <text className='text_footer'>outsource designing engineering</text><br/>
              <text className='text_footer'>firms which have experiences to</text><br/>
              <text className='text_footer'>have opportunities in the Saudi and</text><br/>
              <text className='text_footer'>other gulf states market, in easy way</text><br/>
              <text className='text_footer'>and efficient connection</text><br/>
            </div>
          </div>
          <div className='div_footer1'>
            <div className='main_footer1'>
            <text className='footer_text'>Shortcuts</text>
            </div>
            <div className='footer_short'>
              <div className='footer_short1'>
              {/* <i style={{ color: "rgb(234, 234, 18)", fontSize: '20px', marginRight: '5px' }} class="fa fa-paper-plane" aria-hidden="true"></i> */}
               <text className='text_footer'>Home</text><br/>
               <text className='text_footer'>Supervision</text><br/>
               <text className='text_footer'>On-boarding</text><br/>
               <text className='text_footer'>Subscribe</text><br/>
               <text className='text_footer'>Payments</text><br/>
               <text className='text_footer'>Resources</text><br/>
               <text className='text_footer'>Presence</text><br/>
              </div>
              <div className='footer_short2'>
              <text className='text_footer'>Survey</text><br/>
               <text className='text_footer'>Design</text><br/>
               <text className='text_footer'>News</text><br/>
               <text className='text_footer'>Partner</text><br/>
               <text className='text_footer'>Support</text><br/>
               <text className='text_footer'>Affiliate</text><br/>
              </div>
            </div>
            
          </div>
          <div className='div_footer'>
            <div className='main_footer'>
            <text className='footer_text'>Office</text>
            </div>
            <div className='footer_main_div'>
            <text className='text_footer'>Jeddah , Saudi Arabia</text><br/>
               <text className='text_footer'>+966 54 473 0346</text><br/>
               <text className='text_footer'>support@mohandess.com</text><br/>
            </div>
          </div>
          <div className='div_footer1'>
            <div className='main_footer1'>
            <text className='footer_text'>Working Hours</text>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default jobEfc;