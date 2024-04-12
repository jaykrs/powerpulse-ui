import axios from 'axios';
import React, { Component, Fragment } from 'react';
import CKEditors from "react-ckeditor-component";
import { toast } from "react-toastify";
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import Breadcrumb from '../common/breadcrumb';

class InvoiceList extends Component {
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
            url: CMS_STRAPI_URL + "/api/invoices?filters[projectid][$eq]=" + this.props.match.params.id,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
        })
            .then((response) => {
                console.log(response.data.data, 'errorcontractadarsh');
                if (response.data.data.length === 0) {
                    alert('No Invoice Found')
                    this.props.history.push({ pathname: '/invoice' })
                }
                this.setState({
                    projectname: response.data.data[0].attributes.projectname,
                    paymentstatus: response.data.data[0].attributes.paymentstatus,
                    billto: response.data.data[0].attributes.billto,
                    projectid: response.data.data[0].attributes.projectid,
                    billto_name: response.data.data[0].attributes.billto_name,
                    from: response.data.data[0].attributes.from,
                    amount: response.data.data[0].attributes.amount,
                    from_name: response.data.data[0].attributes.from_name,
                    platformfee: response.data.data[0].attributes.platformfee,
                    tax: response.data.data[0].attributes.tax

                })
            })
    }

    edit = () => {
        this.setState({
            isEdit: false
        })


    }

    handleEdit = (e) => {
        this.props.history.push({ pathname: '/invoice' })
    }




    render() {
        const { isEdit, paymentstatus, projectname, billto, amount, projectid, billto_name, from, from_name,platformfee,tax } = this.state;
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
                                        {/* <div className="card-header">
                      <h5>Default Form Layout</h5><span>Using the <a href="#javascript">card</a> component, you can extend the default collapse behavior to create an accordion.</span>
                    </div> */}
                                        <div className="card-body">
                                            <form className="theme-form mega-form">
                                                {/* <h6>Contract Information</h6> */}

                                                <div className="form-group">
                                                    <label className="col-form-label">Project Name</label>
                                                    <input className="form-control" value={projectname} readOnly={isEdit} onChange={e => this.setState({ projectname: e.target.value })} />
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-form-label">Bill To</label>
                                                    <input className="form-control" value={billto} readOnly={isEdit} onChange={e => this.setState({ billto: e.target.value })} />
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-form-label">Bill To Name</label>
                                                    <input className="form-control" value={billto_name} readOnly={isEdit} onChange={e => this.setState({ billto_name: e.target.value })} />
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-form-label">Payment Status</label>
                                                    <input className="form-control" value={paymentstatus === true ? "Accepted" : "Rejected"} readOnly={isEdit} onChange={e => this.setState({ paymentstatus: e.target.value })} />
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-form-label">From</label>
                                                    <input className="form-control" value={from} readOnly={isEdit} onChange={e => this.setState({ from: e.target.value })} />
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-form-label">Project  Id</label>
                                                    <input className="form-control" value={projectid} readOnly={isEdit} onChange={e => this.setState({ projectid: e.target.value })} />
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
                                                        <button className="btn btn-secondary float-right" onClick={(e) => { this.handleEdit(e) }} >Back</button>
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">Amount</label>
                                                    <input className="form-control" id="exampleInputPassword1" value={amount} readOnly={isEdit} onChange={e => this.setState({ amount: e.target.value })} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">From Name</label>
                                                    <input className="form-control" id="exampleInputPassword1" value={from_name} readOnly={isEdit} onChange={e => this.setState({ from_name: e.target.value })} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">Plat Form Fee</label>
                                                    <input className="form-control" id="exampleInputPassword1" value={platformfee} readOnly={isEdit} onChange={e => this.setState({ platformfee: e.target.value })} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">Tax</label>
                                                    <input className="form-control" id="exampleInputPassword1" value={tax} readOnly={isEdit} onChange={e => this.setState({ tax: e.target.value })} />
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

export default InvoiceList;