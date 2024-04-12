import React ,{ Fragment, useState, useEffect } from 'react';
import { withRouter } from "react-router";
import Header from './layout/header';
import Footer from './layout/footer';
import PaymentPage from './element/paymentpage';
import Footer3 from './element/footer3';
import Header3 from './element/header3';
import PaymentPagOc from './element/paymentpageoc';

const PaymentListOc = ({ history }) => {
  return (
    <div>
      <Header3 />
      
      <div className="page-content bg-white" id="top">
       <PaymentPagOc/>
        </div>
        <Footer3 />
    </div>
);
};

export default withRouter(PaymentListOc);