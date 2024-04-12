import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Image from '../../../assets/images/man.png';
import data from '../../../jsonData/data.json';
import { Link } from 'react-feather';
import { componentDidMount } from "react";
const CommercialList = (props) => {
    let history = useHistory();
    const History = history.location.state

    const [landingPageData, setLandingPageData] = useState({ ...data.About });
    const [priceQuote, setPriceQuote] = useState([]);
    const [efpricingsList, setEfpricingsList] = useState(localStorage.getItem(""))

    useEffect(() => {
        console.log(history.location.state, 'popadadsr')
        var value = sessionStorage.getItem('priceData')
        var data = JSON.parse(value)
        console.log(data)
        axios({
            method: "GET",
            url: "https://api.mohandess.com/api/efcpricings",
            data: data,
        }).then((response) => {
            setEfpricingsList(response.data.data)
            console.log(response.data, 'adrpricequet');
        }, (err) => {
            console.log(err)
        });
    }, []);

    const handleSubmit = (response) => {
        // console.log(response);
        var List = JSON.stringify(response)
        sessionStorage.setItem('priceList', List)
        console.log(response)
        history.push({
            pathname: '/detailslist',
            // state: 'item'
        })
    }

    const handleBack = () => {
        history.push({
            pathname: '/home',
            // state: 'item'
        })
    }

    return (
        <>
            <Fragment>
                {/* <Breadcrumb title="Engineering Firm List" parent="Card" /> */}
                <div className="container-fluid ">
                    <div className="row pt-4">

                        <h4 className="pl-4 pt-4"><i onClick={() => handleBack()} class="bi bi-arrow-left" style={{ fontSize: "2rem" }}></i>&nbsp;Engineering Firm Pricing</h4>
                        <div>

                        </div>
                        <div className="col-sm-12">
                            {!!efpricingsList && efpricingsList.length > 0 && efpricingsList.map((item, index) => {
                                return (
                                    <div key={item.id} className="card shadow-0 border">
                                        <div className="card-header">
                                            <div class="d-flex align-items-center">
                                                <img className="img-50 me-1 rounded-circle" src={Image} alt="header-user" />
                                                <div class="flex-grow-1">
                                                    <h6>{item.attributes.efname}</h6>
                                                </div>
                                                <div class="flex-grow-1">
                                                    <div className='d-flex align-items-center'>
                                                        <div class="flex-grow-1">
                                                            <ul className="nav navbar-nav navbar">
                                                                <li><h6><span>Survey</span></h6>
                                                                    <ul className='menu' style={{fontSize:"10px"}}>
                                                                        <li><a>Floor(1-7): {item.attributes.sur1to7} SAR</a></li>
                                                                        <li><a>Floor(8-15): {item.attributes.sur8to15} SAR</a></li>
                                                                        <li><a>Floor(15+): {item.attributes.sur15plus} SAR</a></li>
                                                                    </ul>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div class="flex-grow-1">
                                                        <ul className="nav navbar-nav navbar">
                                                        <li><h6><span>Supervision</span></h6>
                                                            <ul className='menu' style={{fontSize:"10px"}}>
                                                                <li><a>Floor(1-7): {item.attributes.sup1to7} SAR</a></li>
                                                                <li><a>Floor(8-15): {item.attributes.sup8to15} SAR</a></li>
                                                                <li><a>Floor(15+): {item.attributes.sup15plus} SAR</a></li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                        </div>
                                                        <div class="flex-grow-1">
                                                        <ul className="nav navbar-nav navbar">
                                                        <li><h6><span>Design</span></h6>
                                                            <ul className='menu' style={{fontSize:"10px"}}>
                                                                <li><a>Floor(1-7): {item.attributes.des1to7} SAR</a></li>
                                                                <li><a>Floor(8-15): {item.attributes.des8to15} SAR</a></li>
                                                                <li><a>Floor(15+): {item.attributes.des15plus} SAR</a></li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                 
                                                <div class="flex-grow-3">
                                                    <div class="col px-md-5"> 
                                                    <p>SERVICE CITY</p>
                                                    <p style={{fontSize:"11px"}}>{item.attributes.servicecity}</p>
                                                    </div>
                                                </div>

                                                <div class="flex-grow-3">
                                                    <div class="col px-md-5"> <p>Project Count :{item.attributes.projectcount} </p></div>
                                                </div>
                                                <div class="flex-grow-3">
                                                <button onClick={() => handleSubmit(item)} class="btn btn-primary float-right ">Next</button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </Fragment>
        </>
    );
}

export default CommercialList;
