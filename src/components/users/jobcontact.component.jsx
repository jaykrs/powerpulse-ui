import React, { Fragment, useState, useEffect, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import axios from 'axios';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import { Link } from 'react-router-dom';
import Image from '../../assets/images/man.png';
// import { jobForm } from '.';

class jobCotact extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: localStorage.getItem('jwt'),
      userId: localStorage.getItem('userId'),
      dataList: [],
      userType: localStorage.getItem('userType'),
      data: '',
      contacts: [],
    }
  }

  componentWillMount() {
    const participant = (JSON.parse(localStorage.getItem('userData')).username)
    axios({
      method: "GET",
      url: CMS_STRAPI_URL + "/api/connects?filters[participant][$eq]=" + participant,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => {
        console.log(response.data.data, 'adadsrgconnects')
        this.setState({
          contacts: response.data.data
        })
      })
      .catch((error) => {
        console.log(error);
      });


  }
  handleEdit = (id) => {
    this.props.history.push({ pathname: '/user/jobcontactform/' + id })
  }

  handleAdd = () => {
    this.props.history.push({ pathname: '/user/jobcontactform/add' })
  }
  render() {
    const { contacts } = this.state;
    return (
      <Fragment>
        <Breadcrumb title="Connects" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              {/* <div className="card"> */}
                {/* <div className="card-header">
                  <h5>All Posts</h5>
                </div> */}
                <div className="card-footer">
                  <button className="btn btn-primary mr-1" onClick={() => { this.handleAdd() }}>Add</button>
                </div>              

                {!!contacts && contacts.length > 0 && contacts.map((item, index) => {
                  return (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <div class="mt-4 col-lg-12 col-sm-6">
                        <div class="project-box" style={{ backgroundColor: '#fbfbfb', borderRadius: '5px', border: '1px solid #ebd61c', padding: '20px', position: 'relative' }}>
                          <div style={{ display: 'flex', justifyContent: 'end', }}>
                            {/* <text class="badge badge-primary">Doing</text> */}
                            <button class="btn btn-primary active" onClick={()=>{this.handleEdit(item.id)}}>View</button>
                          </div>
                          <h5 class="f-w-600">{item.attributes.participant}</h5>
                          <div class="d-flex align-items-center"><img class="img-20 me-1 rounded-circle"
                            src={Image} alt="" />
                            <div class="flex-grow-1">
                              <text>{item.attributes.attachments}</text>
                            </div>
                          </div>
                          {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p> */}
                          <div class="details row mt-4">
                            <div class="col-6"><span>Meeting Link</span></div>
                            <div class="text-primary col-6">{item.attributes.meetinglink}</div>
                            {/* <div class="col-6"> <span>Meeting Password</span></div>
                            <div class="text-primary col-6">{item.attributes.meetingpwd}</div>
                            <div class="col-6"> <span>Meeting Notes</span></div>
                            <div class="text-primary col-6">{item.attributes.meetingnotes}</div> */}
                          </div>
                          {/* <div class="customers">
                            <ul>
                              <li class="d-inline-block"><img class="img-30 rounded-circle"
                                src={Image} alt="" /></li>
                              <li class="d-inline-block"><img class="img-30 rounded-circle"
                                src={Image} alt="" /></li>
                              <li class="d-inline-block"><img class="img-30 rounded-circle"
                                src={Image} alt="" /></li>
                              <li class="d-inline-block ms-2">
                                <p class="f-12">+10 More</p>
                              </li>
                            </ul>
                          </div> */}
                        
                        </div>
                      </div>
                    </div>

                  )
                })}
              {/* </div> */}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default jobCotact;