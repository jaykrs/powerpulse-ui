import React, { Fragment, useState, useEffect, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import axios from 'axios';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
class ConnectList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: localStorage.getItem('jwt'),
            userId: localStorage.getItem('userId'),
            dataList: [],
            userType: localStorage.getItem('userType'),
            isEdit: true,
            data: '',
            projectid: '',
            participant: '',
            meetingdate: '',
            meetinglink: '',
            meetingpwd: '',
            meetingtype: '',
            attachments: '',
            meetingnotes: '',
            meetingnotes_ar: '',
            projects: [],
        }
    }

    componentDidMount(id) {
        console.log(this.props.match.params.id, 'popadadsr')
        if (this.props.match.params.id !== 'add') {
            axios({
                method: "GET",
                url: CMS_STRAPI_URL + "/api/connects/" + this.props.match.params.id,
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwt"),
                },
            }).then((response) => {
                console.log(response.data.data, 'erroradarsh');

                this.setState({
                    projectid: response.data.data.attributes.projectid,
                    participant: response.data.data.attributes.participant,
                    meetingdate: response.data.data.attributes.meetingdate,
                    meetinglink: response.data.data.attributes.meetinglink,
                    meetingpwd: response.data.data.attributes.meetingpwd,
                    meetingtype: response.data.data.attributes.meetingtype,
                    attachments: response.data.data.attributes.attachments,
                    meetingnotes: response.data.data.attributes.meetingnotes,
                    meetingnotes_ar: response.data.data.attributes.meetingnotes_ar,
                })

            })

        } else {
            this.setState({
                isEdit: false
            })
        }
    }

    handlesubmit() {
        const { projectid, participant, meetingdate, meetinglink, meetingpwd, meetingtype, attachments, meetingnotes, meetingnotes_ar,participant_name } = this.state
        axios({
            method: "POST",
            url: CMS_STRAPI_URL + "/api/connects",
            data: {
                data: {
                    "projectid": this.props.match.params.id,
                    "participant": participant,
                    "meetingdate": meetingdate,
                    "meetingpwd": meetingpwd,
                    "meetingtype": meetingtype,
                    "attachments": attachments,
                    "meetingnotes": meetingnotes,
                    "meetingnotes_ar": meetingnotes_ar,
                    "participant_name": participant_name,
                }
            },
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
        }).then((response) => {
            console.log(response.data, 'connects');
            setTimeout(() => {
                toast.success(" Successfully Created");
            }, 100);
        }, (error) => {
            console.log(error);
            toast.error("Can't Create new connects");
        });
    }

    edit = () => {
        this.setState({
            isEdit: false
        })
    }

    handleEdit = (id) => {
        this.props.history.push({ pathname: '/connect' })
    }

    handleUpdate = () => {
        const { projectid, participant, meetingdate, meetinglink, meetingpwd, meetingtype, attachments, meetingnotes, meetingnotes_ar, } = this.state
        console.log(this.props.match.params.id)
        axios({
            method: "PUT",
            url: CMS_STRAPI_URL + "/api/connects/" + this.props.match.params.id,
            data: {
                data: {
                    "projectid": projectid,
                    "participant": participant,
                    "meetingdate": meetingdate,
                    "meetinglink": meetinglink,
                    "meetingpwd": meetingpwd,
                    "meetingtype": meetingtype,
                    "attachments": attachments,
                    "meetingnotes": meetingnotes,
                    "meetingnotes_ar": meetingnotes_ar
                }
            },
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
        }).then((response) => {
            console.log(response.data, 'connects');
            setTimeout(() => {
                toast.success(" Successfully Updated");
            }, 100);
        }, (error) => {
            console.log(error);
            toast.error("Can't Update connects");
        });
    }

    componentWillMount() {
        const engineeringfirmid = (JSON.parse(localStorage.getItem('userData')).username)
        // console.log(engineeringfirmid,'engineeringfirmid')
        axios({
            method: "GET",
            url: CMS_STRAPI_URL + "/api/projects?filters[engineeringfirmid][$eq]=" + engineeringfirmid,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
        })
            .then((response) => {
                console.log(response.data.data, 'adarshprojectconnect')
                this.setState({
                    projects: response.data.data
                })
            })
            .catch((error) => {
                console.log(error);
            });

   }


    render() {
        const { projectid, isEdit, participant, projects, meetingdate, participant_name, meetingpwd, meetingtype, attachments, meetingnotes, meetingnotes_ar, dataList, userType, data } = this.state;
        return (
            <Fragment>
                <Breadcrumb title="Connect Details" />
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
                                                <h6>Details</h6>
                                                <div className="form-group">
                                                    <label className="col-form-label">Participant</label>
                                                    <input className="form-control"  onChange={(e) => { this.setState({ participant: e.target.value }) }} placeholder="Enter participant" />
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-form-label">Participant Name</label>
                                                    <input className="form-control"   onChange={(e) => { this.setState({ participant_name: e.target.value }) }} placeholder="Enter participant name " />
                                                </div>
                                                <div className="form-group">

                                                    <label className="col-form-label">Meeting Date</label>
                                                    <input className="form-control digits" type='datetime-local' id="example-datetime-local-input"  onChange={(e) => { this.setState({ meetingdate: e.target.value }) }} />
                                                    {/* <input className="form-control" type="date" value={meetingdate} readOnly={isEdit} onChange={(e) => { this.setState({ meetingdate: e.target.value }) }} placeholder="Enter Meeting Date" /> */}
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-form-label">Meeting Password</label>
                                                    <input className="form-control"  onChange={(e) => { this.setState({ meetingpwd: e.target.value }) }} placeholder="Enter Meeting Password" />
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
                                                    <label htmlFor="exampleFormControlSelect3">Meeting Subject</label>
                                                    <input className="form-control" id="exampleFormControlSelect3"  onChange={(e) => { this.setState({ meetingtype: e.target.value }) }} placeholder="Enter Meeting subject" />
                                                   { /*  <select className="form-control digits"  onChange={(e) => { this.setState({ meetingtype: e.target.value }) }}>
                                                        <option></option>
                                                        <option>user</option>
                                                        <option>swabber</option>
                                                      </select> */}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">Meeting Notes</label>
                                                    <input className="form-control" id="exampleInputPassword1"  onChange={(e) => { this.setState({ meetingnotes: e.target.value }) }} placeholder="Enter Meeting Notes" />
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-form-label">Meeting Notes_Ar</label>
                                                    <input className="form-control"  onChange={(e) => { this.setState({ meetingnotes_ar: e.target.value }) }} placeholder="Enter Meeting Notes_Ar" />
                                                </div>

                                                {/* <div className="form-group">
                                                    <label className="col-form-label">Upload File</label>
                                                    <input className="form-control" type="file" readOnly={isEdit} />
                                                    <div className="card-footer">
                                                    <button className="btn btn-primary">Upload</button>
                                                    </div>                                                   
                                                </div> */}
                                            </form>
                                        </div>
                                        <div className="card-footer">
                                            <button className="btn btn-primary mr-1" onClick={() => { this.handlesubmit() }}>Submit</button>
                                            <button className="btn btn-secondary" onClick={() => { this.handleEdit() }}>Back</button>
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
export default ConnectList;