import React, { Fragment, useState, useEffect, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import axios from 'axios';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import { Link } from 'react-router-dom';
// import { jobForm } from '.';

class jobEfr extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: localStorage.getItem('jwt'),
      userId: localStorage.getItem('userId'),
      dataList: [],
      userType: localStorage.getItem('userType'),
      data: '',
      contacts: [],
    }
  }

  componentWillMount() {
    axios({
      method: "GET",
      url: CMS_STRAPI_URL + "/api/efrpricings",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => {
        console.log(response.data.data)
        this.setState({
          contacts: response.data.data
        })
      })
      .catch((error) => {
        console.log(error);
      });


  }
  render() {
    const { contacts } = this.state;
    return (
      <Fragment>
        <Breadcrumb title="All Active Posts" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                {/* <div className="card-header">
                  <h5>All Posts</h5>
                </div> */}
                <div className="card-footer">
                  <Link to=""><button className="btn btn-primary mr-1">Add</button></Link>
                </div>
                <div className="card-body">
                  <div className="order-history table-responsive">
                    <table className="table table-bordernone">
                      <thead>
                        <tr>
                          <th scope="col">S. NO.</th>
                          <th scope="col">ID</th>
                          <th scope="col">EF Name</th>
                          <th scope="col">EF Id</th>
                          <th scope="col">Service City</th>
                          <th scope="col">Project Count</th>
                          <th scope="col">Action</th>

                        </tr>
                      </thead>
                      <tbody>


                        {!!contacts && contacts.length > 0 && contacts.map((item, index) => {
                          return (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{item.id}</td>
                              <td>{item.attributes.efname}</td>
                              <td>{item.attributes.efid}</td>
                              <td>{item.attributes.servicecity}</td>
                              <td>{item.attributes.projectcount}</td>
                              <td>
                                <button class="btn btn-primary active"><i class="fa fa-pencil"></i></button>
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

export default jobEfr;