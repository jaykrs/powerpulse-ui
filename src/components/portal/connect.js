import React, { Fragment, useState, useEffect, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import axios from 'axios';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import { Link } from 'react-router-dom';
import Image from '../../assets/images/man.png';

class Connect extends Component {
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
    const username = (JSON.parse(localStorage.getItem('userData')).username)
    axios({
      method: "GET",
      url: CMS_STRAPI_URL + "/api/connects",
      //?filters[projectid][$eq]=" + username
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
    this.props.history.push({ pathname: '/connectDetails/' + id })
  }

  handleAdd = () => {
    this.props.history.push({ pathname: '/connectprojectlist' })
  }
  render() {
    const { contacts } = this.state;
    return (
      <Fragment>
        <div className="container-fluid">

          <div className="row">
            <div className="col-sm-12">

              <div className='w-100 d-flex flex-row justify-content-between m-10'>
                <Breadcrumb title="Connects" />
                <div className='m-t-30 m-r-30'>
                  <button className="btn btn-primary mr-1" onClick={() => { this.handleAdd() }}>Add</button>
                </div>
              </div>
              <div class="">
                <div className="row">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr className="border-bottom-primary">
                          <th scope="col" >#</th>
                          <th scope="col"> Participant</th>
                          <th scope="col">Subject</th>
                          <th scope="col">Start Link</th>
                          <th scope='col'>Meeting Password</th>
                          <th scope="col">View</th>
                        </tr>
                      </thead>
                      {!!contacts && contacts.length > 0 && contacts.map((item, index) => {
                        return (
                          <tbody>
                            <tr className="border-bottom-secondary">
                              <th scope="row">{index + 1}</th>
                              <td>{item.attributes.participant}</td>
                              <td>{item.attributes.meetingnotes}</td>
                              <td><a target='blank'>{item.attributes.meetingstartlink}</a> </td>
                              <td>{item.attributes.meetingpwd}</td>
                              <td>
                                <a className="btn btn-pill btn-primary" data-toggle="tooltip" title="btn btn-primary" role="button" onClick={() => { this.handleEdit(item.id) }}><i class="bi bi-arrow-right" ></i></a>

                              </td>
                            </tr>
                          </tbody>
                        )
                      })}
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

export default Connect;

// {!!contacts && contacts.length > 0 && contacts.map((item, index) => {
//   return (
//     <div class="mt-4 col-lg-6 col-sm-6">
//       <div class="project-box" style={{ backgroundColor: '#fbfbfb', borderRadius: '5px', border: '1px solid #ebd61c', padding: '20px', position: 'relative' }}>
//         <div style={{ display: 'flex', justifyContent: 'end', }}>
//           <button class="btn btn-primary active" onClick={() => { this.handleEdit(item.id) }}>View</button>
//         </div>
//         <h5 class="f-w-600">{item.attributes.participant}</h5>
//         <div class="d-flex align-items-center"><img class="img-20 me-1 rounded-circle"
//           src={Image} alt="" />
//           <div class="flex-grow-1">
//             <text>{item.attributes.attachments}</text>
//           </div>
//         </div>
//         <div class="details row mt-4">
//           <div class="col-6"><span>Meeting Link</span></div>
//           <div class="text-primary col-6"><a href={item.attributes.meetinglink} target="_blank">{item.attributes.meetinglink}</a></div>
//         </div>
//       </div>
//     </div>

//   )
// })}