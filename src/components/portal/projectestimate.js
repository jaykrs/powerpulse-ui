import axios from 'axios';
import React, { Component, Fragment } from 'react';
import CKEditors from "react-ckeditor-component";
import { toast } from "react-toastify";
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import Breadcrumb from '../common/breadcrumb';

class Projectestimate extends Component {
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
            url: CMS_STRAPI_URL + "/api/projectestimates/" + this.props.match.params.id,

        })
            .then((response) => {
                console.log(response.data.data, 'projectestimates');
                this.setState({
                    city: response.data.data.attributes.city,
                    country: response.data.data.attributes.country,
                    attachments: response.data.data.attributes.attachments,
                    projectestimateid: this.props.match.params.id,
                    region: response.data.data.attributes.region,
                    projecttype: response.data.data.attributes.projecttype,
                    efname: response.data.data.attributes.efname,
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
        this.props.history.push({ pathname: '/order' })
    }


    handleEditorChange = (event, editor) => {
        const content = editor.getData();
        console.log(content)
        this.setState({ content_ar: content });
    }


    render() {
        const { isEdit, city, country,efname, projectestimateid, region, projecttype, customername } = this.state;
        // const total = 0;
        return (
            <Fragment>
                <Breadcrumb title="Projectestimate Details" />
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
                                                    <label className="col-form-label">City</label>
                                                    <input className="form-control" value={city} readOnly={isEdit} onChange={e => this.setState({ city: e.target.value })} placeholder="Enter Project Id" />
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-form-label">Customer Name</label>
                                                    <input className="form-control" value={customername} readOnly={isEdit} onChange={e => this.setState({ customername: e.target.value })} placeholder="Enter Customer Id" />
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-form-label">Engineering Firm Name</label>
                                                    <input className="form-control" value={efname} readOnly={isEdit} onChange={e => this.setState({ efname: e.target.value })} placeholder="Enter Engineering Firm Id" />
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-form-label">Country</label>
                                                    <input className="form-control" value={country} readOnly={isEdit} onChange={e => this.setState({ country: e.target.value })} placeholder="Enter Customer Acceptance " />
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-form-label">Region</label>
                                                    <input className="form-control" value={region} readOnly={isEdit} onChange={e => this.setState({ region: e.target.value })} placeholder="Enter Engineering Firm Acceptance" />
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
                                                    <label htmlFor="exampleInputPassword1">Project Type</label>
                                                    <input className="form-control" id="exampleInputPassword1" value={projecttype} readOnly={isEdit} onChange={e => this.setState({ projecttype: e.target.value })} placeholder="Enter Attachments" />
                                                </div>
                                                {/* <div className="form-group">
                                                    <div className="col-sm-12">
                                                        <div className="card">
                                                            <div >
                                                                <h5>Contract Note</h5>
                                                            </div>
                                                            <CKEditors
                                                                activeclassName="p10"
                                                                content=" "
                                                                events={{

                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <input className="form-control" id="exampleInputPassword1" value={content_ar} readOnly={isEdit} onChange={e => this.setState({ content_ar: e.target.value })} placeholder="Enter Content_ar" />
                                                </div> */}



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

export default Projectestimate;