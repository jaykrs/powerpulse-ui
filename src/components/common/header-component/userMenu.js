import React, { Fragment, useState, useEffect } from 'react';
import man from '../../../assets/images/dashboard/user.png';
import { User, Mail, Lock, Settings, LogOut } from 'react-feather';
import app from "../../../data/base";
import mohandess from '../../../assets/images/user/avtar.png'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import {CMS_STRAPI_URL} from '../../../constant/serviceurl';
const UserMenu = ({ history }) => {
    const [profile, setProfile] = useState('');
//    const [userType, setUserType] = useState(localStorage.getItem('userType'));
    useEffect(() => {
        setProfile(CMS_STRAPI_URL+localStorage.getItem('avatarUri') || man);
    }, []);

    const logOut = () => {
        localStorage.removeItem('userData');
        localStorage.removeItem('avatarUri');
        localStorage.removeItem('userId');
        localStorage.removeItem('jwt');
        localStorage.removeItem('profileURL');
        localStorage.removeItem('userType');
        sessionStorage.removeItem('checkOutId');
        sessionStorage.removeItem('priceList');
        sessionStorage.removeItem('priceData')
        sessionStorage.removeItem('PROJECTLIST')
        app.auth().signOut()
        history.push(`/home`);
    }

    return (
        <Fragment>
            <li className="onhover-dropdown">
                <div className="media align-items-center">
                    <img className="align-self-center pull-right rounded-circle blur-up lazyloaded" width="50px" height="50px" src={mohandess} alt="header-user" />
                    <div className="dotted-animation">
                        <span className="animate-circle"></span>
                        <span className="main-circle"></span>
                    </div>
                </div>
                <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
                    <li><Link to={localStorage.getItem('userType') === 'influencer' ? `/users/userProfileEdit` : `/userProfile`}><User />Edit Profile</Link></li>
                    {/* <li><a href="#!"><Mail />Inbox</a></li> */}
                    {/* <li><a href="#!"><Lock />Lock Screen</a></li> */}
                    <li><Link to={`/users/userEdit`}><Settings />Settings</Link></li>
                    <li  onClick={logOut}><LogOut /> Log out</li>
                </ul>
            </li>
        </Fragment>
    );
};


export default withRouter(UserMenu);