import React, { Component, Fragment } from "react";
import Axios from "axios";
import { CMS_STRAPI_URL } from "../../constant/serviceurl";
import { Breadcrumb } from "reactstrap";
import { LabelConstants } from "../../constant/LableConstant";
import { Link } from "react-router-dom";

class UserAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            userType: localStorage.getItem("userType"),
            userId: localStorage.getItem("userId"),
            value: localStorage.getItem("jwt"),
            avataruri: localStorage.getItem('avatarUri'),
        }
    }

    componentWillMount() {
        const { userId, value } = this.state;
        Axios({
            method: "GET",
            url: CMS_STRAPI_URL + '/users/' + userId,
            headers: {
                Authorization:
                    'Bearer ' + value,
            },
        }).then((response) => {
            this.setState({
                data: response.data,
                avataruri: response.data.avatar_url
            })
            console.log("user Data", response.data);
        }, (error) => {
            console.log(error);
        });
    }

    render() {
        const { userType, data, name, avataruri } = this.state;
        return (
            <Fragment>
                <Breadcrumb parent={LabelConstants.USER} title={LabelConstants.EDIT_ACCOUNT_SETTING} />
                <div className="container-fluid"><form>
                    <div className="edit-profile">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="card-title mb-0">{LabelConstants.MY_ACCOUNT}</h5>
                                        <div className="card-options">
                                            <a className="card-options-collapse" href="javascript" data-toggle="card-collapse"><i className="fe fe-chevron-up"></i></a><a className="card-options-remove" href="javascript" data-toggle="card-remove"><i className="fe fe-x"></i></a></div>
                                    </div>
                                    <div className="card-body">

                                        <div className="row mb-2">
                                            <div className="col-auto"><img className="rounded-circle" width="120px" height="120px" onError={(e) => { e.target.onerror = null; e.target.src = "https://app.cinfluencers.com/avatar.jpg" }} alt="" src={CMS_STRAPI_URL + avataruri} /></div>
                                            <div className="col">
                                                {/* <input type="file" onChange={fileChangedHandler} ref={hiddenFileInput} style={{ display: 'none' }} /> */}
                                                {/* <button className="btn btn-primary" onClick={() => uploadHandler()}><Upload /></button> */}
                                                <h4 className="mb-1">{data.Name}</h4>
                                            </div>
                                        </div>
                                        {/* <div className="form-group">
                                            <h6 className="form-label">{LabelConstants.REMARKS}</h6>
                                            <textarea className="form-control" rows="5" value={remarks} placeholder={LabelConstants.REMARKS} onChange={e => setRemarks(e.target.value)} />
                                        </div> */}
                                        {/* <div className="form-group mt-3">
                                            <label className="form-label">{LabelConstants.EMAIL_ADDRESS}</label>
                                            <input className="form-control" placeholder={LabelConstants.EMAIL_PLACEHOLDER} value={null != data.email ? data.email.includes("linkedin") ? "linkedin.com" : data.email : null} readOnly={true} />
                                        </div> */}
                                        {/* <div className="form-group">
                                        <label className="form-label">{LabelConstants.PASSWORD}</label>
                                        <input className="form-control" type="password" value={data.}/>
                                        <button className="btn btn-primary mt-2" type="submit" onClick={() => { }}>Update Password</button>
                                    </div> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8">

                                <div className="card-header" style={{ backgroundColor: '#102c54' }}>
                                    <h5 className="card-title mb-0" style={{ color: '#fff' }}>Account Details</h5>
                                    <div className="card-options"><a className="card-options-collapse" href="javascript" data-toggle="card-collapse"><i className="fe fe-chevron-up"></i></a><a className="card-options-remove" href="javascript" data-toggle="card-remove"><i className="fe fe-x"></i></a></div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">{LabelConstants.NAME}</label>
                                                <input className="form-control" type="text" placeholder={LabelConstants.NAME} value={data.Name} readOnly={true} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">{LabelConstants.DOB}</label>
                                                <input className="form-control" type="date" placeholder={LabelConstants.DOB} value={data.dob} readOnly={true} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">{LabelConstants.PHONE_NUMBER}</label>
                                                <div className="d-flex">
                                                    <input className="form-control col-sm-3 col-md-3" type="text" value={data.country_code} readOnly={true} />
                                                    <input className="form-control" type="text" placeholder={LabelConstants.PHONE_NUMBER} value={data.phone} readOnly={true} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">{LabelConstants.GENDER}</label>
                                                <input className="form-control mb-1 text-capitalize" value={data.sex} readOnly={true} />

                                            </div>
                                        </div>

                                        <div className="col-sm-12 col-md-12">
                                            <div className="d-flex">
                                                {/* <label className="form-label mr-auto">If you want to change any details in Account</label> */}
                                                <Link to="/users/userEdit" className="btn btn-sm btn-primary ml-auto">Edit Account</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="card-footer text-right">
                                    <button className="btn btn-primary" type="submit" onClick={() => handleUpdate()}>{LabelConstants.UPDATE_PROFILE}</button>
                                </div> */}

                            </div>
                        </div>
                    </div> </form>
                </div>
            </Fragment>
        );
    }
}

export default UserAccount;