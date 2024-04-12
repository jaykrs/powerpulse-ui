import React, { Fragment, useState, useEffect, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import axios from 'axios';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import { Link } from 'react-router-dom';
import Image from '../../assets/images/man.png';

// import { jobForm } from '.';

class InvoiceReq extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: localStorage.getItem('jwt'),
            userId: localStorage.getItem('userId'),
            dataList: [],
            userType: localStorage.getItem('userType'),
            data: '',
            worklogs: [],

        }
    }

    componentWillMount() {
        console.log(this.props.match.params.id)
        const userName = (JSON.parse(localStorage.getItem('userData')).username)
        let userType = localStorage.getItem('userType')
        if (userType === "customer") {
            axios({
                method: "GET",
                url: CMS_STRAPI_URL + "/api/worklogs?filters[projectid][$eq]=" + this.props.match.params.id,
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwt"),
                },
            })
                .then((response) => {
                    console.log(response.data.data[0].attributes.projectid, "invoicprojectid")
                    var List = JSON.stringify(response.data.data[0].attributes.projectid)
                    sessionStorage.setItem('PROJECTCREWId', List)
                    var List = JSON.stringify(response.data.data[0].attributes.efid)
                    sessionStorage.setItem('PROJECTCREWefid', List)
                    
                    if (response.data.data[0].attributes.status === 'created' && response.data.data[0].attributes.workcomplectionstatus === 100) {
                        this.props.history.push({ pathname: '/invoicereqscreen/' + response.data.data[0].attributes.projectid })
                    } else if (response.data.data[0].attributes.status === 'approved' && response.data.data[0].attributes.workcomplectionstatus === 100) {
                        this.props.history.push({ pathname: '/invoicelist/' + response.data.data[0].attributes.projectid })

                    } else {
                        alert('No Request Found')
                        this.props.history.push({ pathname: '/invoice' })

                    }
                    this.setState({
                        worklogs: response.data.data
                    })
                })
                .catch((error) => {
                    console.log(error);
                });
        }

    }

    handleEdit = (id) => {
        this.props.history.push({ pathname: '/invoicelist/' + id })


    }
    render() {
        const { worklogs } = this.state;
        return (
            <Fragment>
                <Breadcrumb title="Work Log List" />
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
                                                    <th scope="col"> Project Name</th>
                                                    <th scope="col">Customer Name</th>
                                                    <th scope="col">Engineering Firm Name</th>
                                                    {/* <th scope="col">City</th>
                                                    <th scope="col">State</th> */}
                                                    <th scope="col">View</th>
                                                </tr>
                                            </thead>
                                            {!!worklogs && worklogs.length > 0 && worklogs.map((item, index) => {
                                                return (
                                                    <tbody>
                                                        <tr className="border-bottom-secondary">
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{item.attributes.projectname}</td>
                                                            <td>{item.attributes.customername}</td>
                                                            <td>{item.attributes.engineeringfirmname}</td>
                                                            {/* <td>{item.attributes.city} </td>
                                                            <td>{item.attributes.state}</td> */}
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

export default InvoiceReq;