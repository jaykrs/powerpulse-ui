import React, { Fragment, useState, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import seven from '../../assets/images/user/7.jpg';
import axios from 'axios';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import { country_data } from '../../assets/country_data';
import { LabelConstants } from '../../constant/LableConstant';
import { toast } from 'react-toastify';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: localStorage.getItem('jwt'),
            userId: localStorage.getItem('userId'),
            avataruri: localStorage.getItem('avatarUri'),

        }
    }


    async componentDidMount(id) {
        axios({
            method: "GET",
            url: CMS_STRAPI_URL + "/api/users/3" + id,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
        })
            .then((response) => {
                // console.log(response);
                console.log([response.data], "usersAdarsh")
                //   this.setState.response.data.name
                this.setState({
                    name: response.data.name,
                    email: response.data.email,
                    phone: response.data.phone,
                    username: response.data.username,
                    usertype: response.data.usertype
                })


            })
            .catch((error) => {
                console.log(error);
            });

    }

    render() {
        const { agencyId, website, address, city, orgState, country, postcode, phone, name,email,username,usertype, countryCode, role, avataruri, postCount, spending, countrydata } = this.state;
        return (
            <Fragment>
                <Breadcrumb parent={LabelConstants.USER} title={LabelConstants.EDIT_ADVERTISER_ACCOUNT} />
                <div className="container-fluid"><form>
                    <div className="edit-profile">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="card-title mb-0">My Profile</h5>
                                        <div className="card-options">
                                            <a className="card-options-collapse" href="javascript" data-toggle="card-collapse"><i className="fe fe-chevron-up"></i></a><a className="card-options-remove" href="javascript" data-toggle="card-remove"><i className="fe fe-x"></i></a></div>
                                    </div>
                                    <div className="card-body">

                                        <div className="form-group mt-3">
                                            <label className="form-label">{LabelConstants.NAME}</label>
                                            <input className="form-control" placeholder="Name" value={name} readOnly={true} onChange={e => this.setState({ name: e.target.value })} />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">{LabelConstants.EMAIL}</label>
                                            <input className="form-control" placeholder="Email" value={email} readOnly={true} onChange={e => this.setState({ email: e.target.value })} />
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8">

                                <div className="card-header" style={{ backgroundColor: '#102c54' }}>
                                    <h5 className="card-title mb-0" style={{ color: '#fff' }}>{LabelConstants.EDIT_ADVERTISER_PROFILE}</h5>
                                    <div className="card-options"><a className="card-options-collapse" href="javascript" data-toggle="card-collapse"><i className="fe fe-chevron-up"></i></a><a className="card-options-remove" href="javascript" data-toggle="card-remove"><i className="fe fe-x"></i></a></div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">{LabelConstants.PHONE}</label>
                                                <input className="form-control" type="text" placeholder="Phone" value={phone} readOnly={true} onChange={e => this.setState({ phone: e.target.value })} />
                                            </div>
                                        </div>

                                        <div className="col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">{LabelConstants.USER_NAME}</label>
                                                <input className="form-control" type="text" placeholder="Website" value={username} readOnly={true} onChange={e => this.setState({ username: e.target.value })} />
                                            </div>
                                        </div>

                                        <div className="col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">{LabelConstants.USER_TYPE}</label>
                                                <input className="form-control" type="text" placeholder="Address" value={usertype} readOnly={true} onChange={e => this.setState({ usertype: e.target.value })} />
                                            </div>
                                        </div>

                                        {/* <div className="col-sm-6 col-md-3">
                                            <div className="form-group">
                                                <label className="form-label">Last Name</label>
                                                <input className="form-control" type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
                                            </div>
                                        </div> */}
                                        {/* <div className="form-group col-sm-6 col-md-6">
                                        <label className="form-label">{LabelConstants.ACTIVE}</label>
                                        <select className="form-control" type="text" value={activeInd} onChange={e => setActiveInd(e.target.value)}>
                                            <option value="select">{LabelConstants.PLS_SELECT}</option>
                                            <option value="true">{LabelConstants.YES}</option>
                                            <option value="false">{LabelConstants.NO}</option>
                                        </select>
                                    </div> */}

                                        <div className="col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">City *</label>
                                                <input className="form-control" type="text" placeholder="City" value={city} onChange={e => this.setState({ city: e.target.value })} />
                                            </div>
                                        </div>

                                        <div className="col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">State *</label>
                                                <input className="form-control" type="text" placeholder="State" value={orgState} onChange={e => this.setState({ orgState: e.target.value })} />
                                            </div>
                                        </div>



                                        <div className="col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Zip Code *</label>
                                                <input className="form-control" type="text" placeholder="Zip Code" value={postcode} onChange={e => this.setState({ postcode: e.target.value })} />
                                            </div>
                                        </div>

                                        {/* <div className="col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Mobile Phone *</label>
                                                <div className="d-flex">
                                                    <input className="form-control col-sm-3 col-md-3 text-dark bg-white" type="text" value={countryCode} readOnly={true} />
                                                    <input className="form-control" type="text" placeholder="Phone" value={phone} onChange={e => this.setState({ phone: e.target.value })} />
                                                </div>
                                            </div>
                                        </div> */}

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">{LabelConstants.TOTAL_POST}</label>
                                                <input className="form-control" type="text" placeholder={LabelConstants.TOTAL_POST} value={postCount} readOnly={true} />
                                            </div>
                                        </div>

                                        {/* <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">{LabelConstants.TOTAL_SPENDING}</label>
                                                <text className="form-control" readOnly={true}><i class="fa fa-usd"></i> {null != spending ? spending : 0}</text>
                                            </div>
                                        </div> */}



                                    </div>
                                </div>
                                <div className="text-right">
                                    <text className="btn btn-primary" type="submit" >{LabelConstants.UPDATE_PROFILE}</text>
                                </div>

                            </div>

                        </div>
                    </div> </form>
                </div>
            </Fragment>
        );
    }
};

export default User;