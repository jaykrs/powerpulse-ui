import React, { Fragment, useState, useEffect, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import axios from 'axios';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import { Link } from 'react-router-dom';

class jobEngineerForm extends Component {
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
                                                    <input className="form-control" type="email" placeholder="Enter Name" />
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-form-label">Email</label>
                                                    <input className="form-control" type="Number" placeholder="Enter Email" />
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-form-label">Phone Number</label>
                                                    <input className="form-control" type="country" placeholder="Enter Phone Number " />
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-form-label">Country Code</label>
                                                    <input className="form-control" type="state" placeholder="Enter Country Code" />
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-form-label">Currency Code</label>
                                                    <input className="form-control" type="state" placeholder="Enter Currency Code" />
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-form-label">Address</label>
                                                    <input className="form-control" type="state" placeholder="Enter Address" />
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-form-label">Country</label>
                                                    <input className="form-control" type="state" placeholder="Enter Country" />
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-form-label">State</label>
                                                    <input className="form-control" type="state" placeholder="Enter State" />
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-form-label">City</label>
                                                    <input className="form-control" type="state" placeholder="Enter City" />
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
                                                    <label className="col-form-label">Category</label>
                                                    <input className="form-control" type="country" placeholder="Enter Category " />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">Tax Number</label>
                                                    <input className="form-control" id="exampleInputPassword1" type="password" placeholder="Enter Tax Number" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">Bank Account No</label>
                                                    <input className="form-control" id="exampleInputPassword1" type="password" placeholder="Enter Bank Account No" />
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-form-label">Wallet Balance</label>
                                                    <input className="form-control" type="country" placeholder="Enter Wallet Balance " />
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-form-label">Survey</label>
                                                    <input className="form-control" type="country" placeholder="Enter Survey " />
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-form-label">Super Vission</label>
                                                    <input className="form-control" type="country" placeholder="Enter Super Vission " />
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-form-label">Working Hour</label>
                                                    <input className="form-control" type="country" placeholder="Enter Working Hour " />
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

export default jobEngineerForm;