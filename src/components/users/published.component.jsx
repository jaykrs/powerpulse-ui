import React, { Fragment, useState, useEffect, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import axios from 'axios';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import { Link } from 'react-router-dom';

class Published extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: localStorage.getItem('jwt'),
      userId: localStorage.getItem('userId'),
      dataList: [],
      data: '',
      userType: localStorage.getItem('userType'),
      userTypeId: localStorage.getItem('userTypeId')
    }
  }

  componentDidMount() {
    const { value, userId, userType, userTypeId } = this.state;
    if (userType === 'advertiser') {
      axios({
        method: 'get',
        url: CMS_STRAPI_URL + '/postarticles?advertiser_id=' + userTypeId + '&status=published&_sort=created_at:DESC',
        headers: {
          Authorization:
            'Bearer ' + value,
        }
      }).then((response) => {
        if (null != response.data && response.data.length > 0) {
          var datasize = response.data.length - 1;
          this.setState({
            dataList: response.data
          })
          console.log('data', response.data)
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
        url: CMS_STRAPI_URL + '/postarticles?influencer_id=' + userTypeId + '&status=published&_sort=created_at:DESC',
        headers: {
          Authorization:
            'Bearer ' + value,
        }
      }).then((response) => {
        if (null != response.data && response.data.length > 0) {
          var datasize = response.data.length - 1;
          this.setState({
            dataList: response.data
          })
          console.log('data', response.data)
        } else {
          this.setState({
            data: 'nodata',
          })
        }
      }, (error) => {
        console.log(error);
      });
    }

  }

  handleJobDetail() {
    this.props.history.push(`/user/jobDetail`)
  }

  handleJobList(e, id, platform) {
    this.props.history.push(`/user/jobListCatagory/` + id + '/' + platform)
  }

  render() {
    const { dataList, userType, data } = this.state;
    const total = 0;
    return (
      <Fragment>
        <Breadcrumb title="Published Posts" parent="Ecommerce" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>All Posts</h5>
                </div>
                <div className="card-body">
                  <div className="order-history table-responsive">
                    <table className="table table-bordernone">
                      <thead>
                        {/* <tr className="title-orders">
                          <td>New Post</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr> */}
                        <tr>
                          <th scope="col">S. NO.</th>
                          <th scope="col">POST ID</th>
                          <th scope="col">{userType === 'advertiser' ? "INFLUENCER" : userType === 'influencer' ? "ADVERTISER" : "N/A"}</th>
                          <th scope="col">PLATFORM</th>
                          <th scope="col">PUBLISHED</th>
                          <th scope="col">POST URL</th>
                          {/* <th scope="col">Action</th> */}
                          {/* <th scope="col"><i className="fa fa-angle-down"></i></th> */}
                        </tr>
                      </thead>
                      <tbody>

                        {/* <tr className="title-orders">
                          <td>Payment Status:- {dataList.paymentstatus ? 'True' : 'False'}</td>
                          <td></td>
                          <td>Payment Date:- {dataList.paymentdate}</td>
                          <td></td>
                          <td></td>
                          <td>Transaction Id:- {dataList.orderid}</td>
                          <td></td>
                        </tr> */}

                        {data != 'nodata' ? dataList.length > 0 ? dataList.map((item, index) => {
                          return (
                            <tr className={index % 2 == 0 ? "table-active" : "table-light"}>
                              <td>{null != item.id ? index + 1 : ''}</td>
                              <td>{null != item.id ? item.id : ''}</td>
                              {userType === 'advertiser' ?
                                <td>{null != item.influencer_display_name ? item.influencer_display_name : ''}</td> :
                                userType === 'influencer' ?
                                  <td>{null != item.advertiser_display_name ? item.advertiser_display_name : ''}</td> :
                                  null
                              }
                              <td className="text-primary text-capitalize">{null != item.platform ? item.platform : ''}</td>
                              <td>{item.updated_at.substring(0, 10)}</td>
                              <td>{null != item.publishedurl ? <a href={item.publishedurl} target="_blank"><u>URL</u></a> : ""}</td>

                              {/* <td><i class="fa fa-trash-o" style={{ fontSize: 17 }}></i></td> */}
                              {/* <td><i data-feather="more-vertical"></i></td> */}
                            </tr>
                          )
                        }) :
                        <tr>
                            <td></td>
                            <td></td>
                            {/* <td></td> */}
                            <td className="h3 text-center">Loading Posts</td>
                            <td></td>
                            <td></td>
                          </tr> :

                          <tr>
                          <td></td>
                          <td></td>
                          {/* <td></td> */}
                          <td className="h3 text-center">No published post!</td>
                          <td></td>
                          <td></td>
                        </tr>
                        }

                        {/* <tr className="title-orders" style={{ display: 'none' }}>
                          <td>TOTAL:-</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td><i class="fa fa-inr" style={{ fontSize: 17 }}>{null != dataList.amount ? dataList.amount : 0}</i></td>
                          <td></td>
                          <td></td>
                        </tr> */}
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
  }
}

export default Published;