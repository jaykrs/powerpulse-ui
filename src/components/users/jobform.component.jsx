import React, { Fragment, useState, useEffect, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import axios from 'axios';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import { Link } from 'react-router-dom';
// import { jobForm } from '.';

class jobForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: localStorage.getItem('jwt'),
      userId: localStorage.getItem('userId'),
      dataList: [],
      userType: localStorage.getItem('userType'),
      data: '',
      projects: [],

    }
  }

  componentWillMount() {
    const engineeringfirmid=(JSON.parse(localStorage.getItem('userData')).username)
    // console.log(engineeringfirmid,'engineeringfirmid')
    axios({
      method: "GET",
      url: CMS_STRAPI_URL + "/api/projects?filters[engineeringfirmid][$eq]=" + engineeringfirmid,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => {
        console.log(response.data.data)
        this.setState({
          projects: response.data.data
        })
      })
      .catch((error) => {
        console.log(error);
      });


  }

  handleEdit = (id) =>{
    this.props.history.push({pathname: '/user/jobProject/' + id})
  }
  render() {
    const { projects } = this.state;
    return (
      <Fragment>
        <Breadcrumb title="Project" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                {/* <div className="card-header">
                  <h5>All Posts</h5>
                </div> */}
                {/* <div className="card-footer">
                 <button className="btn btn-primary mr-1" onClick={()=>{this.handleEdit()}}>Add</button>
                </div> */}
                <div className="card-body">
                  <div className="order-history table-responsive">
                    <table className="table table-bordernone">
                      <thead>
                        <tr>
                          <th scope="col">S. NO.</th>
                          <th scope="col">ID</th>
                          <th scope="col">Name</th>
                          <th scope="col">Customer Name</th>
                          <th scope="col">City</th>
                          <th scope="col">Address</th>
                          <th scope="col">State</th>
                          <th scope="col">Status</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!!projects && projects.length > 0 && projects.map((item, index) => {
                          return (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{item.id}</td>
                              <td>{item.attributes.name}</td>
                              <td>{item.attributes.customername}</td>
                              <td>{item.attributes.city}</td>
                              <td>{item.attributes.address}</td>
                              <td>{item.attributes.state}</td>
                              <td>{item.attributes.status}</td>
                              <td>
                                <button onClick={()=>{this.handleEdit(item.id)}} class="btn btn-primary active"><i class="fa fa-pencil"></i></button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
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

export default jobForm;