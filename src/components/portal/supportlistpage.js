import React, { Fragment, useState, useEffect, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import axios from 'axios';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import { Link } from 'react-router-dom';
import Image from '../../assets/images/man.png';

class SupportListPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: localStorage.getItem('jwt'),
            userId: localStorage.getItem('userId'),
            dataList: [],
            userType: localStorage.getItem('userType'),
            data: '',
            supportlist: [],
        }
    }

    componentWillMount() {
        const userName = (JSON.parse(localStorage.getItem('userData')).username)
        let List = JSON.parse(sessionStorage.getItem('PROJECTLIST'))
        console.log(List.id, 'wertyui')
        axios({
            method: "GET",
            url: CMS_STRAPI_URL + "/api/supports?filters[projectid][$eq]=" + List.id,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
        })
            .then((response) => {
                console.log(response.data.data, 'customerid')
                this.setState({
                    supportlist: response.data.data
                })
            })
            .catch((error) => {
                console.log(error);
            });


    }

    handleEdit = (item) => {
        var List = JSON.stringify(item);
        console.log(List)
        sessionStorage.setItem('PROJECTLIST', List)
        this.props.history.push({ pathname: '/supportlist/' + item.id })
    }

    handleAdd = () => {
        this.props.history.push({ pathname: '/supportlist/add' })
    }
    render() {
        const { supportlist, userType } = this.state;
        return (
            <Fragment>
                <Breadcrumb title="Support List" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div class="container">
                                <div className="row">
                                    {!!supportlist && supportlist.length > 0 && supportlist.map((item, index) => {
                                        return (
                                            <div class="mt-4 col-lg-6 col-sm-6">
                                                <div class="project-box" style={{ backgroundColor: '#fbfbfb', borderRadius: '5px', border: '1px solid #ebd61c', padding: '20px', position: 'relative' }}>
                                                    {/* <div style={{ display: 'flex', justifyContent: 'end', }}>
                                                        <a className="btn btn-pill btn-primary" data-toggle="tooltip" title="btn btn-primary" role="button" onClick={() => { this.handleEdit(Supperlist[index])}}><i class="bi bi-arrow-right" ></i></a>

                                                    </div> */}
                                                    <h5 class="f-w-600">{item.attributes.name}</h5>
                                                    <div class="d-flex align-items-center"><img class="img-20 me-1 rounded-circle"
                                                        src={Image} alt="" />
                                                        <div class="flex-grow-1">
                                                            <text>{item.attributes.projectname}</text>
                                                        </div>
                                                    </div>
                                                    <div class="details row mt-4">
                                                        <div class="col-6"><span>Subject </span></div>
                                                        <div class="text-primary col-6">{item.attributes.subject}</div>
                                                        <div class="col-6"> <span>Status</span></div>
                                                        <div class="text-primary col-6">{item.attributes.status}</div>
                                                        <div class="col-6"> <span>Description</span></div>
                                                        <div class="text-primary col-6">{item.attributes.description}</div>
                                                    </div>
                                                </div>
                                            </div>
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

export default SupportListPage;