import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Image from '../../../assets/images/man.png';
import data from '../../../jsonData/data.json';
const Engfirmlist = (props) => {
    let history = useHistory();
    const History = history.location.state

    const [landingPageData, setLandingPageData] = useState({ ...data.About });
    const [priceQuote, setPriceQuote] = useState([]);

    useEffect(() => {
        console.log(history.location.state, 'popadadsr')
        var value = sessionStorage.getItem('priceData')
        var data = JSON.parse(value)
        console.log(data)
        axios({
            method: "POST",
            url: "https://api.mohandess.com/api/onboard/pricequote",
            data: data,
        }).then((response) => {
            setPriceQuote(response.data)
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

                        <h4 className="pl-4 pt-4"><i onClick={() => handleBack()} class="bi bi-arrow-left" style={{ fontSize: "2rem" }}></i>&nbsp;Engineering Firm List</h4>
                        <div>

                        </div>
                        <div className="col-sm-12">
                            {!!priceQuote && priceQuote.length > 0 && priceQuote.map((item, index) => {
                                return (
                                    <div key={index + "pricequote"} className="card shadow-0 border">
                                        <div className="card-header">
                                            <div class="d-flex align-items-center">
                                                <img className="img-50 me-1 rounded-circle" src={Image} alt="header-user" />
                                                <div class="flex-grow-1">
                                                    <h5>{item.efName}</h5>
                                                </div>
                                                <div class="flex-grow-1">
                                                <div class="col px-md-5">SAR <text style={{fontSize:'20px',fontWeight:'bold'}}> {Math.round(item.price)}</text></div>
                                                </div>

                                                <div class="flex-grow-3">
                                                <div class="col px-md-5"> <p>Project Count : {item.projectCount}</p></div>
                                                </div>
                                            </div>
                                         
                                        </div>
                                        <div className="card-body btn-showcase">
                                            <button onClick={() => handleSubmit(item)} class="btn btn-primary float-right ">Next</button>

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

export default Engfirmlist;
