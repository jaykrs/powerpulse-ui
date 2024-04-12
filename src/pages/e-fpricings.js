import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { CMS_STRAPI_URL } from "../constant/serviceurl";
// import { Typeahead } from 'react-bootstrap-typeahead';

function Efpricings() {
  const [activeTab8, setActiveTab8] = useState("2");
  const [openDropDown, setOpenDropDown] = useState(true);
  const [isEdit, setisEdit] = useState(true);
  const [efrAdd, setEfrAdd] = useState(true);
  const [efcAdd, setEfcAdd] = useState(true);
  const [Edit, setEdit] = useState(true);
  const [efrpricingData, setEfrpricingData] = useState([]);
  const [efcpricingData, setEfcpricingData] = useState([]);
  const [efid, setEfid] = useState(JSON.parse(localStorage.getItem('userData')).username);
    const [id, setId] = useState();
  useEffect(() => {


  }, [])

  const [efPcricing, setEfcPricing] = useState({
    currency: "",
    efid: efid,
    discountfactor: "",
    projecttype: "commercial",
    efname: "",
    projectcount: "",
    sur1to7: "",
    sur8to15: "",
    sur15plus: "",
    sup1to7: "",
    sup8to15: "",
    sup15plus: "",
    des1to7: "",
    des8to15: "",
    des15plus: "",
    servicecity: "",
  });


  const [efPricing, setEfPricing] = useState({
    currency: "",
    efid: efid,
    discountfactor: "",
    projecttype: "residential",
    efname: "",
    projectcount: "",
    sur1to7: "",
    sur8to15: "",
    sur15plus: "",
    sup1to7: "",
    sup8to15: "",
    sup15plus: "",
    des1to7: "",
    des8to15: "",
    des15plus: "",
    servicecity: "",
  });



  useEffect(() => {
    axios({
      method: "GET",
      url: CMS_STRAPI_URL + "/api/efrpricings?filters[efid][$eq]=" + efid,

    }).then((response) => {
      // console.log(response);
      var data = { ...efPricing }
      if (response.data.data.length > 0) {
        data.currency = response.data.data[0].attributes.currency
        data.discountfactor = response.data.data[0].attributes.discountfactor
        data.projectcount = response.data.data[0].attributes.projectcount
        data.efname = response.data.data[0].attributes.efname
        data.sur1to7 = response.data.data[0].attributes.sur1to7
        data.sur8to15 = response.data.data[0].attributes.sur8to15
        data.sur15plus = response.data.data[0].attributes.sur15plus
        data.sup1to7 = response.data.data[0].attributes.sup1to7
        data.sup8to15 = response.data.data[0].attributes.sup8to15
        data.sup15plus = response.data.data[0].attributes.sup15plus
        data.des1to7 = response.data.data[0].attributes.des1to7
        data.des8to15 = response.data.data[0].attributes.des8to15
        data.des15plus = response.data.data[0].attributes.des15plus
        data.servicecity = response.data.data[0].attributes.servicecity

        setEfrpricingData(response.data.data);
        setEfPricing(data)
        setId(response.data.data[0].id)
      } else {
        setEfrAdd(false)
        setisEdit(false)
      }
    }).catch((error) => {
      console.log(error);
    });

    axios({
      method: "GET",
      url: CMS_STRAPI_URL + "/api/efcpricings?filters[efid][$eq]=" + efid,
    }).then((response) => {
      var data = { ...efPcricing }
      if (response.data.data.length > 0) {
        data.currency = response.data.data[0].attributes.currency
        data.discountfactor = response.data.data[0].attributes.discountfactor
        data.projectcount = response.data.data[0].attributes.projectcount
        data.efname = response.data.data[0].attributes.efname
        data.sur1to7 = response.data.data[0].attributes.sur1to7
        data.sur8to15 = response.data.data[0].attributes.sur8to15
        data.sur15plus = response.data.data[0].attributes.sur15plus
        data.sup1to7 = response.data.data[0].attributes.sup1to7
        data.sup8to15 = response.data.data[0].attributes.sup8to15
        data.sup15plus = response.data.data[0].attributes.sup15plus
        data.des1to7 = response.data.data[0].attributes.des1to7
        data.des8to15 = response.data.data[0].attributes.des8to15
        data.des15plus = response.data.data[0].attributes.des15plus
        data.servicecity = response.data.data[0].attributes.servicecity

        setEfcpricingData(response.data.data);
        setEfcPricing(data)
        setId(response.data.data[0].id)
      } else {
        setEfcAdd(false)
        setEdit(false)
      }
    })
      .catch((error) => {
        console.log(error);
      });
  }, [])

  const edit = () => {
    setisEdit(false)
  }
  const editc = () => {
    setEdit(false)
  }

  const handleSubmit = (e) => {
    console.log(efrpricingData)
    e.preventDefault();
    axios({
      method: "POST",
      url: CMS_STRAPI_URL + "/api/efrpricings",
      data: { data: efPricing },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => {
        console.log(response);
        setTimeout(() => {
          toast.success("Residential Successfully Created");
        }, 100);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Can't Create new Efpricing");
      });
  };



  const handleSubmitEFC = (e) => {
    // console.log(efPricing, "jjj")
    e.preventDefault();
    axios({
      method: "POST",
      url: CMS_STRAPI_URL + "/api/efcpricings",
      data: { data: efPcricing },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => {
        console.log(response);
        setTimeout(() => {
          toast.success("Commercial Pricing Successfully Created");
        }, 200);
      })
      .catch((error) => {
        toast.error("Can't Create new Efpricing");
        console.log(error);
      });
  };



  const handleUpdate = () => {
    console.log(id, 'idafff')
    axios({
      method: "PUT",
      url: CMS_STRAPI_URL + "/api/efrpricings/" + id,
      data: { data: efPricing },

      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    }).then((response) => {
      console.log(response.data.data,);
      setTimeout(() => {
        toast.success(" Successfully Updated");
      }, 100);
    }, (error) => {
      console.log(error);
      toast.error("Can't Update Residentail");
    });
  }
  const handleUpdateEfc = () => {
    console.log(id, 'idafff')
    axios({
      method: "PUT",
      url: CMS_STRAPI_URL + "/api/efcpricings/" + id,
      data: { data: efPcricing },

      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    }).then((response) => {
      console.log(response.data.data, 'connects');
      setTimeout(() => {
        toast.success(" Successfully Updated");
      }, 100);
    }, (error) => {
      console.log(error);
      toast.error("Can't Update Commercial");
    });
  }

  return (
    <>
      <div className="card">
        <div className="card-body">
          <Nav tabs className="border-tab-primary justify-content-center">
            {/* <NavItem className="nav nav-tabs" id="myTab" role="tablist">
              <NavLink className={activeTab8 === '1' ? 'active' : ''} onClick={() => setActiveTab8('1')}>
                <i className="icofont icofont-contacts"></i>Pricing List
              </NavLink>
            </NavItem> */}
            <NavItem className="nav nav-tabs" id="myTab" role="tablist">
              <NavLink
                className={activeTab8 === "2" ? "active" : ""}
                onClick={() => setActiveTab8("2")}
              >
                <i className="icofont icofont-ui-home"></i>Add Residentail
              </NavLink>
            </NavItem>
            <NavItem className="nav nav-tabs" id="myTab" role="tablist">
              <NavLink
                className={activeTab8 === "3" ? "active" : ""}
                onClick={() => setActiveTab8("3")}
                onChange={() =>
                  setEfPricing({ ...efPricing, projecttype: "Commercial" })
                }
              >
                <i className="icofont icofont-man-in-glasses"></i>Add Commercial
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab8}>
            <TabPane tabId="2">
              <div className="card">
                <div className="card-header">
                  <h5>Residential</h5>{" "}
                </div>
                <div className="card-body">
                  <form>
                    <div className="form-row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="exampleFormControlSelect17">
                          Currency
                        </label>
                        {/* <input
                          className="form-control"
                          id="validationDefault02"
                          placeholder="Discount Factor"
                          required
                          value={efPricing.currency}
                          readOnly={isEdit}
                          onChange={(e) =>
                            setEfPricing({
                              ...efPricing,
                              currency: e.target.value,
                            })
                          }
                        /> */}

                        <select
                          className="form-control input-air-primary digits"
                          id="exampleFormControlSelect17"
                          value={efPricing.currency}
                          readOnly={isEdit}
                          onChange={(e) =>
                            setEfPricing({
                              ...efPricing,
                              currency: e.target.value,
                            })
                          }
                        >
                          <option selected disabled>
                            Select
                          </option>
                          <option value="SAR">SAR</option>
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="validationDefault02">
                          Discount Factor
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault02"
                          type="number"
                          placeholder="Discount Factor"
                          required
                          value={efPricing.discountfactor}
                          readOnly={isEdit}
                          onChange={(e) =>
                            setEfPricing({
                              ...efPricing,
                              discountfactor: e.target.value,
                            })
                          }
                        />
                      </div>
                      {/*<div className="col-md-4 mb-3">
                      <label htmlFor="validationDefaultUsername">Username</label>
                      <div className="input-group">
                        <div className="input-group-prepend"><span className="input-group-text" id="inputGroupPrepend2">@</span></div>
                        <input className="form-control" id="validationDefaultUsername" type="text" placeholder="Username" aria-describedby="inputGroupPrepend2" required />
                      </div>
                    </div>*/}
                    </div>
                    <div className="form-row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="validationDefault03">
                          Engineering Firm name
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault03"
                          type="text"
                          placeholder="Enter firm name"
                          required
                          readOnly={isEdit}
                          value={efPricing.efname}
                          onChange={(e) =>
                            setEfPricing({
                              ...efPricing,
                              efname: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="validationDefault04">
                          Project Count
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault04"
                          type="number"
                          value={efPricing.projectcount}
                          readOnly={isEdit}
                          placeholder="Enter count"
                          required
                          onChange={(e) =>
                            setEfPricing({
                              ...efPricing,
                              projectcount: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <h4 className="f-w-600">Survey Information</h4>

                    <div className="form-row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="validationDefault03">
                          Survey From 1st to 7th floor
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault03"
                          type="number"
                          placeholder="Enter the Cost"
                          required
                          readOnly={isEdit}
                          value={efPricing.sur1to7}
                          onChange={(e) =>
                            setEfPricing({
                              ...efPricing,
                              sur1to7: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="validationDefault04">
                          Survey From 8st to 15th floor
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault04"
                          type="number"
                          placeholder="Enter the Cost"
                          required
                          readOnly={isEdit}
                          value={efPricing.sur8to15}
                          onChange={(e) =>
                            setEfPricing({
                              ...efPricing,
                              sur8to15: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="validationDefault04">
                          Survey From 15th+ floor
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault04"
                          type="number"
                          placeholder="Enter the Cost"
                          required
                          readOnly={isEdit}
                          value={efPricing.sur15plus}
                          onChange={(e) =>
                            setEfPricing({
                              ...efPricing,
                              sur15plus: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <h4 className="f-w-600">Supervisory Information</h4>
                    <div className="form-row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="validationDefault03">
                          Supervisory From 1st to 7th floor
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault03"
                          type="number"
                          placeholder="Enter the Cost"
                          required
                          readOnly={isEdit}
                          value={efPricing.sup1to7}
                          onChange={(e) =>
                            setEfPricing({
                              ...efPricing,
                              sup1to7: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="validationDefault04">
                          Supervisory From 8st to 15th floor
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault04"
                          type="number"
                          placeholder="Enter the Cost"
                          required
                          readOnly={isEdit}
                          value={efPricing.sup8to15}
                          onChange={(e) =>
                            setEfPricing({
                              ...efPricing,
                              sup8to15: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="validationDefault04">
                          Supervisory From 15th+ floor
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault04"
                          type="number"
                          placeholder="Enter the Cost"
                          required
                          readOnly={isEdit}
                          value={efPricing.sup15plus}
                          onChange={(e) =>
                            setEfPricing({
                              ...efPricing,
                              sup15plus: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <h4 className="f-w-600"> Design Information</h4>
                    <div className="form-row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="validationDefault03">
                          Design From 1st to 7th floor
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault03"
                          type="number"
                          placeholder="Enter the Cost"
                          required
                          readOnly={isEdit}
                          value={efPricing.des1to7}
                          onChange={(e) =>
                            setEfPricing({
                              ...efPricing,
                              des1to7: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="validationDefault04">
                          Design From 8st to 15th floor
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault04"
                          type="number"
                          placeholder="Enter the Cost"
                          required
                          readOnly={isEdit}
                          value={efPricing.des8to15}
                          onChange={(e) =>
                            setEfPricing({
                              ...efPricing,
                              des8to15: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="validationDefault04">
                          Design From 15th+ floor
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault04"
                          type="number"
                          placeholder="Enter the Cost"
                          required
                          readOnly={isEdit}
                          value={efPricing.des15plus}
                          onChange={(e) =>
                            setEfPricing({
                              ...efPricing,
                              des15plus: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    {/* <h4 className="f-w-600">Service Provided in all cities</h4>

                    <div className="form-row">
                      <div className="form-group m-t-15 custom-radio-ml">
                        <div className="radio radio-primary">
                          <input
                            id="radio1"
                            type="radio"
                            name="radio1"
                            value="yes"
                            onClick={() => setOpenDropDown(openDropDown)}

                            onChange={(e) =>
                              setEfPricing({
                                ...efPricing,
                                servicecity: e.target.value,
                              })

                            }
                          />
                          <label for="radio1">Yes</label>
                        </div>
                        <div className="radio radio-primary">
                          <input
                            id="radio4"
                            type="radio"
                            name="radio1"
                            value="no"
                            onClick={() => setOpenDropDown(!openDropDown)}
                            onChange={(e) =>
                              setEfPricing({
                                ...efPricing,
                                servicecity: e.target.value,
                              })
                            }
                          />
                          <label for="radio4">No</label>
                        </div>
                      </div>
                    </div> */}
                    {/* <div className="col-sm-12 col-xl-6" hidden={openDropDown}>                            
                                <div className="card-header">
                                    <h5>Add Cities</h5>
                                </div>
                                <div className="card-body">
                                    <div id="bloodhound">
                                        <form className="theme-form">
                                            <div className="form-group">
                                                <Typeahead
                                                    id="custom-typeahead"
                                                    allowNew
                                                    multiple
                                                    newSelectionPrefix="Add a new item: "
                                                    options={[]}
                                                    placeholder="Type cities name..."
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div> */}
                    <div className="card-footer">
                      {efrAdd ? isEdit ? <button className="btn btn-primary" onClick={() => edit('isEdit')}> Edit</button> :
                        <button className="btn btn-primary" onClick={() => handleUpdate()}>Update</button> : null
                      }

                      {!!efrpricingData && efrpricingData.length <= 0 ? <button className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Submit</button> : null}

                    </div>
                  </form>
                </div>
              </div>
            </TabPane>
            <TabPane tabId="3">
              <div className="card">
                <div className="card-header">
                  <h5>Commercial</h5>{" "}
                </div>
                <div className="card-body">
                  <form>
                    <div className="form-row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="exampleFormControlSelect17">
                          Currency
                        </label>
                        <select
                          className="form-control input-air-primary digits"
                          id="exampleFormControlSelect17"
                          value={efPcricing.currency}
                          readOnly={Edit}
                          onChange={(e) =>
                            setEfcPricing({
                              ...efPcricing,
                              currency: e.target.value,
                            })
                          }
                        >
                          <option selected disabled>
                            Select
                          </option>
                          <option value="SAR">SAR</option>
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="validationDefault02">
                          Discount Factor
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault02"
                          type="number"
                          placeholder="Discount Factor"
                          required
                          readOnly={Edit}
                          value={efPcricing.discountfactor}
                          onChange={(e) =>
                            setEfcPricing({
                              ...efPcricing,
                              discountfactor: e.target.value,
                            })
                          }
                        />
                      </div>
                      {/* <div className="col-md-4 mb-3">
                      <label htmlFor="validationDefaultUsername">Username</label>
                      <div className="input-group">
                        <div className="input-group-prepend"><span className="input-group-text" id="inputGroupPrepend2">@</span></div>
                        <input className="form-control" id="validationDefaultUsername" type="text" placeholder="Username" aria-describedby="inputGroupPrepend2" required />
                      </div>
                    </div> */}
                    </div>
                    <div className="form-row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="validationDefault03">
                          Engineering Firm name
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault03"
                          type="text"
                          placeholder="Enter firm name"
                          required
                          readOnly={Edit}
                          value={efPcricing.efname}
                          onChange={(e) =>
                            setEfcPricing({
                              ...efPcricing,
                              efname: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="validationDefault04">
                          Project Count
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault04"
                          type="number"
                          placeholder="Enter count"
                          required
                          readOnly={Edit}
                          value={efPcricing.projectcount}
                          onChange={(e) =>
                            setEfcPricing({
                              ...efPcricing,
                              projectcount: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <h4 className="f-w-600">Survey Information</h4>

                    <div className="form-row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="validationDefault03">
                          Survey From 1st to 7th floor
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault03"
                          type="number"
                          placeholder="Enter the Cost"
                          required
                          readOnly={Edit}
                          value={efPcricing.sur1to7}
                          onChange={(e) =>
                            setEfcPricing({
                              ...efPcricing,
                              sur1to7: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="validationDefault04">
                          Survey From 8st to 15th floor
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault04"
                          type="number"
                          placeholder="Enter the Cost"
                          required
                          readOnly={Edit}
                          value={efPcricing.sur8to15}
                          onChange={(e) =>
                            setEfcPricing({
                              ...efPcricing,
                              sur8to15: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="validationDefault04">
                          Survey From 15th+ floor
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault04"
                          type="number"
                          placeholder="Enter the Cost"
                          required
                          readOnly={Edit}
                          value={efPcricing.sur15plus}
                          onChange={(e) =>
                            setEfcPricing({
                              ...efPcricing,
                              sur15plus: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <h4 className="f-w-600">Supervisory Information</h4>
                    <div className="form-row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="validationDefault03">
                          Supervisory From 1st to 7th floor
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault03"
                          type="number"
                          placeholder="Enter the Cost"
                          required
                          readOnly={Edit}
                          value={efPcricing.sup1to7}
                          onChange={(e) =>
                            setEfcPricing({
                              ...efPcricing,
                              sup1to7: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="validationDefault04">
                          Supervisory From 8st to 15th floor
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault04"
                          type="number"
                          placeholder="Enter the Cost"
                          required
                          readOnly={Edit}
                          value={efPcricing.sup8to15}
                          onChange={(e) =>
                            setEfcPricing({
                              ...efPcricing,
                              sup8to15: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="validationDefault04">
                          Supervisory From 15th+ floor
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault04"
                          type="number"
                          placeholder="Enter the Cost"
                          required
                          readOnly={Edit}
                          value={efPcricing.sup15plus}
                          onChange={(e) =>
                            setEfcPricing({
                              ...efPcricing,
                              sup15plus: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <h4 className="f-w-600"> Design Information</h4>
                    <div className="form-row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="validationDefault03">
                          Design From 1st to 7th floor
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault03"
                          type="number"
                          placeholder="Enter the Cost"
                          required
                          readOnly={Edit}
                          value={efPcricing.des1to7}
                          onChange={(e) =>
                            setEfcPricing({
                              ...efPcricing,
                              des1to7: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="validationDefault04">
                          Design From 8st to 15th floor
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault04"
                          type="number"
                          placeholder="Enter the Cost"
                          required
                          readOnly={Edit}
                          value={efPcricing.des8to15}
                          onChange={(e) =>
                            setEfcPricing({
                              ...efPcricing,
                              des8to15: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="validationDefault04">
                          Design From 15th+ floor
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault04"
                          type="number"
                          placeholder="Enter the Cost"
                          required
                          readOnly={Edit}
                          value={efPcricing.des15plus}
                          onChange={(e) =>
                            setEfcPricing({
                              ...efPcricing,
                              des15plus: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    {/* <h4 className="f-w-600">Service Provided in all cities</h4>
                    <div className="form-group m-t-15 ">
                      <div className="radio radio-primary">
                        <input id="radio3" type="radio" name="radio1" value="yes"

                          onChange={(e) =>
                            setEfcPricing({
                              ...efPcricing,
                              servicecity: e.target.value,
                            })
                          } />
                        <label for="radio3">Yes</label>
                      </div>
                      <div className="radio radio-primary">
                        <input id="radio5" type="radio" name="radio1" value="no"

                          onChange={(e) =>
                            setEfcPricing({
                              ...efPcricing,
                              servicecity: e.target.value,
                            })
                          } />
                        <label for="radio5">No</label>
                      </div>
                    </div> */}

                    <div className="card-footer">

                      {efcAdd ? Edit ? <button className="btn btn-primary" onClick={() => editc('Edit')}>Edit</button> :
                        <button className="btn btn-primary" onClick={() => handleUpdateEfc()}>Update</button> : null
                      }
                      {!!efcpricingData && efcpricingData.length <= 0 ? <button className="btn btn-primary" onClick={(e) => handleSubmitEFC(e)}>Submit</button> : null}

                    </div>
                  </form>
                </div>
              </div>
            </TabPane>
            {/* <TabPane tabId="1">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="card">
                      <div className="card-header">
                        <h5></h5>
                        <span> Use a class <code> table </code> to any table.</span>
                      </div>
                      <div className="table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Efname</th>
                              <th scope="col">Projectcount</th>
                              <th scope="col">Currency</th>
                              <th scope="col">Survey information</th>
                              <th scope="col">Supervisory Information</th>
                              <th scope="col">Design Information</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[...efrpricingData, ...efcpricingData].map((data, index) => (
                              <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{data.attributes.efname}</td>
                                <td>{data.attributes.projectcount}</td>
                                <td>{data.attributes.currency}</td>
                                <td><span className="badge badge-primary">1-7th Floor:{data.attributes.sur1to7}</span><br></br>
                                  <span className="badge badge-primary">8-15th Floor:{data.attributes.sur8to15}</span><br></br>
                                  <span className="badge badge-primary">15th+ Floor:{data.attributes.sur15plus}</span></td>

                                <td><span className="badge badge-secondary">1-7th Floor:{data.attributes.sup1to7}</span><br></br>
                                  <span className="badge badge-secondary">8-15th Floor:{data.attributes.sup8to15}</span><br></br>
                                  <span className="badge badge-secondary">15th+ Floor:{data.attributes.sup15plus}</span></td>

                                <td><span className="badge badge-warning">1-7th Floor:{data.attributes.des1to7}</span><br></br>
                                  <span className="badge badge-warning">8-15th Floor:{data.attributes.des8to15}</span><br></br>
                                  <span className="badge badge-warning">15th+ Floor:{data.attributes.des15plus}</span></td>
                               

                                <NavLink

                                  onClick={() => setActiveTab8("2")}
                                >

                                  <button class="btn btn-primary active" ><i class="fa fa-pencil"></i></button>
                                </NavLink>

                              </tr>
                            ))}


                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPane> */}
          </TabContent>
        </div>
      </div>
    </>
  );
}

export default Efpricings;
