import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { withRouter } from "react-router";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import man from '../assets/images/dashboard/user.png';
import logo from '../assets/images/mohandess-ar-l-logo.png';
import { LabelConstants } from '../constant/LableConstant';
import { CMS_STRAPI_URL } from '../constant/serviceurl';
import app, { facebookProvider, githubProvider, googleProvider, twitterProvider } from "../data/base";
// import comingsoon from '../assets/images/other-images/coming-soon-bg.jpg';
import comingsoon from '../assets/images/other-images/coming-soon-bg.jpg';
import authVideo from '../assets/video/auth-bg.mp4';
// import authVideo from '../assets/video/auth-bg.mp4';
import _ from 'lodash';
import Modal from 'react-responsive-modal';
import mohandess from "../assets/images/logo/mohandess-logo.png";

const Signin = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("");
    const [open, setOpen] = useState(false);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [profileURL, setProfileURL] = useState();
    const [pictureURL, setPictureURL] = useState();
    const [profileEmail, setProfileEmail] = useState();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isSmAuthenticated, setIsSmAuthenticated] = useState(false);

    const [value, setValue] = useState(
        localStorage.getItem('profileURL' || man)
    );

    const loginAuth = async () => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    identifier: email,
                    password: password
                })
            };
            const response = await fetch(CMS_STRAPI_URL + '/api/auth/local', requestOptions);
            const data = await response.json();
            // alert(data.jwt);
            console.log('User Data', data)
            if (null !== data) {
                if (data.jwt.length > 30) {
                    if (!data.user.blocked) {
                        setValue(data.user);

                        localStorage.setItem("userData", JSON.stringify(data.user));
                        if (null != data.user.avatar_url) {
                            localStorage.setItem("avatarUri", data.user.avatar_url);
                        } else {
                            localStorage.setItem("avatarUri", LabelConstants.DEFAULT_AVATAR);
                        }
                        localStorage.setItem("userId", data.user.username);
                        localStorage.setItem("UpdateId", data.user.id);
                        localStorage.setItem("jwt", data.jwt);
                        localStorage.setItem("userType", data.user.usertype);
                        localStorage.setItem("userName", data.user.name);
                        setValue(man);
                        var priceData = sessionStorage.getItem("priceList")
                        if (priceData === "" || priceData === null || !priceData) {
                            localStorage.setItem("isLoggedin", 0);
                            history.push(`/userdashboard`);
                        } else {
                            var userType = localStorage.getItem("userType")
                            if (userType === 'customer') {
                                localStorage.setItem("isLoggedin", 0);
                                history.push(`/detailslist`);
                            } else {
                                localStorage.setItem("isLoggedin", 0);
                                history.push(`/userdashboard`);
                            }

                        }
                    } else {
                        setTimeout(() => {
                            toast.error(LabelConstants.ALERT_USER_DOESNT_USER_BLOCK);
                        }, 200);
                        return;
                    }
                }
                else {
                    setTimeout(() => {
                        toast.error(LabelConstants.ALERT_USER_DOESNT_EXIST);
                    }, 200);
                }
            }
        } catch (error) {
            setTimeout(() => {
                toast.error(LabelConstants.ALERT_ERROR_PASSWORD);
            }, 200);
        }
    }

    const signup = () => {
        history.push(`/pages/signup`);
    }

    const setOpenFP = () => {
        history.push(`/pages/forgetPwd`);
    }



    const { t } = useTranslation();
    // npm i i18next i18next-http-backend 
    // npm i i18next-browser-languagedetector react-i18next

    return (
        <div>
            <div className="page-wrapper">
                <div className="container-fluid p-0">
                    {/* <!-- login page start--> */}
                    <div className="auth-bg-video">
                        <video id="bgvid" poster={comingsoon} playsInline="" autoPlay={true} muted="" loop="" >
                            <source src={authVideo} type="video/mp4" />
                        </video>
                        <div >
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="auth-innerright">
                                        <div className="authentication-box">
                                            {/* <div className="text-center">
                                                <img src={logo} width="230px" alt="" />
                                            </div> */}
                                            <div className="card mt-4" style={{ backgroundColor: "", opacity: "0.6" }}>
                                                <div className="card-body">
                                                    <div className="text-center">
                                                        <img src={mohandess} width={"140px"} style={{ marginTop: "-45px", marginBottom: "-5px" }} alt='logo' />
                                                        <h5>{t(LabelConstants.LOGIN)}</h5>
                                                        <h6>{LabelConstants.ENTER_EMAIL_PASSWORD}</h6>
                                                    </div>
                                                    <form className="theme-form" >
                                                        <div className="form-group">
                                                            <label className="col-form-label pt-0">{LabelConstants.EMAIL}</label>
                                                            <input className="form-control" type="email" name="email"
                                                                value={email}
                                                                onChange={e => setEmail(e.target.value)}
                                                                placeholder={LabelConstants.EMAIL_PLACEHOLDER}
                                                            />

                                                        </div>
                                                        <div className="form-group">
                                                            <label className="col-form-label">{LabelConstants.PASSWORD}</label>
                                                            <input className="form-control" type="password" name="password"
                                                                value={password}
                                                                onChange={e => setPassword(e.target.value)}
                                                                placeholder={LabelConstants.PASSWORD_PLACEHOLDER} />

                                                        </div>

                                                        <div className="form-group form-row mt-3 mb-0 d-flex justify-content-center">
                                                            <button className="btn btn-primary " type="button" onClick={() => loginAuth()} >{LabelConstants.SIGNIN}</button>
                                                        </div>
                                                        <div className="d-flex mt-2">
                                                            <button class="btn btn-link mx-auto" type="button" onClick={() => signup()} >{LabelConstants.SIGNUP}</button>
                                                        </div>
                                                        <div className="d-flex mt-2">
                                                            <button type="button" onClick={() => setOpenFP()} class="btn btn-link mx-auto">Forgot Password?</button>
                                                        </div>
                                                        <div className="d-flex" style={{ display: 'none' }}>
                                                            <text className="mx-auto mt-3" style={{ display: 'none' }}>OR</text>
                                                        </div>
                                                        <div className="social mt-3" style={{ display: 'none' }}>
                                                            <div className="form-group btn-showcase d-flex">
                                                                {/* <div className="App-body">
                                                                <img onClick={requestProfile} src={require('../assets/linkedin.png')} alt="Log in with Linked In" style={{ maxWidth: '180px' }} />
                                                            </div> */}
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <ToastContainer />
                    {/* <!-- login page end--> */}
                </div>
            </div>
        </div>
    );
};

export default withRouter(Signin);