import React, { Fragment, useState, useEffect, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import axios from 'axios';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import { getSingleItem, addToCart } from '../../actions/ecommerce.actions';
import { ToastContainer, toast } from 'react-toastify';
import validUrl from "valid-url";

class WorkLog extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: localStorage.getItem('jwt'),
      userId: localStorage.getItem('userId'),
      userDisplayName: localStorage.getItem('userName'),
      dataList: [],
      platform: '',
      articlePost: '',
      articleStatus: '',
      articleOldPost: '',
      postUrl: '',
      advertiserId: '',
      influencerId: '',
      jobPostId: '',
      userType: localStorage.getItem('userType'),
      userTypeId: localStorage.getItem('userTypeId'),
      date: new Date().getDate() + '-' + (Number(new Date().getMonth()) + 1) + '-' + new Date().getFullYear(),
      totalEarning: '',
      totalPost: '',
      articlePrice: '',
      jobPost_data: []
    }

    this.handlePostCompletion = this.handlePostCompletion.bind(this);

  }

  componentDidMount() {
    const { value, userId, userType, date } = this.state;
    var iid = this.props.match.params.id;
    // alert(date)
    this.setState({
      platform: this.props.match.params.platform
    })
    if (userType === 'advertiser') {
      axios({
        method: 'get',
        url: CMS_STRAPI_URL + '/postarticles/' + iid,
        headers: {
          Authorization:
            'Bearer ' + value,
        }
      }).then((response) => {
        if (null != response.data) {
          this.setState({
            dataList: response.data,
            articleOldPost: response.data.article,
            advertiserId: response.data.advertiser_id,
            influencerId: response.data.influencer_id,
            articleStatus: response.data.status
          })
          console.log('data', response.data)
        }
      }, (error) => {
        console.log(error);
      });
    } else if (userType === 'influencer') {

      axios({
        method: 'get',
        url: CMS_STRAPI_URL + '/postarticles/' + iid,
        headers: {
          Authorization:
            'Bearer ' + value,
        }
      }).then((response) => {
        if (null != response.data) {
          this.setState({
            dataList: response.data,
            articleOldPost: response.data.article,
            advertiserId: response.data.advertiser_id,
            influencerId: response.data.influencer_id,
            articleStatus: response.data.status,
            articlePrice: response.data.price,
            jobPostId: response.data.jobpostid
          })
          console.log('data', response.data.price + '' + this.state.userTypeId)
        }
      }, (error) => {
        console.log(error);
      });

      axios({
        method: 'get',
        url: CMS_STRAPI_URL + '/influencers?_limit=1&USER_ID=' + userId,
        headers: {
          Authorization:
            'Bearer ' + value,
        }
      }).then((response) => {
        if (null != response.data && response.data.length > 0) {
          var datasize = response.data.length - 1;
          this.setState({
            totalEarning: response.data[datasize].TOTAL_EARNINGS,
            totalPost: response.data[datasize].SERVED_POST
          })
          console.log('influencer data', response.data[datasize].SERVED_POST)
        }
      }, (error) => {
        console.log(error);
      });
    }

  }

  async handleArticlePost(articleId, action) {
    const { userType, userId, date, platform, userTypeId, totalEarning, articlePrice, totalPost, value, articlePost, articleStatus, userDisplayName, articleOldPost, postUrl, advertiserId, influencerId } = this.state;
    var article = '';
    var notificationTxt = '';
    if (action === 'accepted' || action === "rejected") {
      article = articleOldPost + "<b>" + userDisplayName + "</b> " + " ( " + date + " ) : '" + action + "'<br/><hr/>";
      notificationTxt = userDisplayName + " ( " + date + " ) : " + action;
    }
    else if (action === 'published' && userType === "influencer") {
      if (postUrl.length < 5 || !validUrl.isUri(postUrl)) {
        alert("Either post url is incorrect or invalid");
        return;
      } else {
        article = articleOldPost + "<b>" + userDisplayName + "</b>" + " ( " + date + " ) : '" + action + "'<br/><hr/>";
        notificationTxt = userDisplayName + " ( " + date + " ) : '" + action + "' with url " + postUrl;
        if (null != articlePost && articlePost.length > 0) { article = article + "<b>" + userDisplayName + "</b>" + " ( " + date + " ) : '" + articlePost + '<br/><hr/>'; }
      }
    }
    else if (userType === "advertiser" && articleStatus === 'precreate') {
      article = "<b>" + userDisplayName + "</b>" + " (" + date + ") '" + articlePost + "'<br/><hr/>";
      notificationTxt = userDisplayName + " ( " + date + " ) : '" + articlePost;
    }
    else {
      article = null != articleOldPost ? articleOldPost.length > 0 ? articleOldPost + "<b>" + userDisplayName + "</b>" + " ( " + date + " ) : '" + articlePost + "'<br/><hr/>" : "<b>" + userDisplayName + "</b>" + " ( " + date + " ) : '" + articlePost + "'<br/><hr/>" : "<b>" + userDisplayName + "</b>" + " ( " + date + " ) : '" + articlePost + "'<br/><hr/>";
      notificationTxt = userDisplayName + " ( " + date + " ) : '" + articlePost;
    }

    if (action === 'saveDraft' && userType === 'advertiser' && articleStatus === 'precreate') {

      await axios({
        method: 'put',
        url: CMS_STRAPI_URL + '/postarticles/' + articleId,
        headers: {
          Authorization:
            'Bearer ' + value,
        },
        data: {
          article: article,
          last_updated_by: userId
        }
      }).then((response) => {
        setTimeout(() => {
          toast.success("Your draft saved Successfully");
        }, 200);
        //    window.location.reload(true);
      })

    }

    if (action === 'create' && userType === 'advertiser' && articleStatus === 'precreate') {
      await axios({
        method: 'put',
        url: CMS_STRAPI_URL + '/postarticles/' + articleId,
        headers: {
          Authorization:
            'Bearer ' + value,
        },
        data: {
          article: article,
          status: 'created',
          last_updated_by: userId
        }
      }).then((response) => {
        this.callNotification(userDisplayName, advertiserId, influencerId, notificationTxt, articleId, value);
        setTimeout(() => {
          toast.success("Your post sent Successfully to Influencer");
        }, 200);
        //    window.location.reload(true);
      })

    }

    if ((action === 'accepted' || action === 'rejected') && userType === 'influencer' && articleStatus === 'created') {
      await axios({
        method: 'put',
        url: CMS_STRAPI_URL + '/postarticles/' + articleId,
        headers: {
          Authorization:
            'Bearer ' + value,
        },
        data: {
          article: article,
          status: action,
          last_updated_by: userId
        }
      }).then((response) => {
        setTimeout(() => {
          toast.success("Your post status updated Successfully");
        }, 200);
        if (action === 'rejected') {
          var currentjobpostid = response.data.jobpostid;
          localStorage.setItem("currentjobpostid", currentjobpostid);
        }
        //    window.location.reload(true);
      })

    }

    if (action === 'published' && userType === 'influencer' && articleStatus === 'accepted' && postUrl.length > 0) {
      await axios({
        method: 'put',
        url: CMS_STRAPI_URL + '/postarticles/' + articleId,
        headers: {
          Authorization:
            'Bearer ' + value,
        },
        data: {
          article: article,
          status: action,
          publishedurl: postUrl,
          last_updated_by: userId,
          platform: platform
        }
      }).then((response) => {
        var currentjobpostid = response.data.jobpostid;
        localStorage.setItem("currentjobpostid", currentjobpostid);
        axios({
          method: 'put',
          url: CMS_STRAPI_URL + '/influencers/' + userTypeId,
          headers: {
            Authorization:
              'Bearer ' + value,
          },
          data: {
            SERVED_POST: null == totalPost ? 1 : Number(totalPost) + 1,
            TOTAL_EARNINGS: null == totalEarning ? Number(articlePrice) : Number(totalEarning) + Number(articlePrice)
          }
        }).then((response) => {

          //       this.handlePostCompletion(currentjobpostid);


          setTimeout(() => {
            toast.success("Your Post published Successfully");
          }, 100);

        })
      })

    }

    if (action === 'review' && articleStatus === 'accepted' && (userType === 'influencer' || userType === 'advertiser')) {

      await axios({
        method: 'put',
        url: CMS_STRAPI_URL + '/postarticles/' + articleId,
        headers: {
          Authorization:
            'Bearer ' + value,
        },
        data: {
          article: article,
          last_updated_by: userId
        }
      }).then((response) => {
        setTimeout(() => {
          toast.success("Your Post submitted Successfully for review");
        }, 200);

      })

    }
    if (articleStatus !== 'precreate') {
      this.callNotification(userDisplayName, advertiserId, influencerId, notificationTxt, articleId, value);
    }
    this.handlePostCompletion();
    //  window.location.reload(true);
  }

  async callNotification(name, advertiserId, influencerId, notificationTxt, articleId, token) {
    await axios({
      method: 'post',
      url: CMS_STRAPI_URL + '/notifications',
      headers: {
        Authorization:
          'Bearer ' + token,
      },
      data: {
        advertiser_id: advertiserId,
        influencer_id: influencerId,
        jobpost_id: articleId,
        article: notificationTxt,
        read_status: false,
        name: name
      }
    }).then((response) => {
    })
  }

  handlePostCompletion() {
    if (null != localStorage.getItem("currentjobpostid") && localStorage.getItem("currentjobpostid") !== '' && localStorage.getItem("currentjobpostid") !== undefined) {
      var _jobPostId = localStorage.getItem("currentjobpostid");
      const { value } = this.state;
      axios({
        method: 'get',
        url: CMS_STRAPI_URL + '/postarticles?jobpostid=' + _jobPostId + '&_where[0][status_ne]=published&_where[1][status_ne]=rejected',
        headers: {
          Authorization:
            'Bearer ' + value,
        },
      }).then((response) => {
        if (response.data.length <= 0) {
          axios({
            method: 'put',
            url: CMS_STRAPI_URL + '/jobposts/' + _jobPostId,
            headers: {
              Authorization:
                'Bearer ' + value,
            },
            data: {
              completionind: true,
            }
          }).then((response) => {
            localStorage.removeItem('currentjobpostid');
            console.log(response);
            window.location.reload(true);
          })
        } else { window.location.reload(true); }
      }, (error) => {
        console.log(error);
        window.location.reload(true);
      })
    } else {
      window.location.reload(true);
    }
  }
  render() {
    const { dataList, userType, articlePost, postUrl } = this.state;
    return (
      <Fragment>
        <Breadcrumb title="Post Related Communication" parent="Ecommerce" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Communication Exchange</h5>
                </div>
                <div className="card-body">
                  <div className="order-history table-responsive">
                    <table className="table table-bordernone">
                      <thead>
                        <tr style={{ backgroundColor: '#809EF3' }}>
                          <td style={{ fontSize: 12, color: "#fff" }}>{userType === "advertiser" ? "Influencer" : userType === "influencer" ? "Advertiser" : "N/A"}: {this.state.dataList.influencer_display_name}</td>
                          <td></td>
                          <td></td>
                          <td className="text-capitalize" style={{ fontSize: 12, color: "#fff" }}>Platform:  {this.state.platform}</td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr style={{ backgroundColor: '#809EF3' }}>
                          <td style={{ fontSize: 12, color: "#fff" }}>Order No.:  {dataList.id}</td>
                          <td></td>
                          <td></td>
                          <td style={{ fontSize: 12, color: "#fff" }}>Created On:  {null != dataList.created_at ? dataList.created_at.substring(0, 10) : null}</td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr style={{ backgroundColor: '#809EF3' }}>
                          <td style={{ fontSize: 12, color: "#fff" }}>Status:  {dataList.status === 'precreate' ? "Requirement Pending" : dataList.status === 'created' ? "Waiting for Response" : dataList.status === 'accepted' ? "Requirement Accepted" : dataList.status === 'rejected' ? "Requirement Rejected" : dataList.status === 'published' ? "Content Published" : 'N/A'}</td>
                          <td></td>
                          <td></td>
                          <td style={{ fontSize: 12, color: "#fff" }}>Updated On:  {null != dataList.updated_at ? dataList.updated_at.substring(0, 10) : null}</td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      </thead>
                    </table>
                    <div className='container-fluid mt-3 border p-2' style={{ overflow: 'hidden' }}>
                      <div className="row">
                        <div id="articlePost" className='col-md-12 mb-5'>
                          <div dangerouslySetInnerHTML={{ __html: dataList.article }} />
                        </div>
                      </div>
                      <div className="row">
                        <div className='col-md-6'>

                          {(dataList.status === 'created' || dataList.status === 'published' || dataList.status === 'rejected') && (userType === 'influencer' || userType === 'advertiser') ?
                            null :
                            <textarea className="col-md-12" rows="8" placeholder={userType === 'advertiser' ? "Please write your message for the Influencer" : "Please write your message for the Advertiser"} onChange={e => this.setState({ articlePost: e.target.value })} />
                          }
                        </div>
                        <div className='col-md-3'>
                          {dataList.status === 'precreate' && userType === 'advertiser' ?
                            <div><button onClick={() => this.handleArticlePost(dataList.id, "saveDraft")} className="mt-5 btn btn-primary mr-2">Save Draft</button>
                              <button onClick={() => this.handleArticlePost(dataList.id, "create")} className="mt-5 btn btn-primary mr-2">Send Requirement</button>
                            </div> : null}
                          {dataList.status === 'created' && userType === 'influencer' ?
                            <div><button onClick={() => this.handleArticlePost(dataList.id, "accepted")} className="mt-5 btn btn-primary mr-2">Accept</button>
                              <button onClick={() => this.handleArticlePost(dataList.id, "rejected")} className="mt-5 btn btn-primary">Reject</button> </div>
                            : null
                          }

                          {dataList.status === 'accepted' && userType === 'influencer' ?
                            <div className="d-flex align-items-end h-100 pb-2">
                              <button onClick={() => this.handleArticlePost(dataList.id, "review")} className="btn btn-primary mr-2">Submit Post Content</button>
                            </div> : null
                          }

                          {dataList.status === 'accepted' && userType === 'advertiser' ?
                            <div><button onClick={() => this.handleArticlePost(dataList.id, "review")} className="mt-5 btn btn-primary mr-2">Review or Approve Content</button>
                            </div> : null
                          }


                        </div>
                      </div>
                    </div>
                    {dataList.status === 'accepted' && userType === 'influencer' ?
                      <div className='container-fluid mt-3 border' style={{ overflow: 'hidden' }}>
                        <div className="row">
                          <div className="col-md-6 pt-3">
                            <text>Publish URL</text>
                          </div>
                        </div>
                        <div className="row ">
                          <div className="col-md-6 pt-3 pb-3">
                            <input type="text" placeholder="Please copy paste post URL here" onChange={e => this.setState({ postUrl: e.target.value })} className="form-control col-md-12 border border-dark pt-1 pb-1" />
                          </div>
                          <div className="col-md-6 pb-3 pt-3">
                            <button onClick={() => this.handleArticlePost(dataList.id, "published")} className="col-md-3 btn btn-primary mr-2">Submit</button>
                          </div>
                        </div>
                      </div> : null
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment >
    );
  }
}

export default WorkLog;