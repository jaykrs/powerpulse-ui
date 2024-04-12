import axios from 'axios';
import React, { Fragment, useState } from 'react';
// import Countup from 'react-countup';
import { InfluencerScreen } from '.';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import Breadcrumb from '../common/breadcrumb';
import { Command, Navigation, DollarSign, HelpCircle, Mic, FileText, Video } from 'react-feather';
const UserCards = ({ history }) => {
    // const [value, setValue] = useState(
    //     localStorage.getItem('jwt')

    // );
    // console.log(localStorage.getItem('userType'));
    // const [listData, setListData] = useState([]);
    // const [check, setCheck] = useState(false);
    const [userType, setUserType] = useState(localStorage.getItem('userType'));
    // const [search, setSearch] = useState(localStorage.getItem('searchButton'));

    // const allData = async () => {
    //     const { data } = await axios.get(CMS_STRAPI_URL + '/influencers' + '?ACTIVE=true', {
    //         headers: {
    //             Authorization: 'Bearer ' + value,
    //         },
    //     });

    //     setListData(data)
    //     setCheck(false)
    //         localStorage.removeItem("EXPSearch");
    //         localStorage.removeItem("MRKTEXPSearch");
    //         localStorage.removeItem("SECTORSearch");
    //         localStorage.removeItem("SMSearch");
    // }

    // if (check) {
    //     allData();
    // }
    // console.log('Login Data', value)

    function handleList(e, id) {
        //       localStorage.setItem("influencerId", id);
        history.push(`/influencer/influencerDetail/` + id);
    }


    return (
        userType === 'engineeringfirm' ?
            <Fragment>
                <Breadcrumb />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-3 col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <div className="media feather-main">
                                        <div className="feather-icon-block">
                                            <Command />
                                        </div>
                                        <div className="media-body align-self-center">
                                            <h6>Running Project</h6>
                                            <p>4</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <div className="media feather-main">
                                        <div className="feather-icon-block">
                                            <FileText />
                                        </div>
                                        <div className="media-body align-self-center">
                                            <h6>Running Contract</h6>
                                            <p>5</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <div className="media feather-main">
                                        <div className="feather-icon-block">
                                            <Video />
                                        </div>
                                        <div className="media-body align-self-center">
                                            <h6>Upcoming Meeting</h6>
                                            <p>2</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <div className="media feather-main">
                                        <div className="feather-icon-block">
                                            <HelpCircle />
                                        </div>
                                        <div className="media-body align-self-center">
                                            <h6>Support Ticket</h6>
                                            <p>2</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div className="col-xl-6">
                        <div className="card height-equal">
                            <div className="card-header card-header-border">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <h5>Recent Customer</h5>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="pull-right right-header"><span>Archive</span><span>
                                            <button className="btn btn-primary btn-pill">All</button></span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="new-users">
                                    <div className="media">
                                        <img className="rounded-circle image-radius m-r-15" src={require('../../assets/images/avtar/1.jpg')} alt="" />
                                        <div className="media-body">
                                            <h6 className="mb-0 f-w-700">Md Haneef Ahmad</h6>
                                            <p>Jeddah, mdhaneef@mailinator.com</p>
                                        </div><span className="pull-right">
                                            <button className="btn btn-pill btn-outline-light">Details</button></span>
                                    </div>
                                </div>
                                <div className="new-users">
                                    <div className="media">
                                        <img className="rounded-circle image-radius m-r-15" src={require('../../assets/images/avtar/1.jpg')} alt="" />
                                        <div className="media-body">
                                            <h6 className="mb-0 f-w-700">Md Hillal Ahmad</h6>
                                            <p>Riyadh, mdhillad@mailinator.com</p>
                                        </div><span className="pull-right">
                                            <button className="btn btn-pill btn-outline-light">Details</button></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="card height-equal">
                            <div className="card-header card-header-border">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <h5>Recent Engineer</h5>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="pull-right right-header"><span>Archive</span><span>
                                            <button className="btn btn-primary btn-pill">All</button></span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="new-users">
                                    <div className="media">
                                        <img className="rounded-circle image-radius m-r-15" src={require('../../assets/images/avtar/1.jpg')} alt="" />
                                        <div className="media-body">
                                            <h6 className="mb-0 f-w-700">Md Irphan Shidique</h6>
                                            <p>Jeddah, mdirphan@mailinator.com</p>
                                        </div><span className="pull-right">
                                            <button className="btn btn-pill btn-outline-light">Details</button></span>
                                    </div>
                                </div>
                                <div className="new-users">
                                    <div className="media">
                                        <img className="rounded-circle image-radius m-r-15" src={require('../../assets/images/avtar/1.jpg')} alt="" />
                                        <div className="media-body">
                                            <h6 className="mb-0 f-w-700">Md Stephen Abharam</h6>
                                            <p>Riyadh, stephen@mailinator.com</p>
                                        </div><span className="pull-right">
                                            <button className="btn btn-pill btn-outline-light">Details</button></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
            : userType === 'customer' ?
                <Fragment>
                    <Breadcrumb />
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-3 col-sm-6">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="media feather-main">
                                            <div className="feather-icon-block">
                                                <Command />
                                            </div>
                                            <div className="media-body align-self-center">
                                                <h6>Running Project</h6>
                                                <p>4</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="media feather-main">
                                            <div className="feather-icon-block">
                                                <FileText />
                                            </div>
                                            <div className="media-body align-self-center">
                                                <h6>Running Contract</h6>
                                                <p>5</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="media feather-main">
                                            <div className="feather-icon-block">
                                                <Video />
                                            </div>
                                            <div className="media-body align-self-center">
                                                <h6>Upcoming Meeting</h6>
                                                <p>2</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="media feather-main">
                                            <div className="feather-icon-block">
                                                <HelpCircle />
                                            </div>
                                            <div className="media-body align-self-center">
                                                <h6>Support Ticket</h6>
                                                <p>2</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div className="col-xl-6">
                            <div className="card height-equal">
                                <div className="card-header card-header-border">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <h5>Recent Customer</h5>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="pull-right right-header"><span>Archive</span><span>
                                                <button className="btn btn-primary btn-pill">All</button></span></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="new-users">
                                        <div className="media">
                                            <img className="rounded-circle image-radius m-r-15" src={require('../../assets/images/avtar/1.jpg')} alt="" />
                                            <div className="media-body">
                                                <h6 className="mb-0 f-w-700">Md Haneef Ahmad</h6>
                                                <p>Jeddah, mdhaneef@mailinator.com</p>
                                            </div><span className="pull-right">
                                                <button className="btn btn-pill btn-outline-light">Details</button></span>
                                        </div>
                                    </div>
                                    <div className="new-users">
                                        <div className="media">
                                            <img className="rounded-circle image-radius m-r-15" src={require('../../assets/images/avtar/1.jpg')} alt="" />
                                            <div className="media-body">
                                                <h6 className="mb-0 f-w-700">Md Hillal Ahmad</h6>
                                                <p>Riyadh, mdhillad@mailinator.com</p>
                                            </div><span className="pull-right">
                                                <button className="btn btn-pill btn-outline-light">Details</button></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="card height-equal">
                                <div className="card-header card-header-border">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <h5>Recent Engineer</h5>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="pull-right right-header"><span>Archive</span><span>
                                                <button className="btn btn-primary btn-pill">All</button></span></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="new-users">
                                        <div className="media">
                                            <img className="rounded-circle image-radius m-r-15" src={require('../../assets/images/avtar/1.jpg')} alt="" />
                                            <div className="media-body">
                                                <h6 className="mb-0 f-w-700">Md Irphan Shidique</h6>
                                                <p>Jeddah, mdirphan@mailinator.com</p>
                                            </div><span className="pull-right">
                                                <button className="btn btn-pill btn-outline-light">Details</button></span>
                                        </div>
                                    </div>
                                    <div className="new-users">
                                        <div className="media">
                                            <img className="rounded-circle image-radius m-r-15" src={require('../../assets/images/avtar/1.jpg')} alt="" />
                                            <div className="media-body">
                                                <h6 className="mb-0 f-w-700">Md Stephen Abharam</h6>
                                                <p>Riyadh, stephen@mailinator.com</p>
                                            </div><span className="pull-right">
                                                <button className="btn btn-pill btn-outline-light">Details</button></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
                : userType === 'engineer' ?
                    <Fragment>
                        <Breadcrumb />
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-xl-3 col-sm-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="media feather-main">
                                                <div className="feather-icon-block">
                                                    <Command />
                                                </div>
                                                <div className="media-body align-self-center">
                                                    <h6>Running Project</h6>
                                                    <p>4</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-sm-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="media feather-main">
                                                <div className="feather-icon-block">
                                                    <FileText />
                                                </div>
                                                <div className="media-body align-self-center">
                                                    <h6>Running Contract</h6>
                                                    <p>5</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-sm-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="media feather-main">
                                                <div className="feather-icon-block">
                                                    <Video />
                                                </div>
                                                <div className="media-body align-self-center">
                                                    <h6>Upcoming Meeting</h6>
                                                    <p>2</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-sm-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="media feather-main">
                                                <div className="feather-icon-block">
                                                    <HelpCircle />
                                                </div>
                                                <div className="media-body align-self-center">
                                                    <h6>Support Ticket</h6>
                                                    <p>2</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div className="col-xl-6">
                                <div className="card height-equal">
                                    <div className="card-header card-header-border">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <h5>Recent Customer</h5>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="pull-right right-header"><span>Archive</span><span>
                                                    <button className="btn btn-primary btn-pill">All</button></span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="new-users">
                                            <div className="media">
                                                <img className="rounded-circle image-radius m-r-15" src={require('../../assets/images/avtar/1.jpg')} alt="" />
                                                <div className="media-body">
                                                    <h6 className="mb-0 f-w-700">Md Haneef Ahmad</h6>
                                                    <p>Jeddah, mdhaneef@mailinator.com</p>
                                                </div><span className="pull-right">
                                                    <button className="btn btn-pill btn-outline-light">Details</button></span>
                                            </div>
                                        </div>
                                        <div className="new-users">
                                            <div className="media">
                                                <img className="rounded-circle image-radius m-r-15" src={require('../../assets/images/avtar/1.jpg')} alt="" />
                                                <div className="media-body">
                                                    <h6 className="mb-0 f-w-700">Md Hillal Ahmad</h6>
                                                    <p>Riyadh, mdhillad@mailinator.com</p>
                                                </div><span className="pull-right">
                                                    <button className="btn btn-pill btn-outline-light">Details</button></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6">
                                <div className="card height-equal">
                                    <div className="card-header card-header-border">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <h5>Recent Engineer</h5>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="pull-right right-header"><span>Archive</span><span>
                                                    <button className="btn btn-primary btn-pill">All</button></span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="new-users">
                                            <div className="media">
                                                <img className="rounded-circle image-radius m-r-15" src={require('../../assets/images/avtar/1.jpg')} alt="" />
                                                <div className="media-body">
                                                    <h6 className="mb-0 f-w-700">Md Irphan Shidique</h6>
                                                    <p>Jeddah, mdirphan@mailinator.com</p>
                                                </div><span className="pull-right">
                                                    <button className="btn btn-pill btn-outline-light">Details</button></span>
                                            </div>
                                        </div>
                                        <div className="new-users">
                                            <div className="media">
                                                <img className="rounded-circle image-radius m-r-15" src={require('../../assets/images/avtar/1.jpg')} alt="" />
                                                <div className="media-body">
                                                    <h6 className="mb-0 f-w-700">Md Stephen Abharam</h6>
                                                    <p>Riyadh, stephen@mailinator.com</p>
                                                </div><span className="pull-right">
                                                    <button className="btn btn-pill btn-outline-light">Details</button></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment> :
                    <Fragment>
                        <Breadcrumb />
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-xl-3 col-sm-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="media feather-main">
                                                <div className="feather-icon-block">
                                                    <Command />
                                                </div>
                                                <div className="media-body align-self-center">
                                                    <h6>Running Project</h6>
                                                    <p>4</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-sm-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="media feather-main">
                                                <div className="feather-icon-block">
                                                    <FileText />
                                                </div>
                                                <div className="media-body align-self-center">
                                                    <h6>Running Contract</h6>
                                                    <p>5</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-sm-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="media feather-main">
                                                <div className="feather-icon-block">
                                                    <Video />
                                                </div>
                                                <div className="media-body align-self-center">
                                                    <h6>Upcoming Meeting</h6>
                                                    <p>2</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-sm-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="media feather-main">
                                                <div className="feather-icon-block">
                                                    <HelpCircle />
                                                </div>
                                                <div className="media-body align-self-center">
                                                    <h6>Support Ticket</h6>
                                                    <p>2</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div className="col-xl-6">
                                <div className="card height-equal">
                                    <div className="card-header card-header-border">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <h5>Recent Customer</h5>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="pull-right right-header"><span>Archive</span><span>
                                                    <button className="btn btn-primary btn-pill">All</button></span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="new-users">
                                            <div className="media">
                                                <img className="rounded-circle image-radius m-r-15" src={require('../../assets/images/avtar/1.jpg')} alt="" />
                                                <div className="media-body">
                                                    <h6 className="mb-0 f-w-700">Md Haneef Ahmad</h6>
                                                    <p>Jeddah, mdhaneef@mailinator.com</p>
                                                </div><span className="pull-right">
                                                    <button className="btn btn-pill btn-outline-light">Details</button></span>
                                            </div>
                                        </div>
                                        <div className="new-users">
                                            <div className="media">
                                                <img className="rounded-circle image-radius m-r-15" src={require('../../assets/images/avtar/1.jpg')} alt="" />
                                                <div className="media-body">
                                                    <h6 className="mb-0 f-w-700">Md Hillal Ahmad</h6>
                                                    <p>Riyadh, mdhillad@mailinator.com</p>
                                                </div><span className="pull-right">
                                                    <button className="btn btn-pill btn-outline-light">Details</button></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6">
                                <div className="card height-equal">
                                    <div className="card-header card-header-border">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <h5>Recent Engineer</h5>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="pull-right right-header"><span>Archive</span><span>
                                                    <button className="btn btn-primary btn-pill">All</button></span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="new-users">
                                            <div className="media">
                                                <img className="rounded-circle image-radius m-r-15" src={require('../../assets/images/avtar/1.jpg')} alt="" />
                                                <div className="media-body">
                                                    <h6 className="mb-0 f-w-700">Md Irphan Shidique</h6>
                                                    <p>Jeddah, mdirphan@mailinator.com</p>
                                                </div><span className="pull-right">
                                                    <button className="btn btn-pill btn-outline-light">Details</button></span>
                                            </div>
                                        </div>
                                        <div className="new-users">
                                            <div className="media">
                                                <img className="rounded-circle image-radius m-r-15" src={require('../../assets/images/avtar/1.jpg')} alt="" />
                                                <div className="media-body">
                                                    <h6 className="mb-0 f-w-700">Md Stephen Abharam</h6>
                                                    <p>Riyadh, stephen@mailinator.com</p>
                                                </div><span className="pull-right">
                                                    <button className="btn btn-pill btn-outline-light">Details</button></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
    );


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

export default UserCards;