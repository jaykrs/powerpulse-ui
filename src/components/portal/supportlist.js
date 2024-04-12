import React, { Fragment, useState, useEffect, Component } from "react";
import Breadcrumb from "../common/breadcrumb";
import axios from "axios";
import { CMS_STRAPI_URL } from "../../constant/serviceurl";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
class SupportList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: localStorage.getItem("jwt"),
      userId: localStorage.getItem("userId"),
      dataList: [],
      userType: localStorage.getItem("userType"),
      isEdit: true,
      data: "",
      projectid: "",
      participant: "",
      meetingdate: "",
      meetinglink: "",
      meetingpwd: "",
      meetingtype: "",
      attachments: "",
      meetingnotes: "",
      meetingnotes_ar: "",
      projects: [],
    };
  }

  // componentDidMount(id) {
  //     console.log(this.props.match.params.id, 'popadadsr')
  //     if (this.props.match.params.id !== 'add') {
  //         axios({
  //             method: "GET",
  //             url: CMS_STRAPI_URL + "/api/connects/" + this.props.match.params.id,
  //             headers: {
  //                 Authorization: "Bearer " + localStorage.getItem("jwt"),
  //             },
  //         }).then((response) => {
  //             console.log(response.data.data, 'erroradarsh');

  //             this.setState({
  //                 projectid: response.data.data.attributes.projectid,
  //                 participant: response.data.data.attributes.participant,
  //                 meetingdate: response.data.data.attributes.meetingdate,
  //                 meetinglink: response.data.data.attributes.meetinglink,
  //                 meetingpwd: response.data.data.attributes.meetingpwd,
  //                 meetingtype: response.data.data.attributes.meetingtype,
  //                 attachments: response.data.data.attributes.attachments,
  //                 meetingnotes: response.data.data.attributes.meetingnotes,
  //                 meetingnotes_ar: response.data.data.attributes.meetingnotes_ar,
  //             })

  //         })

  //     } else {
  //         this.setState({
  //             isEdit: false
  //         })
  //     }
  // }

  handlesubmit() {
    const userName = JSON.parse(localStorage.getItem("userData")).username;
    let List = JSON.parse(sessionStorage.getItem("PROJECTLIST"));
    console.log(List, "llp");
    console.log(List.attributes.name, "wertyui");
    console.log(List.id, "wertyui");
    const {
      projectid,
      description,
      name,
      subject,
      meetingpwd,
      meetingtype,
      attachments,
      meetingnotes,
      meetingnotes_ar,
    } = this.state;
    axios({
      method: "POST",
      url: CMS_STRAPI_URL + "/api/supports",
      data: {
        data: {
          subject: subject,
          description: description,
          projectname: List.attributes.name,
          projectid: List.id.toString(),
          attachment: "",
          creator: userName,
        },
      },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    }).then(
      (response) => {
        console.log(response.data, "connects");
        setTimeout(() => {
          toast.success(" Successfully Created");
        }, 100);
        this.props.history.push({ pathname: "/support" });
      },
      (error) => {
        console.log(error);
        toast.error("Can't Create Support");
      }
    );
  }

  edit = () => {
    this.setState({
      isEdit: false,
    });
  };

  // handleEdit = (id) => {
  //     this.props.history.push({ pathname: '/connect' })
  // }

  // handleUpdate = () => {
  //     const { projectid, participant, meetingdate, meetinglink, meetingpwd, meetingtype, attachments, meetingnotes, meetingnotes_ar, } = this.state
  //     console.log(this.props.match.params.id)
  //     axios({
  //         method: "PUT",
  //         url: CMS_STRAPI_URL + "/api/connects/" + this.props.match.params.id,
  //         data: {
  //             data: {
  //                 "projectid": projectid,
  //                 "participant": participant,
  //                 "meetingdate": meetingdate,
  //                 "meetinglink": meetinglink,
  //                 "meetingpwd": meetingpwd,
  //                 "meetingtype": meetingtype,
  //                 "attachments": attachments,
  //                 "meetingnotes": meetingnotes,
  //                 "meetingnotes_ar": meetingnotes_ar
  //             }
  //         },
  //         headers: {
  //             Authorization: "Bearer " + localStorage.getItem("jwt"),
  //         },
  //     }).then((response) => {
  //         console.log(response.data, 'connects');
  //         setTimeout(() => {
  //             toast.success(" Successfully Updated");
  //         }, 100);
  //     }, (error) => {
  //         console.log(error);
  //         toast.error("Can't Update connects");
  //     });
  // }

  render() {
    const { projectid, isEdit, description, subject } = this.state;
    return (
      <Fragment>
        <Breadcrumb title="Support Details" />
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
                          <label className="col-form-label">Subject</label>
                          <select
                            className="form-control digits"
                            value={subject}
                            onChange={(e) => {
                              this.setState({ subject: e.target.value });
                            }}
                          >
                            <option>Casual</option>
                            <option>Issue Related</option>
                            <option>Status Related</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label className="col-form-label">Description</label>
                          <input
                            className="form-control"
                            value={description}
                            onChange={(e) => {
                              this.setState({ description: e.target.value });
                            }}
                            placeholder="Enter text here..."
                          />
                        </div>
                      </form>
                    </div>
                    <div className="card-footer">
                      <button
                        className="btn btn-primary mr-1"
                        onClick={() => {
                          this.handlesubmit();
                        }}
                      >
                        Submit
                      </button>

                      {/* {isEdit ?
                                                <button className="btn btn-primary mr-1" onClick={() => { this.edit('isEdit') }}>Edit</button> :
                                                this.props.match.params.id !== 'add' ?
                                                    <button className="btn btn-primary mr-1" onClick={() => { this.handleUpdate() }}>Update</button> :
                                            }
                                            <button className="btn btn-secondary" onClick={() => { this.handleEdit() }}>Back</button> */}
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
export default SupportList;
