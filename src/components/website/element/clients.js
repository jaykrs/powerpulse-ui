import React ,{ Fragment, useState, useEffect } from 'react';
import ClientSlider from "./clientSlider";
const Clients = ({ history }) => {
    return (
        <>
            <div className="content-inner-2">
                <div className="container">
                    <div className="clients-carousel owl-none owl-carousel owl-loaded owl-drag">
                    <ClientSlider />
                </div>
            </div>
        </div>

        </>
    );
}

export default Clients;
