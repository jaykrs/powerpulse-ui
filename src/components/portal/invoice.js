import React, { Fragment, useState, useEffect, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import axios from 'axios';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import { Link } from 'react-router-dom';
import Image from '../../assets/images/man.png';

// import { jobForm } from '.';

class Invoice extends Component {
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
    let userType = localStorage.getItem('userType')
    if (userType === "engineeringfirm") {
      axios({
        method: "GET",
        url: CMS_STRAPI_URL + "/api/projects?filters[engineeringfirmid][$eq]=" + userName,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((response) => {
          console.log(response.data.data, "invoicPro")
          this.setState({
            projects: response.data.data
          })
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (userType === "customer") {
      axios({
        method: "GET",
        url: CMS_STRAPI_URL + "/api/projects?filters[customerid][$eq]=" + userName,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((response) => {
          console.log(response.data.data, "invoic")
          this.setState({
            projects: response.data.data
          })
        })
        .catch((error) => {
          console.log(error);
        });
    }



  }

  handleEdit = (id) => {
    this.props.history.push({ pathname: '/invoicereq/' + id })
  }

  handleEfName=(id)=>{
    this.props.history.push({ pathname: '/invoicelist/' + id })

  }
  render() {
    const { projects,userType } = this.state;
    return (
      <Fragment>
        <Breadcrumb title="Invoice List" />
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
                              {userType === "engineeringfirm" && (
                                <td>
                                <a className="btn btn-pill btn-primary" data-toggle="tooltip" title="btn btn-primary" role="button" onClick={() => { this.handleEfName(item.id) }}><i class="bi bi-arrow-right" ></i></a>

                              </td>
                              )}
                               {userType === "customer" && (
                                <td>
                                <a className="btn btn-pill btn-primary" data-toggle="tooltip" title="btn btn-primary" role="button" onClick={() => { this.handleEdit(item.id) }}><i class="bi bi-arrow-right" ></i></a>

                              </td>
                              )}
                              
                            </tr>
                          </tbody>
                        )
                      })}
                    </table>
                  </div>
                  {/* {!!projects && projects.length > 0 && projects.map((item, index) => {
                    return (
                        <div class="mt-4 col-lg-6 col-sm-6">
                          <div class="project-box" style={{ backgroundColor: '#fbfbfb', borderRadius: '5px', border: '1px solid #ebd61c', padding: '20px', position: 'relative' }}>
                            <div style={{ display: 'flex', justifyContent: 'end', }}>
                              <a className="btn btn-pill btn-primary" data-toggle="tooltip" title="btn btn-primary" role="button" onClick={() => { this.handleEdit(item.id) }}><i class="bi bi-arrow-right" ></i></a>

                            </div>
                            <h5 class="f-w-600">{item.attributes.projectname}</h5>
                            <div class="details row mt-4">
                              <div class="col-6"><span>Amount</span></div>
                              <div class="text-primary col-6">{item.attributes.amount}</div>
                              <div class="col-6"> <span>Bill To Address</span></div>
                              <div class="text-primary col-6">{item.attributes.billtoaddress}</div>
                              <div class="col-6"> <span>Subject</span></div>
                              <div class="text-primary col-6">{item.attributes.subject}</div>
                            </div>

                          </div>
                        </div>

                    )
                  })} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Invoice;