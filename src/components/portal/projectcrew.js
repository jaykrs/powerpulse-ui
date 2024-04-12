import axios from 'axios';
import React, { Component, Fragment } from 'react';
import Image from '../../assets/images/man.png';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import Breadcrumb from '../common/breadcrumb';
// import { jobForm } from '.';

class ProjectCrew extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: localStorage.getItem('jwt'),
            userId: localStorage.getItem('userId'),
            dataList: [],
            userType: localStorage.getItem('userType'),
            data: '',
            projectcrews: [],

        }
    }

    componentWillMount() {
        console.log(this.props.match.params.id, 'popadadsr')
        var userType = localStorage.getItem('userType')
        axios({
            method: "GET",
            url: CMS_STRAPI_URL + "/api/projectcrews?filters[projectid][$eq]=" + this.props.match.params.id,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
        })
            .then((response) => {
                console.log(response.data.data, 'asdfghjkl')
                if (response.data.data.length === 0) {
                    this.props.history.push({ pathname: '/crewlist' })
                } 

                this.setState({
                    projectcrews: response.data.data

                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleEdit = (item) => {
        // var List = JSON.stringify(item);
        // console.log(List)
        // sessionStorage.setItem('PROJECTLIST', List)
        this.props.history.push({ pathname: '/crewlist' })
    }
    render() {
        const { projectcrews,userType } = this.state;
        return (
            <Fragment>
                <Breadcrumb title="Crew List" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div class="container">
                                <div className="row">


                                    <div className="table-responsive">
                                    {userType === "engineeringfirm" && (
                                        <div style={{ display: 'flex', justifyContent: 'end', }}>
                                            <a className="btn btn-pill btn-primary" data-toggle="tooltip" title="btn btn-primary" role="button" onClick={() => { this.handleEdit() }}>Add Crew</a>
                                        </div>
                                         )}
                                        <table className="table mt-4">
                                            <thead>
                                                <tr className="border-bottom-primary">
                                                    <th scope="col">#</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Engineer Id</th>
                                                    <th scope="col">Status</th>
                                                    {/* <th scope="col">Address</th>
                                                    <th scope="col">State</th> */}
                                                    <th scope="col">View</th>
                                                </tr>
                                            </thead>
                                            {!!projectcrews && projectcrews.length > 0 && projectcrews.map((item, index) => {
                                                return (
                                                    // <div class="mt-4 col-lg-6 col-sm-6">
                                                    //   <div class="project-box" style={{ backgroundColor: '#fbfbfb', borderRadius: '5px', border: '1px solid #ebd61c', padding: '20px', position: 'relative' }}>
                                                    //     <div style={{ display: 'flex', justifyContent: 'end', }}>
                                                    //       <a className="btn btn-pill btn-primary" data-toggle="tooltip" title="btn btn-primary" role="button" onClick={() => { this.handleEdit(projectcrews[index])}}><i class="bi bi-arrow-right" ></i></a>

                                                    //     </div>
                                                    //     <h5 class="f-w-600">{item.attributes.name}</h5>
                                                    //     <div class="d-flex align-items-center"><img class="img-20 me-1 rounded-circle"
                                                    //       src={Image} alt="" />
                                                    //       <div class="flex-grow-1">
                                                    //         <text>{item.attributes.customername}</text>
                                                    //       </div>
                                                    //     </div>
                                                    //     <div class="details row mt-4">
                                                    //       <div class="col-6"><span>City </span></div>
                                                    //       <div class="text-primary col-6">{item.attributes.city}</div>
                                                    //       <div class="col-6"> <span>Address</span></div>
                                                    //       <div class="text-primary col-6">{item.attributes.address}</div>
                                                    //       <div class="col-6"> <span>State</span></div>
                                                    //       <div class="text-primary col-6">{item.attributes.state}</div>
                                                    //     </div>

                                                    //   </div>
                                                    // </div>
                                                    <tbody>
                                                        <tr className="border-bottom-secondary">
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{item.attributes.engineername}</td>
                                                            <td>{item.attributes.engineerid}</td>
                                                            <td>{item.attributes.engineeracceptance}</td>
                                                            {/* <td>{item.attributes.address} </td>
                                                            <td>{item.attributes.state}</td> */}
                                                            <td>
                                                                <a className="btn btn-pill btn-primary" data-toggle="tooltip" title="btn btn-primary" role="button"><i class="bi bi-arrow-right" ></i></a>

                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                )
                                            })}
                                        </table>
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

export default ProjectCrew;