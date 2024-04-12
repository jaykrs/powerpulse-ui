import React, { Fragment, Component } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Breadcrumb from '../common/breadcrumb';
import axios from 'axios';
import { Navigation, Box } from 'react-feather';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import { LabelConstants } from '../../constant/LableConstant';
import { country_data } from '../../assets/country_data';
import { Market_Exp } from '../../assets/Market_exp';
import { Sector } from '../../assets/Sector'

class InfluencerScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: localStorage.getItem('jwt'),
      userId: localStorage.getItem('userId'),
      userTypeId: localStorage.getItem('userTypeId'),
      marketExp: Market_Exp,
      sector: Sector,
      countryData: country_data,
      avatarUri: '',
      userData: [],
      userPostData: [],
      jobPostData: []
    }
  }

  async componentDidMount() {
    const { value, userTypeId, userId } = this.state;
    axios({
      method: 'GET',
      url: CMS_STRAPI_URL + '/postarticles?_sort=created_at:DESC&influencer_id=' + userTypeId + '&status=published',
      headers: {
        Authorization:
          'Bearer ' + value,
      },
    }).then((response) => {
      if (null != response.data && response.data.length > 0) {
        this.setState({ userPostData: response.data })
      }
    }, (error) => {
      console.log(error)
    });

    axios({
      method: 'GET',
      url: CMS_STRAPI_URL + '/jobposts?_sort=created_at:DESC&influencer.USER_ID=' + userId,
      headers: {
        Authorization:
          'Bearer ' + value,
      },
    }).then((response) => {
      if (null != response.data && response.data.length > 0) {
        var datasize = response.data.length - 1;
        this.setState({ jobPostData: response.data })
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
      this.setState({ userData: data[datasize] })
    }
  }

  render() {
    const { userData, jobPostData, userPostData, marketExp, sector, countryData } = this.state
    return (
      <Fragment>
        <Breadcrumb title="Influencer Dashboard" />
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
                      <h4 className="mb-0 counter"><i class="fa fa-usd"></i>{null !== userData.TOTAL_EARNINGS ? userData.TOTAL_EARNINGS : 0}</h4>
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
                    <div className="media-body"><span className="m-0">Posts Done</span>
                      <h4 className="mb-0 counter">{null !== userData.SERVED_POST ? userData.SERVED_POST : 0}</h4>
                      <Box className="icon-bg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xl-3 col-lg-6">
            </div>

            <div className="card testimonial col-xl-12 xl-100 col-sm-12">
              <div className="card-body row">
                <div className='item mt-5 col-sm-3 align-middle'>
                  <img className="img-fluid" onError={(e) => { e.target.onerror = null; e.target.src = "http://app.cinfluencers.com/avatar.jpg" }} src={null != userData.AVATAR_URL ? CMS_STRAPI_URL + userData.AVATAR_URL : CMS_STRAPI_URL + LabelConstants.DEFAULT_AVATAR} alt="" />
                </div>
                <div className="item col-xl-8 xl-50 col-sm-6 md-ml-5">
                  <p>{null != userData.PROFESSIONAL_HEADLINES ? userData.PROFESSIONAL_HEADLINES : 'This field has not been updated yet.'}</p>
                  <h5 className="font-primary">{userData.DISPLAY_NAME}</h5>
                  {/* <span>{userData.DESIGNATION}</span> */}
                  <div className="d-flex">
                    <text className="h6 font-weight-bold">Active: </text><text className="h6 ml-1">{userData.ACTIVE ? "True" : "False"}</text>
                  </div>

                  <div className="d-flex">
                    <text className="h6 font-weight-bold">Created On: </text><text className="h6 ml-1">{null != userData.created_at ? userData.created_at.substring(0, 10) : ' Created On'}</text>
                  </div>

                  <div className="d-flex">
                    <text className="h6 font-weight-bold">Designation: </text><text className="h6 ml-1">{null != userData.DESIGNATION ? userData.DESIGNATION : 'Designation'}</text>
                  </div>

                  <div className="d-flex">
                    <text className="h6 font-weight-bold">Experience: </text><text className="h6 ml-1">{null != userData.WORK_EXP ? userData.WORK_EXP + ' Years' : 'Work Experience'}</text>
                  </div>

                  <div className="d-flex">
                    <text className="h6 font-weight-bold">Organization: </text><text className="h6 ml-1">{null != userData.CURRENT_ORGANIZATION ? userData.CURRENT_ORGANIZATION : 'Current Organization'}</text>
                  </div>

                  <div className="d-flex">
                    <text className="h6 font-weight-bold">Experience: </text><text className="h6 ml-1">{null != userData.MARKET_REGION_EXP ?
                      userData.MARKET_REGION_EXP.split(",").map((item, index) => {
                        return (
                          <>
                            {marketExp.map((dataItem, dataIndex) => {
                              if (item === dataItem.value) {
                                return (
                                  dataItem.name + " "
                                )
                              }
                            })
                            }
                          </>
                        )
                      }) : 'Market Experience'}</text>
                  </div>

                  <div className="d-flex">
                    <text className="h6 font-weight-bold">Sector: </text><text className="h6 ml-1">{null != userData.SECTOR_DOMAIN_EXP ?
                      userData.SECTOR_DOMAIN_EXP.split(",").map((item, index) => {
                        return (
                          <>
                            {sector.map((dataItem, dataIndex) => {
                              if (item === dataItem.value) {
                                return (
                                  dataItem.name + " "
                                )
                              }
                            })
                            }
                          </>
                        )
                      }) : 'Sector Domain'}</text>
                  </div>
                  <div className="d-flex">
                    <text className="h6 font-weight-bold">Based In: </text><text className="h6 ml-1">
                      {null != countryData ? countryData.map((item, index) => {
                        if (userData.COUNTRY_BASED_IN === item.code) {
                          return (
                            item.name
                          )
                        }
                      })
                        : 'Based In'
                      }</text>
                  </div>
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
                      <h5 className="counter mb-0">{null !== userData.FACEBOOK_FRND_COUNT ? userData.FACEBOOK_FRND_COUNT : 0}</h5>
                    </div>
                    <div className="col text-center"><span>Price</span>
                      <h5 className="counter mb-0"><i class="fa fa-usd"></i>{null !== userData.FB_CONSULTATION_PRICE ? userData.FB_CONSULTATION_PRICE : 0}</h5>
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
                      <h5 className="counter mb-0">{null !== userData.TWITTER_FOLLOWER_COUNT ? userData.TWITTER_FOLLOWER_COUNT : 0}</h5>
                    </div>
                    <div className="col text-center"><span>Price</span>
                      <h5 className="counter mb-0"><i class="fa fa-usd"></i>{null !== userData.TW_CONSULTATION_PRICE ? userData.TW_CONSULTATION_PRICE : 0}</h5>
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
                      <h5 className="counter mb-0">{null !== userData.LINKEDIN_CONN_COUNT ? userData.LINKEDIN_CONN_COUNT : 0}</h5>
                    </div>
                    <div className="col text-center"><span>Price</span>
                      <h5 className="counter mb-0"><i class="fa fa-usd"></i>{null !== userData.LNKD_CONSULTATION_PRICE ? userData.LNKD_CONSULTATION_PRICE : 0}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-12">
              <div>
                <div className="card">
                  <div className="card-header">
                    <h5 className="text-uppercase">Posts Done</h5>
                  </div>
                  <div className="card-body">
                    <ul className="crm-activity">
                      {userPostData.map((item, index) => {
                        if (index < 4) {
                          return (
                            <li className="media">
                              <div className="d-flex align-self-center media-body">
                                <text className="mr-auto">{null != item.advertiser_display_name ? item.advertiser_display_name : 'UNKNOWN'} </text>
                                <text className="ml-auto">{item.updated_at.substring(0, 10)}</text>
                              </div>
                            </li>
                          )
                        }
                      })}
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
                          <th scope="col">ADVERTISER</th>
                          <th scope="col">ORGANIZATION NAME</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jobPostData.map((item, index) => {
                          if (index < 10) {
                            return (
                              <tr>
                                <td className="bd-t-none u-s-tb">
                                  <div className="align-middle image-sm-size">
                                    <div className="d-inline-block">
                                      <h6>{item.advertiser.DISPLAY_NAME}</h6>
                                    </div>
                                  </div>
                                </td>
                                <td>{item.advertiser.AGENCY_ID}</td>
                              </tr>
                            )
                          }

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
  }
}

export default InfluencerScreen;