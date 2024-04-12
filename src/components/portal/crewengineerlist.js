import React, { Fragment, useState, useEffect, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import axios from 'axios';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

class CrewEngineerList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: localStorage.getItem('jwt'),
            userId: localStorage.getItem('userId'),
            dataList: [],
            userType: localStorage.getItem('userType'),
            data: '',
            isEdit: true

        }
    }

    componentDidMount(id) {
       
        // console.log(projectid,'pro123')
        console.log(this.props.match.params.id)
        // console.log(item.attributes.projectid,"23456")
        console.log(this.props.match.params.projectid, "23456")
        axios({
            method: "GET",
            url: CMS_STRAPI_URL + "/api/projectcrews/" + this.props.match.params.id,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
        })
            .then((response) => {
                console.log(response.data.data, 'error');
                var List = JSON.stringify(response.data.data.attributes.projectid)
                sessionStorage.setItem('PROJECTCREWId', List)
                var List = JSON.stringify(response.data.data.attributes.efid)
                sessionStorage.setItem('PROJECTCREWefid', List)
                this.setState({
                    projectname: response.data.data.attributes.projectname,
                    customerid: response.data.data.attributes.customerid,
                    customername: response.data.data.attributes.customername,
                    efid: response.data.data.attributes.efid,
                    efname: response.data.data.attributes.efname,
                    engineerid: response.data.data.attributes.engineerid,
                    engineername: response.data.data.attributes.engineername,

                })
            })
    }

    edit = () => {
        this.setState({
            isEdit: false
        })


    }


    handleBack = () => {
        this.props.history.push({ pathname: '/crewEngineer' })

    }


    // Engineer


    handleApprove = (e) => {
        e.preventDefault();
        var value = sessionStorage.getItem('PROJECTCREWId');
        var Efid = sessionStorage.getItem('PROJECTCREWefid');

        var efif = JSON.parse(Efid, 'PROJECTCREWefid');
        const PROJECTCREWefid = efif.replaceAll("%22", "");

        var projectid = JSON.parse(value, 'PROJECTCREWId');
        const PROJECTCREWId = projectid.replaceAll("%22", "");
        console.log(PROJECTCREWId, 'PROJECTCREWId')
        console.log(PROJECTCREWefid, 'PROJECTCREWId')

        const userName = (JSON.parse(localStorage.getItem('userData')).username)
        axios({
            method: "GET",
            url: CMS_STRAPI_URL + "/api/onboard/engineerapproval/" + userName + "/" + PROJECTCREWId + "/" + PROJECTCREWefid + "/approved",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
        })
            .then(response => {
                console.log(response)
                setTimeout(() => {
                    toast.success("Job Accepted");
                }, 100);
                this.props.history.push({ pathname: '/project' })
            })
            .catch((error) => {
                console.log(error);

            });
    }


    handleReject = (e) => {
        e.preventDefault();
        var value = sessionStorage.getItem('PROJECTCREWId');
        var Efid = sessionStorage.getItem('PROJECTCREWefid');
        var efif = JSON.parse(Efid, 'PROJECTCREWefid');
        const PROJECTCREWefid = efif.replaceAll("%22", "");
        console.log(PROJECTCREWefid, 'PROJECTCREWefid')
        var projectid = JSON.parse(value, 'PROJECTCREWId');
        const PROJECTCREWId = projectid.replaceAll("%22", "");
        console.log(PROJECTCREWId, 'PROJECTCREWId')

        const userName = (JSON.parse(localStorage.getItem('userData')).username)
        axios({
            method: "GET",
            url: CMS_STRAPI_URL + "/api/onboard/engineerapproval/" + userName + "/" + PROJECTCREWId + "/" + PROJECTCREWefid + "/rejected",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
        })
            .then(response => {
                console.log(response)
                setTimeout(() => {
                    toast.success("Job Rejected");
                }, 100);
                this.props.history.push({ pathname: '/crew' })
            })
            .catch((error) => {
                console.log(error);

            });
    }


    render() {
        const { name, item, isEdit, customerid, customername, projectname, engineerid, status, engineername, efid, estimateid, city, longitude, efname, latitude, engineerids, engineernames, address, dataList, userType, data } = this.state;
        // const total = 0;
        return (
            <Fragment>
                <Breadcrumb title="Detail" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12 col-xl-6">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card">
                                        {/* <div className="card-header">
                      <h5>Default Form Layout</h5><span>Using the <a href="#javascript">card</a> component, you can extend the default collapse behavior to create an accordion.</span>
                    </div> */}
                                        <div className="card-body">
                                            <form className="theme-form mega-form">
                                                {/* <h6>Account Information</h6> */}
                                                <div className="form-group">
                                                    <label className="col-form-label">Project Name</label>
                                                    <input className="form-control" value={projectname} readOnly={isEdit} onChange={e => this.setState({ projectname: e.target.value })} />
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-form-label">Customer Id</label>
                                                    <input className="form-control" value={customerid} readOnly={isEdit} onChange={e => this.setState({ customerid: e.target.value })} />
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-form-label">Customer Name</label>
                                                    <input className="form-control" value={customername} readOnly={isEdit} onChange={e => this.setState({ customername: e.target.value })} />
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-form-label">Engineering Firm Id</label>
                                                    <input className="form-control" type="country" value={efid} readOnly={isEdit} onChange={e => this.setState({ efid: e.target.value })} />
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-form-label">Engineering Firm Name</label>
                                                    <input className="form-control" type="state" value={efname} readOnly={isEdit} onChange={e => this.setState({ efname: e.target.value })} />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-xl-6">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card">

                                        <div className="card-body">
                                            <form className="theme-form">
                                                <div class="details row">

                                                    {userType === "engineer" && (
                                                        <div class="col-12">
                                                            <button className="btn btn-secondary float-right" onClick={() => { this.handleBack() }} >Back</button>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-form-label">Engineer Id</label>
                                                    <input className="form-control" type="country" value={engineerid} readOnly={isEdit} onChange={e => this.setState({ engineerid: e.target.value })} />
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-form-label">Engineer Name</label>
                                                    <input className="form-control" type="state" value={engineername} readOnly={isEdit} onChange={e => this.setState({ engineername: e.target.value })} />
                                                </div>
                                                {userType === "engineer" && (
                                                    <div class="details row">
                                                        <div class="col-4"  >
                                                            <button class="btn btn-success active" onClick={(e) => { this.handleApprove(e) }}>Approve </button>
                                                        </div>
                                                        <div class="col-4">
                                                            <div class="text-primary col-6"><button class="btn btn-danger active" onClick={(e) => { this.handleReject(e) }} >Reject</button></div>
                                                        </div>
                                                    </div>
                                                )}
                                            </form>
                                        </div>
                                        {/* <div className="card-footer">
                      {isEdit ?
                    <button className="btn btn-primary mr-1" onClick={() => { this.edit('isEdit') }}>Edit</button>:
                    <button className="btn btn-primary mr-1" onClick={()=> {this.handleUpdate()}}>Update</button>
                   }   

                 <button className="btn btn-secondary" onClick={() => { this.handleEdit() }} >Back</button>
                    </div> */}
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

export default CrewEngineerList;