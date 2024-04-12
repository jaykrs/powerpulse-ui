import React, { Fragment, useState } from 'react';
import Breadcrumb from '../common/breadcrumb';
import golden from '../../assets/images/user-card/1.jpg';
import black from '../../assets/images/user-card/1.1.jpg';
import three from '../../assets/images/user-card/3.jpg';
import two from '../../assets/images/user-card/2.jpg';
import sixteen from '../../assets/images/avtar/16.jpg';
import eleven from '../../assets/images/avtar/11.jpg';
import four from '../../assets/images/avtar/3.jpg';
import seven from '../../assets/images/user-card/7.jpg';
import five from '../../assets/images/user-card/5.jpg';
import six from '../../assets/images/user-card/6.jpg';
import axios from 'axios';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import { LabelConstants } from '../../constant/LableConstant';
import Genral from '../widgets/general';
import { InfluencerScreen } from '.';
import { Notification } from '../../components/notification';
const FilterDashboard = ({ history }) => {
    const [value, setValue] = useState(
        localStorage.getItem('jwt')
    );

    const [listData, setListData] = useState([]);
    const [check, setCheck] = useState(true);
    // const [search, setSearch] = useState('');
    const [userType, setUserType] = useState(localStorage.getItem('userType'));
    const [smSearch, setSmSearch] = useState(localStorage.getItem('SMSearch'));
    const [expSearch, setExpSearch] = useState(localStorage.getItem('EXPSearch'));
    const [mrktSearch, setMrktSmSearch] = useState(localStorage.getItem('MRKTEXPSearch'));
    const [secSearch, setSecSmSearch] = useState(localStorage.getItem('SECTORSearch'));

    const allData = async () => {
        const search = (null != smSearch && smSearch !== '' ? "&" + smSearch : '') + (null != expSearch && expSearch !== '' ? "&" + expSearch : '') + (null != mrktSearch && mrktSearch !== '' ? "&MARKET_REGION_EXP_contains=" + mrktSearch : '') + (null != secSearch && secSearch !== '' ? "&SECTOR_DOMAIN_EXP_contains=" + secSearch : '')
        // console.log("url",search) 
        const { data } = await axios.get(CMS_STRAPI_URL + '/influencers?' + 'ACTIVE=true' + search, {
            headers: {
                Authorization:
                    'Bearer ' + value,
            },
        });

        setListData(data);
        setCheck(false);
        localStorage.removeItem('searchButton');
    }
    if (check) {
        allData();
    }


    function handleList(e, id) {
        history.push(`/influencer/influencerDetail/` + id);
    }

    return (
        <Fragment>
            <Breadcrumb title="Choose Your Influencers" />
            <div className="container-fluid">
                <div className="row">
                    {/* <Notification influencerId={1} advertiserId={"11"}/> */}
                    {listData.map((item, index) => {
                        return (
                            <div className="col-md-6 col-lg-6 col-xl-3">
                                <div className="card custom-card">
                                    <div onClick={(e) => handleList(e, item.id)}>
                                        <div className="card-header">
                                            {index % 2 == 0 ? <img className="img-fluid" src={golden} alt="" /> : <img className="img-fluid" src={black} alt="" />}
                                        </div>
                                        <div className="card-profile">
                                            <img className="rounded-circle" width="150px" height="150px" onError={(e) => { e.target.onerror = null; e.target.src = "http://app.cinfluencers.com/avatar.jpg" }} src={null != item.AVATAR_URL ? CMS_STRAPI_URL + item.AVATAR_URL : CMS_STRAPI_URL + LabelConstants.DEFAULT_AVATAR} alt="" />
                                        </div>
                                        <div className="text-center profile-details mt-3">
                                            <h5>{item.DISPLAY_NAME}</h5>
                                            <h6>{null != item.DESIGNATION && item.DESIGNATION !== '' ? item.DESIGNATION : LabelConstants.DESIGNATION}</h6>
                                            <h6>{null != item.CURRENT_ORGANIZATION && item.CURRENT_ORGANIZATION !== '' ? item.CURRENT_ORGANIZATION : LabelConstants.CURRENT_ORGANIZATION}</h6>
                                        </div>
                                    </div>
                                    <div className="card-footer row">
                                        <div className="col-4 col-sm-4">
                                            <i className="fa fa-facebook text-primary"></i>
                                            <h6 className="counter">{item.FACEBOOK_FRND_COUNT == null ? '0' : Number(item.FACEBOOK_FRND_COUNT) > 99999 ? "99999+" : Number(item.FACEBOOK_FRND_COUNT)}</h6>
                                        </div>
                                        <div className="col-4 col-sm-4">
                                            <i className="fa fa-twitter text-primary"></i>
                                            <h6>{item.TWITTER_FOLLOWER_COUNT == null ? '0' : Number(item.TWITTER_FOLLOWER_COUNT) > 99999 ? "99999+" : Number(item.TWITTER_FOLLOWER_COUNT)}</h6>
                                        </div>
                                        <div className="col-4 col-sm-4">
                                            <i className="fa fa-linkedin text-primary"></i>
                                            <h6>{item.LINKEDIN_CONN_COUNT == null ? '0' : Number(item.LINKEDIN_CONN_COUNT) > 99999 ? "99999+" : Number(item.LINKEDIN_CONN_COUNT)}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        </Fragment>
    );
};

export default FilterDashboard;