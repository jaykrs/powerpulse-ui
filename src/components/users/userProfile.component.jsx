import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import { LabelConstants } from '../../constant/LableConstant';
import { Multiselect } from 'multiselect-react-dropdown';
import { Breadcrumb } from 'reactstrap';
import { country_data } from '../../assets/country_data';
import { Link } from 'react-router-dom';

class UsersProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            userType: localStorage.getItem("userType"),
            userId: localStorage.getItem("userId"),
            value: localStorage.getItem("jwt"),
            avataruri: localStorage.getItem('avatarUri'),
            name: '',
            countryData: country_data
        }
    }

    componentWillMount() {
        const { userId, userType, value } = this.state;
        if (userType === "advertiser") {
            Axios({
                method: "GET",
                url: CMS_STRAPI_URL + '/agencies?_limit=1&USER_ID=' + userId,
                headers: {
                    Authorization:
                        'Bearer ' + value,
                },
            }).then((response) => {
                if (null != response.data && response.data.length > 0) {
                    var datasize = response.data.length - 1;
                    this.setState({
                        data: response.data[datasize],
                    })
                }
            }, (error) => {
                console.log(error);
            });
        } else if (userType === "influencer") {
            Axios({
                method: "GET",
                url: CMS_STRAPI_URL + '/influencers?_limit=1&USER_ID=' + userId,
                headers: {
                    Authorization:
                        'Bearer ' + value,
                },
            }).then((response) => {
                if (null != response.data && response.data.length > 0) {
                    var datasize = response.data.length - 1;
                    this.setState({
                        data: response.data[datasize]
                    })
                }
            }, (error) => {
                console.log(error);
            });
        }
    }

    render() {
        const { userType, data, name, avataruri, countryData } = this.state;
        return (
            userType === "influencer" ?
                <Fragment>
                    <Breadcrumb parent={LabelConstants.USER} title={LabelConstants.EDIT_INFLUENCER_ACCOUNT} />
                    <div className="container-fluid"><form>
                        <div className="edit-profile">
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="card">
                                        <div className="card-header">
                                            <h5 className="card-title mb-0">Profile</h5>
                                            <div className="card-options">
                                                <a className="card-options-collapse" href="javascript" data-toggle="card-collapse"><i className="fe fe-chevron-up"></i></a><a className="card-options-remove" href="javascript" data-toggle="card-remove"><i className="fe fe-x"></i></a></div>
                                        </div>
                                        <div className="card-body">

                                            <div className="row mb-2">
                                                <div className="col-auto"><img className="rounded-circle" width="120px" height="120px" alt="" src={CMS_STRAPI_URL + avataruri} /></div>
                                                <div className="col">
                                                    <h4 className="mb-1">{data.DISPLAY_NAME}</h4>
                                                    {/* <h6 className="mb-1">Post Count : {null != data.SERVED_POST ? data.SERVED_POST : 0} Earning : {null != data.TOTAL_EARNINGS ? data.TOTAL_EARNINGS : 0}</h6> */}
                                                </div>
                                            </div>
                                            <div className="form-group mt-3">
                                                <label className="form-label">{LabelConstants.NAME}</label>
                                                <input className="form-control" type="text" placeholder={LabelConstants.NAME} value={data.DISPLAY_NAME} readOnly={true} />
                                            </div>

                                            <div className="form-group">
                                                <h6 className="form-label">{LabelConstants.BIOGRAPHY}</h6>
                                                <textarea className="form-control" rows="5" placeholder={LabelConstants.BIOGRAPHY} value={data.BIOGRAPHY} readOnly={true} />
                                            </div>
                                            {/* <div className="form-group">
                                                <label className="form-label">{LabelConstants.KEYWORD}</label>
                                                <input className="form-control" placeholder={LabelConstants.KEYWORD} value={data.METATAG} readOnly={true} />
                                            </div> */}
                                            <div className="form-group">
                                                <label className="form-label">{LabelConstants.ACTIVE}</label>
                                                <input className="form-control" type="text" value={data.ACTIVE ? "True" : "False"} readOnly={true}>

                                                </input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-8">

                                    <div className="card-header" style={{ backgroundColor: '#102c54' }}>
                                        <h5 className="card-title mb-0" style={{ color: '#fff' }}>{LabelConstants.PROFESSIONAL}</h5>
                                        <div className="card-options"><a className="card-options-collapse" href="javascript" data-toggle="card-collapse"><i className="fe fe-chevron-up"></i></a><a className="card-options-remove" href="javascript" data-toggle="card-remove"><i className="fe fe-x"></i></a></div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">{LabelConstants.DESIGNATION}</label>
                                                    <input className="form-control" placeholder={LabelConstants.DESIGNATION} type="text" value={data.DESIGNATION} readOnly={true} />
                                                </div>
                                            </div>

                                            <div className="col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">{LabelConstants.CURRENT_ORGANIZATION}</label>
                                                    <input className="form-control" type="text" placeholder={LabelConstants.CURRENT_ORGANIZATION} value={data.CURRENT_ORGANIZATION} readOnly={true} />
                                                </div>
                                            </div>

                                            <div className="col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">{LabelConstants.WORK_EXP}</label>
                                                    <input className="form-control" type="text" placeholder={LabelConstants.WORK_EXP} value={data.WORK_EXP} readOnly={true} />
                                                </div>
                                            </div>

                                            <div className="col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">{LabelConstants.CREATED_AT}</label>
                                                    <input className="form-control" type="text" placeholder={LabelConstants.CREATED_AT} value={null != data.created_at ? data.created_at.substring(0, 10) : "2020-07-24"} readOnly={true} />
                                                </div>
                                            </div>

                                            {/* <div className="col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">{LabelConstants.EXP_REGION}</label>

                                                    <Multiselect
                                                        readOnly={true}
                                                        // options={meOptions}
                                                        displayValue="value"
                                                        closeIcon="cancel"
                                                        selectedValues={data.MARKET_REGION_EXP}
                                                    // onSelect={onSelect}
                                                    // onRemove={onRemove}
                                                    />

                                                </div>
                                            </div> */}

                                            {/* <div className="col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">{LabelConstants.EARNING}</label>
                                                    <text className="form-control" readOnly={true}><i class="fa fa-usd"></i> {null != data.TOTAL_EARNINGS ? data.TOTAL_EARNINGS : 0}</text>
                                                </div>
                                            </div> */}

                                            <div className="col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">{LabelConstants.BASED_COUNTRY}</label>
                                                    {null != data.COUNTRY_BASED_IN && data.COUNTRY_BASED_IN !== '' && null != countryData ? countryData.map((item, conIndex) => {
                                                        if (data.COUNTRY_BASED_IN === item.code) {
                                                            return (
                                                                <input className="form-control mb-1" value={item.name} readOnly={true} />
                                                            )
                                                        }
                                                    }) :
                                                        <input className="form-control mb-1" value='Country' readOnly={true} />
                                                    }
                                                </div>
                                            </div>

                                            {/* <div className="col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">{LabelConstants.EXP_REGION}</label>
                                                    <Multiselect
                                                        options={doOptions}
                                                        readOnly={true}
                                                        displayValue="value"
                                                        closeIcon="cancel"
                                                        selectedValues={data.SECTOR_DOMAIN_EXP}
                                                    />
                                                </div>
                                            </div> */}
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">{LabelConstants.PROFESSIONAL_HEADLINE}</label>
                                                    <textarea className="form-control" placeholder={LabelConstants.PROFESSIONAL_HEADLINE} rows="4" value={data.PROFESSIONAL_HEADLINES} readOnly={true} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="card-header" style={{ backgroundColor: '#102c54' }}>
                                        <h5 className="card-title mb-0" style={{ color: '#fff' }}>{LabelConstants.SOCIAL_MEDIA}</h5>
                                        <div className="card-options"><a className="card-options-collapse" href="javascript" data-toggle="card-collapse"><i className="fe fe-chevron-up"></i></a><a className="card-options-remove" href="javascript" data-toggle="card-remove"><i className="fe fe-x"></i></a></div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <label className="form-label">{LabelConstants.TWITTER_HANDLE}</label>
                                                <div className=" input-group form-group">

                                                    {/* <div class="input-group-prepend">
                                                        <div class="input-group-text">
                                                            <input type="checkbox" checked={data.TW_ACTIVE}/>
                                                        </div>
                                                    </div> */}
                                                    <input className="form-control" type="text" placeholder={LabelConstants.TWITTER_HANDLE} value={data.TWITTER_HANDLE} readOnly={true} />
                                                </div>
                                            </div>

                                            <div className="col-sm-3 col-md-3">
                                                <div className="form-group">
                                                    <label className="form-label">{LabelConstants.TWITTER_FOLLOWER_COUNT}</label>
                                                    <input className="form-control" type="text" placeholder={LabelConstants.TWITTER_FOLLOWER_COUNT} value={data.TWITTER_FOLLOWER_COUNT} readOnly={true} />
                                                </div>
                                            </div>

                                            <div className="col-sm-3 col-md-3">
                                                <div className="form-group">
                                                    <label className="form-label">{LabelConstants.TWITTER_POST_PRICE}</label>
                                                    <text className="form-control" readOnly={true}><i class="fa fa-usd"></i> {null != data.TW_CONSULTATION_PRICE ? data.TW_CONSULTATION_PRICE : 0}</text>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-3 ">
                                            <div className="col-sm-6 col-md-6">
                                                <label className="form-label">{LabelConstants.FB_ACCOUNT}</label>
                                                <div className="input-group form-group">

                                                    {/* <div class="input-group-prepend">
                                                        <div class="input-group-text">
                                                            <input type="checkbox" checked={data.FB_ACTIVE}/>
                                                        </div>
                                                    </div> */}
                                                    <input className="form-control" type="text" placeholder={LabelConstants.FB_ACCOUNT} value={data.FACEBOOK_ID} readOnly={true} />
                                                </div>
                                            </div>

                                            <div className="col-sm-3 col-md-3">
                                                <div className="form-group">
                                                    <label className="form-label">{LabelConstants.FB_FRIEND}</label>
                                                    <input className="form-control" type="text" placeholder={LabelConstants.FB_FRIEND} value={data.FACEBOOK_FRND_COUNT} readOnly={true} />
                                                </div>
                                            </div>

                                            <div className="col-sm-3 col-md-3">
                                                <div className="form-group">
                                                    <label className="form-label">{LabelConstants.FB_POST_PRICE}</label>
                                                    <text className="form-control" readOnly={true}><i class="fa fa-usd"></i> {null != data.FB_CONSULTATION_PRICE ? data.FB_CONSULTATION_PRICE : 0}</text>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-sm-6 col-md-6">
                                                <label className="form-label">{LabelConstants.LNKD_ACCOUNT}</label>
                                                <div className=" input-group form-group">
                                                    {/* <div class="input-group-prepend">
                                                        <div class="input-group-text">
                                                            <input type="checkbox" checked={data.LN_ACTIVE} />
                                                        </div>
                                                    </div> */}
                                                    <input className="form-control" type="text" placeholder={LabelConstants.LNKD_ACCOUNT} value={data.LINKEDIN_ID} readOnly={true} />
                                                </div>
                                            </div>

                                            <div className="col-sm-3 col-md-3">
                                                <div className="form-group">
                                                    <label className="form-label">{LabelConstants.LNKD_FOLLOWER}</label>
                                                    <input className="form-control" type="text" placeholder={LabelConstants.LNKD_FOLLOWER} value={data.LINKEDIN_CONN_COUNT} readOnly={true} />
                                                </div>
                                            </div>

                                            <div className="col-sm-3 col-md-3">
                                                <div className="form-group">
                                                    <label className="form-label">{LabelConstants.LNKD_POST_PRICE}</label>
                                                    <text className="form-control" readOnly={true}><i class="fa fa-usd"></i> {null != data.LNKD_CONSULTATION_PRICE ? data.LNKD_CONSULTATION_PRICE : 0}</text>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">{LabelConstants.POST_COUNT}</label>
                                                    <input className="form-control" type="text" placeholder={LabelConstants.POST_COUNT} value={data.SERVED_POST} readOnly={true} />
                                                </div>
                                            </div>

                                            <div className="col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">{LabelConstants.EARNING}</label>
                                                    <text className="form-control" readOnly={true}><i class="fa fa-usd"></i> {null != data.TOTAL_EARNINGS ? data.TOTAL_EARNINGS : 0}</text>
                                                </div>
                                            </div>

                                            <div className="col-sm-12 col-md-12">
                                                <div className="d-flex">
                                                    {/* <label className="form-label mr-auto">If you want to change any details in Profile</label> */}
                                                    <Link to="/users/userProfileEdit" className="btn btn-sm btn-primary ml-auto">Edit Profile</Link>
                                                </div>
                                            </div>

                                            {/* <div className="col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">{LabelConstants.SERVED_POST}</label>
                                                    <input className="form-control" type="text" placeholder={LabelConstants.SERVED_POST} value={SERVED_POST} onChange={e => setSERVED_POST(e.target.value)} readOnly={true} />
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                    {/* <div className="card-footer text-right">
                                        <button className="btn btn-primary" type="submit" onClick={() => handleUpdate()}>{LabelConstants.UPDATE_PROFILE}</button>
                                    </div> */}
                                </div>
                            </div>
                        </div> </form>
                    </div>
                </Fragment> :
                //----------------------------------------------Advertiser Screen--------------------------------------------------------
                <Fragment>
                    <Breadcrumb parent={LabelConstants.USER} title={LabelConstants.EDIT_ADVERTISER_ACCOUNT} />
                    <div className="container-fluid"><form>
                        <div className="edit-profile">
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="card">
                                        <div className="card-header">
                                            <h5 className="card-title mb-0">Profile</h5>
                                            <div className="card-options">
                                                <a className="card-options-collapse" href="javascript" data-toggle="card-collapse"><i className="fe fe-chevron-up"></i></a><a className="card-options-remove" href="javascript" data-toggle="card-remove"><i className="fe fe-x"></i></a></div>
                                        </div>
                                        <div className="card-body">

                                            <div className="row mb-2">
                                                <div className="col-auto"><img className="rounded-circle" width="120px" height="120px" alt="" src={CMS_STRAPI_URL + avataruri} /></div>
                                                <div className="col">
                                                    <h4 className="mb-1">{data.DISPLAY_NAME}</h4>
                                                </div>
                                            </div>
                                            {/* <div className="form-group">
                                               <h6 className="form-label">{LabelConstants.SUMMARY_DETAILS}</h6>
                                               <textarea className="form-control" rows="5" value={data.SUMMARY_DETAILS} placeholder={LabelConstants.SUMMARY_DETAILS} />
                                           </div> */}

                                            <div className="form-group mt-3">
                                                <label className="form-label">Name</label>
                                                <input className="form-control" placeholder="Name" value={data.DISPLAY_NAME} readOnly={true} />
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label">{LabelConstants.DESIGNATION}</label>
                                                <input className="form-control" placeholder={LabelConstants.DESIGNATION} value={data.ROLE} readOnly={true} />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-8">

                                    <div className="card-header" style={{ backgroundColor: '#102c54' }}>
                                        <h5 className="card-title mb-0" style={{ color: '#fff' }}>Profile Details</h5>
                                        <div className="card-options"><a className="card-options-collapse" href="javascript" data-toggle="card-collapse"><i className="fe fe-chevron-up"></i></a><a className="card-options-remove" href="javascript" data-toggle="card-remove"><i className="fe fe-x"></i></a></div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">{LabelConstants.ORGANIZATION_NAME}</label>
                                                    <input className="form-control" type="text" placeholder="Organization Name" value={data.AGENCY_ID} readOnly={true} />
                                                </div>
                                            </div>

                                            <div className="col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">{LabelConstants.WEBSITE}</label>
                                                    <input className="form-control" type="text" placeholder="Website" value={data.WEBSITE} readOnly={true} />
                                                </div>
                                            </div>

                                            <div className="col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">{LabelConstants.ADDRESS}</label>
                                                    <input className="form-control" type="text" placeholder="Address" value={data.ADDRESS} readOnly={true} />
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
                                                    <label className="form-label">{LabelConstants.CITY}</label>
                                                    <input className="form-control" type="text" placeholder="City" value={data.CITY} readOnly={true} />
                                                </div>
                                            </div>

                                            <div className="col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">{LabelConstants.STATE}</label>
                                                    <input className="form-control" type="text" placeholder="State" value={data.STATE} readOnly={true} />
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">{LabelConstants.COUNTRY}</label>
                                                    {null != data.COUNTRY && data.COUNTRY !== '' && null != countryData ? countryData.map((item, conIndex) => {
                                                        if (data.COUNTRY === item.code) {
                                                            return (
                                                                <input className="form-control mb-1" value={item.name} readOnly={true} />
                                                            )
                                                        }
                                                    }) :
                                                        <input className="form-control mb-1" value='Country' readOnly={true} />
                                                    }
                                                </div>
                                            </div>

                                            <div className="col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">Zip Code</label>
                                                    <input className="form-control" type="text" placeholder="Zip Code" value={data.POSTCODE} readOnly={true} />
                                                </div>
                                            </div>

                                            <div className="col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">{LabelConstants.PHONE_NUMBER}</label>
                                                    <div className="d-flex">
                                                        <input className="form-control col-sm-3 col-md-3" type="text" value={data.COUNTRY_CODE} readOnly={true} />
                                                        <input className="form-control" type="text" placeholder="Phone" value={data.PHONE} readOnly={true} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">{LabelConstants.TOTAL_POST}</label>
                                                    <input className="form-control" type="text" placeholder={LabelConstants.TOTAL_POST} value={data.JOB_POST_COUNT} readOnly={true} />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">{LabelConstants.TOTAL_SPENDING}</label>
                                                    <text className="form-control" readOnly={true}><i class="fa fa-usd"></i> {null != data.TOTAL_SPENDING ? data.TOTAL_SPENDING : 0}</text>
                                                </div>
                                            </div>

                                            <div className="col-sm-12 col-md-12">
                                                <div className="d-flex">
                                                    {/* <label className="form-label mr-auto">If you want to change any details in Profile</label> */}
                                                    <Link to="/users/userAdvertiserEdit" className="btn btn-sm btn-primary ml-auto">Edit Profile</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="card-footer text-right">
                                        {methodName === 'handleUpdate' ?
                                            <button className="btn btn-primary" type="submit" onClick={() => handleUpdate()}>{LabelConstants.UPDATE_PROFILE}</button>
                                            : <button className="btn btn-primary" type="submit" onClick={() => handleCreate()}>{LabelConstants.CREATE_PROFILE}</button>}

                                    </div> */}

                                </div>

                            </div>
                        </div> </form>
                    </div>
                </Fragment>
        )
    }
}

export default UsersProfile;