import React, { Fragment, useState, useEffect, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import axios from 'axios';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

class jobProject extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: localStorage.getItem('jwt'),
      userId: localStorage.getItem('userId'),
      dataList: [],
      userType: localStorage.getItem('userType'),

      data: '',
      isEdit: true

    }
  }

  componentDidMount(id) {
    var value = sessionStorage.getItem('PROJECTCREWId');  
    var Efid = sessionStorage.getItem('PROJECTCREWefid');  
    console.log(value,'project')
    console.log(Efid,'project')
    
    // console.log(projectid,'pro123')
    console.log(this.props.match.params.id)
    // console.log(item.attributes.projectid,"23456")
    console.log(this.props.match.params.projectid,"23456")
    axios({
      method: "GET",
      url: CMS_STRAPI_URL + "/api/projects/" + this.props.match.params.id,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => {
        console.log(response.data.data, 'error');
        this.setState({
          name: response.data.data.attributes.name,
          customerid: response.data.data.attributes.customerid,
          customername: response.data.data.attributes.customername,
          engineeringfirmid: response.data.data.attributes.engineeringfirmid,
          engineeringfirmname: response.data.data.attributes.engineeringfirmname,
          engineerids: response.data.data.attributes.engineerids,
          engineernames: response.data.data.attributes.engineernames,
          address: response.data.data.attributes.address,
          latitude: response.data.data.attributes.latitude,
          longitude: response.data.data.attributes.longitude,
          city: response.data.data.attributes.city,
          state: response.data.data.attributes.state,
          status: response.data.data.attributes.status,
          estimateid: response.data.data.attributes.estimateid,
          orderid: response.data.data.attributes.orderid,
          remarks: response.data.data.attributes.remarks,
        })
      })
  }

  edit = () => {
    this.setState({
      isEdit: false
    })


  }

  handleEdit = (id) => {
    this.props.history.push({ pathname: '/project' })
  }

  handleBack = () => {
    this.props.history.push({ pathname: '/crewview' })

  }

  handleUpdate = () => {
    const { name, customerid, remarks, orderid, estimateid, longitude, city, status, state, latitude, address, customername, engineeringfirmid, engineeringfirmname, engineerids, engineernames } = this.state
    console.log(this.props.match.params.id)
    axios({
      method: "PUT",
      url: CMS_STRAPI_URL + "/api/projects/" + this.props.match.params.id,
      data: {
        data: {
          "name": name,
          "customerid": customerid,
          "customername": customername,
          "engineeringfirmid": engineeringfirmid,
          "engineeringfirmname": engineeringfirmname,
          "engineerids": engineerids,
          "engineernames": engineernames,
          "address": address,
          "latitude": latitude,
          "longitude": longitude,
          "city": city,
          "state": state,
          "status": status,
          "estimateid": estimateid,
          "orderid": orderid,
          "remarks": remarks

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
      toast.error("Can't Update Projects");
    });
  }

// Engineer


handleApprove = (item) => {
  var value = sessionStorage.getItem('PROJECTCREWId');  
  var Efid = sessionStorage.getItem('PROJECTCREWefid');

  var efif = JSON.parse(Efid, 'PROJECTCREWefid');
  const PROJECTCREWefid = efif.replaceAll("%22", "");

  var projectid = JSON.parse(value, 'PROJECTCREWId');
  const PROJECTCREWId = projectid.replaceAll("%22", "");
  
  const userName = (JSON.parse(localStorage.getItem('userData')).username)
  axios({
      method: "GET",
      url: CMS_STRAPI_URL + "/api/onboard/engineerapproval/"+userName + "/" + PROJECTCREWId + "/" + PROJECTCREWefid + "/approved",
      headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
  })
      .then(response => {
          console.log(response)
          setTimeout(() => {
              toast.success("Job Accepted");
          }, 100);
          this.props.history.push({ pathname: '/crew' })
      })
      .catch((error) => {
          console.log(error);

      });
}


handleReject = (item) => {
  var value = sessionStorage.getItem('PROJECTCREWId');  
  var Efid = sessionStorage.getItem('PROJECTCREWefid');
  var efif = JSON.parse(Efid, 'PROJECTCREWefid');
  const PROJECTCREWefid = efif.replaceAll("%22", "");

  var projectid = JSON.parse(value, 'PROJECTCREWId');
  const PROJECTCREWId = projectid.replaceAll("%22", "");
  const userName = (JSON.parse(localStorage.getItem('userData')).username)
  axios({
      method: "GET",
      url: CMS_STRAPI_URL + "/api/onboard/engineerapproval/" + userName + "/" + PROJECTCREWId + "/" + PROJECTCREWefid + "/rejected",
      headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
  })
      .then(response => {
          console.log(response)
          setTimeout(() => {
              toast.success("Job Rejected");
          }, 100);
          this.props.history.push({ pathname: '/crew' })
      })
      .catch((error) => {
          console.log(error);

      });
}


  render() {
    const { name,item, isEdit, customerid, customername, remarks, orderid, status, state, engineeringfirmid, estimateid, city, longitude, engineeringfirmname, latitude, engineerids, engineernames, address, dataList, userType, data } = this.state;
    // const total = 0;
    return (
      <Fragment>
        <Breadcrumb title="Project Detail" />
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
                        {/* <h6>Account Information</h6> */}
                        <div className="form-group">
                          <label className="col-form-label"> Name</label>
                          <input className="form-control" value={name} readOnly={isEdit} onChange={e => this.setState({ name: e.target.value })} />
                        </div>
                        <div className="form-group">
                          <label className="col-form-label">Customer Id</label>
                          <input className="form-control" value={customerid} readOnly={isEdit} onChange={e => this.setState({ customerid: e.target.value })} />
                        </div>
                        <div className="form-group">
                          <label className="col-form-label">Customer Name</label>
                          <input className="form-control" value={customername} readOnly={isEdit} onChange={e => this.setState({ customername: e.target.value })} />
                        </div>

                        <div className="form-group">
                          <label className="col-form-label">Engineering Firm Id</label>
                          <input className="form-control" type="country" value={engineeringfirmid} readOnly={isEdit} onChange={e => this.setState({ engineeringfirmid: e.target.value })} />
                        </div>

                        <div className="form-group">
                          <label className="col-form-label">Engineering Firm Name</label>
                          <input className="form-control" type="state" value={engineeringfirmname} readOnly={isEdit} onChange={e => this.setState({ engineeringfirmname: e.target.value })} />
                        </div>

                        {/* <div className="form-group">
                          <label className="col-form-label">Address</label>
                          <input className="form-control" type="country" value={address} readOnly={isEdit} onChange={e => this.setState({ address: e.target.value })} />
                        </div> */}

                        {/* <div className="form-group">
                          <label className="col-form-label">Latitude</label>
                          <input className="form-control" type="state" value={latitude} readOnly={isEdit} onChange={e => this.setState({ latitude: e.target.value })} />
                        </div> */}

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
                          
                        </div>

                        <div className="form-group">
                          <label className="col-form-label">Engineer Id</label>
                          <input className="form-control" type="country" value={engineerids} readOnly={isEdit} onChange={e => this.setState({ engineerids: e.target.value })} />
                        </div>

                        <div className="form-group">
                          <label className="col-form-label">Engineer Name</label>
                          <input className="form-control" type="state" value={engineernames} readOnly={isEdit} onChange={e => this.setState({ engineernames: e.target.value })} />
                        </div>

                        {userType === "customer" && (
                          <div class="col-12">
                            <button className="btn btn-secondary float-right" onClick={() => { this.handleEdit() }} >Back</button>
                          </div>
                        )}
                        {userType === "engineeringfirm" && (
                          <div class="col-12">
                            <button className="btn btn-secondary float-right" onClick={() => { this.handleEdit() }} >Back</button>
                          </div>
                        )}
                        {userType === "engineer" && (
                          <div class="col-12">
                            <button className="btn btn-secondary float-right" onClick={() => { this.handleBack() }} >Back</button>
                          </div>
                        )}
                     
                        {/* <div className="form-group">
                          <label htmlFor="exampleInputPassword1">Longitude</label>
                          <input className="form-control" value={longitude} readOnly={isEdit} onChange={e => this.setState({ longitude: e.target.value })} />
                        </div> */}
                        {/* <div className="form-group">
                          <label htmlFor="exampleInputPassword1">City</label>
                          <input className="form-control" value={city} readOnly={isEdit} onChange={e => this.setState({ city: e.target.value })} />
                        </div> */}

                        {/* <div className="form-group">
                          <label className="col-form-label">State</label>
                          <input className="form-control" value={state} readOnly={isEdit} onChange={e => this.setState({ state: e.target.value })} />
                        </div> */}
                        {/* <div className="form-group">
                          <label className="col-form-label">Status</label>
                          <input className="form-control" value={status} readOnly={isEdit} onChange={e => this.setState({ status: e.target.value })} />
                        </div> */}

                        {/* <div className="form-group">
                          <label className="col-form-label">Estimate Id</label>
                          <input className="form-control" value={estimateid} readOnly={isEdit} onChange={e => this.setState({ estimateid: e.target.value })} />
                        </div>
                        <div className="form-group">
                          <label className="col-form-label">Order Id</label>
                          <input className="form-control" value={orderid} readOnly={isEdit} onChange={e => this.setState({ orderid: e.target.value })} />
                        </div>
                        <div className="form-group">
                          <label className="col-form-label">Remarks</label>
                          <input className="form-control" value={remarks} readOnly={isEdit} onChange={e => this.setState({ remarks: e.target.value })} />
                        </div> */}

                      </form>
                    </div>
                    {/* <div className="card-footer">
                      {isEdit ?
                    <button className="btn btn-primary mr-1" onClick={() => { this.edit('isEdit') }}>Edit</button>:
                    <button className="btn btn-primary mr-1" onClick={()=> {this.handleUpdate()}}>Update</button>
                   }   

                 <button className="btn btn-secondary" onClick={() => { this.handleEdit() }} >Back</button>
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

export default jobProject;