import React, { Fragment, useState, useEffect, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import axios from 'axios';
import { CMS_STRAPI_URL, INVOICE_URL } from '../../constant/serviceurl';

class OrderHistory extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: localStorage.getItem('jwt'),
      userId: localStorage.getItem('userId'),
      userType: localStorage.getItem('userType'),
      userTypeId: localStorage.getItem('userTypeId'),
      dataList: [],
      allData: [],
      totalAmt: 0,
      data: ''
    }
  }

  componentDidMount() {
    const { value, userId, userType, userTypeId } = this.state;
    if (userType === 'advertiser') {
      axios({
        method: 'get',
        url: CMS_STRAPI_URL + '/carts?_sort=created_at:DESC&agency.USER_ID=' + userId + '&paymentstatus=true',
        headers: {
          Authorization:
            'Bearer ' + value,
        }
      }).then((response) => {
        if (null != response.data && response.data.length > 0) {
          console.log("data" + response.data.length);
          var datasize = response.data.length - 1;
          this.setState({
            dataList: response.data[datasize].jobposts,
            allData: response.data
          })
        } else {
          this.setState({
            data: 'nodata'
          })
        }
      }, (error) => {
        console.log(error);
      });
    } else if (userType === 'influencer') {
      axios({
        method: 'get',
        url: CMS_STRAPI_URL + '/carts?_sort=created_at:DESC&jobposts.influencer=' + userTypeId + '&paymentstatus=true',
        headers: {
          Authorization:
            'Bearer ' + value,
        }
      }).then((response) => {
        if (null != response.data && response.data.length > 0) {
          console.log("data" + response.data.length);
          var datasize = response.data.length - 1;
          this.setState({
            dataList: response.data[datasize].jobposts,
            allData: response.data
          })
        } else {
          this.setState({
            data: 'nodata'
          })
        }
      }, (error) => {
        console.log(error);
      });
    }

  }

  render() {
    const { dataList, userType, allData, userTypeId, totalAmt, data } = this.state;
    // const total = 0;
    return (
      <Fragment>
        <Breadcrumb title="Order History" parent="Ecommerce" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>History</h5>
                </div>
                {data != 'nodata' ? allData.length > 0 ? allData.map((item, index) => {
                  console.log("data" + item.id);
                  var totalIAmt = 0;
                  var totalPost = 0;
                  return (
                    <div className="card-body border-top border-bottom border-primary">
                      <div className="order-history table-responsive">
                        <table className="table table-bordernone">
                          <thead>
                            <tr className="title-orders">
                              <td className="btn-sm" >ORDER NO. :  {item.id}</td>
                              {/* <td className="btn-sm" >TRANSACTION STATUS :  {item.paymentstatus ? 'Yes' : 'No'}</td> */}
                              <td>{userType === "advertiser" ? <a href={INVOICE_URL + item.invoice_path} target="_blank"><u>INVOICE</u></a> : null}</td>
                              <td className="btn-sm">TRANSACTION DATE :  {item.paymentdate}</td>
                              <td></td>
                              <td className="btn-sm">TRANSACTION ID :  </td>
                              <td>{item.paymentremark}</td>
                              {/* <td></td> */}
                            </tr>
                            <tr>
                              <th scope="col">S. NO.</th>
                              <th scope="col">{userType === "advertiser" ? "INFLUENCER" : userType === "influencer" ? "ADVERTISER" : "N/A"}</th>
                              <th scope="col">PLATFORM</th>
                              <th scope="col">POST COUNT</th>
                              {/* <th scope="col"></th> */}
                              <th scope="col">UNIT PRICE (<i class="fa fa-usd"></i>)</th>
                              <th scope="col">TOTAL PRICE (<i class="fa fa-usd"></i>)</th>
                              {/* <th scope="col">Action</th> */}
                              {/* <th scope="col"><i className="fa fa-angle-down"></i></th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {item.jobposts.map((data, dataIndex) => {
                              if (userType === "influencer") {
                                if (data.influencer == userTypeId) {
                                  // this.setState({totalAmt: totalAmt + data.price})
                                  totalIAmt = totalIAmt + Number(data.price);
                                  totalPost = totalPost + Number(data.postcount)
                                  return (
                                    <tr>
                                      <td>{dataIndex + 1}</td>
                                      <td>{null != data.advertiser_display_name ? data.advertiser_display_name : 'UNKNOWN'}</td>
                                      <td>
                                        <div className="product-name text-primary text-capitalize">
                                          {data.platform}
                                        </div>
                                      </td>
                                      {/* <td></td> */}
                                      <td>{null != data.postcount ? data.postcount : 0}</td>
                                      <td>{null != data.price ? data.price / data.postcount : 0}</td>
                                      <td>{null != data.price ? data.price : 0}</td>
                                      {/* <td><i class="fa fa-trash-o" style={{ fontSize: 17 }}></i></td> */}
                                      {/* <td><i data-feather="more-vertical"></i></td> */}
                                    </tr>
                                  )
                                }
                              } else if (userType === "advertiser") {
                                totalPost = totalPost + Number(data.postcount)
                                return (
                                  <tr>
                                    <td>{dataIndex + 1}</td>
                                    <td>{null != data.influencer_display_name ? data.influencer_display_name : 'UNKNOWN'}</td>
                                    <td>
                                      <div className="product-name text-primary text-capitalize">
                                        {data.platform}
                                      </div>
                                    </td>
                                    {/* <td></td> */}
                                    <td>{null != data.postcount ? data.postcount : 0}</td>
                                    <td>{null != data.price ? data.price / data.postcount : 0}</td>
                                    <td>{null != data.price ? data.price : 0}</td>
                                    {/* <td><i class="fa fa-trash-o" style={{ fontSize: 17 }}></i></td> */}
                                    {/* <td><i data-feather="more-vertical"></i></td> */}
                                  </tr>
                                )
                              }
                            })}

                            <tr className="title-orders">
                              <td><text className="font-weight-bold">{null != userType ? userType === "influencer" ? "Pay Out (70%) : " : null : null}</text></td>
                              <td><text className="font-weight-bold">{null != userType ? userType === "influencer" ? <i class="fa fa-usd font-weight-bold">{null != totalIAmt ? Math.round(totalIAmt * (.7)) : null}</i> : null : null}</text></td>
                              {/* <td></td> */}
                              <td><text className="font-weight-bold">TOTAL : </text></td>
                              <td><text className="font-weight-bold">{totalPost}</text></td>
                              <td></td>
                              {userType === 'influencer' ?
                                <td><text className="font-weight-bold"><i class="fa fa-usd font-weight-bold">{null != totalIAmt ? totalIAmt : 0}</i></text></td> :
                                <td><text className="font-weight-bold"><i class="fa fa-usd font-weight-bold">{null != item.amount ? item.amount : 0}</i></text></td>
                              }
                              {/* <td></td> */}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                }) :
                  <div className="card-body border-top border-muted">
                    <div className="order-history table-responsive">
                      <table className="table table-bordernone">
                        <tbody>
                          <tr>
                            <td></td>
                            <td></td>
                            <td className="h3 text-center">Loading Transactions</td>
                            <td></td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div> :
                  <div className="card-body border-top border-muted">
                    <div className="order-history table-responsive">
                      <table className="table table-bordernone">
                        <tbody>
                          <tr>
                            <td></td>
                            <td></td>
                            <td className="h3 text-center">No Transaction</td>
                            <td></td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                }

              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default OrderHistory;