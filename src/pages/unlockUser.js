import axios from 'axios';
import React, { Fragment, useEffect } from 'react';
import logo from '../assets/images/endless-logo.png';
import { CMS_STRAPI_URL } from '../constant/serviceurl';

const OTPPage = () => {
    useEffect(() => {
//       if(!localStorage.getItem('email_verify_key'))
//       {
//        window.location.replace('/') 
//       }
//       axios.post(`${CMS_STRAPI_URL}/api/onboard/${localStorage.getItem('email_verify_key')}`).then((response) => {
//         console.log(response);
//       }).catch((error) => {
// console.log(error);
//       })
    
      return () => {
        localStorage.clear('email_verify_key')
      }
    }, [])
    
    return (
        <Fragment>
            <div className="page-wrapper">
                <div className="container-fluid">
                    {/* <!-- Unlock page start--> */}
                    <div className="authentication-main">
                        <div className="row">
                            <div className="col-md-12 p-0">
                                <div className="auth-innerright">
                                    <div className="authentication-box">
                                        <div className="text-center"><img src={logo} alt="" /></div>
                                        <div className="card mt-4 p-4 mb-0">
                                            <span>Registration Successfull An OTP has been sent to your mobile number/Email Kindly enter the OTP below </span>
                                            <form className="theme-form">
                                                <div className="form-group">
                                                    <label className="col-form-label">Enter the OTP received on mail </label>
                                                    <input className="form-control" type="password" placeholder="*******" />
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-form-label">Enter the OTP received on phone</label>
                                                    <input className="form-control" type="password" placeholder="*******" />
                                                </div>
                                                <div className="form-group form-row mb-2">
                                                    <div className="col-md-3">
                                                        <button className="btn btn-primary" type="submit">Verify</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Unlock page end--> */}
                </div>
            </div>
        </Fragment>
    );
};

export default OTPPage;