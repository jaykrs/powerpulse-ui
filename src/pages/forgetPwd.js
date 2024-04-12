import React, { Fragment } from 'react';
// import logo from '../assets/images/endless-logo.png'
import logo from '.././assets/images/logo/mohandess-logo.png';

const ForgetPwd = () => {
    return (
        <Fragment>
            {/* <div className="page-wrapper"> */}
            {/* <div className="container-fluid"> */}
            <div className="authentication-main">
                <div className="row">
                    <div className="col-md-12 p-0">
                        <div className="auth-innerright">
                            <div className="reset-password-box">
                                 <div className="text-center"><img src={logo} width="230px" alt="" /></div> 
                                <div className="card mt-4 mb-0">
                                    <form className="theme-form">
                                        <h6 className="f-14 mt-4 mb-3">CREATE YOUR PASSWORD</h6>
                                        <div className="form-group">
                                            <label className="col-form-label">New Password</label>
                                            <input className="form-control" type="password" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label">Retype Password</label>
                                            <input className="form-control" type="password" />
                                        </div>
                                        <div className="card-footer">
                                            <button class="btn btn-primary float-right ">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}
            {/* </div> */}
        </Fragment>
    );
};

export default ForgetPwd;