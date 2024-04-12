import React, { Fragment, useState, useEffect } from 'react';
import CountUp from 'react-countup';
import Clock from 'react-clock';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DatePicker from "react-datepicker";
import Breadcrumb from '../common/breadcrumb';
import axios from 'axios';
import { Navigation, Box, MessageSquare, Users, ShoppingBag, Layers, ShoppingCart, DollarSign, ArrowDown, ArrowUp, CloudDrizzle } from 'react-feather';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';

const General = ({ history }) => {
  const [date, setDate] = useState({
    date: new Date(),
  });
  const [value, setValue] = useState(localStorage.getItem('jwt'));
  const [startDate, setStartDate] = useState(new Date());
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [influencerData, setInfluencerData] = useState([]);
  const [check, setCheck] = useState(true);
  const [name, setName] = useState();
  const [biography, setBiography] = useState();
  const [professionalHeadline, setProfessionalHeadline] = useState();
  const [postCount, setPostCount] = useState();
  const [totalEarning, setTotalEarning] = useState();
  const [metatag, setMetatag] = useState();
  const [twitterHandle, setTwitterHandle] = useState();
  const [twitterFollowerCount, setTwitterFollowerCount] = useState();
  const [twitterPostPrice, setTwitterPostPrice] = useState();
  const [fbAccount, setFbAccount] = useState();
  const [fbFrndCount, setFbFrndCount] = useState();
  const [fbPostPrice, setFbPostPrice] = useState();
  const [lkdAccount, setLkdAccount] = useState();
  const [lkdConnectionCount, setLkdConnectionCount] = useState();
  const [lkdPostPrice, setLkdPostPrice] = useState();
  const [influencerId, setInfluencerId] = useState('');
  const [desiganation, setDesiganation] = useState();
  const [currentOrganization, setCurrentOrganization] = useState();
  const [workexp, setWorkExp] = useState();
  const [active, setActive] = useState();
  const [marketExpRegion, setMarketExpRegion] = useState();
  const [avataruri, setAvataruri] = useState(localStorage.getItem('avatarUri'));
  const [SERVED_POST, setSERVED_POST] = useState();
  const [CREATE_DATE, setCREATE_DATE] = useState();
  const [methodName, setMethodName] = useState();
  const [basedCountry, setBasedCountry] = useState();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    setInterval(() => setDate({ date: new Date() }),
      1000
    );
  }, [date, startDate]);

  const handleChange = date => {
    setStartDate(date);
  };

  const allData = async () => {
    setCheck(false)
    axios({
      method: 'GET',
      url: CMS_STRAPI_URL + '/agencies',
      headers: {
        Authorization:
          'Bearer ' + value,
      },
    }).then((response) => {
      if (null != response.data && response.data.length > 0) {
        setUserData(response.data)
      }
    }, (error) => {
      console.log(error)
    });

    const { data } = await axios.get(CMS_STRAPI_URL + '/influencers?_limit=1&USER_ID=' + userId, {
      headers: {
        Authorization:
          'Bearer ' + value,
      },
    });
    if (null != data && data.length > 0) {
      var datasize = data.length - 1;
      setInfluencerData(data)
      setInfluencerId(data[datasize].id)
      setName(data[datasize].DISPLAY_NAME)
      setBiography(data[datasize].BIOGRAPHY)
      setProfessionalHeadline(data[datasize].PROFESSIONAL_HEADLINES)
      setPostCount(data[datasize].SERVED_POST)
      setTotalEarning(data[datasize].TOTAL_EARNINGS)
      setMetatag(data[datasize].METATAG)
      setTwitterHandle(data[datasize].TWITTER_HANDLE)
      setTwitterFollowerCount(data[datasize].TWITTER_FOLLOWER_COUNT)
      setTwitterPostPrice(data[datasize].TW_CONSULTATION_PRICE)

      setFbAccount(data[datasize].FACEBOOK_ID)
      setFbFrndCount(data[datasize].FACEBOOK_FRND_COUNT)
      setFbPostPrice(data[datasize].FB_CONSULTATION_PRICE)

      setLkdAccount(data[datasize].LINKEDIN_ID)
      setLkdConnectionCount(data[datasize].LINKEDIN_CONN_COUNT)
      setLkdPostPrice(data[datasize].LNKD_CONSULTATION_PRICE)

      setDesiganation(data[datasize].DESIGNATION)
      setCurrentOrganization(data[datasize].CURRENT_ORGANIZATION)
      setWorkExp(data[datasize].WORK_EXP)
      setMarketExpRegion(data[datasize].MARKET_EXP_REGION)
      setActive(data[datasize].ACTIVE)
      setCREATE_DATE(data[datasize].CREATE_DATE)
      setSERVED_POST(data[datasize].SERVED_POST)
      if (data[datasize].BASED_COUNTRY) {
        setBasedCountry(data[datasize].BASED_COUNTRY.name)
      }
      setMethodName('handleUpdate');     
    }


  }

  if (check) {
    allData();
  }

  const month = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

  var d = new Date();
  let dateshow = month[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  return (
    <Fragment>
      <Breadcrumb title="Influencer" parent="Widgets" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 col-xl-3 col-lg-6">
            <div className="card o-hidden">
              <div className="bg-primary b-r-4 card-body">
                <div className="media static-top-widget">
                  <div className="align-self-center text-center">
                    <Navigation />
                  </div>
                  <div className="media-body">
                    <span className="m-0">Earnings</span>
                    <h4 className="mb-0 counter">{null !== totalEarning ? totalEarning : 0}</h4>
                    <Navigation className="icon-bg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xl-3 col-lg-6">
            <div className="card o-hidden">
              <div className="bg-secondary b-r-4 card-body">
                <div className="media static-top-widget">
                  <div className="align-self-center text-center">
                    <Box />
                  </div>
                  <div className="media-body"><span className="m-0">Post</span>
                    <h4 className="mb-0 counter">{null !== postCount ? postCount : 0}</h4>
                    <Box className="icon-bg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xl-3 col-lg-6">           
          </div>         
          <div className="col-xl-6 xl-100">
            <div className="card">
              <div className="cal-date-widget card-body">
                <div className="row">
                  <div className="col-xl-6 col-xs-12 col-md-6 col-sm-6">
                    <div className="cal-info text-center">
                      <h2>{null != CREATE_DATE ? CREATE_DATE.substring(8,10) : ''}</h2>
                      <div className="d-inline-block mt-2">
                        <span className="b-r-dark pr-3">{null != CREATE_DATE ? CREATE_DATE.substring(5,7) : ''}</span><span className="pl-3">{null != CREATE_DATE ? CREATE_DATE.substring(0,4) : ''}</span></div>
                      <p className="mt-4 f-16 text-muted">Created At</p>
                    </div>
                  </div>
                  <div className="col-xl-6 col-xs-12 col-md-6 col-sm-6">
                    <div className="cal-datepicker">
                      <div className="datepicker-here float-sm-right" data-language="en">
                        <DatePicker className="form-control digits" selected={startDate} onChange={handleChange} inline />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card testimonial col-xl-6 xl-50 col-sm-6">
            <div className="card-body row">
              <div className='item mt-5 col-xl-3 xl-50 col-sm-6 align-middle'>
                <img className="img-thumbnail" src={require("../../assets/images/user/7.jpg")} alt="" />
              </div>              
              <div className="item col-xl-9 xl-50 col-sm-6">
                <p>{null != professionalHeadline ? professionalHeadline : 'This field has not been updated yet.'}</p>
                <h5 className="font-primary">{name}</h5><span>{desiganation}</span>
                <h5>{null != CREATE_DATE ? 'Created At:- ' + CREATE_DATE : 'Created At'}</h5>
                <h5>{null != metatag ? 'Keyword:- ' + metatag : 'Keyword'}</h5>
                <h5>{null != desiganation ? 'Designation:- ' + desiganation : 'Designation'}</h5>
                <h5>{null != workexp ? 'Experience:- ' + workexp + 'Years' : 'Work Experience'}</h5>
                <h5>{null != currentOrganization ? 'Current Organition:- ' + currentOrganization : 'Current Organization'}</h5>
                <h5>{null != marketExpRegion ? 'Market Region:- ' + marketExpRegion : 'Market Region'}</h5>
                <h5>{null != basedCountry ? 'Based Country:- ' + basedCountry : 'Based Country'}</h5>
              </div>
            </div>
          </div>         
          <div className="col-sm-6 col-xl-3 xl-50 col-lg-6">
            <div className="card social-widget-card">
              <div className="card-body">
                <div className="redial-social-widget radial-bar-70" data-label="50%">
                  <i className="fa fa-facebook font-primary"></i></div>
                <h5 className="b-b-light">Facebook</h5>
                <div className="row">
                  <div className="col text-center b-r-light"><span>Friend</span>
                    <h4 className="counter mb-0">{null !== fbFrndCount ? fbFrndCount : 0}</h4>
                  </div>
                  <div className="col text-center"><span>Price</span>
                    <h4 className="counter mb-0">{null !== fbPostPrice ? fbPostPrice : 0}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xl-3 xl-50 col-lg-6">
            <div className="card social-widget-card">
              <div className="card-body">
                <div className="redial-social-widget radial-bar-70" data-label="50%">
                  <i className="fa fa-twitter font-primary"></i></div>
                <h5 className="b-b-light">Twitter</h5>
                <div className="row">
                  <div className="col text-center b-r-light"><span>Follower</span>
                    <h4 className="counter mb-0">{null !== twitterFollowerCount ? twitterFollowerCount : 0}</h4>
                  </div>
                  <div className="col text-center"><span>Price</span>
                    <h4 className="counter mb-0">{null !== twitterPostPrice ? twitterPostPrice : 0}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xl-3 xl-50 col-lg-6">
            <div className="card social-widget-card">
              <div className="card-body">
                <div className="redial-social-widget radial-bar-70" data-label="50%">
                  <i className="fa fa-linkedin font-primary"></i></div>
                <h5 className="b-b-light">linkedin</h5>
                <div className="row">
                  <div className="col text-center b-r-light"><span>Follower</span>
                    <h4 className="counter mb-0">{null !== lkdConnectionCount ? lkdConnectionCount : 0}</h4>
                  </div>
                  <div className="col text-center"><span>Price</span>
                    <h4 className="counter mb-0">{null !== lkdPostPrice ? lkdPostPrice : 0}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-12">
            <div>
              <div className="card">
                <div className="card-header">
                  <h5 className="text-uppercase">Job Post</h5>
                </div>
                <div className="card-body">
                  <ul className="crm-activity">                   
                    <li className="media">
                      <div className="align-self-center media-body">
                        <h6 className="mt-0">Contrary to popular belief, Lorem Ipsum is not simply. </h6>
                        <ul className="dates">
                          <li className="digits">25 July 2017</li>
                        </ul>
                      </div>
                    </li>
                    <li className="media">
                      <div className="align-self-center media-body">
                        <h6 className="mt-0">H-Code - A premium portfolio template from ThemeZaa </h6>
                        <ul className="dates">
                          <li className="digits">25 July 2017</li>
                        </ul>
                      </div>
                    </li>
                   </ul>
                </div>
              </div>
            </div>
          </div>
         <div className="col-xl-6 xl-100">
            <div className="card">
              <div className="card-header">
                <h5>Advertiser List</h5>
              </div>
              <div className="card-body">
                <div className="user-status table-responsive">
                  <table className="table table-bordernone">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Agency Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userData.map((item, index) => {
                        return (
                          <tr>
                            <td className="bd-t-none u-s-tb">
                              <div className="align-middle image-sm-size">
                                <div className="d-inline-block">
                                  <h6>{item.DISPLAY_NAME}</h6>
                                </div>
                              </div>
                            </td>
                            <td>{item.AGENCY_ID}</td>
                           </tr>
                        )
                      })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
         <div className="col-xl-4">
           </div>
        </div>
      </div>
    </Fragment>
  );
};

export default General;