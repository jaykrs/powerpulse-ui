import React, { Fragment, useState, useEffect, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import axios from 'axios';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import { Link } from 'react-router-dom';

class jobContractorForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: localStorage.getItem('jwt'),
            userId: localStorage.getItem('userId'),
            dataList: [],
            userType: localStorage.getItem('userType'),
            data: ''
        }
    }

    // componentWillMount() {
    //   const { value, userId, userType } = this.state;
    //   if (userType === 'advertiser') {
    //     axios({
    //       method: 'get',
    //       url: CMS_STRAPI_URL + '/jobposts?_sort=created_at:DESC&paymentind=true&advertiser.USER_ID=' + userId,
    //       headers: {
    //         Authorization:
    //           'Bearer ' + value,
    //       }
    //     }).then((response) => {
    //       if (null != response.data && response.data.length > 0) {
    //         var datasize = response.data.length - 1;
    //         this.setState({
    //           dataList: response.data
    //         })
    //         console.log('data', response.data)
    //       } else {
    //         this.setState({
    //           data: 'nodata'
    //         })
    //       }
    //     }, (error) => {
    //       console.log(error);
    //     });
    //   } else if (userType === 'influencer') {
    //     axios({
    //       method: 'get',
    //       url: CMS_STRAPI_URL + '/jobposts?_sort=created_at:DESC&paymentind=true&influencer.USER_ID=' + userId,
    //       headers: {
    //         Authorization:
    //           'Bearer ' + value,
    //       }
    //     }).then((response) => {
    //       if (null != response.data && response.data.length > 0) {
    //         var datasize = response.data.length - 1;
    //         this.setState({
    //           dataList: response.data
    //         })
    //         console.log('data', response.data)
    //       } else {
    //         this.setState({
    //           data: 'nodata'
    //         })
    //       }
    //     }, (error) => {
    //       console.log(error);
    //     });
    //   }

    // }

    // handleJobDetail() {
    //   this.props.history.push(`/user/jobDetail`)
    // }

    // handleJobList(e, id, platform) {
    //   this.props.history.push(`/user/jobListCatagory/` + id + '/' + platform)
    // }

    render() {
        const { dataList, userType, data } = this.state;
        // const total = 0;
        return (
            <Fragment>
                <Breadcrumb title="Form Default" parent="Form" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12 col-xl-6">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card">
                                        {/* <div className="card-header">
                      <h5>Default Form Layout</h5><span>Using the <a href="#javascript">card</a> component, you can extend the default collapse behavior to create an accordion.</span>
                    </div> */}
                                        <div className="card-body">
                                            <form className="theme-form mega-form">
                                                <h6>Account Information</h6>
                                                <div className="form-group">
                                                    <label className="col-form-label">User Name</label>
                                                    <input className="form-control" type="text" placeholder="Enter User Name" />
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-form-label">Name</label>
                                                    <input className="form-control" type="text" placeholder="Enter Name" />
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-form-label">Email</label>
                                                    <input className="form-control" type="test" placeholder="Enter Email" />
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-form-label">Number</label>
                                                    <input className="form-control" type="country" placeholder="Enter Number " />
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-form-label">Service Region</label>
                                                    <input className="form-control" type="text" placeholder="Enter Service Region" />
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-form-label">Service City</label>
                                                    <input className="form-control" type="text" placeholder="Enter Service City" />
                                                </div>

                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-xl-6">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card">
                                        {/* <div className="card-header">
                      <h5>Mega form</h5>
                    </div> */}
                                        <div className="card-body">
                                            <form className="theme-form">
                                                <div className="form-group">
                                                    <label className="col-form-label">Address</label>
                                                    <input className="form-control" type="text" placeholder="Enter Address" />
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-form-label">Country</label>
                                                    <input className="form-control" type="text" placeholder="Enter Country " />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">State</label>
                                                    <input className="form-control" id="exampleInputPassword1" type="text" placeholder="Enter State" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">City</label>
                                                    <input className="form-control" id="exampleInputPassword1" type="text" placeholder="Enter City" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">Zip Code</label>
                                                    <input className="form-control" id="exampleInputPassword1" type="text" placeholder="Enter Zip Code" />
                                                </div>

                                            </form>
                                        </div>
                                        <div className="card-footer">
                                            <button className="btn btn-primary mr-1">Submit</button>
                                            <button className="btn btn-secondary">Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default jobContractorForm;