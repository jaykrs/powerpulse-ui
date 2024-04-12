import React, { Fragment, useState, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import seven from '../../assets/images/user/7.jpg';
import axios from 'axios';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import { LabelConstants } from '../../constant/LableConstant';
import { Multiselect } from 'multiselect-react-dropdown';
import { ToastContainer, toast } from 'react-toastify';
import { country_data } from '../../assets/country_data';
import { Market_Exp } from '../../assets/Market_exp';
import { Sector } from '../../assets/Sector';

class UserProfileEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: localStorage.getItem('jwt'),
            influencerData: [],
            userId: localStorage.getItem('userId'),
            countrydata: country_data,
            meOptions: Market_Exp,
            doOptions: Sector,
            name: '',
            biography: '',
            professionalHeadline: '',
            postCount: '',
            totalEarning: '',
            metatag: '',
            twitterHandle: '',
            twitterFollowerCount: '',
            twitterPostPrice: '',
            fbAccount: '',
            fbFrndCount: '',
            fbPostPrice: '',
            lkdAccount: '',
            lkdConnectionCount: '',
            lkdPostPrice: '',
            desiganation: '',
            currentOrganization: '',
            workexp: '',
            active: false,
            marketExpRegion: '',
            marketExpSector: '',
            avataruri: localStorage.getItem('avatarUri'),
            SERVED_POST: '',
            CREATE_DATE: '',
            methodName: '',
            basedCountry: '',
            fbStatus: '',
            twStatus: '',
            lnStatus: '',
            seDomainExp: '',           
            mregion: '',
            mSector: '',
        }
        this.getMarketRegion = this.getMarketRegion.bind(this);
        this.getMarketSector = this.getMarketSector.bind(this);
        this.setMarketRegion = this.setMarketRegion.bind(this);
        this.setMarketSector = this.setMarketSector.bind(this);
        this.setSeDomainsExp = this.setSeDomainsExp.bind(this);
    }

    async componentDidMount() {
        const { value, userId } = this.state;
        // console.log(CMS_STRAPI_URL + '/influencers?_limit=1&USER_ID=' + userId);
        const { data } = await axios.get(CMS_STRAPI_URL + '/influencers?_limit=1&USER_ID=' + userId, {
            headers: {
                Authorization:
                    'Bearer ' + value,
            },
        });
        if (null != data && data.length > 0) {
            var datasize = data.length - 1;
            this.setState({
                influencerData: data,
                influencerId: data[datasize].id,
                name: data[datasize].DISPLAY_NAME,
                biography: data[datasize].BIOGRAPHY,
                professionalHeadline: data[datasize].PROFESSIONAL_HEADLINES,
                postCount: data[datasize].SERVED_POST,
                totalEarning: data[datasize].TOTAL_EARNINGS,
                metatag: data[datasize].METATAG,
                twitterHandle: data[datasize].TWITTER_HANDLE,
                twitterFollowerCount: data[datasize].TWITTER_FOLLOWER_COUNT,
                twitterPostPrice: data[datasize].TW_CONSULTATION_PRICE,
                fbAccount: data[datasize].FACEBOOK_ID,
                fbFrndCount: data[datasize].FACEBOOK_FRND_COUNT,
                fbPostPrice: data[datasize].FB_CONSULTATION_PRICE,
                lkdAccount: data[datasize].LINKEDIN_ID,
                lkdConnectionCount: data[datasize].LINKEDIN_CONN_COUNT,
                lkdPostPrice: data[datasize].LNKD_CONSULTATION_PRICE,
                desiganation: data[datasize].DESIGNATION,
                currentOrganization: data[datasize].CURRENT_ORGANIZATION,
                workexp: data[datasize].WORK_EXP,
                mregion: data[datasize].MARKET_REGION_EXP,
                mSector: data[datasize].SECTOR_DOMAIN_EXP,
                active: data[datasize].ACTIVE,
                CREATE_DATE: null != data[datasize].created_at ? data[datasize].created_at.substring(0, 10) : "2020-07-01",
                SERVED_POST: data[datasize].SERVED_POST,
                fbStatus: data[datasize].FB_ACTIVE,
                twStatus: data[datasize].TW_ACTIVE,
                lnStatus: data[datasize].LN_ACTIVE,
                basedCountry: data[datasize].COUNTRY_BASED_IN
            })
            this.setMarketRegion(data[datasize].MARKET_REGION_EXP)
            this.setMarketSector(data[datasize].SECTOR_DOMAIN_EXP)
            this.setSeDomainsExp(data[datasize].SECTOR_DOMAIN_EXP)
        }
    }

    setMarketRegion(mrexp) {
        const { meOptions} = this.state;
        if (null != mrexp && mrexp.length > 1) {
            var nameArr = mrexp.split(',');
            var marray = [];
            for (var k = 0; k < nameArr.length; k++) {
                for (var l = 0; l < meOptions.length; l++) {
                    if (nameArr[k] === meOptions[l].value) {
                        marray.push(meOptions[l]);
                    }
                }
            }
            this.setState({
                marketExpRegion: marray
            })
            // setMarketExpRegion(marray);
        }
    }

    setMarketSector(mrexp) {
        const { doOptions} = this.state;
        if (null != mrexp && mrexp.length > 1) {
            var nameArr = mrexp.split(',');
            var marray = [];
            for (var k = 0; k < nameArr.length; k++) {
                for (var l = 0; l < doOptions.length; l++) {
                    if (nameArr[k] === doOptions[l].value) {
                        marray.push(doOptions[l]);
                    }
                }
            }
            this.setState({
                marketExpSector: marray
            })
            // setMarketExpSector(marray);
        }
    }

    setSeDomainsExp(mrexp) {
        // const {mrexp} = this.state;
        if (null != mrexp && mrexp.length > 1) {
            var nameArr = mrexp.split(',');
            var marray = [];
            for (var k = 0; k < nameArr.length; k++) {
                marray.push({ "name": nameArr[k], "value": nameArr[k] });
            }
            this.setState({
                seDomainExp: marray
            })
            // setSeDomainExp(marray);
        }
    }

    getMarketRegion(mrexp) {
             var str = '';
        if (null != mrexp && mrexp.length > 0) {
            for (var k = 0; k < mrexp.length; k++) {
                str = str.length > 0 ? str + ',' + mrexp[k].value : mrexp[k].value;
            }
        }
        // console.log("data1", str)
        this.setState({
            mregion: str
        })
        // setMregion(str);
        return str;
    }

    getMarketSector(mrexp) {
        const {doOptions} = this.state;
        var str = '';
        if (null != mrexp && mrexp.length > 0) {
            for (var k = 0; k < mrexp.length; k++) {
                str = str.length > 0 ? str + ',' + mrexp[k].value : mrexp[k].value;
            }
        }
        // console.log("data", str)
        this.setState({
            mSector: str
        })
        // setMSector(str);
        return str;
    }

    async handleUpdate() {
        const {active, influencerId, value, biography, desiganation, currentOrganization, workexp, mregion, basedCountry, mSector, twStatus, twitterHandle, twitterFollowerCount, fbStatus, fbAccount, fbFrndCount, lnStatus, lkdAccount, lkdConnectionCount, name, professionalHeadline, metatag} = this.state;
        // console.log(marketExpRegion);
        if (null == biography || biography === '') {
            alert(LabelConstants.ALERT_BIOGRAPHY)
            return;
        } else if (null == desiganation || desiganation === '') {
            alert(LabelConstants.ALERT_DESIGNATION)
            return;
        } else if (null == currentOrganization || currentOrganization === '') {
            alert(LabelConstants.ALERT_ORGANIZATION)
            return;
        } else if ((workexp && !Number(workexp)) || workexp === '') {
            alert(LabelConstants.ALERT_EXPERIENCE);
            return;
        } else if (null == mregion || mregion === '') {
            alert(LabelConstants.ALERT_MARKET_EXP)
            return;
        } else if (null == basedCountry || basedCountry === '') {
            alert(LabelConstants.ALERT_COUNTRY)
            return;
        } else if (null == mSector || mSector === '') {
            alert(LabelConstants.ALERT_SECTOR_EXP)
            return;
        } else if (twStatus == true && (null == twitterHandle || twitterHandle === '' || null == twitterFollowerCount || twitterFollowerCount === '')) {
            alert(LabelConstants.ALERT_TWITTER)
            return;
        } else if (fbStatus == true && (null == fbAccount || fbAccount === '' || null == fbFrndCount || fbFrndCount === '')) {
            alert(LabelConstants.ALERT_FACEBOOK)
            return;
        } else if (lnStatus == true && (null == lkdAccount || lkdAccount === '' || null == lkdConnectionCount || lkdConnectionCount === '')) {
            alert(LabelConstants.ALERT_LINKEDIN)
            return;
        } else {
            axios({
                method: 'put',
                url: CMS_STRAPI_URL + '/influencers/' + influencerId,
                headers: {
                    Authorization:
                        'Bearer ' + value,
                },
                data: {
                    DISPLAY_NAME: null != name ? name : '',
                    PROFESSIONAL_HEADLINES: null != professionalHeadline ? professionalHeadline : '',
                    MARKET_REGION_EXP: null != mregion ? mregion : '',
                    SECTOR_DOMAIN_EXP: null != mSector ? mSector : '',
                    ACTIVE: null != active ? active : false,
                    WORK_EXP: null != workexp ? workexp : 0,
                    CURRENT_ORGANIZATION: null != currentOrganization ? currentOrganization : '',
                    TWITTER_HANDLE: null != twitterHandle ? twitterHandle : '',
                    FACEBOOK_ID: null != fbAccount ? fbAccount : '',
                    LINKEDIN_ID: null != lkdAccount ? lkdAccount : '',
                    DESIGNATION: null != desiganation ? desiganation : '',
                    BIOGRAPHY: null != biography ? biography : '',
                    TWITTER_FOLLOWER_COUNT: null != twitterFollowerCount ? twitterFollowerCount : 0,
                    FACEBOOK_FRND_COUNT: null != fbFrndCount ? fbFrndCount : 0,
                    LINKEDIN_CONN_COUNT: null != lkdConnectionCount ? lkdConnectionCount : 0,
                    TW_CONSULTATION_PRICE: null != twitterFollowerCount ? this.handlePrice("tw", twitterFollowerCount) : 0,
                    FB_CONSULTATION_PRICE: null != fbFrndCount ? this.handlePrice("fb", fbFrndCount) : 0,
                    LNKD_CONSULTATION_PRICE: null != lkdConnectionCount ? this.handlePrice("lkd", lkdConnectionCount) : 0,
                    COUNTRY_BASED_IN: null != basedCountry ? basedCountry : '',
                    TW_ACTIVE: null != twStatus ? twStatus : false,
                    FB_ACTIVE: null != fbStatus ? fbStatus : false,
                    LN_ACTIVE: null != lnStatus ? lnStatus : false
                }
            }).then((response) => {
                setTimeout(() => {
                    toast.success(LabelConstants.ALERT_SAVED);
                }, 100);
                setTimeout(() => {
                    window.location.reload(true);
                }, 800);
            })
        }
    }

    handlePrice(smName, smCount) {
        if (null != smName && smName === "fb") {
            if (smCount == 0) {
                return 0;
            } else if (smCount > 0 && smCount <= 3000) {
                return 125;
            } else if (smCount > 3000 && smCount <= 10000) {
                return 150;
            } else if (smCount > 10000 && smCount <= 25000) {
                return 250;
            } else if (smCount > 25000) {
                return 300;
            }
        } else if (null != smName && smName === "tw") {
            if (smCount == 0) {
                return 0;
            } else if (smCount > 0 && smCount <= 5000) {
                return 125;
            } else if (smCount > 5000 && smCount <= 10000) {
                return 150;
            } else if (smCount > 10000 && smCount <= 25000) {
                return 200;
            } else if (smCount > 25000) {
                return 400;
            }
        } else {
            if (smCount == 0) {
                return 0;
            } else if (smCount > 0 && smCount <= 3000) {
                return 125;
            } else if (smCount > 3000 && smCount <= 5000) {
                return 200;
            } else if (smCount > 5000 && smCount <= 10000) {
                return 300;
            } else if (smCount > 10000) {
                return 450;
            }
        }

    }


    onSelect(selectedList, selectedItem) {
        // console.log('selectedMRKT',selectedList)
        this.getMarketRegion(selectedList)
    }

    onRemove(selectedList, removedItem) {
        this.getMarketRegion(selectedList)
    }

    onSelectSec(selectedListSec, selectedItemSec) {
        this.getMarketSector(selectedListSec)
    }

    onRemoveSec(selectedListSec, selectedItemSec) {
        this.getMarketSector(selectedListSec)
    }

    handleActivationChange(smedia, actStatus) {
        if (smedia === "tw") {
            this.setState({
                twStatus: actStatus
            })
            // setTwStatus(actStatus);
        }
        if (smedia === "fb") {
            this.setState({
                fbStatus: actStatus
            })
            // setFbStatus(actStatus);
        }
        if (smedia === "ln") {
            this.setState({
                lnStatus: actStatus
            })
            // setLnStatus(actStatus);
        }
    }

    render() {
        const {avataruri, meOptions, CREATE_DATE, doOptions, marketExpRegion, countrydata, marketExpSector, postCount, totalEarning, twitterPostPrice, fbPostPrice, lkdPostPrice, active, biography, desiganation, currentOrganization, workexp, mregion, basedCountry, mSector, twStatus, twitterHandle, twitterFollowerCount, fbStatus, fbAccount, fbFrndCount, lnStatus, lkdAccount, lkdConnectionCount, name, professionalHeadline, metatag} = this.state;
        return (
            <Fragment>
                <Breadcrumb parent={LabelConstants.USER} title={LabelConstants.EDIT_INFLUENCER_ACCOUNT} />
                <div className="container-fluid"><form>
                    <div className="edit-profile">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="card-title mb-0">{LabelConstants.MY_PROFILE}</h5>
                                        <div className="card-options">
                                            <a className="card-options-collapse" href="javascript" data-toggle="card-collapse"><i className="fe fe-chevron-up"></i></a><a className="card-options-remove" href="javascript" data-toggle="card-remove"><i className="fe fe-x"></i></a></div>
                                    </div>
                                    <div className="card-body">

                                        <div className="row mb-2">
                                            <div className="col-auto"><img className="rounded-circle" width="120px" height="120px" alt="" src={CMS_STRAPI_URL + avataruri} /></div>
                                            <div className="col">
                                                <h4 className="mb-1">{name}</h4>
                                                {/* <h6 className="mb-1">Post Count : {postCount} ; Earning : {totalEarning}</h6> */}
                                            </div>
                                        </div>
                                        {/* <div className="form-group">
                                        <label className="form-label">{LabelConstants.NAME}</label>
                                        <input className="form-control" type="text" placeholder={LabelConstants.NAME} value={name} onChange={e => setName(e.target.value)} readOnly={true}/>
                                    </div> */}

                                        <div className="form-group mt-3">
                                            <h6 className="form-label">{LabelConstants.BIOGRAPHY} *</h6>
                                            <textarea className="form-control" rows="5" placeholder={LabelConstants.BIOGRAPHY} value={biography} onChange={e => this.setState({biography: e.target.value})} />
                                        </div>
                                        {/* <div className="form-group">
                                        <label className="form-label">{LabelConstants.KEYWORD}</label>
                                        <input className="form-control" placeholder={LabelConstants.KEYWORD} value={metatag} onChange={e => setMetatag(e.target.value)} />
                                    </div> */}
                                        <div className="form-group">
                                            <label className="form-label">{LabelConstants.ACTIVE}</label>
                                            <select className="form-control" type="text" value={active} onChange={e => this.setState({active: e.target.value})}>
                                                <option value="select">{LabelConstants.PLS_SELECT}</option>
                                                <option value="true">{LabelConstants.YES}</option>
                                                <option value="false">{LabelConstants.NO}</option>
                                            </select>
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
                                                <label className="form-label">{LabelConstants.DESIGNATION} *</label>
                                                <input className="form-control" placeholder={LabelConstants.DESIGNATION} type="text" value={desiganation} onChange={e => this.setState({desiganation: e.target.value})} />
                                            </div>
                                        </div>

                                        <div className="col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">{LabelConstants.CURRENT_ORGANIZATION} *</label>
                                                <input className="form-control" type="text" placeholder={LabelConstants.CURRENT_ORGANIZATION} value={currentOrganization} onChange={e => this.setState({currentOrganization: e.target.value})} />
                                            </div>
                                        </div>

                                        <div className="col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">{LabelConstants.WORK_EXP} *</label>
                                                <input className="form-control" type="text" placeholder={LabelConstants.WORK_EXP} value={workexp} onChange={e => this.setState({workexp: e.target.value})} />
                                            </div>
                                        </div>

                                        <div className="col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">{LabelConstants.CREATED_AT}</label>
                                                <input className="form-control" type="text" placeholder={LabelConstants.CREATED_AT} value={CREATE_DATE} readOnly={true} />
                                            </div>
                                        </div>

                                        <div className="col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">{LabelConstants.EXP_REGION} *</label>

                                                <Multiselect
                                                    options={meOptions}
                                                    displayValue="name"
                                                    closeIcon="cancel"
                                                    selectedValues={marketExpRegion}
                                                    onSelect={(value) => this.onSelect(value)}
                                                    onRemove={(value) => this.onRemove(value)}
                                                />

                                            </div>
                                        </div>

                                        {/* <div className="col-sm-6 col-md-6">
                                        <div className="form-group">
                                            <label className="form-label">{LabelConstants.EARNING}</label>
                                            <text className="form-control" readOnly={true} ><i class="fa fa-usd"></i> {null != totalEarning ? totalEarning : 0}</text>
                                        </div>
                                    </div> */}

                                        <div className="col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">{LabelConstants.BASED_COUNTRY} *</label>
                                                <select className="form-control mb-1"
                                                    value={basedCountry}
                                                    onChange={e => this.setState({basedCountry: e.target.value})}
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
                                                <label className="form-label">{LabelConstants.SECTOR_EXPERIENCE} *</label>
                                                <Multiselect
                                                    options={doOptions}
                                                    displayValue="name"
                                                    closeIcon="cancel"
                                                    selectedValues={marketExpSector}
                                                    onSelect={(value) => this.onSelectSec(value)}
                                                    onRemove={(value) => this.onRemoveSec(value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">{LabelConstants.PROFESSIONAL_HEADLINE}</label>
                                                <textarea className="form-control" placeholder={LabelConstants.PROFESSIONAL_HEADLINE} rows="4" value={professionalHeadline} onChange={e => this.setState({professionalHeadline: e.target.value})} />
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
                                            <label className="form-label ml-5">{LabelConstants.TWITTER_HANDLE}</label>
                                            <div className=" input-group form-group">

                                                <div class="input-group-prepend">
                                                    <div class="input-group-text">
                                                        <input type="checkbox" checked={twStatus} onChange={e => this.handleActivationChange("tw", e.target.checked)} />
                                                    </div>
                                                </div>
                                                <input className="form-control" type="text" placeholder={LabelConstants.TWITTER_HANDLE} value={twitterHandle} onChange={e => this.setState({twitterHandle: e.target.value})} readOnly={!twStatus} />
                                            </div>
                                        </div>

                                        <div className="col-sm-3 col-md-3">
                                            <div className="form-group">
                                                <label className="form-label">{LabelConstants.TWITTER_FOLLOWER_COUNT}</label>
                                                <input className="form-control" type="text" placeholder={LabelConstants.TWITTER_FOLLOWER_COUNT} value={twitterFollowerCount} onChange={e => this.setState({twitterFollowerCount: e.target.value})} readOnly={!twStatus} />
                                            </div>
                                        </div>

                                        <div className="col-sm-3 col-md-3">
                                            <div className="form-group">
                                                <label className="form-label">{LabelConstants.TWITTER_POST_PRICE}</label>
                                                <text className="form-control" readOnly={true}><i class="fa fa-usd"></i> {null != twitterPostPrice ? twitterPostPrice : 0}</text>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-sm-6 col-md-6">
                                            <label className="form-label ml-5">{LabelConstants.FB_ACCOUNT}</label>
                                            <div className="input-group form-group">

                                                <div class="input-group-prepend">
                                                    <div class="input-group-text">
                                                        <input type="checkbox" checked={fbStatus} onChange={e => this.handleActivationChange("fb", e.target.checked)} />
                                                    </div>
                                                </div>
                                                <input className="form-control" type="text" placeholder={LabelConstants.FB_ACCOUNT} value={fbAccount} onChange={e => this.setState({fbAccount: e.target.value})} readOnly={!fbStatus} />
                                            </div>
                                        </div>

                                        <div className="col-sm-3 col-md-3">
                                            <div className="form-group">
                                                <label className="form-label">{LabelConstants.FB_FRIEND}</label>
                                                <input className="form-control" type="text" placeholder={LabelConstants.FB_FRIEND} value={fbFrndCount} onChange={e => this.setState({fbFrndCount: e.target.value})} readOnly={!fbStatus} />
                                            </div>
                                        </div>

                                        <div className="col-sm-3 col-md-3">
                                            <div className="form-group">
                                                <label className="form-label">{LabelConstants.FB_POST_PRICE}</label>
                                                <text className="form-control" readOnly={true} ><i class="fa fa-usd"></i> {null != fbPostPrice ? fbPostPrice : 0}</text>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-sm-6 col-md-6">
                                            <label className="form-label ml-5">{LabelConstants.LNKD_ACCOUNT}</label>
                                            <div className=" input-group form-group">
                                                <div class="input-group-prepend">
                                                    <div class="input-group-text">
                                                        <input type="checkbox" checked={lnStatus} onChange={e => this.handleActivationChange("ln", e.target.checked)} />
                                                    </div>
                                                </div>
                                                <input className="form-control" type="text" placeholder={LabelConstants.LNKD_ACCOUNT} value={lkdAccount} onChange={e => this.setState({lkdAccount: e.target.value})} readOnly={!lnStatus} />
                                            </div>
                                        </div>

                                        <div className="col-sm-3 col-md-3">
                                            <div className="form-group">
                                                <label className="form-label">{LabelConstants.LNKD_FOLLOWER}</label>
                                                <input className="form-control" type="text" placeholder={LabelConstants.LNKD_FOLLOWER} value={lkdConnectionCount} onChange={e => this.setState({lkdConnectionCount: e.target.value})} readOnly={!lnStatus} />
                                            </div>
                                        </div>

                                        <div className="col-sm-3 col-md-3">
                                            <div className="form-group">
                                                <label className="form-label">{LabelConstants.LNKD_POST_PRICE}</label>
                                                <text className="form-control" readOnly={true}><i class="fa fa-usd"></i> {null != lkdPostPrice ? lkdPostPrice : 0}</text>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">{LabelConstants.POST_COUNT}</label>
                                                <input className="form-control" type="text" placeholder={LabelConstants.POST_COUNT} value={postCount} readOnly={true} />
                                            </div>
                                        </div>

                                        <div className="col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">{LabelConstants.EARNING}</label>
                                                <text className="form-control" readOnly={true} ><i class="fa fa-usd"></i> {null != totalEarning ? totalEarning : 0}</text>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <text className="btn btn-sm btn-primary" type="submit" onClick={() => this.handleUpdate()}>{LabelConstants.UPDATE_PROFILE}</text>
                                </div>
                            </div>
                        </div>
                    </div> </form>
                </div>
            </Fragment >
        );
    }
}


export default UserProfileEdit;