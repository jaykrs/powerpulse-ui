import React, { Fragment, Component } from 'react';
import axios from 'axios';
import Image from '../../assets/images/man.png';
import Breadcrumb from '../common/breadcrumb';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';


class Order extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: localStorage.getItem('jwt'),
      userId: localStorage.getItem('userId'),
      userType: localStorage.getItem('userType'),
      order: [],

    }
  }

  componentWillMount() {
    const customerid = (JSON.parse(localStorage.getItem('userData')).username)
    // console.log(engineeringfirmid,'engineeringfirmid')
    axios({
      method: "GET",
      url: CMS_STRAPI_URL + "/api/orders?filters[customerid][$eq]=" + customerid,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => {
        console.log(response.data.data, 'efid')
        this.setState({
          order: response.data.data
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleEdit(id) {
    this.props.history.push({ pathname: '/orderview/' + id })
  }

  handleget(projectestimateid) {
    this.props.history.push({ pathname: '/projectestimate/' + projectestimateid })

  }

  render() {
    const { order } = this.state
    return (
      <Fragment>
        <Breadcrumb title="Order List" />
        <div className="container-fluid">
          <div className="row">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr className="border-bottom-primary">
                    <th scope="col">#</th>
                    <th scope="col"> Engineer Firm Name</th>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Payment Status</th>
                    <th scope="col">Project Estimate Id</th>
                    <th scope="col">View</th>
                  </tr>
                </thead>
                {/* <div className="col-sm-12"> */}
                {/* <div className="card"> */}
                {!!order && order.length > 0 && order.map((item, index) => {
                  return (
                    // <div style={{ display: 'flex', justifyContent: 'center' }}>
                    //   <div class="mt-4 col-lg-12 col-sm-6">
                    //     <div class="project-box" style={{ backgroundColor: '#fbfbfb', borderRadius: '5px', border: '1px solid #ebd61c', padding: '20px', position: 'relative' }}>
                    //       <div style={{ display: 'flex', justifyContent: 'end', }}>
                    //         {/* <text class="badge badge-primary">Doing</text> */}
                    //         {/* onClick={() => { this.handleEdit(item.id) }} */}
                    //         <a className="btn btn-pill btn-primary" data-toggle="tooltip" title="btn btn-primary" role="button" onClick={() => { this.handleEdit(item.id) }}><i class="bi bi-arrow-right" ></i></a>

                    //       </div>
                    //       <h5 class="f-w-600">{item.attributes.efid}</h5>
                    //       <div class="d-flex align-items-center"><img class="img-20 me-1 rounded-circle"
                    //         src={Image} alt="" />
                    //         <div class="flex-grow-1">
                    //           <text>{item.attributes.customerid}</text>
                    //         </div>
                    //       </div>
                    //       {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p> */}
                    //       <div class="details row mt-4">
                    //         <div class="col-6"><span>Amount</span></div>
                    //         <div class="text-primary col-6">{item.attributes.amount}</div>
                    //         <div class="col-6"> <span>Currency</span></div>
                    //         <div class="text-primary col-6">{item.attributes.currency}</div>
                    //         <div class="col-6"> <span>Payment Method</span></div>
                    //         <div class="text-primary col-6">{item.attributes.paymentMethod}</div>
                    //       </div>


                    //     </div>
                    //   </div>
                    // </div>
                    <tbody>
                      <tr className="border-bottom-secondary">
                        <th scope="row">{index + 1}</th>
                        <td>{item.attributes.efname}</td>
                        <td>{item.attributes.customername}</td>
                        <td>{item.attributes.paymentstatus}</td>

                        <td>
                          <div class="text-primary col-6" onClick={() => { this.handleget(item.attributes.projectestimateid) }}>
                            <a >{item.attributes.projectestimateid}</a>
                            <text style={{ marginLeft: '10px' }}>See Project Estimate Details</text>
                          </div>
                          {/* {item.attributes.projectestimateid} */}
                        </td>
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
            {/* </div> */}
            {/* </div> */}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Order;
