import React, { Fragment, useState, useEffect, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import axios from 'axios';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

class OrderView extends Component {
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
    console.log(this.props.match.params.id)
    axios({
      method: "GET",
      url: CMS_STRAPI_URL + "/api/orders/" + this.props.match.params.id,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => {
        console.log(response.data.data, 'efiderror');
        this.setState({
          customerid: response.data.data.attributes.customerid,
          efid: response.data.data.attributes.efid,
          currency: response.data.data.attributes.currency,
          amount: response.data.data.attributes.amount,
          merchantTransactionId: response.data.data.attributes.merchantTransactionId,
          paymentMethod: response.data.data.attributes.paymentMethod,

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


  render() {
    const { name, isEdit, customerid, currency, efid, amount, merchantTransactionId, paymentMethod } = this.state;
    // const total = 0;
    return (
      <Fragment>
        <Breadcrumb title="Order Detail" />
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
                        <div className="form-group">
                          <label className="col-form-label"> Engineering Firm Id</label>
                          <input className="form-control" value={efid} readOnly={isEdit} onChange={e => this.setState({ efid: e.target.value })} />
                        </div>
                        <div className="form-group">
                          <label className="col-form-label">Customer Id</label>
                          <input className="form-control" value={customerid} readOnly={isEdit} onChange={e => this.setState({ customerid: e.target.value })} />
                        </div>
                        <div className="form-group">
                          <label className="col-form-label">Currency</label>
                          <input className="form-control" value={currency} readOnly={isEdit} onChange={e => this.setState({ currency: e.target.value })} />
                        </div>

                        <div className="form-group">
                          <label className="col-form-label">Amount</label>
                          <input className="form-control" type="country" value={amount} readOnly={isEdit} onChange={e => this.setState({ amount: e.target.value })} />
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
                        <div className="form-group">
                          <label htmlFor="exampleInputPassword1">Merchant Transaction Id</label>
                          <input className="form-control" value={merchantTransactionId} readOnly={isEdit} onChange={e => this.setState({ merchantTransactionId: e.target.value })} />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputPassword1">Payment Method</label>
                          <input className="form-control" value={paymentMethod} readOnly={isEdit} onChange={e => this.setState({ paymentMethod: e.target.value })} />
                        </div>
                      </form>
                    </div>
                    <div className="card-footer">
                      {/* {isEdit ?
                    <button className="btn btn-primary mr-1" onClick={() => { this.edit('isEdit') }}>Edit</button>:
                    <button className="btn btn-primary mr-1" onClick={()=> {this.handleUpdate()}}>Update</button>
                   }   */}

                      <button className="btn btn-secondary" onClick={() => { this.handleEdit() }} >Back</button>
                    </div>
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

export default OrderView;