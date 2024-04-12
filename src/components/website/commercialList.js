import React ,{ Fragment, useState, useEffect } from 'react';
import { withRouter } from "react-router";
import Footer3 from './element/footer3';
import Header3 from './element/header3';
import CommercialList from './element/commercialList';

const ResultPage = ({ history }) => {
  return (
    <div>
      <Header3 />
      
      <div className="page-content bg-white" id="top">
       <CommercialList />
        </div>
        <Footer3 />
    </div>
);
};

export default withRouter(ResultPage);