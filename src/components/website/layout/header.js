import React ,{ Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/style.css';
const Header = ({ history }) => {
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState("home");
    return (
      <>
        {/* <!-- Header --> */}
        <header className="site-header header-transparent text-black mo-left header-top-navigation-bar" id="fix-header">
            {/* <!-- Main Header --> */}
            <div className="sticky-header main-bar-wraper navbar-expand-lg">
                <div className="main-bar clearfix ">
                    <div className="container clearfix">
                        {/* <!-- Website Logo --> */}
                        <div className="logo-header mostion logo-dark">
                           <Link to="/"><a><img src="images/logo.png" alt=""/></a></Link>
                        </div>
                        {/* <!-- Nav Toggle Button --> */}
                        <button className={`navbar-toggler collapsed navicon justify-content-end ${show ? "open" : ""}`} onClick={() => setShow(!show)}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                        {/* <!-- Extra Nav --> */}
                        <div className="extra-nav">
                            <div className="extra-cell">
                                <Link to="/login"><a className="btn btn-link d-inline-flex align-items-center"><i className="fa fa-user t m-r10"></i>تسجيل الدخول</a></Link>
                            </div>
                        </div>
                        <div className={`header-nav navbar-collapse collapse justify-content-end ${show ? "show" : ""}`} id="navbarNavDropdown">
                            <div className="logo-header">
                                <Link to="/"><a><img src="images/logo.png" alt=""/></a></Link>
                            </div>
                            <ul className="nav navbar-nav navbar">	
                                <li><Link to="/home"><a>Home</a></Link></li>
                                <li className={`${open === "about" ? "open" : ""}`}><a  onClick={() => setOpen("about")}><span>Pages</span><i className="fa fa-chevron-down"></i></a>
                                    <ul className="sub-menu">
                                        <li><Link to="/aboutpage"><a>About Us</a></Link></li>
										<li><Link to="/faq-1"><a>Faq</a></Link></li>
                                        <li><Link to="/pricing-table-1"><a>Pricing Table</a></Link></li>
										<li><Link to="/team-1"><a>Team</a></Link></li>
                                        <li><Link to="/coming-soon"><a>Coming Soon</a></Link></li>
                                        <li><Link to="/error-404"><a>Error 404</a></Link></li>
                                        <li><Link to="/sitedown"><a>Site Down</a></Link></li>
                                        <li><Link to="/login"><a>Login</a></Link></li>
                                    </ul>
                                </li>
                                <li className={`${open === "services" ? "open" : ""}`}><a onClick={() => setOpen("services")}><span>Services</span><i className="fa fa-chevron-down"></i></a>
                                    <ul className="sub-menu">
                									
										<li><Link to="/servicepage"><a>Services</a></Link></li>
										<li><Link to="/services-details-1"><a>Services Details</a></Link></li>
                                    </ul>
                                </li>
                                <li className={`${open === "blog" ? "open" : ""}`}><a onClick={() => setOpen("blog")}><span>Blog</span><i className="fa fa-chevron-down"></i></a>
                                    <ul className="sub-menu">
                                        <li><Link to="/blog-large-right-sidebar"><a>Large Right Sidebar</a></Link></li>
										<li><Link to="/blog-details-1"><a>Blog Details</a></Link></li>
                                    </ul>
                                </li>
								{/* <li><Link to="/faq-1"><a>Contact Us</a></Link></li> */}
                            </ul>
                            <div className="dlab-social-icon">
                                <ul>
                                    <Link to="https://en-gb.facebook.com/"><a className="fa fa-facebook"></a></Link>
                                    <Link to="https://twitter.com/login?lang=en"><a className="fa fa-twitter"></a></Link>
                                    <Link to="https://www.linkedin.com/login"><a className="fa fa-linkedin"></a></Link>
                                    <Link to="https://www.instagram.com/"><a className="fa fa-instagram"></a></Link>
                                </ul>
                            </div>		
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Main Header End --> */}
        </header>
        {/* <!-- Header End --> */}
        
      </>
    )
  }
  
  export default Header;

  