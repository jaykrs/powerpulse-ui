import React, { Fragment, useState, useEffect, Component } from 'react';
// import Breadcrumb from '../common/breadcrumb';
import axios from 'axios';
// import '../website/layout/contact.css'
import '../layout/contact.css'
import mohandess from '../../../assets/images/logo/mohandess-logo.png'
import { Archive, Briefcase, CreditCard, Home, Settings, Slash, User, Book, Menu } from 'react-feather';
// import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/mohandess1.png';
import Image from '../../../assets/images/man.png';
import screen from '../../../assets/images/screenshotmohandess.png'
import google from '../../../assets/images/googleplay.png'
import app from '../../../assets/images/app.png'
import appimage from '../../../assets/images/images.png'
import City from "../../../city.json";
import HomeSidebar from "../.././common/sidebar-component/home-sidebar";


// import logo from '../../../../assets/images'

class Header3 extends Component {
    constructor(props){
        super(props)
        this.state = {
            hidemenu : false
        }
    }

    render() {
        var userData = localStorage.getItem('userData');
        var user = JSON.parse(userData);
        const logout = (response) => {
            localStorage.setItem('userData', null);
            localStorage.removeItem('userData');
            localStorage.removeItem('avatarUri');
            localStorage.removeItem('userId');
            localStorage.removeItem('jwt');
            localStorage.removeItem('profileURL');
            localStorage.removeItem('userType');
            sessionStorage.removeItem('checkOutId');
            sessionStorage.removeItem('priceList');
            sessionStorage.removeItem('priceData');
            window.location.reload();
        }

        const handleResidencial = () => {

            axios({
                method: "GET",
                url: "https://api.mohandess.com/api/efrpricings"
            }).then((response) => {
                console.log(response.data.data, "");
                localStorage.setItem("efrpricingList", response.data);
                this.props.history.push("/residentialList");

            }, (err) => {
                console.log(err)
            });
        }
        const { hidemenu } = this.state;
        return (
            <div>
            <div className='heade-main_div'>
                <header className="site-header header-transparent mo-left">
                    {/* <!-- Main Header --> */}
                    <div className="sticky-header main-bar-wraper navbar-expand-lg" >
                        <div className="main-bar clearfix ">
                            <div className="d-flex flex-row justify-content-between">
                                {/* <!-- Website Logo --> */}
                                <div className="logo-header mostion logo-dark" style={{ height: '40px' }}>
                                    {/* <Link href="/"> */}

                                    {/* <a>
                                        <div style={{backgroundColor:'red',height:'80px'}} >
                                        <img style={{height:'90px',width:'120%'}} className="custom-logo-white" src={mohandess} alt="" />

                                        </div>
                                    </a> */}
                                    <a>
                                        <img style={{ height: '75%', width: '110%', marginTop: "-34px" }} className="custom-logo-white" src={mohandess} alt="logo" />
                                        <img className="custom-logo" src="images/logo-3.png" alt="" />
                                    </a>
                                    {/* </Link> */}

                                </div>
                                {/* <!-- Nav Toggle Button --> */}


                                <div className={"header-nav navbar-collapse collapse justify-content-end"}>
                                    <ul className="nav navbar-nav navbar">
                                        <li><a style={{ color: "rgb(214, 212, 212)" }} ><span>SERVING CITIES</span><i className="fa fa-chevron-down"></i></a>
                                            <ul className='sub-menu'>
                                                <li><Link to={"/residentialList"}>residential</Link></li>
                                                <li><Link to={"/commercialList"}>Commercial</Link></li>
                                                <li><Link to={"/licenseList"}>License</Link></li>
                                            </ul>
                                        </li>

                                        <li ><a style={{ color: "rgb(214, 212, 212)" }} ><span>RESIDENTIAL</span><i className="fa fa-chevron-down"></i></a>
                                            <ul className="sub-menu">
                                                <li><a>Al Abha</a></li>
                                                <li><a>Al Kharj</a></li>
                                                <li><a>Al Khobar</a></li>
                                                <li><a>Buraidah</a></li>
                                                <li><a>Dammam</a></li>
                                                <li><a>Jeddah</a></li>
                                                <li><a>Makkah</a></li>
                                                <li><a>Medina</a></li>
                                                <li><a>Riyadh</a></li>
                                                <li><a>Taif</a></li>
                                                <li><a>JTabuk</a></li>
                                            </ul>
                                        </li>
                                        <li ><a style={{ color: "rgb(214, 212, 212)" }}><span>COMMERCIAL</span><i className="fa fa-chevron-down"></i></a>
                                            <ul className="sub-menu">
                                                <li><a>Al Abha</a></li>
                                                <li><a>Al Kharj</a></li>
                                                <li><a>Al Khobar</a></li>
                                                <li><a>Buraidah</a></li>
                                                <li><a>Dammam</a></li>
                                                <li><a>Jeddah</a></li>
                                                <li><a>Makkah</a></li>
                                                <li><a>Medina</a></li>
                                                <li><a>Riyadh</a></li>
                                                <li><a>Taif</a></li>
                                                <li><a>JTabuk</a></li>
                                            </ul>
                                        </li>
                                        <li ><a style={{ color: "rgb(214, 212, 212)" }} ><span>LICENSE</span><i className="fa fa-chevron-down"></i></a>
                                            <ul className="sub-menu">
                                                <li><a>Al Abha</a></li>
                                                <li><a>Al Kharj</a></li>
                                                <li><a>Al Khobar</a></li>
                                                <li><a>Buraidah</a></li>
                                                <li><a>Dammam</a></li>
                                                <li><a>Jeddah</a></li>
                                                <li><a>Makkah</a></li>
                                                <li><a>Medina</a></li>
                                                <li><a>Riyadh</a></li>
                                                <li><a>Taif</a></li>
                                                <li><a>JTabuk</a></li>
                                            </ul>
                                        </li>
                                        <li ><a style={{ color: "rgb(214, 212, 212)" }} ><span>LANGUAGE</span><i className="fa fa-chevron-down"></i></a>
                                            <ul className="sub-menu">
                                                <li><a>ENGLISH</a></li>
                                                <li><a>ARABIC</a></li>
                                            </ul>
                                        </li>
                                        {
                                            userData && user ? <ul className="nav navbar-nav navbar"><li ><a style={{ color: "rgb(214, 212, 212)" }} ><span>{user.name}</span><i className="fa fa-chevron-down"></i></a>
                                                <ul className="sub-menu">
                                                    <li><Link to="/userdashboard"><a>Dashboard</a></Link></li>
                                                    <li><a>Notification</a></li>
                                                    <li><a onClick={() => logout()} >Logout</a></li>
                                                </ul>
                                            </li></ul> : <Link to="/login"><a class="btn">Sign in <i className="fa fa-user"></i></a></Link>
                                        }
                                        {/* <li><a>Contact Us</a></li> */}

                                    </ul>
                                    <div className="dlab-social-icon">
                                        <ul>
                                            <a className="fa fa-facebook"></a>
                                            <a className="fa fa-twitter"></a>
                                            <a className="fa fa-linkedin"></a>
                                            <a className="fa fa-instagram"></a>
                                        </ul>
                                    </div>
                                </div>
                               <div className='m-t-30 m-r-30 showmenu'>
                                    <button className="btn btn-primary" onClick={()=>this.setState({hidemenu: !hidemenu})}>
                                        <Menu />
                                    </button>
                                    </div> 

                            </div>
                        </div>

                    </div>
                    
                    {/* <!-- Main Header End --> */}
                </header>
            </div  >
            <div className={ hidemenu ? "d-block" : "d-none"}>
            <HomeSidebar  />
            </div>
              
            </div>
        );
    }
}

export default Header3;