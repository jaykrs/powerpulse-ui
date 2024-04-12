import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { toast } from "react-toastify";

import Image from '../../assets/images/man.png';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import Breadcrumb from '../common/breadcrumb';
// import { jobForm } from '.';

class CrewEngineer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: localStorage.getItem('jwt'),
            userId: localStorage.getItem('userId'),
            dataList: [],
            userType: localStorage.getItem('userType'),
            data: '',
            projectcrews: [],

        }
    }

    componentWillMount() {
        const userName = (JSON.parse(localStorage.getItem('userData')).username)
        var userType = localStorage.getItem('userType')
        const filterParameter1 = '?filters[engineerid][\$eq]=';
        const filterParameter2 = '&filters[isactive][\$eq]=false';
        const filterParameter3 = '&filters[engineeracceptance][\$eq]=created';
        if (userType === 'engineer') {
            axios({
                method: "GET",
                url: CMS_STRAPI_URL + "/api/projectcrews" + filterParameter1 + userName + filterParameter2 + filterParameter3,
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwt"),
                },
            })
                .then(response => {
                    console.log(response.data.data, 'Anand')
                    if (response.data.data.length === 0) {
                        this.props.history.push({ pathname: '/crew' })
                    } else {
                        this.props.history.push({ pathname: '/crewEngineer' })
                    }
                    this.setState({
                        projectcrews: response.data.data
                    })
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    handleEdit = (id) => {
        this.props.history.push({ pathname: '/crewEngineerlist/' + id })
    }

    render() {
        const { projectcrews } = this.state;
        return (
            <Fragment>
                <Breadcrumb title="Job Request" />
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
                                                    <th scope="col">Project Name</th>
                                                    <th scope="col">Customer Name</th>
                                                    <th scope="col">Customer Id</th>
                                                    {/* <th scope="col">Project Name</th> */}
                                                    <th scope="col">Engineering Firm Id</th>
                                                    <th scope="col">Engineering Firm Name</th>
                                                    <th scope="col">View</th>
                                                </tr>
                                            </thead>
                                            {!!projectcrews && projectcrews.length > 0 && projectcrews.map((item, index) => {
                                                return (
                                                    <tbody>
                                                        <tr className="border-bottom-secondary">
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{item.attributes.projectname}</td>
                                                            <td>{item.attributes.customername}</td>
                                                            <td>{item.attributes.customerid}</td>
                                                            <td>{item.attributes.efid} </td>
                                                            <td>{item.attributes.efname}</td>
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

export default CrewEngineer;