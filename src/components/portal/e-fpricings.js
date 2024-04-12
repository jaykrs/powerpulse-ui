import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Typeahead } from 'react-bootstrap-typeahead';
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { CMS_STRAPI_URL } from "../../constant/serviceurl";
import options from '../../data/typeaheadData';
import CKEditors from "react-ckeditor-component";

function Efpricings() {
  const [activeTab8, setActiveTab8] = useState("2");
  const [openDropDown, setOpenDropDown] = useState(true);
  const [isEdit, setisEdit] = useState(true);
  const [efrAdd, setEfrAdd] = useState(true);
  const [efcAdd, setEfcAdd] = useState(true);
  const [eflAdd, setEflAdd] = useState(true);
  const [Edit, setEdit] = useState(true);
  const [Editefl, setEditefl] = useState(true);
  const [efrpricingData, setEfrpricingData] = useState([]);
  const [efcpricingData, setEfcpricingData] = useState([]);
  const [eflpricingData, setEflpricingData] = useState([]);
  const [efid, setEfid] = useState(JSON.parse(localStorage.getItem('userData')).username);
  const [efname, setEfname] = useState(JSON.parse(localStorage.getItem('userData')).name);
  const [id, setId] = useState();
  const [Efrid, setEfrId] = useState();
  const [Eflid, setEflId] = useState();
  const [multiSelections, setMultiSelections] = useState([]);
  const [multiSelectionsefc, setMultiSelectionsefc] = useState([]);
  const [multiSelectionsefl, setMultiSelectionsefl] = useState([]);
  useEffect(() => {


  }, [])

  const [efPcricing, setEfcPricing] = useState({
    currency: "",
    efid: efid,
    efname: efname,
    discountfactor: "",
    projecttype: "commercial",
    tagline: "",
    tagline_ar: "",
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
    efname: efname,
    discountfactor: "",
    projecttype: "residential",
    tagline: "",
    tagline_ar: "",
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


  const [efPlricing, setEflPricing] = useState({
    currency: "",
    efid: efid,
    efname: efname,
    discountfactor: "",
    projecttype: "license",
    tagline: "",
    tagline_ar: "",
    projectcount: "",
    lic1to7: "",
    lic8to15: "",
    lic15plus: "",
    servicecity: ""
  });



  useEffect(() => {
    axios({
      method: "GET",
      url: CMS_STRAPI_URL + "/api/efrpricings?filters[efid][$eq]=" + efid,

    }).then((response) => {
      // console.log(response);
      var data = { ...efPricing }
      console.log(response.data.data, 'efrpricings')
      if (response.data.data.length > 0) {
        data.currency = response.data.data[0].attributes.currency
        data.discountfactor = response.data.data[0].attributes.discountfactor
        data.projectcount = response.data.data[0].attributes.projectcount
        data.tagline = response.data.data[0].attributes.tagline
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
        data.tagline_ar = response.data.data[0].attributes.tagline_ar


        setEfrpricingData(response.data.data);
        setEfPricing(data)
        setEfrId(response.data.data[0].id)
        setServiceCity(response.data.data[0].attributes.servicecity)
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
        data.tagline = response.data.data[0].attributes.tagline
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
        data.tagline_ar = response.data.data[0].attributes.tagline_ar


        setEfcpricingData(response.data.data);
        setEfcPricing(data)
        setId(response.data.data[0].id);
        setServiceCityEfc(response.data.data[0].attributes.servicecity)
      } else {
        setEfcAdd(false)
        setEdit(false)
      }
    })
      .catch((error) => {
        console.log(error);
      });

    axios({
      method: "GET",
      url: CMS_STRAPI_URL + "/api/eflpricings?filters[efid][$eq]=" + efid,
    }).then((response) => {
      var data = { ...efPlricing }
      if (response.data.data.length > 0) {
        data.currency = response.data.data[0].attributes.currency
        data.discountfactor = response.data.data[0].attributes.discountfactor
        data.projectcount = response.data.data[0].attributes.projectcount
        data.lic1to7 = response.data.data[0].attributes.lic1to7
        data.lic8to15 = response.data.data[0].attributes.lic8to15
        data.lic15plus = response.data.data[0].attributes.lic15plus
        data.discountfactor = response.data.data[0].attributes.discountfactor
        data.discountfactor = response.data.data[0].attributes.discountfactor
        data.servicecity = response.data.data[0].attributes.servicecity
        data.tagline = response.data.data[0].attributes.tagline
        data.tagline_ar = response.data.data[0].attributes.tagline_ar



        setEflpricingData(response.data.data);
        setEflPricing(data)
        setEflId(response.data.data[0].id);
        setServiceCityEfl(response.data.data[0].attributes.servicecity)
      } else {
        setEflAdd(false)
        setEditefl(false)
      }
    })
      .catch((error) => {
        console.log(error);
      });


  }, [])

  const setServiceCity = (data) => {
    if (data.length > 0) {
      let array = data.split(',')
      let multiSelect = [];
      array.map(item => {
        multiSelect.push({ name: item })
      })
      setMultiSelections(multiSelect)
    }
  }

  const setServiceCityEfc = (dataefc) => {
    if (dataefc.length > 0) {
      let array = dataefc.split(',');
      let multiSelectEfc = [];
      array.map(item => {
        multiSelectEfc.push({ name: item })
      })
      setMultiSelectionsefc(multiSelectEfc)
    }
  }

  const setServiceCityEfl = (dataefc) => {
    if (dataefc.length > 0) {
      let array = dataefc.split(',');
      let multiSelectEfc = [];
      array.map(item => {
        multiSelectEfc.push({ name: item })
      })
      setMultiSelectionsefl(multiSelectEfc)
    }
  }

  const edit = () => {
    setisEdit(false)
  }
  const editc = () => {
    setEdit(false)
  }
  const editefl = () => {
    setEditefl(false)
  }

  const handleSubmit = (e) => {
    console.log(efrpricingData)
    e.preventDefault();

    const cityValue = Array.prototype.map.call(multiSelections, function (item) { return item.name; }).join(",");

    efPricing.servicecity = cityValue
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
    const cityValue = Array.prototype.map.call(multiSelectionsefc, function (item) { return item.name; }).join(",");
    efPcricing.servicecity = cityValue
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



  const handleSubmitEFL = (e) => {
    const cityValue = Array.prototype.map.call(multiSelectionsefl, function (item) { return item.name; }).join(",");
    efPlricing.servicecity = cityValue
    e.preventDefault();
    axios({
      method: "POST",
      url: CMS_STRAPI_URL + "/api/eflpricings",
      data: { data: efPlricing },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => {
        console.log(response);
        setTimeout(() => {
          toast.success("License Pricing Successfully Created");
        }, 200);
      })
      .catch((error) => {
        toast.error("Can't Create new License");
        console.log(error);
      });
  };




  const handleUpdate = (e) => {
    const cityValue = Array.prototype.map.call(multiSelections, function (item) { return item.name; }).join(",");
    efPricing.servicecity = cityValue
    e.preventDefault();
    axios({
      method: "PUT",
      url: CMS_STRAPI_URL + "/api/efrpricings/" + Efrid,
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
  const handleUpdateEfc = (e) => {
    const cityValue = Array.prototype.map.call(multiSelectionsefc, function (item) { return item.name; }).join(",");
    efPcricing.servicecity = cityValue
    e.preventDefault();
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


  const handleUpdateEfl = (e) => {
    const cityValue = Array.prototype.map.call(multiSelectionsefl, function (item) { return item.name; }).join(",");
    efPlricing.servicecity = cityValue
    e.preventDefault();
    axios({
      method: "PUT",
      url: CMS_STRAPI_URL + "/api/eflpricings/" + Eflid,
      data: { data: efPlricing },

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

            <NavItem className="nav nav-tabs" id="myTab" role="tablist">
              <NavLink className={activeTab8 === '1' ? 'active' : ''} onClick={() => setActiveTab8('1')}>
                <i className="icofont icofont-contacts"></i>Add License
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
                          <option selected>
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
                      {/* <div className="col-md-6 mb-3">
                        <label htmlFor="validationDefault03">
                          Text Area
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault03"
                          type="text"
                          placeholder="Enter Text Area"
                          required
                          readOnly={isEdit}
                          value={efPricing.tagline}
                          onChange={(e) =>
                            setEfPricing({
                              ...efPricing,
                              tagline: e.target.value,
                            })
                          }
                        />
                      </div> */}

                      <div className="col-md-6 mb-3">
                        <label htmlFor="exampleFormControlTextarea1">
                          Profile English
                        </label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                          type="text"
                          placeholder="Enter Text Area"
                          required
                          readOnly={isEdit}
                          value={efPricing.tagline}
                          onChange={(e) =>
                            setEfPricing({
                              ...efPricing,
                              tagline: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label htmlFor="exampleFormControlTextarea1">
                          Profile Arabic
                        </label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                          type="text"
                          placeholder="Enter Text Area"
                          required
                          readOnly={isEdit}
                          value={efPricing.tagline_ar}
                          onChange={(e) =>
                            setEfPricing({
                              ...efPricing,
                              tagline_ar: e.target.value,
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
                          Survey From 1st to 7th floor (per 100 m^2)
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
                          Survey From 8st to 15th floor (per 100 m^2)
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
                          Survey From 15th+ floor (per 100 m^2)
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
                          Supervisory From 1st to 7th floor (per 100 m^2)
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
                          Supervisory From 8st to 15th floor (per 100 m^2)
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
                          Supervisory From 15th+ floor (per 100 m^2)
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
                          Design From 1st to 7th floor (per 100 m^2)
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
                          Design From 8st to 15th floor (per 100 m^2)
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
                          Design From 15th+ floor (per 100 m^2)
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
                      <div className="col-md-6 mb-3">
                        <label>Service City</label>
                        <div className="form-group">
                          <Typeahead
                            inputProps={{
                              readOnly: isEdit,
                            }}
                            id="multiple-typeahead"
                            clearButton
                            labelKey="name"
                            onChange={setMultiSelections}
                            selected={multiSelections}
                            multiple
                            options={options}
                            placeholder="Choose Service City..."
                          />
                        </div>
                      </div>
                    </div>

                    {/* <div className="form-row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <div>
                            <h5>Profile English </h5>
                          </div>
                          <CKEditors
                           
                            activeclassName="p10"
                            content=" "
                            events={{

                            }}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <div>
                            <h5>Profile Arabic </h5>
                          </div>
                          <CKEditors 
                            activeclassName="p10"
                            content=" "
                            events={{

                            }}
                          />
                        </div>
                      </div>
                    </div> */}


                    {/* <div className="card-footer"> */}
                    {efrAdd ? isEdit ? <button className="btn btn-primary" onClick={() => edit('isEdit')}> Edit</button> :
                      <button className="btn btn-primary" onClick={(e) => handleUpdate(e)}>Update</button> : null
                    }
                    {!!efrpricingData && efrpricingData.length <= 0 ? <button className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Submit</button> : null}

                    {/* </div> */}
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
                          <option selected>
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

                    </div>
                    <div className="form-row">
                      {/* <div className="col-md-6 mb-3">
                        <label htmlFor="validationDefault03">
                          Text Area
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault03"
                          type="text"
                          placeholder="Enter Text Area"
                          required
                          readOnly={Edit}
                          value={efPcricing.tagline}
                          onChange={(e) =>
                            setEfcPricing({
                              ...efPcricing,
                              tagline: e.target.value,
                            })
                          }
                        />
                      </div> */}
                      <div className="col-md-6 mb-3">
                        <label htmlFor="exampleFormControlTextarea1">
                          Profile English
                        </label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                          type="text"
                          placeholder="Enter Text Area"
                          required
                          readOnly={Edit}
                          value={efPcricing.tagline}
                          onChange={(e) =>
                            setEfcPricing({
                              ...efPcricing,
                              tagline: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label htmlFor="exampleFormControlTextarea1">
                          Profile Arabic
                        </label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                          type="text"
                          placeholder="Enter Text Area"
                          required
                          readOnly={Edit}
                          value={efPcricing.tagline_ar}
                          onChange={(e) =>
                            setEfcPricing({
                              ...efPcricing,
                              tagline_ar: e.target.value,
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
                          Survey From 1st to 7th floor (per 100 m^2)
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
                          Survey From 8st to 15th floor (per 100 m^2)
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
                          Survey From 15th+ floor (per 100 m^2)
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
                          Supervisory From 1st to 7th floor (per 100 m^2)
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
                          Supervisory From 8st to 15th floor (per 100 m^2)
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
                          Supervisory From 15th+ floor (per 100 m^2)
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
                          Design From 1st to 7th floor (per 100 m^2)
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
                          Design From 8st to 15th floor (per 100 m^2)
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
                          Design From 15th+ floor (per 100 m^2)
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

                      <div className="col-md-6 mb-3">
                        <label>Service City</label>
                        <div className="form-group">
                          <Typeahead
                            inputProps={{
                              readOnly: isEdit,
                            }}
                            id="multiple-typeahead"
                            clearButton
                            labelKey="name"
                            onChange={setMultiSelectionsefc}
                            selected={multiSelectionsefc}
                            multiple
                            options={options}
                            placeholder="Choose Service City..."
                          />
                        </div>
                      </div>
                    </div>

                    {/* <div className="form-row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <div>
                            <h5>Profile English </h5>
                          </div>
                          <CKEditors
                           
                            activeclassName="p10"
                            content=" "
                            events={{

                            }}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <div>
                            <h5>Profile Arabic </h5>
                          </div>
                          <CKEditors 
                            activeclassName="p10"
                            content=" "
                            events={{

                            }}
                          />
                        </div>
                      </div>
                    </div> */}



                    {/* <div className="card-footer"> */}
                    {efcAdd ? Edit ? <button className="btn btn-primary" onClick={() => editc('Edit')}>Edit</button> :
                      <button className="btn btn-primary" onClick={(e) => handleUpdateEfc(e)}>Update</button> : null
                    }
                    {!!efcpricingData && efcpricingData.length <= 0 ? <button className="btn btn-primary" onClick={(e) => handleSubmitEFC(e)}>Submit</button> : null}

                    {/* </div> */}
                  </form>
                </div>
              </div>
            </TabPane>
            <TabPane tabId="1">
              <div className="card">
                <div className="card-header">
                  <h5>License</h5>{" "}
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
                          value={efPlricing.currency}
                          readOnly={Editefl}
                          onChange={(e) =>
                            setEflPricing({
                              ...efPlricing,
                              currency: e.target.value,
                            })
                          }

                        >
                          <option selected>
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
                          value={efPlricing.discountfactor}
                          readOnly={Editefl}
                          onChange={(e) =>
                            setEflPricing({
                              ...efPlricing,
                              discountfactor: e.target.value,
                            })
                          }
                        />
                      </div>

                    </div>
                    <div className="form-row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="exampleFormControlTextarea1">
                          Profile Arabic
                        </label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                          type="text"
                          placeholder="Enter Text Area"
                          required
                          readOnly={Editefl}
                          value={efPlricing.tagline}
                          onChange={(e) =>
                            setEflPricing({
                              ...efPlricing,
                              tagline: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="exampleFormControlTextarea1">
                          Profile Arabic
                        </label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                          type="text"
                          placeholder="Enter Text Area"
                          required
                          readOnly={Editefl}
                          value={efPlricing.tagline_ar}
                          onChange={(e) =>
                            setEflPricing({
                              ...efPlricing,
                              tagline_ar: e.target.value,
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
                          value={efPlricing.projectcount}
                          readOnly={Editefl}
                          onChange={(e) =>
                            setEflPricing({
                              ...efPlricing,
                              projectcount: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <h4 className="f-w-600">License Information</h4>

                    <div className="form-row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="validationDefault03">
                          Lic From 1st to 7th floor (per 100 m^2)
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault03"
                          type="number"
                          placeholder="Enter the Cost"
                          required
                          value={efPlricing.lic1to7}
                          readOnly={Editefl}
                          onChange={(e) =>
                            setEflPricing({
                              ...efPlricing,
                              lic1to7: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label htmlFor="validationDefault03">
                          Lic From 8st to 15th floor (per 100 m^2)
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault03"
                          type="number"
                          placeholder="Enter the Cost"
                          required
                          value={efPlricing.lic8to15}
                          readOnly={Editefl}
                          onChange={(e) =>
                            setEflPricing({
                              ...efPlricing,
                              lic8to15: e.target.value, 
                            })
                          }
                        />
                      </div>

                    </div>

                    <div className="form-row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="validationDefault03">
                          Lic From 15th+ floor (per 100 m^2)
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault03"
                          type="number"
                          placeholder="Enter the Cost"
                          required
                          value={efPlricing.lic15plus}
                          readOnly={Editefl}
                          onChange={(e) =>
                            setEflPricing({
                              ...efPlricing,
                              lic15plus: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label>Service City</label>
                        <div className="form-group">
                          <Typeahead
                            inputProps={{
                              readOnly: Editefl,
                            }}
                            id="multiple-typeahead"
                            clearButton
                            labelKey="name"
                            multiple
                            onChange={setMultiSelectionsefl}
                            selected={multiSelectionsefl}
                            options={options}
                            placeholder="Choose Service City..."
                          />
                        </div>
                      </div>
                    </div>

                    {/* <div className="form-row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <div>
                            <h5>Profile English </h5>
                          </div>
                          <CKEditors
                           
                            activeclassName="p10"
                            content=" "
                            events={{

                            }}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <div>
                            <h5>Profile Arabic </h5>
                          </div>
                          <CKEditors 
                            activeclassName="p10"
                            content=" "
                            events={{

                            }}
                          />
                        </div>
                      </div>
                    </div> */}


                    {/* <div className="card-footer"> */}
                    {eflAdd ? Editefl ? <button className="btn btn-primary" onClick={() => editefl('isEdit')}> Edit</button> :
                      <button className="btn btn-primary" onClick={(e) => handleUpdateEfl(e)} >Update</button> : null
                    }
                    {!!eflpricingData && eflpricingData.length <= 0 ? <button className="btn btn-primary" onClick={(e) => handleSubmitEFL(e)}>Submit</button> : null}

                    {/* </div> */}
                  </form>
                </div>
              </div>

            </TabPane>
          </TabContent>
        </div>
      </div>
    </>
  );
}

export default Efpricings;
