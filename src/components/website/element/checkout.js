import React, { Component } from 'react';
import axios from 'axios';

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkoutId: '',
            loading: false
        }
    }

    renderPaymentform = () => {
        var value = sessionStorage.getItem('checkOutId')
        var checkOutId = JSON.parse(value)
        
        const script = document.createElement("script");

        script.src = `https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkOutId}`;
        script.async = true;

        document.body.appendChild(script);

        const form = document.createElement("form")
        form.action = "http://localhost:3000/#/resultpage";
        form.setAttribute("class", "paymentWidgets");
        form.setAttribute("data-brands", "VISA MASTER AMEX")
        document.body.appendChild(form);
    }

    render() {
            return (
                <div style={{ marginTop: '20px' }}>
                    {this.renderPaymentform()}
                </div>
            );
    }
}

export default Checkout;