import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../common/breadcrumb';
import { connect } from 'react-redux';
// import Tablet from './tabset';
import { getSingleItem, addToCart } from '../../actions/ecommerce.actions';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import four from '../../assets/images/avtar/3.jpg';
import Ratings from 'react-ratings-declarative';
import axios from 'axios';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';

class InfluencerDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
            nav1: null,
            nav2: null,
            userId : null,
            influencerId: '',
            orderCart : [],
            fbpostcount: '1',
            twpostcount: '1',
            lnpostcount: '1',
            jwt: localStorage.getItem('jwt'),
            data: [],
            influencerData : [], 
            advertiserData : [],
            basedCountry: []
        }
        // this.handlePurchase.bind = this.handlePurchase.bind(this);
    }

  async  componentWillMount() {
    var uid = localStorage.getItem('userId');
      this.setState({userid:uid});
        const { data } = await axios.get(CMS_STRAPI_URL + '/agencies?_limit=1&USER_ID=' + uid, {
            headers: {
                Authorization:
                    'Bearer ' + this.state.jwt,
            },
        });
        if (null != data && data.length > 0) {
            var datasize = data.length - 1;
            this.setState ({advertiserData:data[datasize]});
        }
    }
    

    componentDidMount() {
      this.setState({influencerId: this.props.getSingleItem(this.props.match.params.id)});
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
                influencerData : response.data,
                basedCountry: null != response.data.BASED_COUNTRY?response.data.BASED_COUNTRY.name:''
            })
        }, (error) => {
            console.log(error);
        })

        this.setState({
            nav1: this.slider1,
            nav2: this.slider2
        });
    }

    initiateAddToCard() {
 //     http://ec2-13-233-117-221.ap-south-1.compute.amazonaws.com:1337/carts?agency.id=1&paymentstatus=false
 axios({
        method: 'get',
        url: CMS_STRAPI_URL + '/carts?agency.id='+this.state.advertiserData.id+'&paymentstatus=false',
        headers: {
          Authorization:
            'Bearer ' + this.state.jwt,
        }
      }).then((response) => {
        var dataSize = response.data.length;
        if(dataSize > 0) {
        this.setState({orderCart : response.data[0]});
        }
        else {
          this.postNewCarts();
        }
      }, (error) => {
        console.log(error);
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

    handlePurchase(price,smType,postCount) {
      this.initiateAddToCard();
      this.postNewJob(smType, price, postCount);
      const data = {
            price: price,
            smType: smType
        }
        localStorage.setItem('influencerData', data)
    //    this.props.history.push(`/ecommerce/history`);
    }

     
    
       postNewCarts() {
        axios({
          method: 'post',
          url: CMS_STRAPI_URL + '/carts',
          headers: {
            Authorization:
              'Bearer ' + this.state.jwt,
          },
          data : {
           agency :  this.state.advertiserData,
           amount : 0,
           paymentstatus: false,
          }
        }).then((response) => {
          this.setState({orderCart : response.data});
        }, (error) => {
          console.log(error);
        });
      }

      postNewJob(sMediaName, postPrice, postCount) {
        axios({
          method: 'post',
          url: CMS_STRAPI_URL + '/jobposts',
          headers: {
            Authorization:
              'Bearer ' + this.state.jwt,
          },
          data : {
            advertiser :  this.state.advertiserData,
            influencer : this.state.influencerData,
            platform : sMediaName,
            price : postPrice * postCount,
            status : 'create',
            postcount : postCount,
            display_name : this.state.influencerData.DISPLAY_NAME +' @ ' +this.state.advertiserData.DISPLAY_NAME + ' # ' + sMediaName + ' X '+postCount,
            advertiser_display_name : this.state.advertiserData.DISPLAY_NAME,
            influencer_display_name : this.state.influencerData.DISPLAY_NAME,
            createdate : new Date(),
            deletedind : false,
            paymentind : false,
           paymentstatus: false,
          }
        }).then((response) => {
          var jobPostResponse = response.data;
          var jobPostArray = new Array();
         if(null != this.state.orderCart.jobposts && this.state.orderCart.jobposts.length > 0) {
         jobPostArray = this.state.orderCart.jobposts;
         jobPostArray.push(jobPostResponse);
         } else {
         jobPostArray.push(jobPostResponse);
         }
         this.updateCurrentCarts(jobPostArray, jobPostResponse.price);
        }, (error) => {
          console.log(error);
        });
      }
    

      updateCurrentCarts(jobPostArray, postAmount) {
        axios({
          method: 'put',
          url: CMS_STRAPI_URL + '/carts/'+this.state.orderCart.id,
          headers: {
            Authorization:
              'Bearer ' + this.state.jwt,
          },
          data : {
            jobposts : jobPostArray,
            amount : this.state.orderCart.amount + postAmount
          }
        }).then((response) => {
          this.setState({orderCart : response.data});
        }, (error) => {
          console.log(error);
        });
      }

    render() {
        const { quantity, data, basedCountry } = this.state
        const { singleItem, symbol } = this.props;

        return (
            <Fragment>
                <Breadcrumb title="Influencer Detail" parent="Ecommerce" />
                <div className="container-fluid">
                    <div className="card">
                        <div className="row product-page-main">
                            <div className="col-xl-4">
                                <Slider asNavFor={this.state.nav2} ref={slider => (this.slider1 = slider)}
                                    className="product-slider">
                                    {singleItem.variants ? singleItem.variants.map((item, i) => {
                                        return (
                                            <div className="item" key={i}>
                                                <img src={four} alt="" className="img-fluid" />
                                            </div>
                                        )
                                    }) :
                                        <img src={four} alt="" className="img-fluid" />}
                                </Slider>
                                <p>{null != data.PROFESSIONAL_HEADLINES ? data.PROFESSIONAL_HEADLINES : 'Influencer did not updated Professional Headline yet'}</p>
                               <div className='card-body pricing-content'>
                                    <div className='card border p-2'>
                                    <h5>{null != data.CREATE_DATE ?'Created At:- ' + data.CREATE_DATE : 'Created At'}</h5>
                                    <h5>{null != data.METATAG ?'Keyword:- ' + data.METATAG : 'Keyword'}</h5>
                                    <h5>{null != data.DESIGNATION ?'Designation:- ' + data.DESIGNATION : 'Designation'}</h5>
                                    <h5>{null != data.WORK_EXP ? 'Experience:- ' + data.WORK_EXP + 'Years': 'Work Experience'}</h5>
                                    <h5>{null != data.CURRENT_ORGANIZATION ? 'Current Organition:- ' + data.CURRENT_ORGANIZATION : 'Current Organization'}</h5>
                                    <h5>{null != data.MARKET_EXP_REGION ? 'Market Region:- ' + data.MARKET_EXP_REGION : 'Market Region'}</h5>
                                    <h5>{null != basedCountry.name ? 'Based Country:- ' + basedCountry.name : 'Based Country'}</h5>
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
                                                <h3>Facebook</h3>
                                                <h2><i class="fa fa-inr"></i></h2>
                                                <h1>{null != data.FB_CONSULTATION_PRICE ? data.FB_CONSULTATION_PRICE : 0}</h1>
                                                <h4 className="mb-0">{null != data.FACEBOOK_FRND_COUNT ? data.FACEBOOK_FRND_COUNT : 0}</h4>
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
                                                            </select>
                                            </div>
                                            <a className="btn btn-lg btn-primary btn-block" href="#javascript">
                                                <h5 className="mb-0" onClick={() => this.handlePurchase(data.FB_CONSULTATION_PRICE, 'facebook', this.fbpostcount)}>Add to Cart</h5>
                                            </a>
                                        </div>
                                    </div>

                                    <div className="col-xl-4 col-sm-6 xl-50">
                                        <div className="card text-center pricing-simple">
                                            <div className="card-body">
                                                <h3>Twitter</h3>
                                                <h2><i class="fa fa-inr"></i></h2>
                                                <h1>{null != data.TW_CONSULTATION_PRICE ? data.TW_CONSULTATION_PRICE : 0}</h1>
                                                <h4 className="mb-0">{null != data.TWITTER_FOLLOWER_COUNT ? data.TWITTER_FOLLOWER_COUNT : 0}</h4>
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
                                                            </select>
                                            </div><a className="btn btn-lg btn-primary btn-block" href="#javascript">
                                                <h5 className="mb-0" onClick={() => this.handlePurchase(data.TW_CONSULTATION_PRICE, 'twitter',this.twpostcount)}>Add to Cart</h5></a>
                                        </div>
                                    </div>

                                    <div className="col-xl-4 col-sm-6 xl-50">
                                        <div className="card text-center pricing-simple">
                                            <div className="card-body">
                                                <h3>Linked In</h3>
                                                <h2><i class="fa fa-inr"></i></h2>
                                                <h1>{null != data.LNKD_CONSULTATION_PRICE ? data.LNKD_CONSULTATION_PRICE : 0}</h1>
                                                <h4 className="mb-0">{null != data.LINKEDIN_CONN_COUNT ? data.LINKEDIN_CONN_COUNT : 0}</h4>
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
                                                            </select>
                                            </div><a className="btn btn-lg btn-primary btn-block" href="#javascript">
                                                <h5 className="mb-0" onClick={() => this.handlePurchase(data.LNKD_CONSULTATION_PRICE, 'linkedin', this.lnpostcount)}>Add to Cart</h5></a>
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
const mapStateToProps = (state) => ({
    products: state.data.productItems,
    singleItem: state.data.singleItem,
    symbol: state.data.symbol
})

export default connect(
    mapStateToProps,
    { getSingleItem, addToCart }
)(InfluencerDetail)