import React, { Fragment, useState, useEffect, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import axios from 'axios';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import { getSingleItem, addToCart } from '../../actions/ecommerce.actions';
import { Link } from 'react-router-dom';

class JobListCatagory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: localStorage.getItem('jwt'),
      userId: localStorage.getItem('userId'),
      jobData: [],
      platform: '',
      userType: localStorage.getItem('userType')
    }
  }

  componentDidMount() {
    const { value, userId, userType } = this.state;
    var iid = this.props.match.params.id;
    var pform = this.props.match.params.platform;
    this.setState({
      platform: pform
    })
    if (userType === 'advertiser') {
      axios({
        method: 'get',
        url: CMS_STRAPI_URL + '/postarticles?_sort=created_at:DESC&jobpostid=' + iid,
        headers: {
          Authorization:
            'Bearer ' + value,
        }
      }).then((response) => {
        if (null != response.data) {

          this.setState({
            jobData: response.data
          })

        }
      }, (error) => {
        console.log(error);
      });
    } else if (userType === 'influencer') {
      axios({
        method: 'get',
        url: CMS_STRAPI_URL + '/postarticles?_sort=created_at:DESC&jobpostid=' + iid,
        headers: {
          Authorization:
            'Bearer ' + value,
        }
      }).then((response) => {
        if (null != response.data) {
          this.setState({
            jobData: response.data
          })
        }
      }, (error) => {
        console.log(error);
      });
    }

  }

  handleJobDetail(id, platform, status) {
    if (this.state.userType === 'influencer' && status === 'precreate') { alert("Pending response from Advertiser."); } else {
      this.props.history.push(`/user/jobDetail/` + id + '/' + platform)
    }
  }

  render() {
    const { jobData, userType } = this.state;
    const total = 0;
    return (
      <Fragment>
        <Breadcrumb title="Please click on status" parent="Ecommerce" />
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

                        <tr>
                          <th scope="col">S. NO.</th>
                          <th scope="col">POST ID</th>
                          <th scope="col">STATUS</th>
                          {/* <th scope="col">Post article</th> */}
                          <th scope="col">POST URL</th>
                          <th scope="col">PLATFORM</th>
                          <th scope="col">LAST UPDATE</th>
                        </tr>
                      </thead>
                      <tbody>

                        {jobData.map((item, index) => {
                          return (
                            <tr className={"table-active"}>
                              <td>{index+1}</td>
                              {userType === 'advertiser' ?
                                <td>{null != item.id ? item.id : 'na'}</td> :
                                userType === 'influencer' ?
                                  <td>{null != item.id ? item.id : 'na'}</td> :
                                  null
                              }
                              <td><Link className="text-primary" onClick={() => this.handleJobDetail(item.id, this.state.platform, item.status)} >{null != item.status ? item.status === 'precreate' ? "Requirement Pending" : item.status === 'created' ? "Waiting for Response" : item.status === 'accepted' ? "Requirement Accepted" : item.status === 'rejected' ? "Requirement Rejected" : item.status === 'published' ? "Content Published" : 'na' : 'na'}</Link></td>
                              {/* <td>
                                <div className="product-name"><a href="#javascript">{null != item.article ? item.article : 'No Content'}</a>
                                </div>
                              </td> */}
                              <td>{null != item.publishedurl ? <a href={item.publishedurl} target="_blank"><u>URL</u></a>: 'No URL'}</td>

                              <td className="text-capitalize">{this.state.platform}</td>
                              <td>{item.updated_at.substring(0,10)}</td>
                            </tr>
                          )
                        })}
                        <tr className="title-orders">
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          {/* <td></td> */}
                          {/* <td></td> */}
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
  }
}

export default JobListCatagory;