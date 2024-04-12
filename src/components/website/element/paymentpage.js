import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import card from '../../../assets/images/ecommerce/card.png';
import masterCard from '../../../assets/images/ecommerce/mastercard.png';
import visa from '../../../assets/images/ecommerce/visa.png';
import paypal from '../../../assets/images/ecommerce/paypal.png';

import Image from '../../../assets/images/man.png';
import axios from 'axios';
import { listenBySelector } from '@fullcalendar/react';
import { useHistory } from 'react-router';

const PaymentPage = () => {
    let history = useHistory();
    const [data, setData] = useState([]);
    const [paymentType, setPaymentType] = useState();

    const [visaMaster, setvisaMaster] = useState()
    const [mada, setmada] = useState()
    const [ap, setAp] = useState()
    const [priceQuote, setpriceQuote] = useState()
    const [price, setprice] = useState()
    const [efname, setefname] = useState()
    const [efid, setefid] = useState()
    const [deviceid, setdeviceid] = useState()
    const [id, setid] = useState()
    const [username, setusername] = useState()
    const [name, setname] = useState()
    const [tax, setTax] = useState()
    const [platformfee, setPlatformfee] = useState()

    const [localdata, setlocaldata] = useState()

    // const [Paymentset, setPaymentset] = useState({
    //     // 'priceQuoteId': priceQuote,
    //     amount: price,
    //     efname: efname,
    //     efid: efid,
    //     deviceid: deviceid,
    //     paymentMethod: "",
    //     customerid: username,
    //     customername: name
    // })


    useEffect(() => {
        var List = sessionStorage.getItem('priceList')
        var data = JSON.parse(List)
        setData(data)

    }, [])

    const handleSubmit = () => {
        let jwt = JSON.parse(localStorage.getItem("userData"))
        setid(jwt.name)
        setusername(jwt.username)
        // console.log(jwt, 'jwt')

        let List = JSON.parse(sessionStorage.getItem('priceList'))
        // console.log(List, 'ww')
        setefname(List.efName)
        setprice(List.price)
        setefid(List.efid)
        setTax(List.tax)
        setPlatformfee(List.platformfee)

        let value = JSON.parse(sessionStorage.getItem('priceData'))
        setdeviceid(value.deviceid)
        // console.log(value, 'ttt')

        const localdata = {
            efname: List.efName,
            amount: Math.round(List.price).toString(),
            efid: List.efid,
            deviceid: value.deviceid,
            customerid: jwt.username,
            customerName: jwt.name,
            paymentMethod: paymentType,
            tax: List.tax,
            platformfee : List.platformfee

        };
        axios({
            method: "POST",
            url: "https://api.mohandess.com/api/onboard/checkout",
            data: localdata,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
        }).then((response) => {
            var List = JSON.stringify(response.data.id)
            sessionStorage.setItem('checkOutId', List)
            history.push({
                pathname: '/checkoutpage'
            })
        }, (err) => {
            console.log(err)
        });
    }

    const handleChange = e => {
        const target = e.target;
        if (target.checked) {
            setPaymentType(target.value);
            var Payment = JSON.stringify(target.value);
            sessionStorage.setItem('PaymentMethod', Payment);
            console.log(Payment, 'PaymentMethod')
        }
    };

    const handleBack = () => {
        history.push({
            pathname: '/detailslist',
            // state: 'item'
        })
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
                                                    <h5>{data.efName}</h5>
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
                                                <div class="col px-md-5">SAR <text style={{ fontSize: '20px', fontWeight: 'bold' }}> {Math.round(data.price + data.tax + data.platformfee)}</text></div>

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
                                        <button onClick={() => handleBack()} class="btn btn-secondary float-right">Back</button>

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

export default PaymentPage;
