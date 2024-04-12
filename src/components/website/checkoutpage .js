import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from "react-router";
import Header from './layout/header';
import Footer from './layout/footer';
import Slider1 from './element/slider-1';
import ClientSlider from './element/clientSlider';
import Clients from './element/clients';
import Contactus from './element/contactus';
import ImageUs from './element/imageus';
import EngineerUs from './element/engineerus';
import Connect from './element/connect';
import ProjectUs from './element/projectus';
import Footer3 from './element/footer3';
import Header3 from './element/header3';
import Header2 from './element/header2';
import Checkout from './element/checkout';
const CheckOutPage = ({ history }) => {
    return (
        <div>

            <Header3 />
            <div className="page-content bg-white mt-" id="top">
                <Checkout />
            </div>
            {/* <Footer3 /> */}
        </div>
    );
};

export default withRouter(CheckOutPage);