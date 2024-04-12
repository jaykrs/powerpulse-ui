import React, { Fragment, useState } from 'react';
import man from '../../../assets/images/dashboard/user.png'
import { Link } from 'react-router-dom';
import { Edit } from 'react-feather';
import { CMS_STRAPI_URL } from '../../../constant/serviceurl';
import { LabelConstants } from '../../../constant/LableConstant';

const UserPanel = () => {
    const url = '';
    const [userAvatar, setUserAvatar] = useState(localStorage.getItem('avatarUri'));
    const [userName, setUserName] = useState(localStorage.getItem('userName'));
    // setUserData()
    return (
        <Fragment>
            <div className="sidebar-user text-center">
                <div>
                    <img className="rounded-circle lazyloaded blur-up" width="80px" height="80px" src={null != userAvatar ? CMS_STRAPI_URL + userAvatar : CMS_STRAPI_URL+LabelConstants.DEFAULT_AVATAR} alt="#" />
                    <div className="profile-edit">
                        <Link to={`/users/userEdit`}>
                            <Edit />
                        </Link>
                    </div>
                </div>
                <h6 className="mt-3 f-14">{userName}</h6>
            </div>
        </Fragment>
    );
};

export default UserPanel;