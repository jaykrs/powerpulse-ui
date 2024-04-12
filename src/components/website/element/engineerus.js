import React, { Component, Fragment } from 'react';
import pexels from '../../../assets/images/shipyard.jpg'
import { Breadcrumb } from 'reactstrap';
class EngineerUs extends Component {
    render() {
        return (
            <Fragment>
                <Breadcrumb title="Blog Details" parent="Blog" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-6 set-col-12">
                            <div className="card">
                                <div className="blog-box blog-list row">
                                    <div className="col-sm-6">
                                        <div className="blog-details">
                                            <i style={{ color: "rgb(234, 234, 18)", fontSize: '20px', marginRight: '5px' }} class="fa fa-paper-plane" aria-hidden="true"></i>
                                            <text className='bold_text'>Requirement</text>

                                            <hr />
                                            <p className="mt-0">Post your Requirement for Survey ,<br /> Supervision and Design</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="blog-details">
                                            <i style={{ color: "rgb(234, 234, 18)", fontSize: '20px', marginRight: '5px' }} class="fa fa-paper-plane" aria-hidden="true"></i>
                                            <text className='bold_text'>Get the quotation</text>

                                            <hr />
                                            <p className="mt-0">Get the quotation from various <br /> Engineering firm serving through out <br /> Saudi Arabia</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="blog-box blog-list row">
                                    <div className="col-sm-6">
                                        <div className="blog-details">
                                            <i style={{ color: "rgb(234, 234, 18)", fontSize: '20px', marginRight: '5px' }} class="fa fa-paper-plane" aria-hidden="true"></i>
                                            <text className='bold_text'>Proceed with an engineering Firm</text>

                                            <hr />
                                            <p className="mt-0">Recharge your wallet and proceed with an Engineering firm.</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="blog-details">
                                            <i style={{ color: "rgb(234, 234, 18)", fontSize: '20px', marginRight: '5px' }} class="fa fa-paper-plane" aria-hidden="true"></i>
                                            <text className='bold_text'>Colloborate</text>

                                            <hr />
                                            <p className="mt-0">Start colloborate with the engineering <br /> firm and engineers.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-6 set-col-12">
                            <div className="card" >
                                <div className="blog-box blog-shadow">
                                    <img style={{ height: '350px', width: '100%' }} className="img-fluid" src={pexels} alt="" />

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Fragment>

        );
    }
}

export default EngineerUs;