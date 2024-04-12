import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../common/breadcrumb';
import axios from 'axios';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import { LabelConstants } from '../../constant/LableConstant';
const Notification = props => {
    const [value, setValue] = useState(localStorage.getItem('jwt'));
    // console.log("id = " + props.influencerId + props.advertiserId)
    axios({
        method: 'POST',
        url: '',
        headers: {
            Authorization:
                'Bearer ' + value,
        },
        data: {

        }
    }).then((response) => {

    }, (error) => {
        console.log(error);
    });

    return (
        <Fragment>
            <Breadcrumb title={LabelConstants.INFLUNCER} />
            <div className="container-fluid">
                <div>
                    <text>{props.influencerId}</text>
                    <text>{props.advertiserId}</text>
                </div>
            </div>
        </Fragment>

    );
};

export default Notification;