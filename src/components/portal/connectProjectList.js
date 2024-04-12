import React, { Fragment, useState, useEffect, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import axios from 'axios';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import { Link } from 'react-router-dom';
import Image from '../../assets/images/man.png';

// import { jobForm } from '.';

class connectProjectList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: localStorage.getItem('jwt'),
      userId: localStorage.getItem('userId'),
      dataList: [],
      userType: localStorage.getItem('userType'),
      data: '',
      projects: [],

    }
  }

  componentWillMount() {
    const userName = (JSON.parse(localStorage.getItem('userData')).username)
    // console.log(engineeringfirmid,'engineeringfirmid')
    var userType = localStorage.getItem('userType')
    if (userType === 'customer') {
      axios({
        method: "GET",
        url: CMS_STRAPI_URL + "/api/projects?filters[customerid][$eq]=" + userName,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((response) => {
          console.log(response.data.data, 'customerid')
          this.setState({
            projects: response.data.data
          })
        })
        .catch((error) => {
          console.log(error);
        });

    } else if (userType === 'engineeringfirm') {
      axios({
        method: "GET",
        url: CMS_STRAPI_URL + "/api/projects?filters[engineeringfirmid][$eq]=" + userName,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((response) => {
          console.log(response.data.data, 'engineeringfirmid')
          this.setState({
            projects: response.data.data
          })
        })
        .catch((error) => {
          console.log(error);
        });

    } else if (userType === 'engineer') {
      axios({
        method: "GET",
        url: CMS_STRAPI_URL + "/api/projects?filters[engineerids][$contains]=" + userName,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((response) => {
          console.log(response.data.data, 'engineer')
          this.setState({
            projects: response.data.data
          })
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  handleAdd = () => {
    this.props.history.push({ pathname: '/home' })
  }

  handleEdit = (id) => {
    this.props.history.push({ pathname: '/connectlist/' + id })
  }

  render() {
    const { projects, userType } = this.state;
    return (
      <Fragment>
        <Breadcrumb title="Project List" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div class="container">
                <div className="row">
               
                      <div className="table-responsive">
                        <table className="table">
                          <thead>
                            <tr className="border-bottom-primary">
                              <th scope="col">#</th>
                              <th scope="col"> Name</th>
                              <th scope="col">Customer Name</th>
                              <th scope="col">Address</th>
                              <th scope="col">City</th>
                              <th scope="col">State</th>
                              <th scope="col">View</th>
                            </tr>
                          </thead>
                          {!!projects && projects.length > 0 && projects.map((item, index) => {
                    return (
                          <tbody>
                            <tr className="border-bottom-secondary">
                              <th scope="row">{index + 1}</th>
                              <td>{item.attributes.name}</td>
                              <td>{item.attributes.customername}</td>
                              <td>{item.attributes.address}</td>
                              <td>{item.attributes.city} </td>
                              <td>{item.attributes.state}</td>
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

export default connectProjectList;