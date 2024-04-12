import React, { Fragment, useState, useEffect, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import axios from 'axios';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import { Link } from 'react-router-dom';

class JobPost extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: localStorage.getItem('jwt'),
      userId: localStorage.getItem('userId'),
      dataList: [],
      userType: localStorage.getItem('userType'),
      data: ''
    }
  }

  componentWillMount() {
    const { value, userId, userType } = this.state;
    // console.log(this.props.location.state.id, 'ioi')
    
    if (userType === 'advertiser') {
      axios({
        method: 'get',
        url: CMS_STRAPI_URL + '/jobposts?_sort=created_at:DESC&paymentind=true&advertiser.USER_ID=' + userId,
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
        url: CMS_STRAPI_URL + '/jobposts?_sort=created_at:DESC&paymentind=true&influencer.USER_ID=' + userId,
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
        <Breadcrumb title="All Active Posts" subTitle={userType === 'advertiser' ? "(Please click on Influencer Name)" : userType === 'influencer' ? "(Please click on Advertiser Name)" : "N/A"} parent="Ecommerce" />
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
                          <th scope="col">ORDER ID</th>
                          <th scope="col">{userType === 'advertiser' ? "INFLUENCER" : userType === 'influencer' ? "ADVERTISER" : "N/A"} </th>
                          <th scope="col">POST COUNT</th>
                          <th scope="col">PLATFORM</th>
                          <th scope="col">STATUS</th>
                          <th scope="col">PURCHASED</th>
                          {/* <th scope="col">Action</th> */}
                          {/* <th scope="col"><i className="fa fa-angle-down"></i></th> */}
                        </tr>
                      </thead>
                      <tbody>

                        {data != 'nodata' ? dataList.length > 0 ? dataList.map((item, index) => {
                          return (
                            <tr className={index % 2 == 0 ? "table-active" : "table-light"}>
                              <td>{null != item.id ? index + 1 : ''}</td>
                              <td>{null != item.id ? item.id : ''}</td>
                              {userType === 'advertiser' ?
                                <td><Link className="text-primary text-capitalize" onClick={(e) => this.handleJobList(e, item.id, item.platform)}>{null != item.influencer_display_name ? item.influencer_display_name : ''}</Link></td> :
                                userType === 'influencer' ?
                                  <td><Link className="text-primary text-capitalize" onClick={(e) => this.handleJobList(e, item.id, item.platform)}>{null != item.advertiser_display_name ? item.advertiser_display_name : ''}</Link></td> :
                                  null
                              }
                              <td>{null != item.postcount ? item.postcount : 0}</td>
                              <td>
                                <div className="product-name">
                                  <text className="text-primary text-capitalize">{item.platform}</text>
                                </div>
                              </td>
                              <td className={item.completionind ? "text-success" : "text-danger"}>{null != item.completionind ? item.completionind ? "Complete" : "Incomplete" : ''}</td>
                              <td>{item.created_at.substring(0, 10)}</td>

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
                            <td className="h3 text-center">Post not initiated by Advertiser!</td>
                            <td></td>
                            <td></td>
                          </tr>
                        }

                        {/* <tr className="title-orders" style={{ display: 'none' }}>
                          <td>TOTAL : </td>
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

export default JobPost;