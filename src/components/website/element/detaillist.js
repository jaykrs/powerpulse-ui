import React, { Fragment, useState, useEffect } from 'react';
import data from '../../../jsonData/data.json';
import image from './../images/about/about.jpg';
import Breadcrumb from '../../common/breadcrumb';
import Image from '../../../assets/images/man.png';

import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
const DetailList = (props) => {
    // const data = 'efName' 
    const history = useHistory();
    const [data, setData] = useState([]);

    useEffect(() => {
        var List = sessionStorage.getItem('priceList')
        var data = JSON.parse(List)
        setData(data)

    }, [])

    const handleClick = () => {
        var jwt = localStorage.getItem("jwt")
        if (jwt === "" || jwt == null || !jwt) {
            history.push({ pathname: "login" })
        } else {
            history.push({ pathname: "paymentlist" })
        }
    }
    const handleBack = () => {
        history.push({
            pathname: '/efirmlist',
            // state: 'item'
        })
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="col-sm-12 col-xl-8">
                <div className="card">
                    <h4 className="pl-4 pt-4">Engineering Firm</h4>
                    <div className="card-header">
                        <div class="d-flex align-items-center">
                            <img className="img-50 me-1 rounded-circle" src={Image} alt="header-user" />
                            <div class="flex-grow-1">
                                <h5>{data.efName}</h5>
                            </div>

                            <div class="flex-grow-1">
                                <div class="col px-md-5">SAR <text style={{ fontSize: '20px', fontWeight: 'bold' }}> {Math.round(data.price + data.tax + data.platformfee)}</text></div>

                            </div>

                            <div class="flex-grow-1">
                                <div class="col px-md-5"> <p>Project Count : {data.projectCount}</p></div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body bg-primary">
                        <p>{data.desc}</p>

                    </div>
                    <div className="card-body btn-showcase">
                        <button onClick={() => handleClick()} class="btn btn-primary float-right ">Proceed to Payment</button>
                        <button onClick={() => handleBack()} class="btn btn-secondary float-right">Back</button>

                    </div>
                </div>
            </div>


        </div>
    );
}

export default DetailList;
