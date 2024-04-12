import React, { Fragment } from 'react';
import { Home } from 'react-feather';
import { Link } from 'react-router-dom'
import Bookmark from './bookmark';

const Breadcrumb = props => {
    const breadcrumb = props;

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="page-header">
                    <div className="row">
                        <div className="col-2">
                            <div className="page-header-left">
                                <div className="d-flex">
                                    <h4>{breadcrumb.title}</h4><text className="h5 ml-1" style={{marginTop: 2}}>{breadcrumb.subTitle}</text>
                                </div>
                                {/* <ol className="breadcrumb pull-right">
                                    <li className="breadcrumb-item">
                                        <Link to="/dashboard/default">
                                            <Home />
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item">{breadcrumb.parent}</li>
                                    <li className="breadcrumb-item active">{breadcrumb.title}</li>
                                </ol> */}
                            </div>
                        </div>
                        {/* <!-- Bookmark Start--> */}
                        {/* <Bookmark /> */}
                        {/* <!-- Bookmark Ends--> */}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Breadcrumb
