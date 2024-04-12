import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { CMS_STRAPI_URL } from "../constant/serviceurl";
// import { Typeahead } from 'react-bootstrap-typeahead';

function Efpricings() {
  const [activeTab8, setActiveTab8] = useState("1");
  const [openDropDown, setOpenDropDown] = useState(true);
  const [efPricing, setEfPricing] = useState({
    currency: "",
    efid: "",
    discountfactor: "",
    projecttype: "residential",
    efname: "",
    projectcount: 0,
    sur1to7: 0,
    sur8to15: 0,
    sur15plus: 0,
    sup1to7: 0,
    sup8to15: 0,
    sup15plus: 0,
    des1to7: 0,
    des8to15: 0,
    des15plus: 0,
    servicecity: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: CMS_STRAPI_URL + "/api/e-fpricings",
      data: { data: efPricing },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => {
        console.log(response);
        setTimeout(() => {
          toast.error("Successfully Created");
        }, 200);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="card">
        <div className="card-body">
          <Nav tabs className="border-tab-primary justify-content-center">
            <NavItem className="nav nav-tabs" id="myTab" role="tablist">
              <NavLink
                className={activeTab8 === "1" ? "active" : ""}
                onClick={() => setActiveTab8("1")}
              >
                <i className="icofont icofont-ui-home"></i> Residentail
              </NavLink>
            </NavItem>
            <NavItem className="nav nav-tabs" id="myTab" role="tablist">
              <NavLink
                className={activeTab8 === "2" ? "active" : ""}
                onClick={() => setActiveTab8("2")}
                onChange={(e) =>
                  setEfPricing({ ...efPricing, projecttype: "Commercial" })
                }
              >
                <i className="icofont icofont-man-in-glasses"></i> Commercial
              </NavLink>
            </NavItem>
            {/* <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                                        <NavLink className={activeTab8 === '3' ? 'active' : ''} onClick={() => setActiveTab8('3')}>
                                            <i className="icofont icofont-contacts"></i> Contact
                                        </NavLink>
                                    </NavItem> */}
          </Nav>
          <TabContent activeTab={activeTab8}>
            <TabPane tabId="1">
              <div className="card">
                <div className="card-header">
                  <h5>Residential</h5>{" "}
                </div>
                <div className="card-body">
                  <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="exampleFormControlSelect17">
                          Currency
                        </label>
                        <select
                          className="form-control input-air-primary digits"
                          id="exampleFormControlSelect17"
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
                          onChange={(e) =>
                            setEfPricing({
                              ...efPricing,
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
                          onChange={(e) =>
                            setEfPricing({
                              ...efPricing,
                              sur15plus: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <h4 className="f-w-600"> Des Information</h4>
                    <div className="form-row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="validationDefault03">
                          Des From 1st to 7th floor
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault03"
                          type="number"
                          placeholder="Enter the Cost"
                          required
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
                          Des From 8st to 15th floor
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault04"
                          type="number"
                          placeholder="Enter the Cost"
                          required
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
                          Des From 15th+ floor
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault04"
                          type="number"
                          placeholder="Enter the Cost"
                          required
                          onChange={(e) =>
                            setEfPricing({
                              ...efPricing,
                              des15plus: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <h4 className="f-w-600">Service Provided in all cities</h4>

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
                    </div>
                    {/* <div className="col-sm-12 col-xl-6" hidden={openDropDown} >
                            
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

                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </TabPane>
            <TabPane tabId="2">
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
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="validationDefault02">
                          Discount Factor
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault02"
                          type="text"
                          placeholder="Discount Factor"
                          required
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
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="validationDefault04">
                          Project Count
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault04"
                          type="text"
                          placeholder="Enter count"
                          required
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
                          type="text"
                          placeholder="Enter the Cost"
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="validationDefault04">
                          Survey From 8st to 15th floor
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault04"
                          type="text"
                          placeholder="Enter the Cost"
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="validationDefault04">
                          Survey From 15th+ floor
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault04"
                          type="text"
                          placeholder="Enter the Cost"
                          required
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
                          type="text"
                          placeholder="Enter the Cost"
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="validationDefault04">
                          Supervisory From 8st to 15th floor
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault04"
                          type="text"
                          placeholder="Enter the Cost"
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="validationDefault04">
                          Supervisory From 15th+ floor
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault04"
                          type="text"
                          placeholder="Enter the Cost"
                          required
                        />
                      </div>
                    </div>
                    <h4 className="f-w-600"> Design Information</h4>
                    <div className="form-row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="validationDefault03">
                          Des From 1st to 7th floor
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault03"
                          type="text"
                          placeholder="Enter the Cost"
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="validationDefault04">
                          Des From 8st to 15th floor
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault04"
                          type="text"
                          placeholder="Enter the Cost"
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="validationDefault04">
                          Des From 15th+ floor
                        </label>
                        <input
                          className="form-control"
                          id="validationDefault04"
                          type="text"
                          placeholder="Enter the Cost"
                          required
                        />
                      </div>
                    </div>
                    <h4 className="f-w-600">Service Provided in all cities</h4>

                    <div className="form-row">
                      <div className="form-group m-t-15 custom-radio-ml">
                        <div className="radio radio-primary">
                          <input
                            id="radio1"
                            type="radio"
                            name="radio1"
                            value="option1"
                            onClick={() => setOpenDropDown(openDropDown)}
                          />
                          <label for="radio1">Yes</label>
                        </div>
                        <div className="radio radio-primary">
                          <input
                            id="radio4"
                            type="radio"
                            name="radio1"
                            value="option1"
                            onClick={() => setOpenDropDown(!openDropDown)}
                          />
                          <label for="radio4">No</label>
                        </div>
                      </div>
                    </div>
                    {/* <div className="col-sm-12 col-xl-6" hidden={openDropDown} >
                            
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

                    <button className="btn btn-primary" onClick={handleSubmit}>
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </TabPane>
            <TabPane tabId="3">
              <p className="mb-0 m-t-30">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum
              </p>
            </TabPane>
          </TabContent>
        </div>
      </div>
    </>
  );
}

export default Efpricings;
