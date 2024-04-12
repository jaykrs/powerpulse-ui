import React, { useState, Fragment } from 'react';
import logo from '../../../assets/images/logo/mohandess-logo.png';
import Language from './language';
import UserMenu from './userMenu';
import Notification from './notification';
import SearchHeader from './searchHeader';
import { Link } from 'react-router-dom';
import { AlignLeft, Maximize, Bell, MessageCircle, MoreHorizontal } from 'react-feather';
import { CMS_STRAPI_URL } from '../../../constant/serviceurl';
import axios from 'axios';

const Header = () => {
  const [sidebar, setSidebar] = useState(false);
  const [check, setCheck] = useState(true);
  const [rightSidebar, setRightSidebar] = useState(true);
  const [headerbar, setHeaderbar] = useState(true);
  const [notification, setNotification] = useState();
  const [cartPost, setCartPost] = useState();
  const [userType, setUserType] = useState(localStorage.getItem('userType'));
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [userTypeId, setUserTypeId] = useState(localStorage.getItem('userTypeId'));
  const [value, setValue] = useState(localStorage.getItem('jwt'));

  const openCloseSidebar = () => {
    if (sidebar) {
      setSidebar(!sidebar)
      document.querySelector(".page-main-header").classList.remove('open');
      document.querySelector(".page-sidebar").classList.remove('open');
    } else {
      setSidebar(!sidebar)
      document.querySelector(".page-main-header").classList.add('open');
      document.querySelector(".page-sidebar").classList.add('open');
    }
  }

  function setCart(data) {
    var totalPost = 0;
    data.map((item, index) => {
      totalPost = totalPost + Number(item.postcount);
    })
    setCartPost(totalPost)
  }

  function notificationData() {
    setCheck(false)
    if (userType === 'advertiser') {
      axios({
        method: 'get',
        url: CMS_STRAPI_URL + '/notifications?advertiser_id=' + userTypeId + '&read_status=false',
        headers: {
          Authorization:
            'Bearer ' + value,
        }
      }).then((response) => {
        if (null != response.data && response.data.length > 0) {
          var datasize = response.data.length;
          setNotification(datasize)
          console.log('data', response.data)
        }
      }, (error) => {
        console.log(error);
      });

      axios({
        method: 'get',
        url: CMS_STRAPI_URL + '/carts?agency.USER_ID=' + userId + '&paymentstatus=false',
        headers: {
          Authorization:
            'Bearer ' + value,
        }
      }).then((response) => {
        if (null != response.data && response.data.length > 0) {
          var datasize = response.data.length - 1;
          setCart(response.data[datasize].jobposts)
          console.log('data', response.data)
        }
      }, (error) => {
        console.log(error);
      });

    } else if (userType === 'influencer') {
      axios({
        method: 'get',
        url: CMS_STRAPI_URL + '/notifications?influencer_id=' + userTypeId + '&read_status=false',
        headers: {
          Authorization:
            'Bearer ' + value,
        }
      }).then((response) => {
        if (null != response.data && response.data.length > 0) {
          var datasize = response.data.length;
          setNotification(datasize)
          console.log('data', response.data)
        }
      }, (error) => {
        console.log(error);
      });
    }
  }

  // setInterval(notificationData, 5000);

  if (check) {
    notificationData();
  }

  function showRightSidebar() {
    if (rightSidebar) {
      setRightSidebar(!rightSidebar)
      document.querySelector(".right-sidebar").classList.add('show');
    } else {
      setRightSidebar(!rightSidebar)
      document.querySelector(".right-sidebar").classList.remove('show');
    }
  }

  //full screen function
  function goFull() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  function handleCart() {
    // alert(window.location.hash);
    if ('#/advertiser/cart' === window.location.hash) {
      window.location.reload(true);
    }
  }

  function handleNotification() {
    if ('#/user/notification' === window.location.hash) {
      window.location.reload(true);
    }
  }

  // <Link to="/userdashboard">
  // <img className="img-fluid" width="110px" src={logo} alt="logo" style={{ marginTop: "-15px" }} />
  // </Link>
  return (
    <Fragment>
      <div className="page-main-header">
        <div className="main-header-right row">
          <div className="main-header-left d-lg-none">
            <div className="logo-wrapper">
            
            </div>
          </div>
          <div className="mobile-sidebar d-lg-none d-block">
            <div className="media-body  text-right switch-sm">
              <label className="switch">
                <text onClick={() => openCloseSidebar()}>
                  <AlignLeft />
                </text>
              </label>
            </div>
          </div>
          <div className="nav-right col p-0">
            <ul className={`nav-menus ${headerbar ? '' : 'open'}`}>

              <li className="ml-2">
                {userType === 'advertiser' && ('#/dashboard/default' === window.location.hash || '#/dashboard/filter' === window.location.hash) ?
                  <SearchHeader /> : null
                }
              </li>
              {/* <li>
                <a onClick={goFull} className="text-dark" href="#!">
                  <Maximize />
                </a>
              </li> */}

              {userType === 'advertiser' ?
                <li className="onhover-dropdown" onClick={() => handleCart()}>
                  <Link to='/advertiser/cart'>
                    <h6>
                      <i class="fa fa-shopping-cart"></i>
                      <span>{cartPost}</span>
                    </h6>
                  </Link>
                  {/* <Language /> */}
                </li> : ''
              }
              <li className="onhover-dropdown" onClick={() => handleNotification()}>
                <Link to="/user/notification">
                  {/* <Notification /> */}
                  <Bell />
                  <span>{notification}</span>
                  {/* <Notification /> */}
                </Link>
              </li>
              {/* <li>
                <a href="javascript" onClick={showRightSidebar}>
                  <MessageCircle />
                  <span className="dot"></span>
                </a>
              </li> */}
              <UserMenu />
            </ul>
            <div className="d-lg-none mobile-toggle pull-right" onClick={() => setHeaderbar(!headerbar)}><MoreHorizontal /></div>
          </div>
          <script id="result-template" type="text/x-handlebars-template">
            <div className="ProfileCard u-cf">
              <div className="ProfileCard-avatar">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-airplay m-0"><path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1">
                </path>
                  <polygon points="12 15 17 21 7 21 12 15"></polygon>
                </svg>
              </div>
              <div className="ProfileCard-details">
                <div className="ProfileCard-realName"></div>
              </div>
            </div>
          </script>
          <script id="empty-template" type="text/x-handlebars-template">
            <div className="EmptyMessage">Your search turned up 0 results. This most likely means the backend is down, yikes!</div>
          </script>
        </div>
      </div>
    </Fragment>
  )
};
export default Header;

// <div className="main-header-left d-lg-none">
//             <div className="logo-wrapper">
//               <Link to="/userdashboard">
//                 <img className="img-fluid" width="230px" src={logo} alt="logo" />
//               </Link>
//             </div>
//           </div>
//           <div className="mobile-sidebar d-lg-none d-block">
//             <div className="media-body  text-right switch-sm">
//               <label className="switch">
//                 <text onClick={() => openCloseSidebar()}>
//                   <AlignLeft />
//                 </text>
//               </label>
//             </div>
//           </div>