import React, { Component } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import { Link } from 'react-router-dom';
class ResultListOc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responseData: null,
            loading: true
        }
    }

    componentDidMount() {
        var jwt = localStorage.getItem('jwt');
        var value = sessionStorage.getItem('checkOutIdOC');
        var checkOutIdOC = JSON.parse(value, 'valuecheckOutIdOC');

        var Email = sessionStorage.getItem('replacedEmail');
        var userid = JSON.parse(Email, 'replacedEmail');
        const replacedEmail = userid.replaceAll(" ", "");
        var payment = sessionStorage.getItem('PaymentMethodOc');
        var PaymentMethodOc = JSON.parse(payment);
        console.log(PaymentMethodOc, 'PaymentMethodOc')

        axios({
            method: "GET",
            url: "https://api.mohandess.com/api/onboard/outsource/paymentstatus/" + PaymentMethodOc + "/" + checkOutIdOC,
        }).then((response) => {
            console.log(response.data.result, "Resultgetcheckout")
            console.log(response.data.result.code, "Resultgetcheckout1")
            console.log(replacedEmail, "Resultgetcheckout1")
            if (response.data.result.code === '000.100.112') {
                axios({
                    method: "GET",
                    url: `https://api.mohandess.com/api/users?filters[email][$eq]=${replacedEmail}`,
                    
                }).then((response) => {
                    console.log(response.data[0].name,'data')
                    const replacedName = response.data[0].name.replaceAll(" ", "");
                    axios({
                        method: "GET",
                        url: `https://api.mohandess.com/api/onboard/verify/${response.data[0].email}/${response.data[0].emailotp}/${response.data[0].phoneotp}/${replacedName}`,
                       
                    }).then((response) => {
                        console.log(response)
                    }, (err) => {
                        console.log(err)
                    })
                }, (err) => {
                    console.log(err)
                })
            }

            this.setState({
                responseData: response,
                loading: false
            })
        }, (err) => {
            console.log(err)
        });
    }
    checkResult = () => {
        const successPattern = /^(000\.000\.|000\.100\.1|000\.[36])/;
        const manuallPattern = /^(000\.400\.0[^3]|000\.400\.100)/;

        const match1 = successPattern.test(this.state.responseData.result.code);
        const match2 = manuallPattern.test(this.state.responseData.result.code);
        console.log(match1, match2)
        if (match1 || match2) {
            return (
                <div>
                    <h1>Success</h1>
                    <h3>{this.state.responseData.result.description}</h3>
                </div>
            )



        } else {
            return (
                <div>
                    <h1>Failed</h1>
                    <h3>{this.state.responseData.result.description}</h3>
                </div>
            )
        }
    }
    render() {
        if (!this.state.loading) {
            return (

                <div style={{ margin: '20px' }} className="col-sm-12 col-xl-6">
                    <div className="card">
                        <div className="card-header b-l-primary border-3">
                            <h3>Payment Done.</h3>
                        </div>
                        <div className="card-body">
                            <Link to={"/login"}>Proceed To Login</Link>
                        </div>
                    </div>
                </div>



            );
        } else {
            return (
                <div>
                    <h1>Loading</h1>
                </div>
            );
        }

    }
}

export default ResultListOc;