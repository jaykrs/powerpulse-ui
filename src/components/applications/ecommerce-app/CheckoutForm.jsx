import React, { useState, useEffect } from "react";

import axios from 'axios';
import { CMS_STRAPI_URL, STRIPE_PAY_URL } from '../../../constant/serviceurl';
import { LabelConstants } from '../../../constant/LableConstant';

import { toast } from 'react-toastify';
import { withRouter } from "react-router";
import Modal from "react-responsive-modal";

function CheckoutForm({ history }) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [date, setDate] = useState(new Date().getDate() + '-' + (Number(new Date().getMonth()) + 1) + '-' + new Date().getFullYear());
  const [disabled, setDisabled] = useState(true);
  const [open, setOpen] = useState(false);
  const [transaction, setTransaction] = useState();
  const [totalAdvPost, setTotalAdvPost] = useState();
  const [totalAdvSpending, setTotalAdvSpending] = useState();
  const [orderId, setOrderId] = useState(localStorage.getItem('pgid'));
  const [userTypeId, setUserTypeId] = useState(localStorage.getItem('userTypeId'));
  const [clientSecret, setClientSecret] = useState('');


  const [jwt, setJwt] = useState(localStorage.getItem('jwt'));
  const [paymentIndicator, setPaymentIndicator] = useState(false);
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads

    fetch(CMS_STRAPI_URL + "/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: localStorage.getItem("pgid"),
        amount: localStorage.getItem("pgprice"),
        currency: localStorage.getItem("pgcurrency"),
        description: localStorage.getItem("pgdesc"),
        name: localStorage.getItem("pgname"),
        adline1: localStorage.getItem("pgaddrline1"),
        adpostal_code: localStorage.getItem("pgpostcode"),
        adcity: localStorage.getItem("pgcity"),
        adstate: localStorage.getItem("pgstate"),
        adcountry: localStorage.getItem("pgcountry")
      }
      )
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setClientSecret(data.clientSecret);
        console.log(data.clientSecret);
      });
  }, []);
  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };
  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async ev => {
   
  };

  async function processCartforSuccess(cartId, transectionId) {
    await axios({
      method: 'put',
      url: CMS_STRAPI_URL + '/carts/' + cartId,
      headers: {
        Authorization:
          'Bearer ' + jwt,
      },
      data: {
        paymentstatus: true,
        paymentdate: new Date(),
        orderid: 'CIN-' + date + "-" + cartId,
        paymentremark: transectionId
      }
    }).then((response) => {
      var jobpost = response.data.jobposts;
      var totalSpending = null != response.data.agency.TOTAL_SPENDING ? (Number(response.data.agency.TOTAL_SPENDING) + Number(response.data.amount)) : Number(response.data.amount);
      var postCount = 0;
      var totalPostCount = null != response.data.agency.JOB_POST_COUNT ? Number(response.data.agency.JOB_POST_COUNT) : 0;     
      for (var i = 0; i < jobpost.length; i++) {
        postCount = Number(postCount) + Number(jobpost[i].postcount)
        processJobPostforSuccess(jobpost[i].id);
      }

      axios({
        method: 'put',
        url: CMS_STRAPI_URL + '/agencies/' + userTypeId,
        headers: {
          Authorization:
            'Bearer ' + jwt,
        },
        data: {
          JOB_POST_COUNT: (Number(postCount) + Number(totalPostCount)),
          TOTAL_SPENDING: totalSpending
        }
      }).then((response) => {
        setOpen(true)
        axios({
          method: 'GET',
          url: CMS_STRAPI_URL + '/create-payment-intent/'+cartId
        }).then((response) => {
        })

      })
     
    })
  }

  async function processJobPostforSuccess(jobPostId) {
    await axios({
      method: 'put',
      url: CMS_STRAPI_URL + '/jobposts/' + jobPostId,
      headers: {
        Authorization:
          'Bearer ' + jwt,
      },
      data: {
        paymentind: true,
        paymentdate: new Date()
      }
    }).then((response) => {
      setPaymentIndicator(true);
    })
  }

  function oncloseModle() {
    history.push("/user/jobPost")
  } 

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
     
      <button className="btn btn-primary-gradien btn-block"
        disabled={processing || disabled || succeeded}
        id="submit"
      >
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
              "Pay"
            )}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        {" "}
      </p>
      <Modal open={open} onClose={oncloseModle} center>
        <div className="pt-3 pb-3 pr-1 pl-1 text-center" style={{ width: 500, height: 200 }}>
          <h3>Payment Successful</h3>
          <text className="mr-auto ">Order ID : CIN-{date}-{orderId}</text><br />

          <text className="ml-auto ">Transaction ID : {transaction}</text>
          <div className=" pt-5"></div>
          <div className="btn btn-primary" onClick={oncloseModle}>Done</div>
        </div>
      </Modal>
    </form>
  );
}

export default withRouter(CheckoutForm);