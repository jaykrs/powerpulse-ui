import React, { Fragment, useState, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import seven from '../../assets/images/user/7.jpg';
import axios from 'axios';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import { country_data } from '../../assets/country_data';
import { LabelConstants } from '../../constant/LableConstant';
import { toast } from 'react-toastify';

class UserAdvertiserEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: localStorage.getItem('jwt'),
            userId: localStorage.getItem('userId'),
            avataruri: localStorage.getItem('avatarUri'),
            name: '',
            role: '',
            city: '',
            address: '',
            phone: '',
            orgState: '',
            postcode: '',
            website: '',
            country: '',
            summary: '',
            activeInd: '',
            postCount: '',
            metaTag: '',
            spending: '',
            methodName: '',
            advertiserId: '',
            countryCode: '',
            agencyId: '',
            countrydata: country_data
        }

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleCountry = this.handleCountry.bind(this);
    }
    

    async componentDidMount() {
        axios({
            method: "GET",
            url: CMS_STRAPI_URL + "/api/users/3",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
              },
          })
            .then((response) => {
              // console.log(response);
              console.log([response.data], "usersAdarsh")
            //   this.setState.response.data.name
             this.setState({ 
                name : response.data.name 
            })
           
      
            })
            .catch((error) => {
              console.log(error);
            });
        // const userData = JSON.parse(localStorage.getItem('userData'))
        const { userId, value } = this.state;
        const { data } = await axios.get(CMS_STRAPI_URL + '/agencies?_limit=1&USER_ID=' + userId, {
            headers: {
                Authorization:
                    'Bearer ' + value,
            },
        });
        if (null != data && data.length > 0) {
            var datasize = data.length - 1;
            this.setState({
                name: data[datasize].DISPLAY_NAME,
                advertiserId: data[datasize].id,
                postCount: data[datasize].JOB_POST_COUNT,
                spending: data[datasize].TOTAL_SPENDING,
                role: data[datasize].ROLE,
                address: data[datasize].ADDRESS,
                city: data[datasize].CITY,
                phone: data[datasize].PHONE,
                website: data[datasize].WEBSITE,
                country: data[datasize].COUNTRY,
                orgState: data[datasize].STATE,
                postcode: data[datasize].POSTCODE,
                countryCode: data[datasize].COUNTRY_CODE,
                methodName: 'handleUpdate',
                agencyId: data[datasize].AGENCY_ID

            })           
        }

       
    }
   
    async handleUpdate() {
        const { agencyId, website, address, city, orgState, country, postcode, phone, advertiserId, value, name, countryCode, role } = this.state;
        if (null == agencyId || agencyId === '') {
            alert(LabelConstants.ALERT_ORGANIZATION_NAME);
            return;
        } else if (null == website || website === '') {
            alert(LabelConstants.ALERT_WEBSITE);
            return;
        } else if (null == address || address === '') {
            alert(LabelConstants.ALERT_ADDRESS);
            return;
        } else if (null == city || city === '') {
            alert(LabelConstants.ALERT_CITY);
            return;
        } else if (null == orgState || orgState === '') {
            alert(LabelConstants.ALERT_STATE);
            return;
        } else if (null == country || country === '') {
            alert(LabelConstants.ALERT_COUNTRY);
            return;
        } else if (null == postcode || postcode === '' || !Number(postcode)) {
            alert(LabelConstants.ALERT_POST_CODE);
            return;
        } else if (null == phone || phone === '' || !Number(phone)) {
            alert(LabelConstants.ALERT_PHONE);
            return;
        } else {
            axios({
                method: 'put',
                url: CMS_STRAPI_URL + '/agencies/' + advertiserId,
                headers: {
                    Authorization:
                        'Bearer ' + value,
                },
                data: {
                    DISPLAY_NAME: name,
                    ROLE: role,
                    ADDRESS: address,
                    CITY: city,
                    COUNTRY_CODE: countryCode,
                    PHONE: phone,
                    WEBSITE: website,
                    COUNTRY: country,
                    AGENCY_ID: agencyId,
                    STATE: orgState,
                    POSTCODE: postcode
                }
            }).then((response) => {
                setTimeout(() => {
                    toast.success(LabelConstants.ALERT_SAVED);
                }, 100);

                setTimeout(() => {
                    window.location.reload(true);
                }, 800);
            },(error) => {
                console.log(error);
            })
        }
    }

    handleCountry (code) {
        const { countrydata } = this.state;
        // setCountry(code);
        this.setState({ country: code })
        countrydata.map((item, index) => {
            if (code === item.code) {
                this.setState({
                    countryCode: item.dial_code
                })
                // setCountryCode(item.dial_code);
            }
        })
    }

    render() {
        const { agencyId, website, address, city, orgState, country, postcode, phone, name, countryCode, role, avataruri, postCount, spending, countrydata } = this.state;
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

                                        <div className="row mb-2">
                                            <div className="col-auto"><img className="rounded-circle" width="120px" height="120px" alt="" src={CMS_STRAPI_URL + avataruri} /></div>
                                            <div className="col">
                                                <h5 className="mb-1">{name}</h5>
                                            </div>
                                        </div>
                                        {/* <div className="form-group">
                                        <h6 className="form-label">{LabelConstants.SUMMARY_DETAILS}</h6>
                                        <textarea className="form-control" rows="5" value={summary} placeholder={LabelConstants.SUMMARY_DETAILS} onChange={e => setSummary(e.target.value)} />
                                    </div> */}

                                        <div className="form-group mt-3">
                                            <label className="form-label">{LabelConstants.NAME}</label>
                                            <input className="form-control" placeholder="Name" value={name} readOnly={true} onChange={e  => this.setState({name: e.target.value})} />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">{LabelConstants.DESIGNATION}</label>
                                            <input className="form-control" placeholder="Designation" value={role} onChange={e => this.setState({ role: e.target.value })} />
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
                                                <label className="form-label">Organization Name *</label>
                                                <input className="form-control" type="text" placeholder="Organization Name" value={agencyId} onChange={e => this.setState({ agencyId: e.target.value })} />
                                            </div>
                                        </div>

                                        <div className="col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Website *</label>
                                                <input className="form-control" type="text" placeholder="Website" value={website} onChange={e => this.setState({ website: e.target.value })} />
                                            </div>
                                        </div>

                                        <div className="col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Address *</label>
                                                <input className="form-control" type="text" placeholder="Address" value={address} onChange={e => this.setState({ address: e.target.value })} />
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
                                                <label className="form-label">Country *</label>
                                                <select className="form-control"
                                                    value={country}
                                                    onChange={e => this.handleCountry(e.target.value)}
                                                >

                                                    <option value="">{LabelConstants.PLS_SELECT}</option>
                                                    {countrydata.map((item, index) => {
                                                        return (
                                                            <option value={item.code}>{item.name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Zip Code *</label>
                                                <input className="form-control" type="text" placeholder="Zip Code" value={postcode} onChange={e => this.setState({ postcode: e.target.value })} />
                                            </div>
                                        </div>

                                        <div className="col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Mobile Phone *</label>
                                                <div className="d-flex">
                                                    <input className="form-control col-sm-3 col-md-3 text-dark bg-white" type="text" value={countryCode} readOnly={true} />
                                                    <input className="form-control" type="text" placeholder="Phone" value={phone} onChange={e => this.setState({ phone: e.target.value })} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">{LabelConstants.TOTAL_POST}</label>
                                                <input className="form-control" type="text" placeholder={LabelConstants.TOTAL_POST} value={postCount} readOnly={true} />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">{LabelConstants.TOTAL_SPENDING}</label>
                                                <text className="form-control" readOnly={true}><i class="fa fa-usd"></i> {null != spending ? spending : 0}</text>
                                            </div>
                                        </div>



                                    </div>
                                </div>
                                <div className="text-right">
                                    <text className="btn btn-primary" type="submit" onClick={() => this.handleUpdate()}>{LabelConstants.UPDATE_PROFILE}</text>
                                </div>

                            </div>

                        </div>
                    </div> </form>
                </div>
            </Fragment>
        );
    }
};

export default UserAdvertiserEdit;