import axios from 'axios';
import React, { Component, Fragment } from 'react';
import CKEditors from "react-ckeditor-component";
import { toast } from "react-toastify";
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import Breadcrumb from '../common/breadcrumb';

class InvoiceReqScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: localStorage.getItem('jwt'),
            userId: localStorage.getItem('userId'),
            dataList: [],
            userType: localStorage.getItem('userType'),
            data: '',
            isEdit: true,
            content_ar: ''
        }
    }

    componentDidMount(id) {
        console.log(this.props.match.params.id)
        axios({
            method: "GET",
            url: CMS_STRAPI_URL + "/api/worklogs?filters[projectid][$eq]=" + this.props.match.params.id,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
        })
            .then((response) => {
                console.log(response.data.data, 'errorcontractadarsh');
                this.setState({
                    projectname: response.data.data[0].attributes.projectname,
                    customername: response.data.data[0].attributes.customername,
                    customeracceptance: response.data.data[0].attributes.customeracceptance,
                    engineername: response.data.data[0].attributes.engineername,
                    workcomplectionstatus: response.data.data[0].attributes.workcomplectionstatus,
                    projectcost: response.data.data[0].attributes.projectcost,
                    status: response.data.data[0].attributes.status
                })
            })
    }

    edit = () => {
        this.setState({
            isEdit: false
        })


    }

    handleEdit = () => {
        this.props.history.push({ pathname: '/invoice' })
    }


    handleApprove = (e) => {
        e.preventDefault();
        var value = sessionStorage.getItem('PROJECTCREWId');
        var Efid = sessionStorage.getItem('PROJECTCREWefid');
        var efif = JSON.parse(Efid, 'PROJECTCREWefid');
        const PROJECTCREWefid = efif.replaceAll("%22", "");
        var projectid = JSON.parse(value, 'PROJECTCREWId');
        const PROJECTCREWId = projectid.replaceAll("%22", "");
        const userName = (JSON.parse(localStorage.getItem('userData')).username)
        axios({
            method: "GET",
            url: CMS_STRAPI_URL + "/api/onboard/customeracceptance/" + userName + "/" + PROJECTCREWId + "/" + PROJECTCREWefid + "/approved",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
        })
            .then(response => {
                console.log(response)
                setTimeout(() => {
                    toast.success("Job Accepted");
                }, 100);
                // this.props.history.push({ pathname: '/project' })
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
        var projectid = JSON.parse(value, 'PROJECTCREWId');
        const PROJECTCREWId = projectid.replaceAll("%22", "");
        const userName = (JSON.parse(localStorage.getItem('userData')).username)
        axios({
            method: "GET",
            url: CMS_STRAPI_URL + "/api/onboard/customeracceptance/" + userName + "/" + PROJECTCREWId + "/" + PROJECTCREWefid + "/rejected",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
        })
            .then(response => {
                console.log(response)
                setTimeout(() => {
                    toast.success("Job Rejected");
                }, 100);
                // this.props.history.push({ pathname: '/crew' })
            })
            .catch((error) => {
                console.log(error);

            });
    }




    render() {
        const { isEdit, customeracceptance, userType, projectname, customername, status, projectcost, engineername, workcomplectionstatus } = this.state;
        // const total = 0;
        return (
            <Fragment>
                <Breadcrumb title="Invoice Details" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12 col-xl-6">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <form className="theme-form mega-form">
                                                <div className="form-group">
                                                    <label className="col-form-label">Project Name</label>
                                                    <input className="form-control" value={projectname} readOnly={isEdit} onChange={e => this.setState({ projectname: e.target.value })} />
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-form-label">Customer Name</label>
                                                    <input className="form-control" value={customername} readOnly={isEdit} onChange={e => this.setState({ customername: e.target.value })} />
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-form-label">Customer Acceptance</label>
                                                    <input className="form-control" value={customeracceptance === true ? "Accepted" : "Rejected"} readOnly={isEdit} onChange={e => this.setState({ customeracceptance: e.target.value })} />
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-form-label">Engineer Name</label>
                                                    <input className="form-control" value={engineername} readOnly={isEdit} onChange={e => this.setState({ engineername: e.target.value })} />
                                                </div>



                                                <div className="form-group">
                                                    <label className="col-form-label">Work Complection Status</label>
                                                    <input className="form-control" value={workcomplectionstatus} readOnly={isEdit} onChange={e => this.setState({ workcomplectionstatus: e.target.value })} />
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-form-label">Project Cost</label>
                                                    <input className="form-control" value={projectcost} readOnly={isEdit} onChange={e => this.setState({ projectcost: e.target.value })} />
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
                                                    <div class="col-12">
                                                        <button className="btn btn-secondary float-right" onClick={() => { this.handleEdit() }} >Back</button>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">Status</label>
                                                    <input className="form-control" id="exampleInputPassword1" value={status} readOnly={isEdit} onChange={e => this.setState({ status: e.target.value })} />
                                                </div>

                                                {userType === "customer" && (
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

export default InvoiceReqScreen;