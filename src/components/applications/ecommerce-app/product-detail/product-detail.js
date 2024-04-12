import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../../common/breadcrumb';
import { connect } from 'react-redux';
import Tablet from './tabset';
import { getSingleItem, addToCart } from '../../../../actions/ecommerce.actions';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import four from '../../../../assets/images/avtar/3.jpg';
import Ratings from 'react-ratings-declarative';
import axios from 'axios';
import { CMS_STRAPI_URL } from '../../../../constant/serviceurl';
import { LabelConstants } from '../../../../constant/LableConstant';
import { ToastContainer, toast } from 'react-toastify';
import { country_data } from '../../../../assets/country_data';
import { Market_Exp } from '../../../../assets/Market_exp';
import { Sector } from '../../../../assets/Sector';

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      nav1: null,
      nav2: null,
      userId: null,
      influencerId: '',
      orderCart: [],
      fbpostcount: 1,
      twpostcount: 1,
      lnpostcount: 1,
      jwt: localStorage.getItem('jwt'),
      data: [],
      influencerData: [],
      advertiserData: [],
      basedCountry: [],
      countryData: country_data,
      marketExp: Market_Exp,
      sector: Sector
    }

  }

  async componentWillMount() {
    var uid = localStorage.getItem('userId');
    this.setState({ userid: uid });
    const { data } = await axios.get(CMS_STRAPI_URL + '/agencies?_limit=1&USER_ID=' + uid, {
      headers: {
        Authorization:
          'Bearer ' + this.state.jwt,
      },
    });
    if (null != data && data.length > 0) {
      var datasize = data.length - 1;
      this.setState({ advertiserData: data[datasize] });
    }
  }


  componentDidMount() {
    this.setState({ influencerId: this.props.getSingleItem(this.props.match.params.id) });
    var iid = this.props.getSingleItem(this.props.match.params.id);
    console.log(iid);
    console.log(iid.payload.productId);
    axios({
      method: 'GET',
      url: CMS_STRAPI_URL + '/influencers' + '/' + iid.payload.productId,
      headers: {
        Authorization:
          'Bearer ' + this.state.jwt,
      }
    }).then((response) => {
      console.log('data', response.data)
      this.setState({
        data: response.data,
        influencerData: response.data,
        basedCountry: null != response.data.BASED_COUNTRY ? response.data.BASED_COUNTRY.name : ''
      })
    }, (error) => {
      console.log(error);
    })

    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    });
  }

  addcart = (product, qty) => {
    this.props.addToCart(product, qty);
    this.props.history.push(`/ecommerce/cart/${product.id}`);
  }

  changeFbPostcount(count) {
    this.setState({
      fbpostcount: count
    });
  }

  changeTwPostcount(count) {
    this.setState({
      twpostcount: count
    });
  }
  changeLnPostcount(count) {
    this.setState({
      lnpostcount: count
    });
  }

  buyProduct = (product, qty) => {
    this.props.addToCart(product, qty);
    this.props.history.push(`/ecommerce/checkout/${product}`);
  }

  async handlePurchase(price, smType) {
    // setTimeout(() => {
    //     toast.info(LabelConstants.ALERT_ADDING_TO_CART);
    // }, 10);
    await this.initiateAddToCard();
    if (smType == 'facebook')
      this.postNewJob(smType, price, this.state.fbpostcount);
    else if (smType == 'twitter')
      this.postNewJob(smType, price, this.state.twpostcount);
    else if (smType == 'linkedin')
      this.postNewJob(smType, price, this.state.lnpostcount);
    //   const data = {
    //         price: price,
    //         smType: smType
    //     }
    //     localStorage.setItem('influencerData', data)
    //    this.props.history.push(`/ecommerce/history`);
  }

  async initiateAddToCard() {
    //     http://ec2-13-233-117-221.ap-south-1.compute.amazonaws.com:1337/carts?agency.id=1&paymentstatus=false
    await axios({
      method: 'get',
      url: CMS_STRAPI_URL + '/carts?agency.id=' + this.state.advertiserData.id + '&paymentstatus=false',
      headers: {
        Authorization:
          'Bearer ' + this.state.jwt,
      }
    }).then((response) => {
      var dataSize = response.data.length;
      if (dataSize > 0) {
        this.setState({ orderCart: response.data[0] });
      }
      else {
        this.postNewCarts();
      }
    }, (error) => {
      console.log(error);
    });
  }

  async postNewCarts() {
    await axios({
      method: 'post',
      url: CMS_STRAPI_URL + '/carts',
      headers: {
        Authorization:
          'Bearer ' + this.state.jwt,
      },
      data: {
        agency: this.state.advertiserData,
        amount: 0,
        paymentstatus: false,
      }
    }).then((response) => {
      this.setState({ orderCart: response.data });
    }, (error) => {
      console.log(error);
    });
  }

  async postNewJob(sMediaName, postPrice, postCount) {
    await axios({
      method: 'post',
      url: CMS_STRAPI_URL + '/jobposts',
      headers: {
        Authorization:
          'Bearer ' + this.state.jwt,
      },
      data: {
        advertiser: this.state.advertiserData,
        influencer: this.state.influencerData,
        platform: sMediaName,
        price: postPrice * postCount,
        status: 'create',
        postcount: postCount,
        display_name: this.state.influencerData.DISPLAY_NAME + ' @ ' + this.state.advertiserData.DISPLAY_NAME + ' # ' + sMediaName + ' X ' + postCount,
        advertiser_display_name: this.state.advertiserData.DISPLAY_NAME,
        influencer_display_name: this.state.influencerData.DISPLAY_NAME,
        createdate: new Date(),
        deletedind: false,
        paymentind: false,
        paymentstatus: false,
      }
    }).then((response) => {
      var jobPostResponse = response.data;
      var jobPostArray = new Array();
      if (null != this.state.orderCart.jobposts && this.state.orderCart.jobposts.length > 0) {
        jobPostArray = this.state.orderCart.jobposts;
        jobPostArray.push(jobPostResponse);
      } else {
        jobPostArray.push(jobPostResponse);
      }
      this.updateCurrentCarts(jobPostArray, jobPostResponse.price);
      this.createNewArticle(sMediaName, jobPostResponse.id, postCount, postPrice, 'precreate', this.state.advertiserData.id);
    }, (error) => {
      console.log(error);
    });
  }

  async createNewArticle(platform, id, count, price, status, last_updated_by) {
    for (var i = 0; i < count; i++) {
      await axios({
        method: 'post',
        url: CMS_STRAPI_URL + '/postarticles',
        headers: {
          Authorization:
            'Bearer ' + this.state.jwt,
        },
        data: {
          jobpostid: id,
          status: status,
          platform: platform,
          advertiser_display_name: this.state.advertiserData.DISPLAY_NAME,
          influencer_display_name: this.state.influencerData.DISPLAY_NAME,
          advertiser_id: this.state.advertiserData.id,
          influencer_id: this.state.influencerData.id,
          last_updated_by: last_updated_by,
          price: price
        }
      }).then((response) => {
        this.setState({ orderCart: response.data });
      }, (error) => {
        console.log(error);
      });
    }
  }

  async updateCurrentCarts(jobPostArray, postAmount) {
    await axios({
      method: 'put',
      url: CMS_STRAPI_URL + '/carts/' + this.state.orderCart.id,
      headers: {
        Authorization:
          'Bearer ' + this.state.jwt,
      },
      data: {
        jobposts: jobPostArray,
        amount: this.state.orderCart.amount + postAmount
      }
    }).then((response) => {
      this.setState({ orderCart: response.data });
      setTimeout(() => {
        toast.success(LabelConstants.ALERT_ADD_TO_CART_SUCCESSFULLY);
      }, 200);
    }, (error) => {
      console.log(error);
    });
  }

  render() {
    const { quantity, data, basedCountry, countryData, marketExp, sector } = this.state
    const { singleItem, symbol } = this.props;

    return (
      <Fragment>
        <Breadcrumb title="Influencer Profile" parent="Ecommerce" />
        <div className="container-fluid">
          <div className="card">
            <div className="row product-page-main">
              <div className="col-xl-4">
                {/* <Slider asNavFor={this.state.nav2} ref={slider => (this.slider1 = slider)}
                  className="product-slider">
                  {singleItem.variants ? singleItem.variants.map((item, i) => {
                    return ( */}
                <div className="item mb-3">
                  <img height="200px" width="200px" src={null != data.AVATAR_URL ? CMS_STRAPI_URL + data.AVATAR_URL : CMS_STRAPI_URL + LabelConstants.DEFAULT_AVATAR} alt="" className="img-fluid" />
                </div>
                {/* )
                  }) : */}
                {/* <img height="200px" width="200px" src={CMS_STRAPI_URL + LabelConstants.DEFAULT_AVATAR} alt="" className="img-fluid" /> */}
                {/* }
                </Slider> */}
                <text className="h6" >{null != data.PROFESSIONAL_HEADLINES ? data.PROFESSIONAL_HEADLINES : 'Influencer did not updated Professional Headline yet'}</text>
                <div className=''>
                  <div className='mt-3 border p-2'>
                    {/* <h5>{data.ACTIVE ? 'Active:- ' + "True" : 'Active:- ' + "False"}</h5> */}
                    <div className="d-flex">
                      <text className="h6 font-weight-bold">Created On: </text><text className="h6 ml-1">{null != data.created_at ? data.created_at.substring(0, 10) : ' Created On'}</text>
                    </div>

                    <div className="d-flex">
                      <text className="h6 font-weight-bold">Designation: </text><text className="h6 ml-1">{null != data.DESIGNATION ? data.DESIGNATION : 'Designation'}</text>
                    </div>

                    <div className="d-flex">
                      <text className="h6 font-weight-bold">Experience: </text><text className="h6 ml-1">{null != data.WORK_EXP ? data.WORK_EXP + ' Years' : 'Work Experience'}</text>
                    </div>

                    <div className="d-flex">
                      <text className="h6 font-weight-bold">Organization: </text><text className="h6 ml-1">{null != data.CURRENT_ORGANIZATION ? data.CURRENT_ORGANIZATION : 'Current Organization'}</text>
                    </div>

                    <div className="d-flex">
                      <text className="h6 font-weight-bold">Experience: </text><text className="h6 ml-1">{null != data.MARKET_REGION_EXP ?
                        data.MARKET_REGION_EXP.split(",").map((item, index) => {
                          // console.log('innerrrrrr', item)
                          // console.log('expppppp', dataItem.value)
                          return (
                            <>
                              {marketExp.map((dataItem, dataIndex) => {
                                if (item === dataItem.value) {
                                  return (
                                    // <text className="border mr-1 p-1 rounded">
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
                      <text className="h6 font-weight-bold">Sector: </text><text className="h6 ml-1">{null != data.SECTOR_DOMAIN_EXP ?
                        data.SECTOR_DOMAIN_EXP.split(",").map((item, index) => {
                          // console.log('innerrrrrr', item)
                          // console.log('expppppp', dataItem.value)
                          return (
                            <>
                              {sector.map((dataItem, dataIndex) => {
                                if (item === dataItem.value) {
                                  return (
                                    // <text className="border mr-1 p-1 rounded">
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
                          if (data.COUNTRY_BASED_IN === item.code) {
                            return (
                              item.name
                            )
                          }
                        })
                          : 'Based In'
                        }</text>
                    </div>
                    {/* <h5>{null != data.METATAG ? 'Keyword:- ' + data.METATAG : 'Keyword'}</h5> */}
                    {/* <h5>{null != data.DESIGNATION ? 'Designation : ' + data.DESIGNATION : 'Designation :'}</h5>
                    <h5>{null != data.WORK_EXP ? 'Experience : ' + data.WORK_EXP + ' Years' : 'Work Experience :'}</h5>
                    <h5>{null != data.CURRENT_ORGANIZATION ? 'Current Organization : ' + data.CURRENT_ORGANIZATION : 'Current Organization :'}</h5>
                    <h5>{null != data.MARKET_REGION_EXP ? 'Market Experience : ' + data.MARKET_REGION_EXP : 'Market Experience :'}</h5>
                    <h5>Based In : {null != countryData ? countryData.map((item, index) => {
                      if (data.COUNTRY_BASED_IN === item.code) {
                        return (
                          item.name
                        )
                      }
                    })
                      : null
                    }
                    </h5> */}

                  </div>
                </div>
              </div>
              <div className="col-xl-8">
                <div className="product-page-details">
                  <h5>{data.DISPLAY_NAME}</h5>
                </div>
                <hr />
                <p>{null != data.BIOGRAPHY ? data.BIOGRAPHY : 'Biography has not been updated yet.'}</p>
                <hr />
                <div className="card-body row pricing-content">
                  <div className="col-xl-4 col-sm-6 xl-50">
                    <div className="card text-center pricing-simple">
                      <div className="card-body">
                        <h3 className={data.FB_ACTIVE ? "h3" : "h3 text-muted"}>Facebook</h3>
                        <h6 className={data.TW_ACTIVE ? "h6" : "h6 text-muted"}>(Friends)</h6>
                        <h5 className={data.FB_ACTIVE ? "mb-2" : "mb-2 text-muted"}>{null != data.FACEBOOK_FRND_COUNT ? Number(data.FACEBOOK_FRND_COUNT) : 0}</h5>
                        <h2 className={data.FB_ACTIVE ? "h2" : "h2 text-muted"}></h2>
                        <h6 className={data.TW_ACTIVE ? "h6" : "h6 text-muted"}>(Price/Post)</h6>
                        <h5 className={data.FB_ACTIVE ? "h5" : "h5 text-muted"}><i class="fa fa-usd"></i>{null != data.FB_CONSULTATION_PRICE ? data.FB_CONSULTATION_PRICE : 0}</h5>

                        {data.FB_ACTIVE ?
                          <select className="form-control mb-1"
                            value={this.state.fbpostcount}
                            onChange={e => this.changeFbPostcount(e.target.value)}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                          </select> :
                          <input className="form-control mb-1"
                            readOnly={true}
                          />
                        }

                      </div>
                      <Link className={data.FB_ACTIVE ? "btn btn-lg btn-primary btn-block" : "btn btn-lg btn-dark btn-block"}>
                        <h6 className="mb-0" onClick={() => data.FB_ACTIVE ? this.handlePurchase(data.FB_CONSULTATION_PRICE, 'facebook') : null}>Add to Cart</h6>
                      </Link>
                    </div>
                  </div>

                  <div className="col-xl-4 col-sm-6 xl-50">
                    <div className="card text-center pricing-simple">
                      <div className="card-body">
                        <h3 className={data.TW_ACTIVE ? "h3" : "h3 text-muted"}>Twitter</h3>
                        <h6 className={data.TW_ACTIVE ? "h6" : "h6 text-muted"}>(Followers)</h6>
                        <h5 className={data.TW_ACTIVE ? "mb-2" : "mb-2 text-muted"}>{null != data.TWITTER_FOLLOWER_COUNT ? Number(data.TWITTER_FOLLOWER_COUNT) : 0}</h5>
                        <h6 className={data.TW_ACTIVE ? "h6" : "h6 text-muted"}>(Price/Post)</h6>
                        <h5 className={data.TW_ACTIVE ? "h5" : "h5 text-muted"}><i class="fa fa-usd"></i>{null != data.TW_CONSULTATION_PRICE ? data.TW_CONSULTATION_PRICE : 0}</h5>
                        {data.TW_ACTIVE ?
                          <select className="form-control mb-1"
                            value={this.state.twpostcount}
                            onChange={e => this.changeTwPostcount(e.target.value)}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                          </select> :
                          <input className="form-control mb-1"
                            readOnly={true}
                          />
                        }
                      </div>
                      <Link className={data.TW_ACTIVE ? "btn btn-lg btn-primary btn-block" : "btn btn-lg btn-dark btn-block"}>
                        <h6 className="mb-0" onClick={() => data.TW_ACTIVE ? this.handlePurchase(data.TW_CONSULTATION_PRICE, 'twitter') : null}>Add to Cart</h6>
                      </Link>
                    </div>
                  </div>

                  <div className="col-xl-4 col-sm-6 xl-50">
                    <div className="card text-center pricing-simple">
                      <div className="card-body">
                        <h3 className={data.LN_ACTIVE ? "h3" : "h3 text-muted"}>LinkedIn</h3>
                        <h6 className={data.TW_ACTIVE ? "h6" : "h6 text-muted"}>(Followers)</h6>
                        <h5 className={data.LN_ACTIVE ? "mb-2" : "mb-2 text-muted"}>{null != data.LINKEDIN_CONN_COUNT ? Number(data.LINKEDIN_CONN_COUNT) : 0}</h5>
                        <h6 className={data.TW_ACTIVE ? "h6" : "h6 text-muted"}>(Price/Post)</h6>
                        <h5 className={data.LN_ACTIVE ? "h5" : "h5 text-muted"}><i class="fa fa-usd"></i>{null != data.LNKD_CONSULTATION_PRICE ? data.LNKD_CONSULTATION_PRICE : 0}</h5>
                        {data.LN_ACTIVE ?
                          <select className="form-control mb-1"
                            value={this.state.lnpostcount}
                            onChange={e => this.changeLnPostcount(e.target.value)}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                          </select> :
                          <input className="form-control mb-1"
                            readOnly={true}
                          />



                        }
                      </div><Link className={data.LN_ACTIVE ? "btn btn-lg btn-primary btn-block" : "btn btn-lg btn-dark btn-block"}>
                        <h6 className="mb-0" onClick={() => data.LN_ACTIVE ? this.handlePurchase(data.LNKD_CONSULTATION_PRICE, 'linkedin') : null}>Add to Cart</h6></Link>
                    </div>
                  </div>
                </div>
                <div className="d-flex">
                  <Link className="btn btn-lg btn-primary mx-auto" to='/advertiser/cart'>
                    <h6 className="mb-0">Proceed to Checkout</h6>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  products: state.data.productItems,
  singleItem: state.data.singleItem,
  symbol: state.data.symbol
})

export default connect(
  mapStateToProps,
  { getSingleItem, addToCart }
)(ProductDetail)