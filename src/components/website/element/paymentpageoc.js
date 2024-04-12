import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import card from '../../../assets/images/ecommerce/card.png';
import masterCard from '../../../assets/images/ecommerce/mastercard.png';
import visa from '../../../assets/images/ecommerce/visa.png';
import paypal from '../../../assets/images/ecommerce/paypal.png';
import Image from '../../../assets/images/man.png';
import axios from 'axios';
import { listenBySelector } from '@fullcalendar/react';
import { useHistory, useLocation } from 'react-router';

const PaymentPagOc = () => {
    let history = useHistory();
    const [data, setData] = useState([]);
    const [paymentType, setPaymentType] = useState();

    
    const search = useLocation().search;
    const userid = new URLSearchParams(search).get("userid");
    const replacedEmail = userid.replaceAll("`", "");


    // console.log(replacedEmail, 'wert');//12345

    
    const handleChange = e => {
        const target = e.target;
        if (target.checked) {
            setPaymentType(target.value);
            var Payment = JSON.stringify(target.value);
            sessionStorage.setItem('PaymentMethodOc', Payment);
            console.log(Payment, 'PaymentMethod')
        }
    };


    const handleSubmit = () => {
        const localdata = {
            email: replacedEmail,
            paymentMethod: paymentType,
        };

        axios({
            method: "POST",
            url: "https://api.mohandess.com/api/onboard/outsource/getcheckout",
            data: localdata,
        }).then((response) => {
            console.log(response.data.id,'ANAND')
             var List = JSON.stringify(response.data.id)
            sessionStorage.setItem('checkOutIdOC', List)
            history.push({
                pathname: '/checkoutoc'
            })
        }, (err) => {
            console.log(err)
        });
    }



    return (
        <div className="container-fluid credit-card ">
            <div className="card shadow-0 border">
                {/* <!-- Individual column searching (text inputs) Starts--> */}
                <div className="col-12">
                    <div className="card ">
                        <div className="card-header">
                            <h5>Payment Details </h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4 text-center"><img className="img-fluid" src={card} alt="" /></div>
                                <div className="col-md-8">
                                    <div className='row'>
                                        <div className='col-sm-6'>
                                            <div class="d-flex align-items-center">
                                                <img className="img-50 me-1 rounded-circle" src={Image} alt="header-user" />
                                                <div class="flex-grow-1">
                                                    <h5>{replacedEmail}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className='row'>
                                            <p style={{ fontSize: '14px' }}>{data.desc}</p>
                                        </div>
                                        <div style={{ marginTop: '8px' }} className='row'>
                                            <div className='col-sm-6'>
                                                <div class="col px-md-5">SAR <text style={{ fontSize: '20px', fontWeight: 'bold' }}> 200</text></div>
                                                {/* {Math.round(data.price)} */}

                                            </div>
                                            <div className='col-sm-6'>
                                                <h5>payment Method</h5>
                                                <div>
                                                    <label style={{ fontSize: '15px' }} class="radiobtn px-2"><input type="radio" value="credit" checked={paymentType == 'credit'} onChange={handleChange} />Credit Debit Card </label>
                                                </div>
                                                <div>
                                                    <label style={{ fontSize: '15px' }} class="radiobtn px-2"><input type="radio" value="mada" checked={paymentType == 'mada'} onChange={handleChange} />Mada </label>
                                                </div>

                                            </div>
                                        </div>


                                    </div>


                                    <div className="card-body btn-showcase">
                                        <button onClick={() => handleSubmit()} class="btn btn-primary float-right ">Next</button>
                                        <button class="btn btn-secondary float-right">Back</button>
                                        {/* onClick={() => handleBack()} */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PaymentPagOc;
