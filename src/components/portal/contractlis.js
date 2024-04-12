import axios from 'axios';
import React, { Component, Fragment } from 'react';
import CKEditors from "react-ckeditor-component";
import { toast } from "react-toastify";
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import Breadcrumb from '../common/breadcrumb';

class ContractList extends Component {
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
            url: CMS_STRAPI_URL + "/api/contracts/" + this.props.match.params.id,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
        })
            .then((response) => {
                console.log(response.data.data, 'errorcontractadarsh');
                this.setState({
                    projectid: response.data.data.attributes.projectid,
                    content_ar: response.data.data.attributes.content_ar,
                    attachments: response.data.data.attributes.attachments,
                    projectestimateid: response.data.data.attributes.projectestimateid,
                    engineeringfirmacceptance: response.data.data.attributes.engineeringfirmacceptance,
                    customeracceptance: response.data.data.attributes.customeracceptance,
                    engineeringfirmname: response.data.data.attributes.engineeringfirmname,
                    customername: response.data.data.attributes.customername
                })
            })
    }

    edit = () => {
        this.setState({
            isEdit: false
        })


    }

    handleEdit = (id) => {
        this.props.history.push({ pathname: '/contract' })
    }

    handleApprove(e) {
        e.preventDefault();
        var userType = localStorage.getItem('userType')
        var userId = localStorage.getItem('userId')
        if (userType === 'engineeringfirm') {
            axios({
                method: "POST",
                url: CMS_STRAPI_URL + "/api/onboard/contractreview",
                data: {
                    "userid": userId,
                    "usertype": userType,
                    "contractid": this.props.match.params.id
                },
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwt"),
                },
            }).then((response) => {
                console.log(response)
                setTimeout(() => {
                    toast.success(" Successfully Approved");
                }, 100);
                this.props.history.push({ pathname: '/contract' })
            }, (err) => {
                console.log(err)
            });
        } else {
            toast.error("Sorry this user type is not Approved");
        }
    }


    handleReject(e) {
        e.preventDefault();
        var userType = localStorage.getItem('userType')
        var userId = localStorage.getItem('userId')
        if (userType === 'engineeringfirm') {
            axios({
                method: "POST",
                url: CMS_STRAPI_URL + "/api/onboard/reject/contract",
                data: {
                    "userid": userId,
                    "usertype": userType,
                    "contractid": this.props.match.params.id
                },
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwt"),
                },
            }).then((response) => {
                console.log(response)
                setTimeout(() => {
                    toast.error(" Successfully Reject");
                }, 100);
                this.props.history.push({ pathname: '/contract' })
            }, (err) => {
                console.log(err)
            });
        } else {
            toast.error("Sorry this user type is not Reject");
        }
    }
    handleEditorChange = (event, editor) => {
        const content = editor.getData();
        console.log(content)
        this.setState({ content_ar: content });
    }


    render() {
        const { isEdit, userType, projectid, content_ar, attachments, projectestimateid, engineeringfirmacceptance, customeracceptance, engineeringfirmname, customername } = this.state;
        // const total = 0;
        return (
            <Fragment>
                <Breadcrumb title="Contract Details" />
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
                                                {/* <h6>Contract Information</h6> */}

                                                <div className="form-group">
                                                    <label className="col-form-label">Project Id</label>
                                                    <input className="form-control" value={projectid} readOnly={isEdit} onChange={e => this.setState({ projectid: e.target.value })} placeholder="Enter Project Id" />
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-form-label">Customer Name</label>
                                                    <input className="form-control" value={customername} readOnly={isEdit} onChange={e => this.setState({ customername: e.target.value })} placeholder="Enter Customer Id" />
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-form-label">Engineering Firm Name</label>
                                                    <input className="form-control" value={engineeringfirmname} readOnly={isEdit} onChange={e => this.setState({ engineeringfirmname: e.target.value })} placeholder="Enter Engineering Firm Name" />
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-form-label">Customer Acceptance</label>
                                                    <input className="form-control" value={customeracceptance === true ? "Accepted" : "Rejected"} readOnly={isEdit} onChange={e => this.setState({ customeracceptance: e.target.value })} placeholder="Enter Customer Acceptance " />
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-form-label">Engineering Firm Acceptance</label>
                                                    <input className="form-control" value={engineeringfirmacceptance === true ? "Accepted" : "Pending"} readOnly={isEdit} onChange={e => this.setState({ engineeringfirmacceptance: e.target.value })} placeholder="Enter Engineering Firm Acceptance" />
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-form-label">Project Stimate Id</label>
                                                    <input className="form-control" value={projectestimateid} readOnly={isEdit} onChange={e => this.setState({ projectestimateid: e.target.value })} placeholder="Enter Content " />
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
                                        {/* <div className="card-header">
                      <h5>Mega form</h5>
                    </div> */}
                                        <div className="card-body">
                                            <form className="theme-form">
                                                <div class="details row">
                                                    <div class="col-12">
                                                        <button className="btn btn-secondary float-right" onClick={() => { this.handleEdit() }} >Back</button>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">Attachments</label>
                                                    <input className="form-control" id="exampleInputPassword1" value={attachments} readOnly={isEdit} onChange={e => this.setState({ attachments: e.target.value })} placeholder="Enter Attachments" />
                                                </div>

                                                {userType === "engineeringfirm" && (
                                                    <div class="details row">
                                                        <div class="col-4"  >
                                                            <button class="btn btn-success active" onClick={(e) => { this.handleApprove(e) }} disabled={engineeringfirmacceptance}>Approve </button>
                                                        </div>
                                                        <div class="col-4">
                                                            <div class="text-primary col-6"><button class="btn btn-danger active" onClick={(e) => { this.handleReject(e) }} disabled={!engineeringfirmacceptance}>Reject</button></div>
                                                        </div>
                                                    </div>
                                                )}

                                            </form>
                                        </div>
                                        {/* <div className="card-footer">
                                            <button className="btn btn-secondary">Cancel</button>
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

export default ContractList;