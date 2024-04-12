import React, { Fragment, useEffect } from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";
import "./index.scss";
// import './i18next'

//un-comment this auth by using firebase only
// import app from './data/base';
// import {useState} from 'react';

import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import { ScrollContext } from "react-router-scroll-4";
import * as serviceWorker from "./serviceWorker";

// ** Import custom components for redux**
import { Provider } from "react-redux";
import App from "./components/app";
import store from "./store/index";

// Import custom Components

import Crypto from "./components/dashboard/crypto/crypto-component";
import Default from "./components/dashboard/defaultCompo/default";
import Ecommerce from "./components/dashboard/ecommerce";
// import Project from "./components/dashboard/project/project";
import ServerComponent from "./components/dashboard/server/server-component";
import University from "./components/dashboard/university";

// widgets
import Chart from "./components/widgets/chart";
import General from "./components/widgets/general";

//Ui-elements
import Avatar from "./components/ui-elements/avatar";
import Grid from "./components/ui-elements/grid";
import HelperClass from "./components/ui-elements/helperclass";
import List from "./components/ui-elements/lists/list";
import Ribbon from "./components/ui-elements/ribbon";
import Shadow from "./components/ui-elements/shadow";
import Spinner from "./components/ui-elements/spinner";
import Statecolor from "./components/ui-elements/statecolor";
import Steps from "./components/ui-elements/steps";
import TagsandPills from "./components/ui-elements/tagsandpills";
import Typography from "./components/ui-elements/typography";
import UIBreadCrumb from "./components/ui-elements/uibreadcrumb";

//Base
import Accordion from "./components/base/accordionComponent/accordion";
import AlertComponent from "./components/base/alertComponent/alert";
import CarouselComponent from "./components/base/Carousels/carouselComponent";
import CollapseComponent from "./components/base/collapseComponent";
import DatepickerComponent from "./components/base/datepickerComponent";
import DropdownComponent from "./components/base/dropdownComponent";
import ModalComponent from "./components/base/modalComponent";
import Pagination from "./components/base/pagination";
import PopoverComponent from "./components/base/popover/popoverComponent";
import ProgressBar from "./components/base/progressBar";
import RatingComponent from "./components/base/ratingComponent";
import TabsSet from "./components/base/tabs-set";
import TimePickerWrapper from "./components/base/timepickerComponent/timepicker";
import TooltipsComponent from "./components/base/tooltipsComponent";
import TypeaheadComp from "./components/base/typeaheadComponent/typeahead";

// Advance
import Carousel from "./components/advance/carousel";
import DragNDropComp from "./components/advance/drag-n-drop/dragNDropComp";
import DropzoneComponent from "./components/advance/dropzone";
import ImageCropper from "./components/advance/imageCropper";
import RangeSlider from "./components/advance/rangeSlider";
import Scrollable from "./components/advance/scrollable";
import StickyNotes from "./components/advance/stickyNotes";
import SweetAlert from "./components/advance/sweetAlert";
import Toastr from "./components/advance/toastr";
import TourComponent from "./components/advance/tourComponent";
import UploadImage from "./components/advance/uploadImage";
import DefaultBtn from "./components/buttons/default-btn";
import EdgeBtn from "./components/buttons/edgeBtn";
import FlatBtn from "./components/buttons/flatBtn";
import GroupBtn from "./components/buttons/groupBtn";
import RaisedBtn from "./components/buttons/raisedBtn";
import BasicCards from "./components/cards/basicCards";
import CreativeCards from "./components/cards/creativeCards";
import DraggingCards from "./components/cards/draggingCards";
import TabCard from "./components/cards/tabCard";
import ChartistComponent from "./components/charts/chartistComponent";
import ChartJs from "./components/charts/chartJs";
import GoogleChart from "./components/charts/googleChart";
import Editor1 from "./components/editor/editor1";
import BaseInput from "./components/forms/form-control/baseInput";
import FormValidation from "./components/forms/form-control/form-validation";
import InputGroupComp from "./components/forms/form-control/inputGroup";
import MegaOptions from "./components/forms/form-control/megaOptions";
import RadioCheckbox from "./components/forms/form-control/radio-checkbox";
import FormDefault from "./components/forms/formDefault";
import FormWizard from "./components/forms/wizard/form-wizard";
import ImageGallery from "./components/gallery/imageGallery";
import ImageHover from "./components/gallery/imageHover";
import ImageWithDesc from "./components/gallery/imageWithDesc";
import MesonryGallery from "./components/gallery/mesonryGallery";
import FeatherIcons from "./components/icons/featherIcons";
import FlagIcons from "./components/icons/flagIcons";
import FontAwsomeIcon from "./components/icons/fontAwsomeIcon";
import IcoIcons from "./components/icons/icoIcons";
import ThemifyIcons from "./components/icons/themifyIcons";
import WeatherIcons from "./components/icons/weatherIcons";
import GoogleMap from "./components/map/googleMap";
import LeafletMapComp from "./components/map/leafletMap";
import BasicTable from "./components/tables/bootstrap/basicTable";
import DataTableComponent from "./components/tables/dataTableComponent";
import Timeline from "./components/timelines/timeline";
import Timeline2 from "./components/timelines/timeline2";
import UserEdit from "./components/users/userEdit";
import UserProfile from "./components/users/userProfile";
// import UserProfileEdit from './components/users/userProfileEdit';
// import UserAdvertiserEdit from './components/users/userAdvertiserEdit';
import BlogDetail from "./components/blog/blogDetail";
import BlogPost from "./components/blog/blogPost";
import BlogSingle from "./components/blog/blogSingle";
import Calender1 from "./components/calender/calender1";
import Calender2 from "./components/calender/calender2";
import FaqComponent from "./components/faq/faqComponent";
import CardView from "./components/jobSearch/cardView";
import JobApply from "./components/jobSearch/job-apply";
import JobDetail from "./components/jobSearch/job-detail";
import JobList from "./components/jobSearch/job-list";
import KnowledgebaseComponent from "./components/knowledgebase/knowledgebaseComponent";
import LearningDeatil from "./components/learning/learning-deatil";
import LearningList from "./components/learning/learning-list";
import SocialApp from "./components/social-app/socialApp";
import SupportTicket from "./components/support-ticket/supportTicket";
import UserCards from "./components/users/user-cards";
import ComingSoon from "./pages/comingsoon";
import ComingSoonImg from "./pages/comingsoonImg";
import ComingSoonVideo from "./pages/comingsoonVideo";
import Error400 from "./pages/errors/error400";
import Error401 from "./pages/errors/error401";
import Error403 from "./pages/errors/error403";
import Error404 from "./pages/errors/error404";
import Error500 from "./pages/errors/error500";
import Error503 from "./pages/errors/error503";
import ForgetPwd from "./pages/forgetPwd";
import Login from "./pages/login";
import LoginWithBgImg from "./pages/loginWithBgImg";
import LoginWithVideo from "./pages/loginWithVideo";
import Maintenance from "./pages/maintenance";
import ResetPwd from "./pages/resetPwd";
import Signup from "./pages/signup";
import SignupWithImg from "./pages/signupWithImg";
import SignupWithVideo from "./pages/signupWithVideo";
import OTPPage from "./pages/unlockUser";
import stripepayment from "./payment/payment";

// Import Applications Components
import Signin from "./auth/signin";
import Chat from "./components/applications/chat-app/chat";
import ContactApp from "./components/applications/contact-app/contactApp";
import EditUser from "./components/applications/contact-app/edit-user";
import NewUser from "./components/applications/contact-app/new-user";
import AddToCart from "./components/applications/ecommerce-app/add-to-cart";
import Checkout from "./components/applications/ecommerce-app/checkout";
import History from "./components/applications/ecommerce-app/history";
// import Invoice from "./components/applications/ecommerce-app/invoice";
import Payment from "./components/applications/ecommerce-app/payment";
import EcommerceApp from "./components/applications/ecommerce-app/product";
import ProductDetail from "./components/applications/ecommerce-app/product-detail/product-detail";
import ProductList from "./components/applications/ecommerce-app/product-list";
import WishlistComponent from "./components/applications/ecommerce-app/wishlist";
import EmailDefault from "./components/applications/email-app/emailDefault";
import Todo from "./components/applications/todo-app/todo";
import todoFirebase from "./components/applications/todo-firebase-app/todo-firebase";
import {
  InfluencerScreen,
  jobDetail,
  JobListCatagory,
  JobPost,
  jobProject,
  jobForm,
  jobCotact,
  NotificationScreen,
  OrderHistory,
  Published,
  Rejected,
  Successful,
  UserAccount,
  UserAdvertiserEdit,
  UserProfileEdit,
  UsersProfile,
  jobContract,
  JobEfc,
  JobContractor,
  JobEngineer,
  jobEngineerFirm,
  JobContactForm,
  jobContractForm,
  jobContractorForm,
  jobEngineerForm,
  jobEngineerFirmForm,
  jobCoustomerForm,
  jobEfcForm,
} from "./components/users";

// search page
import Searchpage from "./components/search/searchpage";

// sample page
import Samplepage from "./components/sample/samplepage";

// Pricing
import MesonryDesc from "./components/gallery/mesonryDesc";
import Pricing from "./components/price/pricing";
import BorderTable from "./components/tables/bootstrap/borderTable";
import SizingTable from "./components/tables/bootstrap/sizingTable";
import StylingTable from "./components/tables/bootstrap/stylingTable";

//config data
import { useState } from "react";
import Header from "./components/common/header-component/header";
import SearchHeader from "./components/common/header-component/searchHeader";
import Aboutpage from "./components/website/aboutpage";
import Contactpage from "./components/website/contactpage";
import Efirmlist from "./components/website/efirmlist";
import homepage from "./components/website/homepage";
import Servicepage from "./components/website/servicepage";
import Home from "./components/website/home";
import CheckOutPage from "./components/website/checkoutpage ";
import CheckOutOc from "./components/website/checkoutoc";
import PaymentListOc from "./components/website/paymentlistoc";
import ResultPage from "./components/website/resultpage";
import ResultPageOc from "./components/website/resultpageoc";
import Order from "./components/portal/order";
import Project from "./components/portal/project";
import Invoice from "./components/portal/invoice";
import InvoiceReq from "./components/portal/invoicereq";
import InvoiceReqScreen from "./components/portal/invoicereqscreen";
import Connect from "./components/portal/connect";
import ConnectList from "./components/portal/connectlist";
import userProfile from "./components/portal/userprofile";
import DetailsList from "./components/website/detailslist";
import PaymentList from "./components/website/paymentlist";
import configDB from "./data/customizer/config";
import jobEfc from "./components/users/jobefc.component";
import jobEfr from "./components/users/jobefr.component";
import jobCustomer from "./components/users/jobcustomer.component";
import User from "./components/users/user.component";
import Contract from "./components/portal/contract";
import Crew from "./components/portal/crew";
import ContractList from "./components/portal/contractlis";
import Efpricings from "./components/portal/e-fpricings";
import WorkLogList from "./components/portal/workloglist";
import OrderView from "./components/portal/orderview";
import CrewList from "./components/portal/crewlist";
import ProjectCrew from "./components/portal/projectcrew";
import Projectestimate from "./components/portal/projectestimate";
import WorkLogChat from "./components/portal/worklogchat";
import CrewEngineer from "./components/portal/crewEngineer";
import CrewEngineerList from "./components/portal/crewengineerlist";
import InvoiceList from "./components/portal/invoicelist";
import Support from "./components/portal/support";
import SupportList from "./components/portal/supportlist";
import SupportListPage from "./components/portal/supportlistpage";
import Outsource from "./components/portal/outsource";
import UserDashboard from "./components/users/user.dashboard";
import ResidentialList from "./components/website/residentiallist";
import CommercialList from "./components/website/commercialList";
import LicenseList from "./components/website/licenseList";
import DetailView from "./components/users/notificationDetail";
import connectProjectList from "./components/portal/connectProjectList";
import ConnectDetails from "./components/portal/connectDetails";

//firebase Auth only then un-comment this current User code
function Root() {
  const abortController = new AbortController();
  // const [currentUser, setCurrentUser] = useState(false);
  const { t } = useTranslation();

  const [lang, setLang] = useState("en");
  useEffect(() => {
    const layout =
      localStorage.getItem("layout_version") ||
      configDB.data.color.layout_version;
    // app.auth().onAuthStateChanged(setCurrentUser);

    document.body.classList.add(layout);

    console.ignoredYellowBox = ["Warning: Each", "Warning: Failed"];
    console.disableYellowBox = true;

    return function cleanup() {
      abortController.abort();
    };
  }, [abortController]);

  return (
    <div className="App">
      <Provider store={store}>
        <HashRouter basename={`/`}>
          <ScrollContext>
            <Switch>
              <Route
                exact
                path={`/`}
                render={() => {
                  return <Redirect to={`/home`} />;
                }}
              />
              <Route path={`/login`} component={Signin} />
              {/* <Route path={`/aboutpage`} component={Aboutpage} /> */}
              <Route path={`/homepage`} component={homepage} />
              <Route path={`/paygateway`} component={stripepayment} />
              <Route path={`/pages/login`} component={Login} />
              <Route path={"/userdashboard"} component={UserDashboard} />
              <Route path={"/residentialList"} component={ResidentialList} />
              <Route path={"/commercialList"} component={CommercialList} />
              <Route path={"/licenseList"} component={LicenseList} />
              <Route
                path={`/pages/loginWithBgImg`}
                component={LoginWithBgImg}
              />
              <Route
                path={`/pages/loginWithVideo`}
                component={LoginWithVideo}
              />
              <Route path={`/pages/signup`} component={Signup} />
              <Route path={`/pages/signupWithImg`} component={SignupWithImg} />
              <Route
                path={`/pages/signupWithVideo`}
                component={SignupWithVideo}
              />
              <Route path={`/pages/otp`} component={OTPPage} />
              <Route path={`/pages/forgetPwd`} component={ForgetPwd} />
              <Route path={`/pages/resetPwd`} component={ResetPwd} />
              <Route path={`/pages/comingsoon`} component={ComingSoon} />
              <Route path={`/pages/comingsoonImg`} component={ComingSoonImg} />
              <Route
                path={`/pages/comingsoonVideo`}
                component={ComingSoonVideo}
              />
              <Route path={`/pages/maintenance`} component={Maintenance} />
              <Route path={`/pages/errors/error400`} component={Error400} />
              <Route path={`/pages/errors/error401`} component={Error401} />
              <Route path={`/pages/errors/error403`} component={Error403} />
              <Route path={`/pages/errors/error404`} component={Error404} />
              <Route path={`/pages/errors/error500`} component={Error500} />
              <Route path={`/pages/errors/error503`} component={Error503} />
              <Route path={`/aboutpage`} component={Aboutpage} />
              <Route path={`/efirmlist`} component={Efirmlist} />
              <Route path={`/contactpage`} component={Contactpage} />
              <Route path={`/servicepage`} component={Servicepage} />
              <Route path={`/home`} component={Home} />
              <Route path={`/detailslist`} component={DetailsList} />
              <Route path={`/paymentlist`} component={PaymentList} />
              <Route path={`/checkoutpage`} component={CheckOutPage} />
              <Route path={`/checkoutoc`} component={CheckOutOc} />
              <Route path={`/paymentlistoc`} component={PaymentListOc} />
              <Route path={`/resultpage`} component={ResultPage} />
              <Route path={`/resultPageOc`} component={ResultPageOc} />

              {/* NOTE :- If u want login with firebase only then uncomment this currentUser condition*/}
              {/* {currentUser !== null ? */}
              <Fragment>
                <App>
                  {/* dashboard menu */}
                  {/* <Route exact path={`/`} render={() => {
                                        return (<Redirect to={`/dashboard/default`} />)
                                    }} /> */}
                  {/* <Route exact path={`/`} component={Default} /> */}
                  <Route path={`/dashboard/default1`} component={Default} />
                  <Route path={`/heading`} component={Header} />
                  {/* <Route path={`/servicepage`} component={Servicepage} /> */}
                  {/* <Route path={`/contactpage`} component={Contactpage} /> */}
                  <Route path={`/searchHeading`} component={SearchHeader} />
                  <Route path={`/dashboard/default`} component={UserCards} />
                  {/* <Route path={`/dashboard/default`} component={UserCards} /> */}
                  <Route
                    path={`/advertiser/orderHistory`}
                    component={OrderHistory}
                  />

                  <Route path={`/user/profile`} component={UsersProfile} />
                  <Route path={`/user/account`} component={UserAccount} />
                  <Route path={`/payment/success`} component={Successful} />
                  <Route path={`/user/jobPost`} component={JobPost} />
                  <Route path={`/user/jobProject/:id`} component={jobProject} />
                  <Route path={`/user/jobform`} component={jobForm} />
                  <Route path={`/user/jobcontact`} component={jobCotact} />
                  <Route path={`/user/jobContract`} component={jobContract} />
                  <Route path={`/user/jobefc`} component={jobEfc} />
                  <Route path={`/user/jobefr`} component={jobEfr} />
                  <Route path={`/user/jobcustomer`} component={jobCustomer} />
                  <Route
                    path={`/user/jobcontractor`}
                    component={JobContractor}
                  />
                  <Route path={`/user/jobengineer`} component={JobEngineer} />
                  <Route
                    path={`/user/jobengineerfirm`}
                    component={jobEngineerFirm}
                  />
                  <Route
                    path={`/user/jobcontactform/:id`}
                    component={JobContactForm}
                  />
                  <Route
                    path={`/user/jobcontractform`}
                    component={jobContractForm}
                  />
                  <Route
                    path={`/user/jobcontractorform`}
                    component={jobContractorForm}
                  />
                  <Route
                    path={`/user/jobengineerform`}
                    component={jobEngineerForm}
                  />
                  <Route
                    path={`/user/jobengineerfirmform`}
                    component={jobEngineerFirmForm}
                  />
                  <Route
                    path={`/user/jobCoustomerForm`}
                    component={jobCoustomerForm}
                  />
                  <Route path={`/user/jobefcForm`} component={jobEfcForm} />
                  <Route path={`/order`} component={Order} />
                  <Route path={`/project`} component={Project} />
                  <Route path={"/invoice"} component={Invoice} />
                  <Route path={"/invoicereq/:id"} component={InvoiceReq} />
                  <Route path={"/connectprojectlist"} component={connectProjectList} />
                  <Route path={"/connectDetails/:id"} component={ConnectDetails} />
                  <Route
                    path={"/invoicereqscreen/:id"}
                    component={InvoiceReqScreen}
                  />
                  <Route path={"/connect"} component={Connect} />
                  <Route path={"/connectList/:id"} component={ConnectList} />
                  <Route path={"/userProfile"} component={userProfile} />
                  <Route
                    path={`/viewNotification/:id`}
                    component={DetailView}
                  />
                  <Route path={"/contract"} component={Contract} />
                  <Route path={"/contractlist/:id"} component={ContractList} />
                  <Route path={"/crew"} component={Crew} />
                  <Route path={`/efpricings`} component={Efpricings} />
                  <Route path={`/workloglist`} component={WorkLogList} />
                  <Route path={`/orderview/:id`} component={OrderView} />
                  <Route path={`/crewlist`} component={CrewList} />
                  <Route path={`/projectcrew/:id`} component={ProjectCrew} />
                  <Route
                    path={`/projectestimate/:id`}
                    component={Projectestimate}
                  />
                  <Route path={`/worklogchat/:id`} component={WorkLogChat} />
                  <Route path={`/crewEngineer`} component={CrewEngineer} />
                  <Route
                    path={`/crewEngineerlist/:id`}
                    component={CrewEngineerList}
                  />
                  <Route path={`/invoicelist/:id`} component={InvoiceList} />
                  <Route path={`/support`} component={Support} />
                  <Route path={`/supportlist/:id`} component={SupportList} />
                  <Route
                    path={`/supportlistpage/:id`}
                    component={SupportListPage}
                  />
                  <Route path={`/outsource`} component={Outsource} />
                  <Route path={`/user/myPublishedPost`} component={Published} />
                  <Route path={`/user/myRejectedPost`} component={Rejected} />
                  <Route path={`/user/userProfile`} component={User} />
                  <Route
                    path={`/user/notification`}
                    component={NotificationScreen}
                  />

                  <Route
                    path={`/user/JobListCatagory/:id/:platform`}
                    component={JobListCatagory}
                  />
                  <Route
                    path={`/user/jobDetail/:id/:platform`}
                    component={jobDetail}
                  />
                  <Route
                    path={`/influencer/screen`}
                    component={InfluencerScreen}
                  />
                  <Route path={`/dashboard/ecommerce`} component={Ecommerce} />
                  <Route
                    path={`/dashboard/university`}
                    component={University}
                  />
                  <Route path={`/dashboard/crypto`} component={Crypto} />
                  <Route
                    path={`/dashboard/server`}
                    component={ServerComponent}
                  />
                  <Route path={`/dashboard/project`} component={Project} />

                  {/* Widgets Menu */}
                  <Route path={`/widgets/general`} component={General} />
                  <Route path={`/widgets/chart`} component={Chart} />

                  {/* ui-elements */}
                  <Route path={`/ui-element/avatar`} component={Avatar} />
                  <Route
                    path={`/ui-element/uibreadcrumb`}
                    component={UIBreadCrumb}
                  />
                  <Route path={`/ui-element/grid`} component={Grid} />
                  <Route
                    path={`/ui-element/helperclass`}
                    component={HelperClass}
                  />
                  <Route path={`/ui-element/list`} component={List} />
                  <Route path={`/ui-element/ribbon`} component={Ribbon} />
                  <Route path={`/ui-element/shadow`} component={Shadow} />
                  <Route path={`/ui-element/spinner`} component={Spinner} />
                  <Route
                    path={`/ui-element/statecolor`}
                    component={Statecolor}
                  />
                  <Route path={`/ui-element/steps`} component={Steps} />
                  <Route
                    path={`/ui-element/tagsandpills`}
                    component={TagsandPills}
                  />
                  <Route
                    path={`/ui-element/typography`}
                    component={Typography}
                  />

                  {/* base */}
                  <Route path={`/base/accordion`} component={Accordion} />
                  <Route path={`/base/alert`} component={AlertComponent} />
                  <Route
                    path={`/base/carouselComponent`}
                    component={CarouselComponent}
                  />
                  <Route
                    path={`/base/collapseComponent`}
                    component={CollapseComponent}
                  />
                  <Route
                    path={`/base/datepickerComponent`}
                    component={DatepickerComponent}
                  />
                  <Route
                    path={`/base/dropdownComponent`}
                    component={DropdownComponent}
                  />
                  <Route
                    path={`/base/modalComponent`}
                    component={ModalComponent}
                  />
                  <Route path={`/base/pagination`} component={Pagination} />
                  <Route
                    path={`/base/popover/popoverComponent`}
                    component={PopoverComponent}
                  />
                  <Route path={`/base/progressBar`} component={ProgressBar} />
                  <Route
                    path={`/base/ratingComponent`}
                    component={RatingComponent}
                  />
                  <Route path={`/base/tabs-set`} component={TabsSet} />
                  <Route
                    path={`/base/tooltipsComponent`}
                    component={TooltipsComponent}
                  />
                  <Route
                    path={`/base/timepicker`}
                    component={TimePickerWrapper}
                  />
                  <Route path={`/base/typeahead`} component={TypeaheadComp} />

                  {/* Advance */}
                  <Route
                    path={`/advance/dragNDropComp`}
                    component={DragNDropComp}
                  />
                  <Route
                    path={`/advance/dropzone`}
                    component={DropzoneComponent}
                  />
                  <Route
                    path={`/advance/imageCropper`}
                    component={ImageCropper}
                  />
                  <Route path={`/advance/toastr`} component={Toastr} />
                  <Route path={`/advance/carousel`} component={Carousel} />
                  <Route
                    path={`/advance/rangeSlider`}
                    component={RangeSlider}
                  />
                  <Route path={`/advance/scrollable`} component={Scrollable} />
                  <Route
                    path={`/advance/stickyNotes`}
                    component={StickyNotes}
                  />
                  <Route path={`/advance/sweetAlert`} component={SweetAlert} />
                  <Route
                    path={`/advance/tourComponent`}
                    component={TourComponent}
                  />
                  <Route
                    path={`/advance/uploadImage`}
                    component={UploadImage}
                  />

                  {/* icons */}
                  <Route path={`/icons/flagIcons`} component={FlagIcons} />
                  <Route
                    path={`/icons/fontAwsomeIcon`}
                    component={FontAwsomeIcon}
                  />
                  <Route path={`/icons/icoIcons`} component={IcoIcons} />
                  <Route
                    path={`/icons/themifyIcons`}
                    component={ThemifyIcons}
                  />
                  <Route
                    path={`/icons/featherIcons`}
                    component={FeatherIcons}
                  />
                  <Route
                    path={`/icons/weatherIcons`}
                    component={WeatherIcons}
                  />

                  {/* buttons */}
                  <Route path={`/buttons/default-btn`} component={DefaultBtn} />
                  <Route path={`/buttons/flatBtn`} component={FlatBtn} />
                  <Route path={`/buttons/edgeBtn`} component={EdgeBtn} />
                  <Route path={`/buttons/raisedBtn`} component={RaisedBtn} />
                  <Route path={`/buttons/groupBtn`} component={GroupBtn} />

                  {/* gallery */}
                  <Route
                    path={`/gallery/imageGallery`}
                    component={ImageGallery}
                  />
                  <Route
                    path={`/gallery/imageWithDesc`}
                    component={ImageWithDesc}
                  />
                  <Route path={`/gallery/imageHover`} component={ImageHover} />
                  <Route
                    path={`/gallery/mesonryGallery`}
                    component={MesonryGallery}
                  />
                  <Route
                    path={`/gallery/mesonryDesc`}
                    component={MesonryDesc}
                  />

                  {/* Forms */}
                  <Route
                    path={`/forms/form-validation`}
                    component={FormValidation}
                  />
                  <Route path={`/forms/baseInput`} component={BaseInput} />
                  <Route
                    path={`/forms/radio-checkbox`}
                    component={RadioCheckbox}
                  />
                  <Route
                    path={`/forms/inputGroup`}
                    component={InputGroupComp}
                  />
                  <Route path={`/forms/megaOptions`} component={MegaOptions} />
                  <Route path={`/forms/formDefault`} component={FormDefault} />
                  <Route path={`/forms/FormWizard`} component={FormWizard} />

                  {/* Tables */}
                  <Route
                    path={`/table/datatable`}
                    component={DataTableComponent}
                  />
                  <Route path={`/table/basic`} component={BasicTable} />
                  <Route path={`/table/sizing`} component={SizingTable} />
                  <Route path={`/table/border`} component={BorderTable} />
                  <Route path={`/table/styling`} component={StylingTable} />

                  {/* cards */}
                  <Route path={`/cards/basicCards`} component={BasicCards} />
                  <Route
                    path={`/cards/creativeCards`}
                    component={CreativeCards}
                  />
                  <Route path={`/cards/tabCard`} component={TabCard} />
                  <Route
                    path={`/cards/draggingCards`}
                    component={DraggingCards}
                  />

                  {/* Timeline */}
                  <Route path={`/timelines/timeline`} component={Timeline} />
                  <Route path={`/timelines/timeline2`} component={Timeline2} />

                  {/* Charts */}
                  <Route path={`/charts/googleChart`} component={GoogleChart} />
                  <Route path={`/charts/chartJs`} component={ChartJs} />
                  <Route
                    path={`/charts/chartistComponent`}
                    component={ChartistComponent}
                  />

                  {/* Map */}
                  <Route path={`/map/googleMap`} component={GoogleMap} />
                  <Route path={`/map/leafletMap`} component={LeafletMapComp} />

                  {/* Editor */}
                  <Route path={`/editor/editor1`} component={Editor1} />

                  {/* Users */}
                  <Route path={`/users/userProfile`} component={UserProfile} />
                  <Route path={`/users/userEdit`} component={UserEdit} />
                  <Route
                    path={`/users/userProfileEdit`}
                    component={UserProfileEdit}
                  />
                  <Route
                    path={`/users/userAdvertiserEdit`}
                    component={UserAdvertiserEdit}
                  />

                  {/* Calender */}
                  <Route path={`/calender/calender1`} component={Calender1} />
                  <Route path={`/calender/calender2`} component={Calender2} />

                  {/* Blog */}
                  <Route path={`/blog/blogDetail`} component={BlogDetail} />
                  <Route path={`/blog/blogSingle`} component={BlogSingle} />
                  <Route path={`/blog/blogPost`} component={BlogPost} />

                  {/* Social App */}
                  <Route path={`/social/socialApp`} component={SocialApp} />

                  {/* Job Search App */}
                  <Route path={`/jobSearch/cardView`} component={CardView} />
                  <Route path={`/jobSearch/job-list`} component={JobList} />
                  <Route path={`/jobSearch/job-detail`} component={JobDetail} />
                  <Route path={`/jobSearch/job-apply`} component={JobApply} />

                  {/* Learning App */}
                  <Route
                    path={`/learning/learning-list`}
                    component={LearningList}
                  />
                  <Route
                    path={`/learning/learning-detail`}
                    component={LearningDeatil}
                  />

                  {/* FAQ */}
                  <Route path={`/faq/faqComponent`} component={FaqComponent} />

                  {/* Knowledgebase */}
                  <Route
                    path={`/knowledgebase/knowledgebaseComponent`}
                    component={KnowledgebaseComponent}
                  />

                  {/* Support Ticket */}
                  <Route
                    path={`/support-ticket/supportTicket`}
                    component={SupportTicket}
                  />

                  {/* Applications */}
                  <Route path={`/todo-app/todo`} component={Todo} />
                  <Route
                    path={`/email-app/emailDefault`}
                    component={EmailDefault}
                  />
                  <Route path={`/chat-app/chat`} component={Chat} />

                  {/* Ecommerce App */}
                  <Route path={`/ecommerce/product`} component={EcommerceApp} />
                  <Route path={`/ecommerce/cart/:id`} component={AddToCart} />
                  <Route
                    path={`/ecommerce/wishlist/:id`}
                    component={WishlistComponent}
                  />
                  <Route
                    path={`/influencer/influencerDetail/:id`}
                    component={ProductDetail}
                  />
                  <Route path={`/ecommerce/checkout`} component={Checkout} />
                  <Route path={`/ecommerce/invoice`} component={Invoice} />
                  <Route
                    path={`/ecommerce/product-list`}
                    component={ProductList}
                  />
                  <Route path={`/ecommerce/payment`} component={Payment} />
                  <Route path={`/advertiser/cart`} component={History} />

                  {/* To-Do-Firebase */}
                  <Route
                    path={`/todo-app/todo-firebase`}
                    component={todoFirebase}
                  />

                  {/* CONTACT APP */}
                  <Route path={`/contact-app/contact`} component={ContactApp} />
                  <Route path={`/contact-app/new-user`} component={NewUser} />
                  <Route
                    path={`/contact-app/edit-user/:id`}
                    component={EditUser}
                  />

                  {/* Search page */}
                  <Route path={`/search/searchpage`} component={Searchpage} />

                  {/* Sample page */}
                  <Route path={`/sample/samplepage`} component={Samplepage} />

                  {/* Pricing */}
                  <Route path={`/price/pricing`} component={Pricing} />
                </App>
              </Fragment>
              {/* :
                                <Redirect to={`/login`} />
                            } */}
            </Switch>
          </ScrollContext>
        </HashRouter>
      </Provider>
    </div>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));
document.getElementsByTagName("html")[0].setAttribute("dir", "ltr");
serviceWorker.unregister();
