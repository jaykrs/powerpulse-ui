import React, { Fragment, useState, useEffect } from 'react';
import { useHistory, withRouter } from "react-router";
import Header from './layout/header';
import Engfirmlist from './element/engfirmlist';
import Footer from './layout/footer';
import Header3 from './element/header3';
import Footer3 from './element/footer3';
import DetailList from './element/detaillist';
const DetailsList = ({ props }) => {   

    return (
        <>
            <Header3 />
            <div className="page-content bg-white" id="top">
                <DetailList />
                <Footer3 />
            </div>
        </>
    );
};

export default withRouter(DetailsList);