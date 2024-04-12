import React, { Fragment, useState, useEffect, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import axios from 'axios';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import { Link } from 'react-router-dom';
import options from '../../data/outsourceData';
import { Typeahead } from 'react-bootstrap-typeahead';
import Image from '../../assets/images/man.png';

import { toast } from "react-toastify";
class Outsource extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: localStorage.getItem('jwt'),
            userId: localStorage.getItem('userId'),
            dataList: [],
            userType: localStorage.getItem('userType'),
            isEdit: true,
            multiSelectionsEngineer: "",
            Designercompanies: []
        }
    }



    handlesubmit() {
        const { multiSelectionsEngineer } = this.state
        const Services = Array.prototype.map.call(multiSelectionsEngineer, function (item) { return item.name; }).join(",");
        // var ServicesType = Services.split(",");

        axios({
            method: "GET",
            url: CMS_STRAPI_URL + "/api/designercompanies?filters[services][$eq]=" + Services,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
        })
            .then((response) => {
                console.log(response.data.data, 'customerid')
                this.setState({
                    Designercompanies: response.data.data
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }




    render() {
        const { multiSelectionsEngineer, Designercompanies } = this.state;
        return (
            <Fragment>
                {/* title="Support Details"  */}
                <Breadcrumb />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="col-sm-12 mb-3">
                                    <label className="col-form-label">Services Required</label>
                                    <div className="form-group">
                                        <Typeahead
                                            id="multiple-typeahead"
                                            clearButton
                                            labelKey="name"
                                            onChange={e => this.setState({ multiSelectionsEngineer: e })}
                                            selected={multiSelectionsEngineer}
                                            multiple
                                            options={options}
                                            placeholder="Choose Services Required..."
                                        />
                                    </div>
                                    <button className="btn btn-primary mr-1" onClick={() => { this.handlesubmit() }}>Submit</button>
                                </div>
                            </div>
                        </div>


                        <div className="col-sm-12">
                            <div class="container">
                                <div className="row">
                                    {!!Designercompanies && Designercompanies.length > 0 && Designercompanies.map((item, index) => {
                                        return (
                                            // <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <div class="mt-4 col-lg-6 col-sm-6">
                                                <div class="project-box" style={{ backgroundColor: '#fbfbfb', borderRadius: '5px', border: '1px solid #ebd61c', padding: '20px', position: 'relative' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'end', }}>

                                                        <button class="btn btn-primary active">View</button>
                                                    </div>
                                                    <h5 class="f-w-600">{item.attributes.name}</h5>
                                                    <div class="d-flex align-items-center"><img class="img-20 me-1 rounded-circle"
                                                        src={Image} alt="" />
                                                        <div class="flex-grow-1">
                                                            <text>{item.attributes.email}</text>
                                                        </div>
                                                    </div>
                                                    <div class="details row mt-4">
                                                        <div class="col-4"><span>services</span></div>
                                                        <div class="text-primary col-4">{item.attributes.services}</div>

                                                    </div>
                                                </div>
                                            </div>
                                            // </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>



                    </div>

                </div>
            </Fragment>
        );
    }
}
export default Outsource;