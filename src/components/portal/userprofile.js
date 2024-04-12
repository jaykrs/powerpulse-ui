import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import CKEditors from "react-ckeditor-component";
import { toast } from 'react-toastify';
import CityList from '../../city.json';
import { LabelConstants } from '../../constant/LableConstant';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import options from '../../data/typeaheadData';
import CountryList from '../../regoin.json';
import Breadcrumb from '../common/breadcrumb';

class userProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: localStorage.getItem('jwt'),
            userId: localStorage.getItem('userId'),
            avataruri: localStorage.getItem('avatarUri'),
            userType: localStorage.getItem('userType'),
            isEdit: true,
            Country: CountryList,
            City: CityList,
            multiSelectionsEngineer: "",
            multiSelectionsServiceCity: "",
            sup: '',
            sur: '',
            des: '',
            id: []
        }
    }


    async componentDidMount() {
        let userType = localStorage.getItem('userType')
        var userId = localStorage.getItem('userId')
        // console.log(userType, 'usertype')
        var url = '';
        if (userType === 'engineeringfirm') {
            url = CMS_STRAPI_URL + "/api/engineeringforms?filters[username][$eq]=" + userId;
            axios({
                method: "GET",
                url: url,
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwt"),
                },
            }).then((response) => {
                console.log(response.data.data[0], "usersAdarsh")
                this.setState({
                    id: response.data.data[0].id,
                    name: response.data.data[0].attributes.name,
                    email: response.data.data[0].attributes.email,
                    phone: response.data.data[0].attributes.phonenumber,
                    username: response.data.data[0].attributes.username,
                    city: response.data.data[0].attributes.city,
                    country: response.data.data[0].attributes.country,
                    // servicecity: response.data.data[0].attributes.servicecity,
                    // serviceregion: response.data.data[0].attributes.serviceregion,
                    state: response.data.data[0].attributes.state,
                    address: response.data.data[0].attributes.address,
                    countrycode: response.data.data[0].attributes.countrycode,
                    currencycode: response.data.data[0].attributes.currencycode,
                    walletbalance: response.data.data[0].attributes.walletbalance

                })

            })
                .catch((error) => {
                    console.log(error);
                });
        } else if (userType === 'engineer') {
            url = CMS_STRAPI_URL + "/api/engineers?filters[username][$eq]=" + userId;
            axios({
                method: "GET",
                url: url,
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwt"),
                },
            }).then((response) => {
                console.log(response.data.data[0], "usersAdarsh")
                this.setState({
                    id: response.data.data[0].id,
                    name: response.data.data[0].attributes.name,
                    email: response.data.data[0].attributes.email,
                    phone: response.data.data[0].attributes.phonenumber,
                    username: response.data.data[0].attributes.username,
                    city: response.data.data[0].attributes.city,
                    country: response.data.data[0].attributes.country,
                    workinghour: response.data.data[0].attributes.workinghour,
                    bankaccno: response.data.data[0].attributes.bankaccno,
                    bankname: response.data.data[0].attributes.bankname,
                    bankcode: response.data.data[0].attributes.bankcode,
                    state: response.data.data[0].attributes.state,
                    address: response.data.data[0].attributes.address,
                    countrycode: response.data.data[0].attributes.countrycode,
                    currencycode: response.data.data[0].attributes.currencycode,
                    walletbalance: response.data.data[0].attributes.walletbalance,
                    servicecity: response.data.data[0].attributes.servicecity,
                    servicetype: response.data.data[0].attributes.servicetype,
                    availabilitystatus: response.data.data[0].attributes.availabilitystatus,
                    preferedLanguage: response.data.data[0].attributes.preferedLanguage

                })
                this.serviceCity(response.data.data[0].attributes.servicecity)
                this.serviceType(response.data.data[0].attributes.servicetype)


            })
                .catch((error) => {
                    console.log(error);
                });




        } else if (userType === 'customer') {
            url = CMS_STRAPI_URL + "/api/customers?filters[username][$eq]=" + userId;
            axios({
                method: "GET",
                url: url,
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwt"),
                },
            }).then((response) => {
                console.log(response.data.data[0], "userscustomer")
                this.setState({
                    id: response.data.data[0].id,
                    name: response.data.data[0].attributes.name,
                    email: response.data.data[0].attributes.email,
                    phone: response.data.data[0].attributes.phonenumber,
                    username: response.data.data[0].attributes.username,
                    city: response.data.data[0].attributes.city,
                    country: response.data.data[0].attributes.country,
                    // servicecity: response.data.data[0].attributes.servicecity,
                    // serviceregion: response.data.data[0].attributes.serviceregion,
                    state: response.data.data[0].attributes.state,
                    address: response.data.data[0].attributes.address,
                    countrycode: response.data.data[0].attributes.countrycode,
                    currencycode: response.data.data[0].attributes.currencycode,
                    walletbalance: response.data.data[0].attributes.walletbalance
                })

            })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            url = CMS_STRAPI_URL + "/api/designercompanies?filters[username][$eq]=" + userId;
            axios({
                method: "GET",
                url: url,
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwt"),
                },
            }).then((response) => {
                console.log(response.data.data[0], "usersAdarsh")
                this.setState({
                    id: response.data.data[0].id,
                    name: response.data.data[0].attributes.name,
                    email: response.data.data[0].attributes.email,
                    phone: response.data.data[0].attributes.phonenumber,
                    username: response.data.data[0].attributes.username,
                    country: response.data.data[0].attributes.country,
                    bankaccno: response.data.data[0].attributes.bankaccno,
                    bankname: response.data.data[0].attributes.bankname,
                    bankcode: response.data.data[0].attributes.bankcode,
                    servicecity: response.data.data[0].attributes.servicecity,
                    preferedLanguage: response.data.data[0].attributes.preferedLanguage


                })
                this.serviceCity(response.data.data[0].attributes.servicecity)

            })
                .catch((error) => {
                    console.log(error);
                });
        }

    }

    edit = (e) => {
        e.preventDefault();
        this.setState({
            isEdit: false
        })

    }

    serviceCity = (service) => {
        if (service.length > 0) {
            let array = service.split(',');
            let multiSelections = [];

            array.map(item => {
                multiSelections.push({ name: item })
            })
            this.setState({
                multiSelectionsEngineer: multiSelections
            })
        }
    }

    serviceType = (service) => {
        if (service.length > 0) {
            let array = service.split(',');
            let multiSelections = [];

            array.map(item => {
                multiSelections.push({ name: item })
            })
            this.setState({
                multiSelectionsServiceCity: multiSelections
            })
        }
    }


    handleUpdate(e) {
        e.preventDefault();
        const { id } = this.state
        var userType = localStorage.getItem('userType')
        var url = '';
        const { username, name, workinghour, multiSelectionsEngineer, multiSelectionsServiceCity, bankaccno, bankcode, bankname, availabilitystatus, preferedLanguage, email, phone, country, walletbalance, city, address, state, currencycode, countrycode, servicecity, serviceregion } = this.state
        if (userType === 'engineeringfirm') {
            url = CMS_STRAPI_URL + "/api/engineeringforms/" + id;
            axios({
                method: "PUT",
                url: url,
                data: {
                    data: {
                        "username": username,
                        "name": name,
                        "email": email,
                        "phonenumber": phone,
                        "country": country,
                        "city": city,
                        "address": address,
                        "state": state,
                        "currencycode": currencycode,
                        "countrycode": countrycode,
                        // "servicecity": servicecity,
                        // "serviceregion": serviceregion,
                        "walletbalance": walletbalance,


                    }
                },
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwt"),
                },
            }).then((response) => {
                console.log(response.data,);
                setTimeout(() => {
                    toast.success(" Successfully Updated");
                }, 100);
            }, (error) => {
                console.log(error);
                toast.error("Can't Update Profile");
            });
        } else if (userType === 'customer') {
            url = CMS_STRAPI_URL + "/api/customers/" + id;
            axios({
                method: "PUT",
                url: url,
                data: {
                    data: {
                        "username": username,
                        "name": name,
                        "email": email,
                        "phonenumber": phone,
                        "country": country,
                        "city": city,
                        "currencycode": currencycode,
                        "countrycode": countrycode,
                        "address": address,
                        "state": state,
                        "walletbalance": walletbalance,


                    }
                },
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwt"),
                },
            }).then((response) => {
                console.log(response.data, 'connects');
                setTimeout(() => {
                    toast.success(" Successfully Updated");
                }, 100);
            }, (error) => {
                console.log(error);
                toast.error("Can't Update Profile");
            });
        } else if (userType === 'engineer') {
            const cityValue = Array.prototype.map.call(multiSelectionsEngineer, function (item) { return item.name; }).join(",");
            const ServiceValue = Array.prototype.map.call(multiSelectionsServiceCity, function (item) { return item.name; }).join(",");

            url = CMS_STRAPI_URL + "/api/engineers/" + id;
            axios({
                method: "PUT",
                url: url,
                data: {
                    data: {
                        "username": username,
                        "name": name,
                        "email": email,
                        "phonenumber": phone,
                        "country": country,
                        "city": city,
                        "currencycode": currencycode,
                        "countrycode": countrycode,
                        "address": address,
                        "state": state,
                        "workinghour": workinghour,
                        "preferedLanguage": preferedLanguage,
                        "bankaccno": bankaccno,
                        "bankcode": bankcode,
                        "bankname": bankname,
                        "availabilitystatus": availabilitystatus,
                        "walletbalance": walletbalance,
                        "servicecity": cityValue,
                        "servicetype": ServiceValue
                    },
                },
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwt"),
                },
            }).then((response) => {
                console.log(response.data, 'connects');
                setTimeout(() => {
                    toast.success(" Successfully Updated");
                }, 100);
            }, (error) => {
                console.log(error);
                toast.error("Can't Update Profile");
            });
        } else if (userType === "outsourcecompany") {
            const cityValue = Array.prototype.map.call(multiSelectionsEngineer, function (item) { return item.name; }).join(",");
            url = CMS_STRAPI_URL + "/api/designercompanies/" + id;
            axios({
                method: "PUT",
                url: url,
                data: {
                    data: {
                        "username": username,
                        "name": name,
                        "email": email,
                        "phonenumber": phone,
                        "country": country,
                        "servicecity": cityValue,
                        "bankaccno": bankaccno,
                        "bankcode": bankcode,
                        "bankname": bankname


                    }
                },
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwt"),
                },
            }).then((response) => {
                console.log(response.data, 'connects');
                setTimeout(() => {
                    toast.success(" Successfully Updated");
                }, 100);
            }, (error) => {
                console.log(error);
                toast.error("Can't Update Profile");
            });
        }

    }

    render() {
        const { isEdit, userType, sur, sup, des, multiSelectionsEngineer, multiSelectionsServiceCity, City, Country, availabilitystatus, bankaccno, bankname, bankcode, workinghour, preferedLanguage, walletbalance, servicecity, serviceregion, state, address, city, country, phone, name, email, username, countrycode, currencycode } = this.state;
        return (
            <Fragment>
                <Breadcrumb parent={LabelConstants.USER} title={LabelConstants.EDIT_ADVERTISER_ACCOUNT} />
                <div className="container-fluid"><form>
                    <div className="edit-profile">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="card-title mb-0">My Profile</h5>
                                        <div className="card-options">
                                            <a className="card-options-collapse" href="javascript" data-toggle="card-collapse"><i className="fe fe-chevron-up"></i></a><a className="card-options-remove" href="javascript" data-toggle="card-remove"><i className="fe fe-x"></i></a></div>
                                    </div>
                                    <div className="card-body">

                                        <div className="form-group mt-3">
                                            <label className="form-label">{LabelConstants.NAME}</label>
                                            <input className="form-control" placeholder="Name" value={name} readOnly={isEdit} onChange={e => this.setState({ name: e.target.value })} />
                                        </div>

                                      

                                        <div className="form-group">
                                            <label className="form-label">{LabelConstants.USER_NAME}</label>
                                            <input className="form-control" type="text" placeholder="Website" disabled={true} value={username} onChange={e => this.setState({ username: e.target.value })} />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Country Code</label>
                                            <select className="form-control" type="text" value={countrycode} readOnly={isEdit} onChange={e => this.setState({ countrycode: e.target.value })}>
                                                <option selected>
                                                    Select
                                                </option>
                                                <option value="SAR">SAR</option>
                                                <option value="INR">INR</option>
                                            </select>
                                        </div>

                                     
                                        <div className="form-group">
                                            <label className="form-label">Currency Code</label>
                                            <select className="form-control" type="text" value={currencycode} readOnly={isEdit} onChange={e => this.setState({ currencycode: e.target.value })}>
                                                <option selected>
                                                    Select
                                                </option>
                                                <option value="SAR">SAR</option>
                                                <option value="INR">INR</option>
                                            </select>
                                        </div>


                                        <div className="form-group">
                                            <label className="form-label">{LabelConstants.PHONE}</label>
                                            <input className="form-control" type="text" placeholder="Phone" value={phone} readOnly={isEdit} onChange={e => this.setState({ phone: e.target.value })} />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Region</label>
                                            <select className="form-control" type="text" value={state} readOnly={isEdit} onChange={e => this.setState({ state: e.target.value })}>
                                                <option value="" disabled="" selected="">Choose..</option>
                                                {Country.map((item, index) => {
                                                    return (
                                                        <option value={item.code}>{item.name_en}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>


                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8">

                                <div className="card-header" style={{ backgroundColor: '#102c54' }}>
                                    <h5 className="card-title mb-0" style={{ color: '#fff' }}>{LabelConstants.EDIT_ADVERTISER_PROFILE}</h5>
                                    <div className="card-options"><a className="card-options-collapse" href="javascript" data-toggle="card-collapse"><i className="fe fe-chevron-up"></i></a><a className="card-options-remove" href="javascript" data-toggle="card-remove"><i className="fe fe-x"></i></a></div>
                                </div>
                                <div className="card-body">
                                    <div className="row">


                                        <div className="col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">City</label>
                                                <select className="form-control" value={city} readOnly={isEdit} onChange={e => this.setState({ city: e.target.value })} >
                                                    <option value="" disabled="" selected="">Choose..</option>
                                                    {City.map((item, index) => {
                                                        return (
                                                            <option value={item.code}>{item.name_en}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Country</label>
                                                <select className="form-control" type="text" value={country} readOnly={isEdit} onChange={e => this.setState({ country: e.target.value })}>
                                                    <option value="" disabled="" selected="">Choose..</option>
                                                    <option value="sa">Saudi Arabia</option>
                                                </select>
                                            </div>
                                        </div>
                                        {userType === "engineer" || userType === "outsourcecompany" && (
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">Language</label>
                                                    <select className="form-control" type="text" value={preferedLanguage} readOnly={isEdit} onChange={e => this.setState({ preferedLanguage: e.target.value })}>
                                                        <option value="" disabled="" selected="">Choose..</option>
                                                        <option value="en">English</option>
                                                    </select>
                                                </div>
                                            </div>
                                        )}

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Address</label>
                                                <input className="form-control" type="text" value={address} readOnly={isEdit} onChange={e => this.setState({ address: e.target.value })} />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Wallet Balance</label>
                                                <input className="form-control" type="text" value={walletbalance} disabled={true} onChange={e => this.setState({ walletbalance: e.target.value })} />
                                            </div>
                                        </div>

                                        {userType === "engineer" || userType === "outsourcecompany" && (
                                            <div className="col-md-6 mb-3">
                                                <label>Service City</label>
                                                <div className="form-group">
                                                    <Typeahead
                                                        id="multiple-typeahead"
                                                        clearButton
                                                        labelKey="name"
                                                        onChange={e => this.setState({ multiSelectionsEngineer: e })}
                                                        selected={multiSelectionsEngineer}
                                                        multiple
                                                        options={options}
                                                        placeholder="Choose Service City..."
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <div className='row'>
                                            <div className="col-md-12">
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
                                        </div>
                                        <div className='row'>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <div >
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
                                        </div>



                                        {userType === "engineer" && (
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">Working Hour</label>
                                                    <input className="form-control" type="text" value={workinghour} readOnly={isEdit} onChange={e => this.setState({ workinghour: e.target.value })} />
                                                </div>
                                            </div>
                                        )}

                                        {userType === "engineer" || userType === "outsourcecompany" && (
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">Bank Name</label>
                                                    <input className="form-control" type="text" value={bankname} readOnly={isEdit} onChange={e => this.setState({ bankname: e.target.value })} />
                                                </div>
                                            </div>

                                        )}

                                        {userType === "engineer" || userType === "outsourcecompany" && (
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">Bank A/C No</label>
                                                    <input className="form-control" type="text" value={bankaccno} readOnly={isEdit} onChange={e => this.setState({ bankaccno: e.target.value })} />
                                                </div>
                                            </div>
                                        )}

                                        {userType === "engineer" || userType === "outsourcecompany" && (
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">Bank Code</label>
                                                    <input className="form-control" type="text" value={bankcode} readOnly={isEdit} onChange={e => this.setState({ bankcode: e.target.value })} />
                                                </div>
                                            </div>
                                        )}

                                        {userType === "engineer" && (
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">Availability Status</label>
                                                    <select className="form-control" type="text" value={availabilitystatus} readOnly={isEdit} onChange={e => this.setState({ availabilitystatus: e.target.value })}>
                                                        <option selected>
                                                            Select
                                                        </option>
                                                        <option value="true">Yes</option>
                                                        <option value="false">No</option>
                                                    </select>
                                                </div>
                                            </div>




                                        )}

                                        {userType === "engineer" && (
                                            <div className='col-md-6'>
                                                <div className="form-group">
                                                    <label className="form-label">Service Type</label>
                                                    <Typeahead
                                                        id="multiple-typeahead"
                                                        clearButton
                                                        labelKey="name"
                                                        onChange={e => this.setState({ multiSelectionsServiceCity: e })}
                                                        selected={multiSelectionsServiceCity}
                                                        multiple
                                                        options={[{ name: 'survey' },
                                                        { name: 'supervision' },
                                                        { name: 'design' },
                                                        { name: 'license' },]}
                                                        placeholder="Choose Service Type..."
                                                    />
                                                </div>
                                            </div>
                                        )}


                                    </div>
                                </div>
                                <div className="text-right">
                                    {isEdit ?
                                        <button className="btn btn-primary mr-1" onClick={(e) => { this.edit(e, 'isEdit') }}>Edit</button> :
                                        <button className="btn btn-primary mr-1" onClick={(e) => { this.handleUpdate(e) }} >Update</button>
                                    }
                                </div>

                            </div>

                        </div>
                    </div> </form>
                </div >
            </Fragment >
        );
    }
};

export default userProfile;