import axios from 'axios';
import React, { Component, Fragment } from 'react';
import CKEditors from "react-ckeditor-component";
import { toast } from "react-toastify";
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import Breadcrumb from '../common/breadcrumb';

class ConnectDetails extends Component {
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
            url: CMS_STRAPI_URL + "/api/connects/" + this.props.match.params.id,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
        })
            .then((response) => {
                console.log(response.data.data, 'errorcontractadarsh');
                this.setState({
                    projectid: response.data.data.attributes.projectid,
                    content_ar: response.data.data.attributes.content_ar,
                    meetingnotes: response.data.data.attributes.meetingnotes,
                    meetingtype: response.data.data.attributes.meetingtype,
                    meetinglink: response.data.data.attributes.meetinglink,
                    meetingstartlink: response.data.data.attributes.meetingstartlink,
                    participant_name: response.data.data.attributes.participant_name,
                    participant: response.data.data.attributes.participant,
                    meetingnotes_ar: response.data.data.attributes.meetingnotes_ar,
                    "meetingdate" : response.data.data.attributes.meetingdate
                })
            })
    }

    edit = () => {
        this.setState({
            isEdit: false
        })


    }

    handleEdit = (id) => {
        this.props.history.push({ pathname: '/connect' })
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
        const { isEdit, userType, projectid, content_ar, meetingnotes, meetingtype, meetinglink, meetingstartlink, participant_name, participant,meetingnotes_ar ,meetingdate} = this.state;
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
                                                    <input className="form-control" value={projectid} readOnly={isEdit} onChange={e => this.setState({ projectid: e.target.value })} placeholder="Project Id" />
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-form-label">Participant Email Id</label>
                                                    <input className="form-control" value={participant} readOnly={isEdit} onChange={e => this.setState({ participant: e.target.value })} placeholder="Participant Email Id" />
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-form-label">Participant Name</label>
                                                    <input className="form-control" value={participant_name} readOnly={isEdit} onChange={e => this.setState({ participant_name: e.target.value })} placeholder="Paticipant Name" />
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-form-label">Meeting Start Link</label>
                                                    <input className="form-control" value={meetingstartlink} readOnly={isEdit} onChange={e => this.setState({ meetingstartlink: e.target.value })} placeholder="Meeting Start Link " />
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-form-label">Meeting Link</label>
                                                    <input className="form-control" value={meetinglink} readOnly={isEdit} onChange={e => this.setState({ engineeringfirmacceptance: e.target.value })} placeholder="Meeting Acceptance" />
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-form-label">Meeting Type</label>
                                                    <input className="form-control" value={meetingtype} readOnly={isEdit}  placeholder="Content " />
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
                                                

                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">Meetingnotes(en)</label>
                                                    <input className="form-control" id="exampleInputPassword1" value={meetingnotes} readOnly={isEdit} onChange={e => this.setState({ meetingnotes: e.target.value })} placeholder="meeting notes" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">Meetingnotes(ar)</label>
                                                    <input className="form-control" id="exampleInputPassword1" value={meetingnotes_ar} readOnly={isEdit} onChange={e => this.setState({ meetingnotes_ar: e.target.value })} placeholder="meeting notes" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">Meeting Date</label>
                                                    <input className="form-control" id="exampleInputPassword1" value={meetingdate} readOnly={isEdit} onChange={e => this.setState({ meetingdate: e.target.value })} placeholder="Date " />
                                                </div>
                                                <div class="details row">
                                                    <div class="col-12">
                                                        <button className="btn btn-secondary float-right" onClick={() => { this.handleEdit() }} >Back</button>
                                                    </div>
                                                </div>

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

export default ConnectDetails;