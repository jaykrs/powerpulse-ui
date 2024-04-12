import React, { Fragment, useState, useEffect, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import axios from 'axios';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';

class Successful extends Component {
    constructor(props) {
      super(props)
  
      this.state = {
      }

    }

    render() {
        const { dataList, userType, articlePost, postUrl } = this.state;
        return (
          <Fragment>
            {/* <Breadcrumb title="" parent="Ecommerce" /> */}
            <div className="flex-d">
                <h2 className="text-center mt-3">Payment Successfull</h2>
            </div>

            </Fragment>
        );
    }
    
}

export default Successful;