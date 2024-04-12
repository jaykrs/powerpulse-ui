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
import Header3 from './element/header3';
import CheckoutOC from './element/checkoutoc';
const CheckOutOc = ({ history }) => {
    return (
        <div>

            <Header3 />
            <div className="Oc-content bg-white mt-" id="top">
                <CheckoutOC />
            </div>
            {/* <Footer3 /> */}
        </div>
    );
};

export default withRouter(CheckOutOc);