import React, { Fragment, useState, useEffect, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import axios from 'axios';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import { Link } from 'react-router-dom';
import { Typeahead } from 'react-bootstrap-typeahead';

class CrewView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: localStorage.getItem('jwt'),
            userId: localStorage.getItem('userId'),
            dataList: [],
            userType: localStorage.getItem('userType'),
            projectcrews: sessionStorage.setItem('projectcrews'),
            data: '',
            isEdit: true,
            multiSelectionsServiceCity: "",
        }
    }


    handleEdit() {
        // const{projectcrews}= this.state
        // console.log(projectcrews,"projectcrews")
        this.props.history.push({ pathname: '/crewlist' })
    }






    render() {
        const { country, multiSelectionsServiceCity } = this.state;
        // const total = 0;
        return (
            <Fragment>
                <Breadcrumb />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12 col-xl-6">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card">
                                        <div className="card-body">
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
                                        <div style={{ display: 'flex', justifyContent: 'flex-end' }} className="card-footer">
                                            <button class="btn btn-primary active" onClick={() => { this.handleEdit() }}>Submit</button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default CrewView;