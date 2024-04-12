import React, { Fragment, useState, useEffect, Component } from 'react';
import axios from 'axios';
import '../layout/contact.css'
class Footer3 extends Component {

	render() {
		return (
			<footer>
				<div className="footer-top">
					<div className="container">
						<div className="row">
							<div className="col-xl-3 col-lg-12 col-md-4 col-sm-6 wow fadeIn" data-wow-duration="2s" data-wow-delay="0.2s">
								<div className="widget widget_about">
									<h5 className="footer-title">The Company</h5>
									{/* <div className="footer-logo">
								<a><img src="images/logo-white.png" alt=""/></a> 
							</div> */}
									<text className='footer_color'>we are an engineering platform and app which is called mohandess, which makes the connection between the customer, engineering firms, engineers, surveyors, and outsource designing engineering firms which have experiences to have opportunities in the Saudi and other gulf states market, in easy way and efficient connection
									</text>
									<div className="dlab-social-icon">
										<ul  style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:'80px',padding:'2px'}}>
											<li><a className="fa fa-facebook" href="https://en-gb.facebook.com/"></a></li>
											<li><a className="fa fa-instagram" href="https://www.instagram.com/"></a></li>
											<li><a className="fa fa-twitter" href="https://twitter.com/login?lang=en"></a></li>
										</ul>
									</div>
								</div>
							</div>
							<div className="col-xl-2 col-lg-3 col-md-4  col-sm-6 wow fadeIn" data-wow-duration="2s" data-wow-delay="0.4s">
								<div className="widget widget_services style-1">
									<h5 className="footer-title">Shortcuts</h5>
									<ul>
										<li><a><text className='footer_text'>Home</text></a></li>
										<li><a><text className='footer_text'>Supervision</text> </a></li>
										<li><a><text className='footer_text'>On-boarding</text> </a></li>
										<li><a><text className='footer_text'>Subscribe</text> </a></li>
										<li><a><text className='footer_text'>Payments</text> </a></li>
										<li><a><text className='footer_text'>Resources</text> </a></li>
										<li><a><text className='footer_text'>Presence</text> </a></li>
									</ul>
								</div>
							</div>
							<div className="col-xl-2 col-lg-3 col-md-4  col-sm-6 wow fadeIn" data-wow-duration="2s" data-wow-delay="0.6s">
								<div className="widget widget_services style-1">
									<h5 className="footer-title">Our Services</h5>
									<ul>
										<li><a><text className='footer_text'>Survey</text></a></li>
										<li><a><text className='footer_text'>Design</text></a></li>
										<li><a><text className='footer_text'>News</text></a></li>
										<li><a><text className='footer_text'>Partner</text></a></li>
										<li><a><text className='footer_text'>Support</text>  </a></li>
										<li><a> <text className='footer_text'>Affiliate</text> </a></li>
									</ul>
								</div>
							</div>
							<div className="col-xl-2 col-lg-3 col-md-4  col-sm-6 wow fadeIn" data-wow-duration="2s" data-wow-delay="0.8s">
								<div className="widget widget_about">
									<h5 className="footer-title">The Company</h5>
									<text className='footer_color'>
										<span>Our support available to help you 24 <br /> hours a day, seven days a week.</span><br />
										<text > 8AM - 4PM Saturday to Thursday</text><br />
										<text>Support by Email...Friday </text>
									</text>

								</div>
							</div>
							<div className="col-xl-3 col-lg-3 col-md-4  col-sm-6 wow fadeIn" data-wow-duration="2s" data-wow-delay="1.0s">
								<div className="widget widget_getintuch">
									<h5 className="footer-title">Office</h5>
									<ul>
										<li>
											<i className="fa fa-phone gradient"></i>
											<span>+034647354966</span>
										</li>
										<li>
											<i className="fa fa-envelope gradient"></i>
											<span>support@mohandess.com </span>
										</li>
										<li>
											<i className="fa fa-map-marker gradient"></i>
											<span>Jeddah , Saudi Arabia</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* <!-- footer bottom part --> */}
				{/* <div className="footer-bottom">
					<div className="container">
						<div className="row align-items-center">
							<div className="col-md-12 text-center">
								<span className="copyright-text">Copyright © 2022 <a href="https://dexignzone.com/" target="_blank">DexignZone</a>. All rights reserved.</span>
							</div>
						</div>
					</div>
				</div> */}
			</footer>
		);
	}
}

export default Footer3;