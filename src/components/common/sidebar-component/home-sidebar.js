import React, { Fragment, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import logo from '../../../assets/images/mohandess.png';
import logo_compact from '../../../assets/images/logo/compact-logo.png';
import mohandess from '../../../assets/images/logo/mohandess-logo.png'

import UserPanel from './userPanel';
import { MENUITEMS } from '../../../constant/menu';
import { Link } from 'react-router-dom';
import { translate } from 'react-switch-lang';
import configDB from '../../../data/customizer/config';
import "../../website/css/home-sidebar.css"

const HomeSidebar = (props) => {
    const [margin, setMargin] = useState(0);
    const [width, setWidth] = useState(0);
    const [hideLeftArrowRTL, setHideLeftArrowRTL] = useState(true);
    const [hideRightArrowRTL, setHideRightArrowRTL] = useState(true);
    const [hideRightArrow, setHideRightArrow] = useState(true);
    const [hideLeftArrow, setHideLeftArrow] = useState(true);
    const [mainmenu, setMainMenu] = useState(MENUITEMS);
    const wrapper = configDB.data.settings.sidebar.wrapper;
    const layout = useSelector(content => content.Customizer.layout);
    const [showCity, setShowCity] = useState(true);
    const [showResidential,setShowResidential] = useState(true);
    const [showCom,setShowCom] = useState(true);
    const [showLic,setShowLic] = useState(true);
    const [showLan,setShowLan] = useState(true);

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        handleResize();

        var currentUrl = window.location.pathname;

        // eslint-disable-next-line
        mainmenu.filter(items => {
            if (items.path === currentUrl)
                setNavActive(items)
            if (!items.children) return false
            // eslint-disable-next-line
            items.children.filter(subItems => {
                if (subItems.path === currentUrl)
                    setNavActive(subItems)
                if (!subItems.children) return false
                // eslint-disable-next-line
                subItems.children.filter(subSubItems => {
                    if (subSubItems.path === currentUrl)
                        setNavActive(subSubItems)
                })
            })
        })

        setTimeout(() => {
            const elmnt = document.getElementById("myDIV");
            const menuWidth = elmnt.offsetWidth;
            // setMenuWidth(menuWidth)
            if (menuWidth > window.innerWidth) {
                setHideRightArrow(false);
                setHideLeftArrowRTL(false);
            } else {
                setHideRightArrow(true);
                setHideLeftArrowRTL(true);
            }
        }, 500)

        return () => {
            // eslint-disable-next-line
            window.addEventListener('resize', handleResize)
        }
        // eslint-disable-next-line
    }, []);

    const handleResize = () => {
        setWidth(window.innerWidth - 310);
    }

    const setNavActive = (item) => {
        // eslint-disable-next-line
        MENUITEMS.filter(menuItem => {
            // eslint-disable-next-line
            if (menuItem != item)
                menuItem.active = false
            if (menuItem.children && menuItem.children.includes(item))
                menuItem.active = true
            if (menuItem.children) {
                // eslint-disable-next-line
                menuItem.children.filter(submenuItems => {
                    if (submenuItems.children && submenuItems.children.includes(item)) {
                        menuItem.active = true
                        submenuItems.active = true
                    }
                })
            }
        })
        item.active = !item.active
        setMainMenu({ mainmenu: MENUITEMS })

    }

    // Click Toggle menu
    const toggletNavActive = (item) => {
        // alert("/cinfluencers" + item.path)      
        if ('#' + item.path === window.location.hash) {
            window.location.reload(true);
        }
        if (!item.active) {
            MENUITEMS.forEach(a => {
                if (MENUITEMS.includes(item))
                    a.active = false
                if (!a.children) return false
                a.children.forEach(b => {
                    if (a.children.includes(item)) {
                        b.active = false
                    }
                    if (!b.children) return false
                    b.children.forEach(c => {
                        if (b.children.includes(item)) {
                            c.active = false
                        }
                    })
                })
            });
        }
        item.active = !item.active
        setMainMenu({ mainmenu: MENUITEMS })
    }

    const scrollToRight = () => {
        const elmnt = document.getElementById("myDIV");
        const menuWidth = elmnt.offsetWidth;
        const temp = menuWidth + margin;
        if (temp < menuWidth) {
            setMargin(-temp);
            setHideRightArrow(true);
        }
        else {
            setMargin(margin => margin += (-width));
            setHideLeftArrow(false);
        }
    }

    const scrollToLeft = () => {
        // If Margin is reach between screen resolution
        if (margin >= -width) {
            setMargin(0)
            setHideLeftArrow(true);
        }
        else {
            setMargin(margin => margin += width);
            setHideRightArrow(false);
        }
    }


    const scrollToLeftRTL = () => {
        if (margin <= -width) {
            setMargin(margin => margin += -width);
            setHideLeftArrowRTL(true);
        }
        else {
            setMargin(margin => margin += -width);
            setHideRightArrowRTL(false);
        }
    }

    const scrollToRightRTL = () => {
        const temp = width + margin
        // Checking condition for remaing margin
        if (temp === 0) {
            setMargin(temp);
            setHideRightArrowRTL(true);
        }
        else {
            setMargin(margin => margin += width);
            setHideRightArrowRTL(false);
            setHideLeftArrowRTL(false);
        }
    }




    return (
        <Fragment>
            <div className="page-sidebar">
                <div className="sidebar custom-scrollbar home-sidebar hidemenu">
                    {/* <UserPanel /> */}
                    <ul
                        className="sidebar-menu"
                        id="myDIV"
                        style={wrapper === 'horizontal_sidebar' ? layout === 'rtl' ?
                            { 'marginRight': margin + 'px' } : { 'marginLeft': margin + 'px' } : { margin: '0px' }}
                    >
                        <li className='li-menu'>
                            <button type="button" onClick={() => setShowCity(!showCity)} className='btn-style' ><span> SERVING CITIES </span></button>
                        </li>
                        <li hidden={showCity} className=' li-menu rcl-menu'>
                            <ul onMouseLeave={() => setShowCity(!showCity)} >
                                <li><Link to={"/residentialList"}>Residential</Link></li>
                                <li><Link to={"/commercialList"}>Commercial</Link></li>
                                <li><Link to={"/licenseList"}>License</Link></li>
                            </ul>
                        </li>
                        <li className='li-menu'><button type="button" onClick={() => setShowResidential(!showResidential)} className='btn-style'><span> RESIDENTIAL </span></button></li>
                        <li hidden={showResidential} className='li-menu'>
                            
                                <ul className="w-100 res-menu" onMouseLeave={() => setShowResidential(!showResidential)}>
                                <smoothScroll>
                                    <li><a>Al Abha</a></li>
                                    <li><a>Al Kharj</a></li>
                                    <li><a>Al Khobar</a></li>
                                    <li><a>Buraidah</a></li>
                                    <li><a>Dammam</a></li>
                                    <li><a>Jeddah</a></li>
                                    <li><a>Makkah</a></li>
                                    <li><a>Medina</a></li>
                                    <li><a>Riyadh</a></li>
                                    <li><a>Taif</a></li>
                                    <li><a>JTabuk</a></li>
                                    </smoothScroll>
                                </ul>
                           
                        </li>
                        <li className='li-menu'><button type="button" onClick={() => setShowCom(!showCom)} className='btn-style'><span> COMMERCIAL </span></button></li>
                        <li hidden={showCom} className='li-menu'>
                            
                                <ul className="w-100 res-menu" onMouseLeave={() => setShowCom(!showCom)}>
                                <smoothScroll>
                                    <li><a>Al Abha</a></li>
                                    <li><a>Al Kharj</a></li>
                                    <li><a>Al Khobar</a></li>
                                    <li><a>Buraidah</a></li>
                                    <li><a>Dammam</a></li>
                                    <li><a>Jeddah</a></li>
                                    <li><a>Makkah</a></li>
                                    <li><a>Medina</a></li>
                                    <li><a>Riyadh</a></li>
                                    <li><a>Taif</a></li>
                                    <li><a>JTabuk</a></li>
                                    </smoothScroll>
                                </ul>
                           
                        </li>
                        <li className='li-menu'><button type="button" onClick={() => setShowLic(!showLic)} className='btn-style'><span> LICENSE </span></button></li>
                        <li hidden={showLic} className='li-menu'>
                            
                                <ul className="w-100 res-menu" onMouseLeave={() => setShowLic(!showLic)}>
                                <smoothScroll>
                                    <li><a>Al Abha</a></li>
                                    <li><a>Al Kharj</a></li>
                                    <li><a>Al Khobar</a></li>
                                    <li><a>Buraidah</a></li>
                                    <li><a>Dammam</a></li>
                                    <li><a>Jeddah</a></li>
                                    <li><a>Makkah</a></li>
                                    <li><a>Medina</a></li>
                                    <li><a>Riyadh</a></li>
                                    <li><a>Taif</a></li>
                                    <li><a>JTabuk</a></li>
                                    </smoothScroll>
                                </ul>
                           
                        </li>
                        <li className='li-menu'><button type="button" onClick={() => setShowLan(!showLan)} className='btn-style'><span>LANGUAGE</span></button></li>
                        <li hidden={showLan} className='li-menu'>
                            
                                <ul className="w-100 res-menu" onMouseLeave={() => setShowLan(!showLan)}>
                                <smoothScroll>
                                    <li><a>English</a></li>
                                    <li><a>Arabic</a></li>
                                    </smoothScroll>
                                </ul>
                           
                        </li>
                        <li className='li-menu'><Link to={"/login"}>Sign in <i className="fa fa-user"></i></Link></li>

                    </ul>

                </div>
            </div>
        </Fragment>
    );
};

export default translate(HomeSidebar);

