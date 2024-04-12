import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/style.css';
const Header = ({ history }) => {
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState("home");
    return (
        <>
            {/* <!-- Header --> */}
            <footer class="footer">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-3 col-md-6">
                            <div class="single-widget open-time">
                                <h3>Opening Hours</h3>
                                <ul>
                                    <li>
                                        <span>Mon-Tue:</span>
                                        <span class="right">6:00AM-10:00PM</span>
                                    </li>
                                    <li>
                                        <span>Wed-Thu:</span>
                                        <span class="right">6:00AM-10:00PM</span>
                                    </li>
                                    <li>
                                        <span>Fri:</span>
                                        <span class="right">6:00AM-04:00PM</span>
                                    </li>
                                    <li>
                                        <span>Sun:</span>
                                        <span class="right">Closed</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6">
                            <div class="single-widget contact">
                                <h3>Get In Touch</h3>
                                <ul>
                                    <li>
                                        <div class="icon">
                                            <i aria-hidden="true" class="bx bx-location-plus"></i>
                                        </div>
                                        <span>Address:</span>
                                        124, Western Road, Melbourne Australia </li>
                                    <li>
                                        <div class="icon">
                                            <i aria-hidden="true" class="bx bx-envelope"></i>
                                        </div>
                                        <span>Email:</span>
                                        hello@example.com</li>
                                    <li>
                                        <div class="icon">
                                            <i aria-hidden="true" class="bx bx-phone-call"></i>
                                        </div>
                                        <span>Hotline:</span>
                                        +123-456-789</li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6">
                            <section id="nav_menu-2" class="widget"><h2 class="widget-title">Services</h2><div class="menu-medic-departments-container"><ul id="menu-medic-departments" class="menu"><li id="menu-item-498" class="menu-item menu-item-type-post_type menu-item-object-medic-departments menu-item-498"><a href="https://medic.mhrtheme.com/medic-departments/cardiology/">Survay</a></li>
                                <li id="menu-item-499" class="menu-item menu-item-type-post_type menu-item-object-medic-departments menu-item-499"><a href="https://medic.mhrtheme.com/medic-departments/dental-care/">Supervision</a></li>
                                <li id="menu-item-500" class="menu-item menu-item-type-post_type menu-item-object-medic-departments menu-item-500"><a href="https://medic.mhrtheme.com/medic-departments/eye-care/">Design</a></li>
                                <li id="menu-item-501" class="menu-item menu-item-type-post_type menu-item-object-medic-departments menu-item-501"><a href="https://medic.mhrtheme.com/medic-departments/medicine/">Architecture</a></li>
                                <li id="menu-item-502" class="menu-item menu-item-type-post_type menu-item-object-medic-departments menu-item-502"><a href="https://medic.mhrtheme.com/medic-departments/neurology/">Consulting</a></li>
                                <li id="menu-item-503" class="menu-item menu-item-type-post_type menu-item-object-medic-departments menu-item-503"><a href="https://medic.mhrtheme.com/medic-departments/pulmonary/">Cost Estimation</a></li>
                            </ul></div></section> </div>
                    </div>
                </div>
            </footer>
            {/* <!-- Header End --> */}

        </>
    )
}

export default Header;

