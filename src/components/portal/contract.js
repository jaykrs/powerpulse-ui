import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { toast } from "react-toastify";
import Image from '../../assets/images/man.png';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import Breadcrumb from '../common/breadcrumb';
// import { jobForm } from '.';

class Contract extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: localStorage.getItem('jwt'),
      userId: localStorage.getItem('userId'),
      dataList: [],
      userType: localStorage.getItem('userType'),

      data: '',
      contracts: [],
      isEdit: true
    }
  }


  // edit = () => {   
  //   this.setState({
  //     isEdit: false
  //   })
  // }

  componentWillMount() {
    const customerid = (JSON.parse(localStorage.getItem('userData')).username)
    var userType = localStorage.getItem('userType')
    // console.log(engineeringfirmid,'engineeringfirmid')
    if (userType === 'engineeringfirm') {
      axios({
        method: "GET",
        url: CMS_STRAPI_URL + "/api/contracts?filters[engineeringfirmid][$eq]=" + customerid,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((response) => {
          console.log(response.data.data)
          this.setState({
            contracts: response.data.data
          })
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (userType === 'customer') {
      axios({
        method: "GET",
        url: CMS_STRAPI_URL + "/api/contracts?filters[customerid][$eq]=" + customerid,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((response) => {
          console.log(response.data.data)
          this.setState({
            contracts: response.data.data
          })
        })
        .catch((error) => {
          console.log(error);
        });
    }

  }

  handleEdit(id) {
    this.props.history.push({ pathname: '/contractlist/' + id })
  }

  handleget(projectestimateid) {
    this.props.history.push({ pathname: '/projectestimate/' + projectestimateid })

  }





  render() {
    const { isEdit, contracts, userType } = this.state;
    return (
      <Fragment>
        <Breadcrumb title="All Contracts" />
        <div className="container-fluid">
          <div className="row">
            {/* <div className="col-sm-12"> */}
            <div class="container">
              <div className="row">

                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr className="border-bottom-primary">
                        <th scope="col">#</th>
                        <th scope="col"> Engineer Firm Name</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Project Id</th>
                        <th scope="col">Project Estimate Id</th>
                        <th scope="col">View</th>
                      </tr>
                    </thead>
                    {!!contracts && contracts.length > 0 && contracts.map((item, index) => {
                      return (
                        // <div class="mt-4 col-lg-6 col-sm-6">
                    //   <div class="project-box" style={{ backgroundColor: '#fbfbfb', borderRadius: '5px', border: '1px solid #ebd61c', padding: '20px', position: 'relative' }}>
                    //     <div style={{ display: 'flex', justifyContent: 'end', }}>
                    //       <a className="btn btn-pill btn-primary" data-toggle="tooltip" title="btn btn-primary" role="button" onClick={() => { this.handleEdit(item.id) }}><i class="bi bi-arrow-right" ></i></a>
                    //     </div>
                    //     <h5 class="f-w-600">{item.attributes.engineeringfirmname}</h5>
                    //     <div class="d-flex align-items-center"><img class="img-20 me-1 rounded-circle"
                    //       src={Image} alt="" />
                    //       <div class="flex-grow-1">
                    //         <text>{item.attributes.customername}</text>
                    //       </div>
                    //     </div>
                    //     <div class="details row mt-4">
                    //       <div class="col-6"><span>Project Id </span></div>
                    //       <div class="text-primary col-6">{item.attributes.projectid}</div>
                    //       <div class="col-6"> <span>Project Estimate Id</span></div>
                    //       <div class="text-primary col-6" onClick={() => { this.handleget(item.attributes.projectestimateid) }}><a >{item.attributes.projectestimateid}</a><text style={{ marginLeft: '10px' }}>See Project Estimate Details</text></div>
                    //     </div>
                    //   </div>
                    // </div>
                        <tbody>
                          <tr className="border-bottom-secondary">
                            <th scope="row">{index + 1}</th>
                            <td>{item.attributes.engineeringfirmname}</td>
                            <td>{item.attributes.customername}</td>
                            <td>{item.attributes.projectid}</td>
                            <td>{item.attributes.projectestimateid} </td>
                            {/* <td>{item.attributes.state}</td> */}
                            <td>
                              <a className="btn btn-pill btn-primary" data-toggle="tooltip" title="btn btn-primary" role="button" onClick={() => { this.handleEdit(item.id) }}><i class="bi bi-arrow-right" ></i></a>

                            </td>
                          </tr>
                        </tbody>
                      )
                    })}
                  </table>
                </div>

              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Contract;