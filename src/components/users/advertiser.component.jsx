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
const AdvertiserScreen = ({ history }) => {
    const [value, setValue] = useState(
        localStorage.getItem('jwt')
    );

    const [listData, setListData] = useState([]);
    const [check, setCheck] = useState(true);
    const [userType, setUserType] = useState(localStorage.getItem('userType'));

    const allData = async () => {
        const { data } = await axios.get(CMS_STRAPI_URL + '/influencers', {
            headers: {
                Authorization:
                    'Bearer ' + value,
            },
        });

        setListData(data)
        setCheck(false)
        // console.log('influencerData', data);
        // console.log('List Data', listData);
    }
    if (check) {
        allData();
    }
    // console.log('Login Data', value)

    function handleList() {
 //       localStorage.setItem("influencerId", id);
        history.push(`/influencer`);
    }

    return (
         <Fragment>
            <Breadcrumb title={LabelConstants.INFLUNCER} />
            <div className="container-fluid">
                <div className="row">
                    {listData.map((item, index) => {
                        return (
                            <div className="col-md-6 col-lg-6 col-xl-3">
                                <div className="card custom-card">
                                    <div onClick={(e) => handleList()}>
                                        <div className="card-header">
                                            {index % 2 == 0 ? <img className="img-fluid" src={golden} alt="" /> : <img className="img-fluid" src={black} alt="" />}
                                        </div>
                                        <div className="card-profile">
                                            <img className="rounded-circle" src={four} alt="" />
                                        </div>
                                      <div className="text-center profile-details mt-3">
                                            <h4>{item.DISPLAY_NAME}</h4>
                                            <h6>{null != item.DESIGNATION ? item.DESIGNATION : LabelConstants.DESIGNATION}</h6>
                                            <h6>{null != item.CURRENT_ORGANIZATION ? item.CURRENT_ORGANIZATION : LabelConstants.CURRENT_ORGANIZATION}</h6>
                                        </div>
                                    </div>
                                    <div className="card-footer row">
                                        <div className="col-4 col-sm-4">
                                            <a href="#javascript"><i className="fa fa-facebook"></i></a>
                                            <h3 className="counter">{item.FACEBOOK_FRND_COUNT == null ? '0' : item.FACEBOOK_FRND_COUNT}</h3>
                                        </div>
                                        <div className="col-4 col-sm-4">
                                            <a href="#javascript"><i className="fa fa-twitter"></i></a>
                                            <h3>{item.TWITTER_FOLLOWER_COUNT == null ? '0' : item.TWITTER_FOLLOWER_COUNT}</h3>
                                        </div>
                                        <div className="col-4 col-sm-4">
                                            <a href="#javascript"><i className="fa fa-linkedin"></i></a>
                                            <h3>{item.LINKEDIN_CONN_COUNT == null ? '0' : item.LINKEDIN_CONN_COUNT}</h3>
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

export default AdvertiserScreen;