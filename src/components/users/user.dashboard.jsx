import axios from 'axios';
import React, { Component, Fragment, useEffect, useState } from 'react';
import { InfluencerScreen } from '.';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import Breadcrumb from '../common/breadcrumb';
import Header from '../common/header-component/header';
import { Command, Navigation, DollarSign, HelpCircle, Mic, FileText, Video, Frown, Info } from 'react-feather';
import { Archive, Briefcase, CreditCard, Home, Settings, Slash, User, Book } from 'react-feather';
import { Link } from 'react-router-dom';
import { MENUITEMS } from "../../constant/menu";
import Error404 from '../../pages/errors/error404';
import "../../index.scss";
import Footer3 from '../website/element/footer3';
import logo from "../../assets/images/logo/mohandess-logo.png"

const UserDashboard = ({ history }) => {
    const [userType, setUserType] = useState(localStorage.getItem('userType'));
  
    //<img src={logo} alt='' width={"120px"} style={{marginTop:"25px"}} />
    return (
        userType === 'engineeringfirm' ?
            <Fragment>

                <Header />
                <Breadcrumb />
                <div style={{ width: "100%", height: "10px" }}></div>
                <div className="container-fluid" style={{ backgroundColor: "rgb(15, 9, 60)" }}>
                    <div style={{ width: "100%", height: "50px" }}>
                    </div>
                    <div className='' >
                        <div className="row d-flex justify-content-center" >
                            <div className="col-xl-2  col-sm-6">
                                <div className="card" style={{ boxShadow: "#496d81 10px 4px 4px 1px" }}>
                                    <Link to="/userProfile" className="linkStyle">
                                        <div className="card-body">
                                            <div className="media ">
                                                <div className="feather-icon-block m-r-25">
                                                    <User size={40} />
                                                </div>
                                                <div className="media-body align-self-center">
                                                    <p>Profile</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            <div className="col-xl-2 col-sm-6">
                                <div className="card" style={{ boxShadow: "#496d81 10px 4px 4px 1px", }}>
                                    <Link to="/project" className="linkStyle" >
                                        <div className="card-body">
                                            <div className="media">
                                                <div className="feather-icon-block m-r-25">
                                                    <Briefcase size={40} />
                                                </div>
                                                <div className="media-body align-self-center">
                                                    <p>Projects</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-xl-2 col-sm-6">
                                <div className="card" style={{ boxShadow: "#496d81 10px 4px 4px 1px", }}>
                                    <Link to="/invoice" className="linkStyle">
                                        <div className="card-body">
                                            <div className="media">
                                                <div className="feather-icon-block m-r-25">
                                                    <DollarSign size={40} />
                                                </div>
                                                <div className="media-body align-self-center">
                                                    <p>Invoice</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-xl-2 col-sm-6">
                                <div className="card" style={{ boxShadow: "#496d81 10px 4px 4px 1px", }}>
                                    <Link to="/workloglist" className="linkStyle" >
                                        <div className="card-body">
                                            <div className="media">
                                                <div className="feather-icon-block m-r-25">
                                                    <Settings size={40} />
                                                </div>
                                                <div className="media-body align-self-center">
                                                    <p>Working</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center'>
                            <div className="col-xl-2 col-sm-6">
                                <div className="card" style={{ boxShadow: "#496d81 10px 4px 4px 1px", }}>
                                    <Link to="/contract" className="linkStyle">
                                        <div className="card-body">

                                            <div className="media ">
                                                <div className="feather-icon-block m-r-25 ">
                                                    <FileText size={40} />
                                                </div>
                                                <div className="media-body align-self-center">
                                                    <p>Contracts</p>
                                                </div>
                                            </div>

                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-xl-2 col-sm-6">
                                <div className="card" style={{ boxShadow: "#496d81 10px 4px 4px 1px", backgroundColor: "" }}>
                                    <Link to="/connect" className="linkStyle">
                                        <div className="card-body">
                                            <div className="media">
                                                <div className="feather-icon-block m-r-25">
                                                    <Frown size={40} />
                                                </div>
                                                <div className="media-body align-self-center">
                                                    <p>Connect</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-xl-2 col-sm-6">
                                <div className="card" style={{ boxShadow: "#496d81 10px 4px 4px 1px", }}>
                                    <Link to="/efpricings" className="linkStyle">
                                        <div className="card-body">
                                            <div className="media">
                                                <div className="feather-icon-block m-r-25">
                                                    <DollarSign size={40} />
                                                </div>
                                                <div className="media-body align-self-center">
                                                    <p>EF-Pricing</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-xl-2 col-sm-6">
                                <div className="card" style={{ boxShadow: "#496d81 10px 4px 4px 1px", }}>
                                    <Link to="/user/myPublishedPost" className="linkStyle">
                                        <div className="card-body">
                                            <div className="media">
                                                <div className="feather-icon-block m-r-25">
                                                    <CreditCard size={40} />
                                                </div>
                                                <div className="media-body align-self-center">
                                                    <p>Payment</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center'>
                            <div className="col-xl-2 col-sm-6">
                                <div className="card" style={{ boxShadow: "#496d81 10px 4px 4px 1px", }}>
                                    <Link to="/support" className="linkStyle">
                                        <div className="card-body">
                                            <div className="media">
                                                <div className="feather-icon-block m-r-25">
                                                    <Command size={40} />
                                                </div>
                                                <div className="media-body align-self-center">
                                                    <p>Support</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-xl-2 col-sm-6">
                                <div className="card" style={{ boxShadow: "#496d81 10px 4px 4px 1px", }}>
                                    <Link to="/outsource" className="linkStyle">
                                        <div className="card-body">
                                            <div className="media">
                                                <div className="feather-icon-block m-r-25">
                                                    <Info size={40} />
                                                </div>
                                                <div className="media-body align-self-center">
                                                    <p>Outsource</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-xl-2 col-sm-6">
                                <div className="card" style={{ boxShadow: "#496d81 10px 4px 4px 1px", }}>
                                    <Link to="/user/notification" className="linkStyle">
                                        <div className="card-body">
                                            <div className="media">
                                                <div className="feather-icon-block m-r-25">
                                                    <DollarSign />
                                                </div>
                                                <div className="media-body align-self-center">
                                                    <p>Notification</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-xl-2 col-sm-6">
                                <div className="card" style={{ boxShadow: "#496d81 10px 4px 4px 1px", }}>
                                    <Link to="/crew" className="linkStyle">
                                        <div className="card-body">
                                            <div className="media">
                                                <div className="feather-icon-block m-r-25">
                                                    <Book size={40} />
                                                </div>
                                                <div className="media-body align-self-center">
                                                    <p>Crew</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <Footer3 />
            </Fragment>
            : userType === 'customer' ?
                <Fragment>
                    <Breadcrumb />
                    <Header />
                    <div style={{ width: "100%", height: "10px" }}></div>
                    <div className="container-fluid" style={{ backgroundColor: "rgb(15, 9, 60)", }}>
                        <div style={{ width: "100%", height: "50px" }}></div>
                        <div className='' >
                            <div className="row d-flex justify-content-center align-item-center">
                                <div className="col-xl-2  col-sm-6">
                                    <div className="card" style={{ boxShadow: "#496d81 10px 4px 4px 1px", }} >
                                        <Link to="/order" className="linkStyle" >
                                            <div className="card-body">
                                                <div className="media ">
                                                    <div className="feather-icon-block m-r-25">
                                                        <Archive size={40} />
                                                    </div>
                                                    <div className="media-body align-self-center">
                                                        <p>Order</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>

                                <div className="col-xl-2 col-sm-6">
                                    <div className="card linSty" style={{ boxShadow: "#496d81 10px 4px 4px 1px", }}>
                                        <Link to="/userProfile" className="linkStyle" >
                                            <div className="card-body">
                                                <div className="media">
                                                    <div className="feather-icon-block m-r-25">
                                                        <User size={40} />
                                                    </div>
                                                    <div className="media-body align-self-center">
                                                        <p>Profile</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-sm-6">
                                    <div className="card linSty" style={{ boxShadow: "#496d81 10px 4px 4px 1px", }}>
                                        <Link to="/project" className="linkStyle">
                                            <div className="card-body">
                                                <div className="media">
                                                    <div className="feather-icon-block m-r-25">
                                                        <Briefcase size={40} />
                                                    </div>
                                                    <div className="media-body align-self-center">
                                                        <p>Project</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-sm-6">
                                    <div className="card linSty" style={{ boxShadow: "#496d81 10px 4px 4px 1px", }}>
                                        <Link to="/invoice" className="linkStyle">
                                            <div className="card-body">
                                                <div className="media">
                                                    <div className="feather-icon-block m-r-25">
                                                        <DollarSign size={40} />
                                                    </div>
                                                    <div className="media-body align-self-center">
                                                        <p>Invoice</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>

                            </div>
                            <div className='row d-flex justify-content-center'>
                                <div className="col-xl-2 col-sm-6">
                                    <div className="card linSty" style={{ boxShadow: "#496d81 10px 4px 4px 1px", }}>
                                        <Link to="/workloglist" className="linkStyle">
                                            <div className="card-body">

                                                <div className="media ">
                                                    <div className="feather-icon-block m-r-25 ">
                                                        <Settings size={40} />
                                                    </div>
                                                    <div className="media-body align-self-center">
                                                        <p>Working</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-sm-6">
                                    <div className="card linSty" style={{ boxShadow: "#496d81 10px 4px 4px 1px", backgroundColor: "" }}>
                                        <Link to="/contract" className="linkStyle">
                                            <div className="card-body">
                                                <div className="media">
                                                    <div className="feather-icon-block m-r-25">
                                                        <Info size={40} />
                                                    </div>
                                                    <div className="media-body align-self-center">
                                                        <p>Contracts</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-sm-6">
                                    <div className="card linSty" style={{ boxShadow: "#496d81 10px 4px 4px 1px", }}>
                                        <Link to="/connect" className="linkStyle">
                                            <div className="card-body">
                                                <div className="media">
                                                    <div className="feather-icon-block m-r-25">
                                                        <Frown size={40} />
                                                    </div>
                                                    <div className="media-body align-self-center">
                                                        <p>Connect</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-sm-6">
                                    <div className="card linSty" style={{ boxShadow: "#496d81 10px 4px 4px 1px", }}>
                                        <Link to="/user/notification" className="linkStyle">
                                            <div className="card-body">
                                                <div className="media">
                                                    <div className="feather-icon-block m-r-25">
                                                        <Home size={40} />
                                                    </div>
                                                    <div className="media-body align-self-center">
                                                        <p>Notification</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className='row d-flex justify-content-center'>
                                <div className="col-xl-2 col-sm-6">
                                    <div className="card linSty" style={{ boxShadow: "#496d81 10px 4px 4px 1px", }}>
                                        <Link to="/user/myPublishedPost" className="linkStyle" >
                                            <div className="card-body" >
                                                <div className="media">
                                                    <div className="feather-icon-block m-r-25">
                                                        <CreditCard size={40} />
                                                    </div>
                                                    <div className="media-body align-self-center">
                                                        <p>Payment</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-sm-6">
                                    <div className="card linSty" style={{ boxShadow: "#496d81 10px 4px 4px 1px", }}>
                                        <Link to="/support" className="linkStyle">
                                            <div className="card-body">
                                                <div className="media">
                                                    <div className="feather-icon-block m-r-25">
                                                        <Command size={40} />
                                                    </div>
                                                    <div className="media-body align-self-center">
                                                        <p>Support</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <Footer3 />
                </Fragment>
                : userType === 'engineer' ?
                    <Fragment>
                        <Breadcrumb />
                        <Header />
                        <div style={{ width: "100%", height: "10px" }}></div>
                        <div className="container-fluid" style={{ backgroundColor: "rgb(15, 9, 60)" }}>
                            <div style={{ width: "100%", height: "50px" }}></div>
                            <div className='' >
                                <div className="row d-flex justify-content-center" >
                                    <div className="col-xl-2  col-sm-6">
                                        <div className="card" style={{ boxShadow: "#496d81 10px 4px 4px 1px" }}>
                                            <Link to="/order" className="linkStyle">
                                                <div className="card-body">
                                                    <div className="media ">
                                                        <div className="feather-icon-block m-r-25">
                                                            <FileText />
                                                        </div>
                                                        <div className="media-body align-self-center">
                                                            <p>Order</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="col-xl-2 col-sm-6">
                                        <div className="card" style={{ boxShadow: "#496d81 10px 4px 4px 1px", }}>
                                            <Link to="/userProfile" className="linkStyle">
                                                <div className="card-body">
                                                    <div className="media">
                                                        <div className="feather-icon-block m-r-25">
                                                            <FileText />
                                                        </div>
                                                        <div className="media-body align-self-center">
                                                            <p>Profile</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-xl-2 col-sm-6">
                                        <div className="card" style={{ boxShadow: "#496d81 10px 4px 4px 1px", }}>
                                            <Link to="/project" className="linkStyle">
                                                <div className="card-body">
                                                    <div className="media">
                                                        <div className="feather-icon-block m-r-25">
                                                            <Video />
                                                        </div>
                                                        <div className="media-body align-self-center">
                                                            <p>Projects</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-xl-2 col-sm-6">
                                        <div className="card" style={{ boxShadow: "#496d81 10px 4px 4px 1px", }}>
                                            <Link to="/workloglist" className="linkStyle">
                                                <div className="card-body">
                                                    <div className="media">
                                                        <div className="feather-icon-block m-r-25">
                                                            <HelpCircle />
                                                        </div>
                                                        <div className="media-body align-self-center">
                                                            <p>Working</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="row d-flex justify-content-center" >
                                    <div className="col-xl-2 col-sm-6">
                                        <div className="card" style={{ boxShadow: "#496d81 10px 4px 4px 1px", }}>
                                            <Link to="/connect" className="linkStyle">
                                                <div className="card-body">

                                                    <div className="media ">
                                                        <div className="feather-icon-block m-r-25 ">
                                                            <HelpCircle />
                                                        </div>
                                                        <div className="media-body align-self-center">
                                                            <p>Connect</p>
                                                        </div>
                                                    </div>

                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-xl-2 col-sm-6">
                                        <div className="card" style={{ boxShadow: "#496d81 10px 4px 4px 1px", backgroundColor: "" }}>
                                            <Link to="/user/notification" className="linkStyle">
                                                <div className="card-body">
                                                    <div className="media">
                                                        <div className="feather-icon-block m-r-25">
                                                            <HelpCircle />
                                                        </div>
                                                        <div className="media-body align-self-center">
                                                            <p>Notification</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-xl-2 col-sm-6">
                                        <div className="card" style={{ boxShadow: "#496d81 10px 4px 4px 1px", }}>
                                            <Link to="/support" className="linkStyle">
                                                <div className="card-body">
                                                    <div className="media">
                                                        <div className="feather-icon-block m-r-25">
                                                            <HelpCircle />
                                                        </div>
                                                        <div className="media-body align-self-center">
                                                            <p>Support</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-xl-2 col-sm-6">
                                        <div className="card" style={{ boxShadow: "#496d81 10px 4px 4px 1px", }}>
                                            <Link to="/crewEngineer" className="linkStyle">
                                                <div className="card-body">
                                                    <div className="media">
                                                        <div className="feather-icon-block m-r-25">
                                                            <HelpCircle />
                                                        </div>
                                                        <div className="media-body align-self-center">
                                                            <p>Crew</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer3 />
                    </Fragment> :
                    <Fragment>
                        <Breadcrumb />
                        <Error404 />
                    </Fragment>
    );

    ///pages/errors/error404
    // <div className="col-xl-2  col-sm-6" style={{ margin: "30px 50px 30px 100px" }}  >
    //     <div className="card"   >
    //         <Link to="/order" onMouseEnter={orderMouseEnter} onMouseLeave={orderMouseLeave} style={linkOrder} >
    //             <div className="card-body">
    //                 <div className="media ">
    //                     <div className="feather-icon-block m-r-25" style={{fontSize : isOrder ? "35px" : "25px",color:isOrder? "#fff":"#000"}}>
    //                         <FileText />
    //                     </div>
    //                     <div className="media-body align-self-center">
    //                         <p style={{fontSize : isOrder ? "25px" : "20px",color:isOrder ? "#fff" : "#000"}}>Order</p>
    //                     </div>
    //                 </div>
    //             </div>
    //         </Link>
    //     </div>
    // </div>
    // return (
    //     userType === 'customer' ? <Fragment>
    //         <Breadcrumb title="Choose Your Project" />
    //         <div className="container-fluid">
    //             <div className="row">
    //                 {/* <Notification influencerId={1} advertiserId={"11"}/> */}
    //                 {listData.map((item, index) => {
    //                     return (
    //                         <div className="col-md-6 col-lg-6 col-xl-3">
    //                             <div className="card custom-card">
    //                                 <div onClick={(e) => handleList(e, item.id)}>
    //                                     <div className="card-header">
    //                                         {index % 2 == 0 ? <img className="img-fluid" src={golden} alt="" /> : <img className="img-fluid" src={black} alt="" />}
    //                                     </div>
    //                                     <div className="card-profile">
    //                                         <img className="rounded-circle" width="150px" height="150px" onError={(e) => { e.target.onerror = null; e.target.src = "http://app.cinfluencers.com/avatar.jpg" }} src={null != item.AVATAR_URL ? CMS_STRAPI_URL + item.AVATAR_URL : CMS_STRAPI_URL + LabelConstants.DEFAULT_AVATAR} alt="" />
    //                                     </div>
    //                                     <div className="text-center profile-details mt-3">
    //                                         <h5>{item.DISPLAY_NAME}</h5>
    //                                         <h6>{null != item.DESIGNATION && item.DESIGNATION !== '' ? item.DESIGNATION : LabelConstants.DESIGNATION}</h6>
    //                                         <h6>{null != item.CURRENT_ORGANIZATION && item.CURRENT_ORGANIZATION !== '' ? item.CURRENT_ORGANIZATION : LabelConstants.CURRENT_ORGANIZATION}</h6>
    //                                     </div>
    //                                 </div>
    //                                 <div className="card-footer row">
    //                                     <div className="col-4 col-sm-4">
    //                                         <i className="fa fa-facebook text-primary"></i>
    //                                         <h6 className="counter">{item.FACEBOOK_FRND_COUNT == null ? '0' : Number(item.FACEBOOK_FRND_COUNT) > 99999 ? "99999+" : Number(item.FACEBOOK_FRND_COUNT)}</h6>
    //                                     </div>
    //                                     <div className="col-4 col-sm-4">
    //                                         <i className="fa fa-twitter text-primary"></i>
    //                                         <h6>{item.TWITTER_FOLLOWER_COUNT == null ? '0' : Number(item.TWITTER_FOLLOWER_COUNT) > 99999 ? "99999+" : Number(item.TWITTER_FOLLOWER_COUNT)}</h6>
    //                                     </div>
    //                                     <div className="col-4 col-sm-4">
    //                                         <i className="fa fa-linkedin text-primary"></i>
    //                                         <h6>{item.LINKEDIN_CONN_COUNT == null ? '0' : Number(item.LINKEDIN_CONN_COUNT) > 99999 ? "99999+" : Number(item.LINKEDIN_CONN_COUNT)}</h6>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     )
    //                 })
    //                 }
    //             </div>
    //         </div>
    //     </Fragment>
    //         : userType === 'influencer' ?
    //             <InfluencerScreen /> : null
    // );
};

export default UserDashboard;