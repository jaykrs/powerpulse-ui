import React, { Fragment, useState } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import axios from 'axios';
import { CMS_STRAPI_URL } from '../../../constant/serviceurl';
import { Link } from 'react-router-dom';

const History = ({ history }) => {
  const [value, setValue] = useState(localStorage.getItem('jwt'));
  const [check, setCheck] = useState(true);
  const [dataList, setDataList] = useState([]);
  const [jobPost, setJobPost] = useState([]);
  const [advertiserData, setAdvertiserData] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  const influencerDataNameArray = new Array();
  const influencerDataArray = new Array();
  function getInfluencerName(id) {
    var _flag = false;
    if (null != id) {
      for (var i = 0; i < influencerDataArray.length; i++) {
        var name = influencerDataArray[i];
        var pos = name.search(id);
        if (pos > -1) {
          _flag = true;
          return name;
          //    var _tmpName = name.substring(pos + 1, name.length);
          //    return _tmpName;
        }
      }

      if (!_flag) {
        axios({
          method: 'get',
          url: CMS_STRAPI_URL + '/influencers/' + id,
          headers: {
            Authorization:
              'Bearer ' + value,
          }
        }).then((response) => {
          var influencerNameStr = new String(response.data.id + '@' + response.data.DISPLAY_NAME);
          influencerDataArray.push(influencerNameStr);
          return influencerNameStr;
        }, (error) => {
          console.log(error);
        });
      }
    }
  }
  function allData() {

    axios({
      method: 'get',
      url: CMS_STRAPI_URL + '/carts?agency.USER_ID=' + userId + '&paymentstatus=false',
      headers: {
        Authorization:
          'Bearer ' + value,
      }
    }).then((response) => {
      setCheck(false);
      if (null != response.data && response.data.length > 0) {
        var datasize = response.data.length - 1;
        setDataList(response.data[datasize]);
        setAdvertiserData(response.data[datasize].agency);
        setJobPost(response.data[datasize].jobposts);
      }
    }, (error) => {
      console.log(error);
    });
  }

  function getInfluencerName(id) {
    axios({
      method: 'get',
      url: CMS_STRAPI_URL + '/influencers/' + id,
      headers: {
        Authorization:
          'Bearer ' + value,
      }
    }).then((response) => {
      if (null != response.data) {
        var influencerNameStr = new String(response.data.id + '@' + response.data.DISPLAY_NAME);
        influencerDataNameArray.push(influencerNameStr);
      }
    }, (error) => {
      console.log(error);
    });
  }

  if (check) {
    allData();
  }

  function handleDelete(id, postAmount, totalAmount, cartId) {
    const amount = Number(totalAmount) - Number(postAmount);
    axios({
      method: "DELETE",
      url: CMS_STRAPI_URL + '/jobposts/' + id,
      headers: {
        Authorization:
          'Bearer ' + value,
      },
    }).then((response) => {
      axios({
        method: "PUT",
        url: CMS_STRAPI_URL + '/carts/' + cartId,
        data: {
          amount: amount
        },
        headers: {
          Authorization:
            'Bearer ' + value,
        },
      }).then((response) => {
        window.location.reload(true);
      }, (error) => {
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    });
  }

  function handlePaymentGateway(price, cartId) {
    localStorage.setItem("pgid", cartId);
    localStorage.setItem("pgprice", price);
    localStorage.setItem("pgcurrency", "usd");
    localStorage.setItem("pgdesc", "platform uses services");
    localStorage.setItem("pgname", advertiserData.DISPLAY_NAME);
    localStorage.setItem("pgaddrline1", advertiserData.ADDRESS);
    localStorage.setItem("pgpostcode", "12345");
    localStorage.setItem("pgcity", advertiserData.CITY);
    localStorage.setItem("pgstate", "NA");
    localStorage.setItem("pgcountry", advertiserData.COUNTRY_CODE);
    history.push('/ecommerce/payment');
  }

  var totalPost = 0;
  return (
    <Fragment>
      <Breadcrumb title="Order" parent="Ecommerce" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Orders</h5>
              </div>
              <div className="card-body">
                <div className="order-history table-responsive">
                  <table className="table table-bordernone">
                    <thead>
                      <tr className="title-orders">
                        <td>New Orders</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        {/* <td></td> */}
                      </tr>
                      <tr>
                        {/* <th scope="col"></th> */}
                        <th scope="col">INFLUENCER</th>
                        <th scope="col">PLATFORM</th>
                        <th scope="col">POST COUNT</th>
                        {/* <th scope="col"></th> */}
                        <th scope="col">UNIT PRICE (<i class="fa fa-usd"></i>)</th>
                        <th scope="col">TOTAL PRICE (<i class="fa fa-usd"></i>)</th>
                        <th scope="col">ACTION</th>
                        {/* <th scope="col"><i className="fa fa-angle-down"></i></th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {jobPost.map((item, index) => {
                        totalPost = totalPost + Number(item.postcount)
                        return (
                          <tr>
                            <td>{null != item.influencer_display_name ? item.influencer_display_name : 'UNKNOWN'}</td>
                            <td>
                              <div className="product-name text-primary text-capitalize">{item.platform}</div>
                            </td>
                            <td>{null != item.postcount ? item.postcount : 0}</td>
                            {/* <td></td> */}
                            <td>{null != item.price ? item.price / item.postcount : 0}</td>
                            <td>{null != item.price && item.price > 0 ? item.price : 0}</td>
                            <td><Link onClick={() => handleDelete(item.id, item.price, dataList.amount, dataList.id)}><i class="fa fa-trash-o" style={{ fontSize: 17 }}></i></Link></td>
                            {/* <td><i data-feather="more-vertical"></i></td> */}
                          </tr>
                        )
                      })}

                      <tr className="title-orders">
                        <td><text className="font-weight-bold">TOTAL :</text></td>
                        <td></td>
                        <td><text className="font-weight-bold">{null != totalPost ? totalPost : 0}</text></td>
                        {/* <td></td> */}
                        <td></td>
                        <td><text className="font-weight-bold"><i class="fa fa-usd font-weight-bold"> {null != dataList.amount ? dataList.amount : 0}</i></text></td>
                        <td></td>
                      </tr>
                      {/* <tr className="title-orders">
                        <td>PAYMENT STATUS:- {dataList.paymentstatus ? 'True' : 'False'}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr> */}
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          <a className="btn btn-sm btn-primary btn-block" >
                            <h6 className="mb-0 text-white" onClick={() => { handlePaymentGateway(dataList.amount, dataList.id) }}>Pay Now</h6>
                          </a>
                        </td>
                        {/* <td></td> */}
                        <td>
                          <Link className="btn btn-sm btn-primary btn-block" to="/dashboard/default">
                            <h6 className="mb-0" onClick={() => { }}>Continue Shopping</h6>
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default History;