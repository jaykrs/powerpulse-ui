import React ,{ Fragment, useState, useEffect } from 'react';
import Slider from "react-slick";
import purple1 from "../images/logo/saeco.png";
import purple2 from "../images/logo/modon.png";
import purple3 from "../images/logo/toyo.png";
import purple4 from "../images/logo/logo-purple4.png";
import purple5 from "../images/logo/logo-purple5.png";
import purple6 from "../images/logo/logo-purple6.png";
const ClientSlider = ({ history }) => {

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        arrows: false,
		responsive: [
			{
			  breakpoint: 1200,
			  settings: {
				slidesToShow: 4,
				slidesToScroll: 1,
				
			  }
			},	
			{
			  breakpoint: 767,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
				
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				
			  }
			},
		]
    };
    return (
        <>
            <Slider {...settings}>
				<div className="item">
					<div className="clients-logo">
						<img
							className="logo-main"
							src={purple1}
							alt=""
						/>
						<img
							className="logo-hover"
							src="images/logo/logo-light1.png"
							alt=""
						/>
					</div>
				</div>
				<div className="item">
					<div className="clients-logo">
						<img
							className="logo-main"
							src={purple2}
							alt=""
						/>
						<img
							className="logo-hover"
							src="images/logo/logo-light2.png"
							alt=""
						/>
					</div>
				</div>
				<div className="item">
					<div className="clients-logo">
						<img
							className="logo-main"
							src={purple3}
							alt=""
						/>
						<img
							className="logo-hover"
							src="images/logo/logo-light3.png"
							alt=""
						/>
					</div>
				</div>
				<div className="item">
					<div className="clients-logo">
						<img
							className="logo-main"
							src={purple4}
							alt=""
						/>
						<img
							className="logo-hover"
							src="images/logo/logo-light4.png"
							alt=""
						/>
					</div>
				</div>
				<div className="item">
					<div className="clients-logo">
						<img
							className="logo-main"
							src={purple5}
							alt=""
						/>
						<img
							className="logo-hover"
							src="images/logo/logo-light5.png"
							alt=""
						/>
					</div>
				</div>
				<div className="item">
					<div className="clients-logo">
						<img
							className="logo-main"
							src={purple6}
							alt=""
						/>
						<img
							className="logo-hover"
							src="images/logo/logo-light6.png"
							alt=""
						/>
					</div>
				</div>
				<div className="item">
					<div className="clients-logo">
						<img
							className="logo-main"
							src={purple6}
							alt=""
						/>
						<img
							className="logo-hover"
							src="images/logo/logo-light6.png"
							alt=""
						/>
					</div>
				</div>
			</Slider>
        </>
    );
}

export default ClientSlider;
