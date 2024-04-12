import React, { Fragment, useState, useEffect, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import axios from 'axios';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import { Link } from 'react-router-dom';
import Image from '../../assets/images/man.png';

class Support extends Component {
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
        const userName = (JSON.parse(localStorage.getItem('userData')).username)
        // console.log(engineeringfirmid,'engineeringfirmid')
        var userType = localStorage.getItem('userType')
        if (userType === 'customer') {
            axios({
                method: "GET",
                url: CMS_STRAPI_URL + "/api/supports?filters[creator][$eq]=" + userName,
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwt"),
                },
            })
                .then((response) => {
                    console.log(response.data.data, 'customerid')
                    this.setState({
                        supports: response.data.data
                    })
                })
                .catch((error) => {
                    console.log(error);
                });

        } else if (userType === 'engineeringfirm') {
            axios({
                method: "GET",
                url: CMS_STRAPI_URL + "/api/supports?filters[creator][$eq]=" + userName,
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwt"),
                },
            })
                .then((response) => {
                    console.log(response.data.data, 'engineeringfirmid')
                    this.setState({
                        supports: response.data.data
                    })
                })
                .catch((error) => {
                    console.log(error);
                });

        } else if (userType === 'engineer') {
            axios({
                method: "GET",
                url: CMS_STRAPI_URL + "/api/supports?filters[creator][$contains]=" + userName,
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwt"),
                },
            })
                .then((response) => {
                    console.log(response.data.data, 'engineer')
                    this.setState({
                        supports: response.data.data
                    })
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    handleEdit = (item) => {
        axios({
            method: "GET",
            url: CMS_STRAPI_URL + "/api/supports?filters[projectid][$eq]=" + item.id,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
        })
            .then((response) => {
                if (response.data.data.length === 0) {
                    var List = JSON.stringify(item);
                    console.log(List)
                    sessionStorage.setItem('PROJECTLIST', List)
                    this.props.history.push({ pathname: '/supportlist/' + item.id })

                } else {
                    var List = JSON.stringify(item);
                    console.log(List)
                    sessionStorage.setItem('PROJECTLIST', List)
                    this.props.history.push({ pathname: '/supportlistpage/' + item.id })

                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleAdd = () => {
        this.props.history.push({ pathname: '/supportlist/add' })
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
                                            // <div class="mt-4 col-lg-6 col-sm-6">
                                            //     <div class="project-box" style={{ backgroundColor: '#fbfbfb', borderRadius: '5px', border: '1px solid #ebd61c', padding: '20px', position: 'relative' }}>
                                            //         <div style={{ display: 'flex', justifyContent: 'end', }}>
                                            //             <a className="btn btn-pill btn-primary" data-toggle="tooltip" title="btn btn-primary" role="button" onClick={() => { this.handleEdit(projects[index]) }}><i class="bi bi-arrow-right" ></i></a>

                                            //         </div>
                                            //         <h5 class="f-w-600">{item.attributes.name}</h5>
                                            //         <div class="d-flex align-items-center"><img class="img-20 me-1 rounded-circle"
                                            //             src={Image} alt="" />
                                            //             <div class="flex-grow-1">
                                            //                 <text>{item.attributes.customername}</text>
                                            //             </div>
                                            //         </div>
                                            //         <div class="details row mt-4">
                                            //             <div class="col-6"><span>City </span></div>
                                            //             <div class="text-primary col-6">{item.attributes.city}</div>
                                            //             <div class="col-6"> <span>Address</span></div>
                                            //             <div class="text-primary col-6">{item.attributes.address}</div>
                                            //             <div class="col-6"> <span>State</span></div>
                                            //             <div class="text-primary col-6">{item.attributes.state}</div>
                                            //         </div>
                                            //     </div>
                                            // </div>
                                              <tbody>
                                                <tr className="border-bottom-secondary">
                                                  <th scope="row">{index + 1}</th>
                                                  <td>{item.attributes.name}</td>
                                                  <td>{item.attributes.customername}</td>
                                                  <td>{item.attributes.address}</td>
                                                  <td>{item.attributes.city} </td>
                                                  <td>{item.attributes.state}</td>
                                                  <td>
                                                    <a className="btn btn-pill btn-primary" data-toggle="tooltip" title="btn btn-primary" role="button" onClick={() => { this.handleEdit(projects[index]) }}><i class="bi bi-arrow-right" ></i></a>
                    
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

export default Support;