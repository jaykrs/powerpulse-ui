import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import four from '../../assets/images/user/4.jpg';
import one from '../../assets/images/user/1.jpg';
import two from '../../assets/images/user/2.png';
import { toast } from "react-toastify";
import start_conversion from '../../assets/images/start-conversion.jpg';
import errorImg from '../../assets/images/search-not-found.png';
import axios from 'axios';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
// import Custom Componenets
import Breadcrumb from '../common/breadcrumb';

import {
    getAllChats,
    changeChat,
    searchMember,
    sendMessage,
    createNewChat,
    replyByUser,
} from '../../actions/chat.action';
// actions/chat.action

var images = require.context('../../assets/images', true);


const WorkLogChat = ({ getAllChats, changeChat, createNewChat, searchMember, sendMessage, replyByUser }) => {
    const allMembers = useSelector(content => content.ChatApp.allMembers);
    const chats = useSelector(content => content.ChatApp.chats);
    const selectedUser = useSelector(content => content.ChatApp.selectedUser);
    const currentUser = useSelector(content => content.ChatApp.currentUser);
    const online = useSelector(content => content.ChatApp.online);
    const members = useSelector(content => content.ChatApp.members);
    const dispatch = useDispatch();
    const [Id, setId] = useState();
    const [data, setData] = useState("");
    const [isEdit, setisEdit] = useState(true);
    const [Add, setAdd] = useState(true);

    const [worklog, setworklog] = useState({
        workcomplectionstatus: Number
    });
    const [chart, setChart] = useState("");
    const [chartForm, setChartForm] = useState("");

    const usertype = localStorage.getItem("userType")
    const userName = (JSON.parse(localStorage.getItem('userData')).username);
    const [engid, setEngid] = useState("");
    const [engname, setEngname] = useState("");


    useEffect(() => {
        let projectid = JSON.parse(sessionStorage.getItem('ProjectId'))
        axios({
            method: "GET",
            url: CMS_STRAPI_URL + "/api/worklogs?filters[projectid][$eq]=" + projectid,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
        })
            .then((response) => {
                var data = { ...worklog }
                console.log(response.data.data, 'workloglist')
                if (response.data.data.length > 0) {
                    data.workcomplectionstatus = response.data.data[0].attributes.workcomplectionstatus
                    setData(response.data.data[0].attributes)
                    let cform = response.data.data[0].attributes.chat.split(",");
                    let engId = response.data.data[0].attributes.engineerid.split(",");
                    let engName = response.data.data[0].attributes.engineername.split(",")
                    console.log(engId);
                    setChartForm(cform);
                    setEngname(engName);
                    setEngid(engId);
                    console.log(response.data.data[0].attributes.efid)
                    var Id = JSON.stringify(response.data.data[0].id);
                    sessionStorage.setItem('Worklogid', Id)
                    console.log("chart form", chartForm);
                } else {
                    setAdd(false)
                    setisEdit(false)
                }

            })
            .catch((error) => {
                console.log(error);
            });



        const currentUserId = 0;
        dispatch({ type: 'GET_MEMBERS_SUCCESS' });
        getAllChats(currentUserId);
        // eslint-disable-next-line
    }, []);

    const edit = () => {
        setisEdit(false)
    }



    const handleSubmit = (response) => {
        let Worklogid = JSON.parse(sessionStorage.getItem('Worklogid'))
        axios({
            method: "PUT",
            url: CMS_STRAPI_URL + "/api/worklogs/" + Worklogid,
            data: { data: worklog },
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
        })
            .then((response) => {
                console.log(response);
                setTimeout(() => {
                    toast.success("Complection Status Completed");
                }, 100);
            })
            .catch((error) => {
                console.log(error);
            });
    }


    const [searchKeyword, setSearchKeyword] = useState('');
    const [messageInput, setMessageInput] = useState('');
    const [menuToggle, setMenuToggle] = useState(false);
    const [hideMessage, setHideMessage] = useState("");



    const changeChatClick = (e, selectedUserId) => {
        handleSearchKeyword('');
        const currentChat = chats.find(x => x.users.includes(currentUser.id) && x.users.includes(selectedUserId))
        if (currentChat) {
            changeChat(selectedUserId);
        } else {
            createNewChat(currentUser.id, selectedUserId, chats)
        }
    }

    const handleSearchKeyword = (keyword) => {
        setSearchKeyword(keyword)
        searchMember(keyword)
    }

    var handleMessageChange = (message) => {

        setMessageInput(message)

    }

    const handleMessagePress = (e) => {
        if (e.key === "Enter" || e === "send") {
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            const d = new Date();
            let month = months[d.getMonth()];
            let year = d.getFullYear();
            let day = d.getDate();
            let hour = d.getHours();
            let minutes = d.getMinutes();
            let dates = `${month} ${day}-${year},${hour}:${minutes}`
            let date = "" + month + " " + day + "-" + year + "," + hour + ":" + minutes;
            let projectid = JSON.parse(sessionStorage.getItem('ProjectId'))
            // chartForm.push(`${userName}() : ${messageInput}`)
            var userType = localStorage.getItem('userType');

            console.log(userName, userType);
            axios({
                method: "GET",
                url: CMS_STRAPI_URL + "/api/worklogs?filters[projectid][$eq]=" + projectid,
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwt"),
                },
            })
                .then((response) => {
                    var data = { ...worklog }
                    console.log(response.data.data, 'workloglist')
                    if (response.data.data.length > 0) {
                        let chart_en = response.data.data[0].attributes.chat;
                        let chartNew = `${chart_en}, ${userName}(${date}): ${messageInput}`
                        setChart(chartNew)

                        console.log(chartNew)

                        axios({
                            method: "PUT",
                            url: CMS_STRAPI_URL + "/api/worklogs/" + response.data.data[0].id,
                            data: { data: { "chat": chartNew } },
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("jwt"),
                            },
                        })
                            .then((response) => {
                                console.log(response);
                                setTimeout(() => {
                                    toast.success("Message Sent");
                                    // window.location.reload(true);
                                    setMessageInput('');
                                }, 200);
                                setChartForm(response.data.data[0].attributes.chat);

                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    } else {
                        setAdd(false)
                        setisEdit(false)
                    }

                })
                .catch((error) => {
                    console.log(error);
                });



        }
    }
    const dynamicImage = (image) => {
        return images(`./${image}`);
    }

    const chatMenuToggle = () => {
        setMenuToggle(!menuToggle)
    }

    const selectedChat = (allMembers && chats && selectedUser) ?
        chats.find(x => x.users.includes(currentUser.id) && x.users.includes(selectedUser.id)) :
        null;

    var activeChat = 0;
    if (selectedUser != null)
        activeChat = selectedUser.id;

    const [activeTab, setActiveTab] = useState('3');
    return (
        (allMembers && chats) ?
            <div>
                <Breadcrumb title="WorkLog " parent="Chat" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col call-chat-sidebar col-xl-12 col-lg-12 col-md-6 col-sm-3">
                            <smootscroll>
                                <div className="card">
                                    <div className="card-body chat-body">
                                        <div className="chat-box">
                                            <div className="chat-left-aside">
                                                <ul>
                                                    <li>{data.efid}</li>
                                                    <li>{data.engineeringfirmname}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </smootscroll>
                            <div className="card">
                                <div className="card-body chat-body">
                                    <div className="chat-box">
                                        <div className="chat-left-aside">
                                            <ul>
                                                <li>{data.customerid}</li>
                                                <li>{data.customername}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                engid.length > 0 ? engid.map((i, j) => {
                                    return (
                                        <div key={j} className="card">
                                            <div className="card-body chat-body">
                                                <div className="chat-box">
                                                    <div className="chat-left-aside">
                                                        <ul>
                                                            <li>{i}</li>
                                                            <li>{engname[j]}</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) : <div></div>
                            }
                        </div>
                        <div className="col call-chat-body">
                            <div className="card">
                                <div className="card-body p-0">
                                    <div className="row chat-box">
                                        <div className="col pr-0 chat-right-aside">
                                            <div className="chat row">
                                                <div className="chat-header clearfix col-xl-12 col-lg-12 col-md-6 col-sm-6 ">
                                                    <div className='row'>
                                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6'>
                                                            <img src={dynamicImage(selectedUser.thumb)} className="rounded-circle" alt="" />
                                                            <div className="about">
                                                                <div className="name">
                                                                    {userName}
                                                                </div>
                                                                <div className="status digits" >
                                                                    {}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6'>
                                                            <ul className="list-inline float-right float-sm-right chat-menu-icons">
                                                                <li className="list-inline-item"><a href="#javascript"><i className="icon-search"></i></a></li>
                                                                <li className="list-inline-item"><a href="#javascript"><i className="icon-clip"></i></a></li>
                                                                <li className="list-inline-item toogle-bar" onClick={() => chatMenuToggle()}><a href="#javascript"><i className="icon-menu"></i></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="chat-history chat-msg-box custom-scrollbar m-b-20" style={{}}>
                                                    <ul className='align-item-center m-b-5'>
                                                        {
                                                            chartForm.length > 0 ? chartForm.map((item, index) => {
                                                                return (
                                                                    <li key={index} className='' >
                                                                        <div className={`message my-message w-100`}>

                                                                            <div className="message-data text-left">
                                                                                {item}
                                                                            </div>

                                                                        </div>
                                                                    </li>
                                                                )
                                                            }) :
                                                                <div>
                                                                    <img className="img-fluid" src={start_conversion} alt="start conversion " />
                                                                </div>
                                                        }
                                                    </ul>

                                                </div>



                                                <div className="chat-message clearfix ">
                                                    <div className="row">
                                                        <div className="col-xl-12 d-flex">
                                                            <div className="smiley-box bg-primary">
                                                                <div className="picker"><img src={require('../../assets/images/smiley.png')} className="" alt="" /></div>
                                                            </div>
                                                            <div className="input-group text-box">
                                                                <input
                                                                    type="text"
                                                                    className="form-control input-txt-bx"
                                                                    placeholder="Type a message......"
                                                                    value={messageInput}
                                                                    onKeyPress={(e) => handleMessagePress(e)}
                                                                    onChange={(e) => handleMessageChange(e.target.value)}
                                                                />
                                                                <div className="input-group-append">
                                                                    <button className="btn btn-primary" type="button" onClick={() => { handleMessagePress('send'); chartForm.push(`${userName}() : ${messageInput}`) }} >SEND</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`col pl-0 chat-menu ${menuToggle ? 'show' : ''}`}>
                                            <Nav tabs className="borderb-tab-primary">

                                                <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                                                    <NavLink className={activeTab === '3' ? 'active' : ''} onClick={() => setActiveTab('3')}>
                                                        PROJECT
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                            <TabContent activeTab={activeTab}>

                                                <TabPane tabId="3">
                                                    <div className="user-profile">
                                                        <div className="image">
                                                            <div className="avatar text-center"><img alt="" src={two} /></div>
                                                            <div className="icon-wrapper"><i className="icofont icofont-pencil-alt-5"></i></div>
                                                        </div>
                                                        <div className="user-content text-center">
                                                            <h5 className="text-uppercase">mark jenco</h5>
                                                            <hr />
                                                            <div className="follow text-center">
                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <div className="form-group">
                                                                            <label className="form-label">Work Completion Status (%)</label>
                                                                            <select className="form-control" type="text"
                                                                                readOnly={isEdit}
                                                                                value={worklog.workcomplectionstatus}
                                                                                onChange={(e) =>
                                                                                    setworklog({
                                                                                        ...worklog,
                                                                                        workcomplectionstatus: e.target.value,
                                                                                    })
                                                                                }>
                                                                                <option selected>Choose..</option>
                                                                                <option value="0">0</option>
                                                                                <option value="20">20</option>
                                                                                <option value="40">40</option>
                                                                                <option value="60">60</option>
                                                                                <option value="80">80</option>
                                                                                <option value="100">100</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {usertype === "engineeringfirm" && (
                                                                <div className="text-right">

                                                                    {Add ? isEdit ? <button className="btn btn-primary" onClick={() => edit('isEdit')}> Edit</button> :
                                                                        <button className="btn btn-primary" >Update</button> : null
                                                                    }

                                                                    {!!data && data.length <= 0 ? <button className="btn btn-primary mr-1" onClick={(e) => handleSubmit(e)}>Submit</button> : null}
                                                                </div>
                                                            )}


                                                        </div>
                                                    </div>
                                                </TabPane>
                                            </TabContent>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            : <div className="loading"></div>
    )
}

const mapStateToProps = ({ ChatApp }) => {
    return { ChatApp };
}

export default connect(
    mapStateToProps, {
    getAllChats,
    changeChat,
    searchMember,
    sendMessage,
    createNewChat,
    replyByUser,
}
)(WorkLogChat);