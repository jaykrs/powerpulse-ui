import axios from "axios";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Typeahead } from "react-bootstrap-typeahead";

import logo from "../assets/images/logo/mohandess-logo.png";
// import logo from "../assets/images/endless-logo-signin.png";
import { LabelConstants } from "../constant/LableConstant";
import { CMS_STRAPI_URL } from "../constant/serviceurl";
import { toast } from "react-toastify";
import comingsoon from "../assets/images/other-images/coming-soon-bg.jpg";
import authVideo from "../assets/video/auth-bg.mp4";
// import options from '../../data/typeaheadData';
import options from "../../src/data/typeaheadDataServiceCity";

const Signup = ({ history }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [usertype, setUserType] = useState();
  const [phone, setPhone] = useState();
  const [dialcode, setDialcode] = useState();
  const [ishidden, setIshidden] = useState(true);
  const [services, setServices] = useState([]);
  const [companytype, setCompanytype] = useState([]);
  const [country, setCountry] = useState([]);
  const [instaid, setInstaId] = useState();
  const [websiteAddress, setWebsiteAddress] = useState();
  const [linkdinId, setLinkdinId] = useState();
  const [Snapchart, setSnapchart] = useState();
  const [errMessage, setErrMessage] = useState("");
  const [errorType, setErrorType] = useState("");
  const ccode = require("./ccode.json");

  const handleChange = (e) => {
    console.log("e", e);
    if (e === "customer") {
      setUserType(e);
      setIshidden(true);
    } else if (e === "engineeringfirm") {
      setUserType(e);
      setIshidden(true);
    } else if (e === "engineer") {
      setUserType(e);
      setIshidden(true);
    } else {
      setUserType(e);
      setIshidden(false);
    }
  };
  // console.log(ddd[0].dial_code)

  const signup = async () => {
    var re = /\S+@\S+\.\S+/;
    const urlRegex = /^https:\/\/\S+$/i;
    console.log(websiteAddress);
    if (!urlRegex.test(websiteAddress)) {
      // Handle invalid website address
      setErrMessage("Invalid url");
      setErrorType("Website");
      return;
    } else if (!urlRegex.test(linkdinId)) {
      // Handle invalid LinkedIn ID
      setErrMessage("Invalid LinkedinId");
      setErrorType("Linkdin");
      return;
    } else if (!urlRegex.test(Snapchart)) {
      // Handle invalid SnapChat ID
      setErrMessage("Invalid SnapChatId");
      setErrorType("Snapchat");
      return;
    } else if (!urlRegex.test(instaid)) {
      // Handle invalid Instagram ID
      setErrMessage("Invalid InstagramId");
      setErrorType("instagram");
      return;
    }
    setErrMessage("");
    setErrorType("");

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
        website: websiteAddress,
        snapchartid: Snapchart,
        instaid: instaid,
        linkedinid: linkdinId,
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
          services: Array.prototype.map
            .call(services, function (item) {
              return item.name;
            })
            .join(","),
          companytype,
          country: "",
        },
      };
      //   console.log(data);
      axios
        .post(`${CMS_STRAPI_URL}/api/auth/local/register`, Regdata)
        .then((response) => {
          // localStorage.setItem("email_verify_key", email);
          //   console.log("first:", response);
          axios
            .post(
              `${CMS_STRAPI_URL}/api/${
                usertype === "engineeringfirm"
                  ? "engineeringform"
                  : usertype === "Customer"
                  ? "customers"
                  : usertype === "engineer"
                  ? "engineer"
                  : usertype === "outsourcecompany"
                  ? "designercompanie"
                  : usertype
              }s`,
              dataForRoleTypes,
              {
                headers: {
                  Authorization: "Bearer " + response.data.jwt,
                },
              }
            )
            .then((response) => {
              setTimeout(() => {
                toast.success("User Registered Successfully");
              }, 100);
              axios({
                method: "GET",
                url: CMS_STRAPI_URL + "/api/onboard/" + email,
              }).then(
                (res) => {
                  setTimeout(() => {
                    toast.success(" please check your email ");
                  }, 100);
                  console.log(res, "onboard");
                },
                (err) => {
                  console.log(err);
                }
              );

              history.push("/login");
              console.log("second", response);
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
            <video
              id="bgvid"
              poster={comingsoon}
              playsInline=""
              autoPlay={true}
              muted=""
              loop=""
            >
              <source src={authVideo} type="video/mp4" />
            </video>
            <div>
              <div className="row">
                <div className="col-sm-12 p-0" style={{ opacity: "0.8" }}>
                  <div>
                    <div>
                      {/* <div className="text-center">
                        <img src={logo} alt="" width="230px" />
                      </div> */}
                      <div className="card mt-1 p-4">
                        <div className="d-flex justify-content-around align-item-center ">
                          <h6
                            className="text-center"
                            style={{ marginTop: "35px" }}
                          >
                            {LabelConstants.NEW_USER}
                          </h6>
                          <img
                            src={logo}
                            alt="logo"
                            width={"110px"}
                            style={{ marginTop: "-30px" }}
                          />
                        </div>
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
                              required
                            />
                          </div>

                          <div>
                            <label className="col-form-label">
                              {LabelConstants.PASSWORD}
                            </label>
                            <input
                              className="form-control"
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder={LabelConstants.PASSWORD_PLACEHOLDER}
                              required
                            />
                          </div>

                          <div class="row">
                            <div class="col-md-4">
                              <div class="form-outline form-white">
                                <label className="col-form-label">
                                  Dail Code
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={(e) => setDialcode(e.target.value)}
                                  required
                                  style={{ width: "90px" }}
                                />
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
                                  required
                                />
                              </div>
                            </div>
                          </div>

                          {/* <div hidden={ishidden} >
                            <label className="col-form-label">Country</label>
                            <select className="form-control digits" >
                              <option>Please Select</option>
                              <option>India</option>
                              <option>Saudi Arabia</option>
                            </select>
                          </div> */}
                          {/* 
                          <div hidden={ishidden}>
                            <label className="col-form-label">Select Company Type</label>
                            <select className="form-control digits">
                              <option>Please Select</option>
                              <option>Individual</option>
                              <option>Company</option>
                            </select>
                          </div> */}

                          {/* <div className="form-group" hidden={ishidden} >
                            <label className="col-form-label">Services Provided</label>
                              <Typeahead
                                id="multiple-typeahead"
                                clearButton
                                labelKey="name"
                                onChange={setMultiSelections}
                                selected={multiSelections}
                                multiple
                                options={options}
                                placeholder="Choose Service Provided..."
                              />
                          </div> */}
                          <div className="pb-2">
                            <label className="col-form-label">
                              {LabelConstants.USER_TYPE}
                            </label>
                            <div>
                              <select
                                className="form-control mb-1"
                                value={usertype}
                                // onChange={(e) => setUserType(e.target.value)}
                                onChange={(e) => handleChange(e.target.value)}
                              >
                                <option value="select">
                                  {LabelConstants.PLS_SELECT}
                                </option>
                                <option value="customer">
                                  {LabelConstants.CUSTOMER}
                                </option>
                                <option value="engineeringfirm">
                                  {LabelConstants.ENGFIRM}
                                </option>
                                <option value="engineer">
                                  {LabelConstants.ENG}
                                </option>
                                <option value="outsourcecompany">
                                  {LabelConstants.OUTSOURCEDCOMPANY}
                                </option>
                              </select>
                            </div>
                          </div>

                          <div hidden={ishidden}>
                            <label className="col-form-label">Country</label>
                            <select
                              className="form-control digits"
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                            >
                              <option>Please Select</option>
                              <option>India</option>
                              <option>Saudi Arabia</option>
                            </select>
                          </div>

                          <div hidden={ishidden}>
                            <label className="col-form-label">
                              Select Company Type
                            </label>
                            <select
                              className="form-control digits"
                              value={companytype}
                              onChange={(e) => setCompanytype(e.target.value)}
                            >
                              <option>Please Select</option>
                              <option>individual</option>
                              <option>company</option>
                            </select>
                          </div>

                          <div className="form-group" hidden={ishidden}>
                            <label className="col-form-label">
                              Services Provider
                            </label>
                            <Typeahead
                              id="multiple-typeahead"
                              clearButton
                              labelKey="name"
                              onChange={setServices}
                              selected={services}
                              multiple
                              options={options}
                              placeholder="Choose Service Provided..."
                            />
                          </div>

                          {/* <div>
                            <label className="col-form-label">
                              {LabelConstants.WebsiteAddress}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              value={websiteAddress}
                              onChange={(e) =>
                                setWebsiteAddress(e.target.value)
                              }
                              placeholder={
                                LabelConstants.WebsiteAddress_placeHolder
                              }
                            />
                          </div> */}
                          <div>
                            <label className="col-form-label">
                              {LabelConstants.WebsiteAddress}
                            </label>

                            <input
                              className="form-control"
                              type="text"
                              value={websiteAddress}
                              onChange={(e) =>
                                setWebsiteAddress(e.target.value)
                              }
                              placeholder="https://example.com" // Add a placeholder example
                            />
                            <small id="emailHelp" class="form-text text-muted">
                              {errorType === "Website" ? errMessage : ""}
                            </small>
                          </div>

                          <div>
                            <label className="col-form-label">
                              {LabelConstants.LinkedinId}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              value={linkdinId}
                              onChange={(e) => {
                                setLinkdinId(e.target.value);
                              }}
                              placeholder="https://example.com" // Add a placeholder example
                            />
                            <small id="emailHelp" class="form-text text-muted">
                              {errorType === "Linkdin" ? errMessage : ""}
                            </small>
                          </div>

                          <div>
                            <label className="col-form-label">
                              {LabelConstants.SnapChartId}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              value={Snapchart}
                              onChange={(e) => {
                                setSnapchart(e.target.value);
                              }}
                              placeholder="https://example.com" // Add a placeholder example
                            />
                            <small id="emailHelp" class="form-text text-muted">
                              {errorType === "Snapchat" ? errMessage : ""}
                            </small>
                          </div>

                          <div>
                            <label className="col-form-label">
                              {LabelConstants.InstagramId}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              value={instaid}
                              onChange={(e) => {
                                setInstaId(e.target.value);
                              }}
                              placeholder="https://instagram.com" // Add a placeholder example
                            />
                            <small id="emailHelp" class="form-text text-muted">
                              {errorType === "instagram" ? errMessage : ""}
                            </small>
                          </div>

                          <div className="form-row mt-4">
                            <div className="col-sm-4">
                              <text
                                className="btn btn-primary"
                                type="submit"
                                onClick={() => signup()}
                              >
                                {LabelConstants.SIGNUP}
                              </text>
                            </div>
                            <div className="col-sm-8">
                              <div className="text-left mt-2 m-l-20">
                                {LabelConstants.ALREADY_USER}{" "}
                                <Link to={`/login`}>
                                  {" "}
                                  {LabelConstants.LOGIN}
                                </Link>
                              </div>
                            </div>
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

export default Signup;
