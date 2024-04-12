import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typeahead } from 'react-bootstrap-typeahead';

import logo from '../assets/images/mohandess-ar-l-logo.png';
// import logo from "../assets/images/endless-logo-signin.png";
import { LabelConstants } from "../constant/LableConstant";
import { CMS_STRAPI_URL } from "../constant/serviceurl";
import { toast } from "react-toastify";
import comingsoon from '../assets/images/other-images/coming-soon-bg.jpg';
import authVideo from '../assets/video/auth-bg.mp4';
// import options from '../../data/typeaheadData';
import options from '../../src/data/typeaheadDataServiceCity';


const Login = ({ history }) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [usertype, setUserType] = useState();
    const [phone, setPhone] = useState();
    const [dialcode, setDialcode] = useState();
    const [ishidden, setIshidden] = useState(true)
    const [services, setServices] = useState([]);
    const [efname, setefname] = useState()

    // const [category, setCategory] = useState([]);
    const [country, setCountry] = useState([]);


    const ccode = require("./ccode.json");
    console.log(ishidden, 'false')




    const signup = async () => {

        let List = JSON.parse(sessionStorage.getItem('PROJECTLIST'))
        console.log(List.attributes.engineeringfirmid, 'wertyui')

        var re = /\S+@\S+\.\S+/;
        if (
            re.test(email) &&
            null != usertype &&
            usertype !== "select" &&
            null != name &&
            phone != null &&
            dialcode != null
        ) {
            const Regdata = {
                // data: {
                email,
                password,
                phone,
                dialcode,
                usertype,
                name,
                username: email,
                blocked: 'false'
                // },
            };
            const dataForRoleTypes = {
                data: {
                    email,
                    password,
                    phonenumber: phone,
                    dialcode,
                    name,
                    username: email,
                    services: Array.prototype.map.call(services, function (item) { return item.name; }).join(","),
                    country: "",
                    category: 'Foreign'
                },
            };

            // const projectcrewdata={
            //     category:'',
            //     efid:'',

            // }
            //   console.log(data);
            axios
                .post(`${CMS_STRAPI_URL}/api/auth/local/register`, Regdata)
                .then((response) => {
                    // localStorage.setItem("email_verify_key", email);
                    //   console.log("first:", response);
                    axios
                        .post(
                            `${CMS_STRAPI_URL}/api/${usertype === "engineeringfirm" ? "engineeringform" : usertype === "Customer" ? "customers" : usertype === "engineer" ? "engineer" : usertype === "outsourcecompany" ? "designercompanie" : usertype
                            }s`,
                            dataForRoleTypes,
                            {
                                headers: {
                                    Authorization: "Bearer " + response.data.jwt,
                                },
                            }
                        )
                        .then((response) => {
                            axios({
                                method: "POST",
                                url: CMS_STRAPI_URL + "/api/projectcrews",
                                data: {
                                    data: {
                                        "efname": List.attributes.efname,
                                        "efid": List.attributes.engineeringfirmid,
                                        "customerid": List.attributes.customerid,
                                        "engineer_category": "Foreign",
                                        "customername": List.attributes.customername,
                                        "isactive": false,
                                        "service": List.attributes.servicetype,
                                        "engineerid": email,
                                        "engineername": name,
                                        "projectid": List.id.toString(),
                                        "projectname": List.attributes.name,

                                    }
                                },
                                headers: {
                                    Authorization: "Bearer " + localStorage.getItem("jwt"),
                                },
                            })
                                .then((response) => {
                                    console.log(response);
                                    setTimeout(() => {
                                        toast.success("Job Request Sent");
                                    }, 100);
                                    history.push("/crew");
                                    // history.push({ pathname: '/projectcrew' })
                                })
                                .catch((error) => {
                                    console.log(error);

                                });

                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
                .catch((error) => {
                    console.log(error);
                });

        } else {
            alert("All Fields are mandatory");
            return;
        }
    };

    return (
        <Fragment>
            <div className="page-wrapper">
                <div className="container-fluid">
                    {/* <!-- sign up page start--> */}
                    <div className="auth-bg-video">
                        <video id="bgvid" poster={comingsoon} playsInline="" autoPlay={true} muted="" loop="" >
                            <source src={authVideo} type="video/mp4" />
                        </video>
                        <div>
                            <div className="row">
                                <div className="col-sm-12 p-0">
                                    <div>
                                        <div>
                                            {/* <div className="text-center">
                        <img src={logo} alt="" width="230px" />
                      </div> */}
                                            <div className="card mt-4 p-4">
                                                <h5 className="text-center">{LabelConstants.NEW_USER}</h5>
                                                <form className="theme-form">
                                                    <div>
                                                        <label className="col-form-label">
                                                            {LabelConstants.NAME}
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}
                                                            placeholder={LabelConstants.NAME}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="col-form-label">
                                                            {LabelConstants.EMAIL}
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            placeholder={LabelConstants.EMAIL_PLACEHOLDER}
                                                        />
                                                    </div>

                                                    <div >
                                                        <label className="col-form-label">
                                                            {LabelConstants.PASSWORD}
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            placeholder={LabelConstants.PASSWORD_PLACEHOLDER}
                                                        />
                                                    </div>

                                                    <div class="row">
                                                        <div class="col-md-4">
                                                            <div class="form-outline form-white">
                                                                <label className="col-form-label">Dail Code</label>
                                                                <select
                                                                    className="custom-select form-control"
                                                                    onChange={(e) => setDialcode(e.target.value)}
                                                                >
                                                                    <option select="">+966</option>
                                                                    {ccode
                                                                        .map((data) => (
                                                                            <option value={data.dial_code}>
                                                                                {data.dial_code}
                                                                            </option>
                                                                        ))
                                                                        .sort()}
                                                                </select>
                                                            </div>

                                                        </div>
                                                        <div class="col-md-8">
                                                            {/* <div class="form-outline form-white">
                                <label className="col-form-label">Phone Number</label>
                                <input type="text" placeholder="Enter your Number" class="form-control form-control-lg" onChange={(e) => setPhone(e.target.value)} />
                              </div> */}
                                                            <div>
                                                                <label className="col-form-label">
                                                                    {LabelConstants.PHONE}
                                                                </label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    value={phone}
                                                                    onChange={(e) => setPhone(e.target.value)}
                                                                    placeholder={LabelConstants.PHONE_PLACEHOLDER}
                                                                />
                                                            </div>

                                                        </div>
                                                    </div>






                                                    <div className=" mb-4 pb-2">
                                                        <label className="col-form-label">
                                                            {LabelConstants.USER_TYPE}
                                                        </label>
                                                        <div>
                                                            <select
                                                                className="form-control mb-1"
                                                                value={usertype}
                                                                onChange={(e) => setUserType(e.target.value)}
                                                            >
                                                                <option value="select">
                                                                    {LabelConstants.PLS_SELECT}
                                                                </option>

                                                                <option value="engineer">
                                                                    {LabelConstants.ENG}
                                                                </option>

                                                            </select>
                                                        </div>
                                                    </div>



                                                    <div className="form-row">
                                                        <div className="col-sm-4">
                                                            <text
                                                                className="btn btn-primary"
                                                                type="submit"
                                                                onClick={() => signup()}
                                                            >
                                                                Register
                                                            </text>
                                                        </div>
                                                        {/* <div className="col-sm-8" >
                                                            <div className="text-left mt-2 m-l-20">
                                                                {LabelConstants.ALREADY_USER}{" "}
                                                                <Link to={`/login`}> {LabelConstants.LOGIN}</Link>
                                                            </div>
                                                        </div> */}
                                                    </div>

                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    {/* <!-- sign up page ends--> */}
                </div>
            </div>
        </Fragment>
    );
};

export default Login;
