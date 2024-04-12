import React, { useState, Fragment, useEffect, useCallback } from 'react';
import { MENUITEMS } from '../../../constant/menu';
import { Link, withRouter } from 'react-router-dom';
import { Search } from 'react-feather';
import { Market_Exp } from "../../../assets/Market_exp";
import { Sector } from "../../../assets/Sector";

const SearchHeader = ({ history }) => {
    const mainmenu = MENUITEMS;

    const [searchValue, setsearchValue] = useState('');
    const [searchOpen, setsearchOpen] = useState(false);

    const escFunction = useCallback((event) => {
        if (event.keyCode === 27) {
            //Do whatever when esc is pressed
            setsearchOpen(false)
            setsearchValue('')
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);
        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    });

    const handleSearchKeyword = (keyword) => {
        keyword ? addFix() : removeFix()
        const items = [];
        setsearchValue(keyword)
        // eslint-disable-next-line
        mainmenu.filter(menuItems => {
            if (menuItems.title.toLowerCase().includes(keyword) && menuItems.type === 'link') {
                items.push(menuItems);
            }
            if (!menuItems.children) return false
            // eslint-disable-next-line
            menuItems.children.filter(subItems => {
                // eslint-disable-next-line
                if (subItems.title.toLowerCase().includes(keyword) && subItems.type === 'link') {
                    subItems.icon = menuItems.icon
                    items.push(subItems);
                    // eslint-disable-next-line
                }
                if (!subItems.children) return false
                // eslint-disable-next-line
                subItems.children.filter(suSubItems => {
                    if (suSubItems.title.toLowerCase().includes(keyword)) {
                        suSubItems.icon = menuItems.icon
                        items.push(suSubItems);
                    }
                })
            })
            checkSearchResultEmpty(items)
            setsearchValue(items);
        });
    }

    const checkSearchResultEmpty = (items) => {
        if (!items.length) {
            document.querySelector(".empty-menu").classList.add('is-open');
        } else {
            document.querySelector(".empty-menu").classList.remove('is-open');
        }
    }

    const addFix = () => {
        document.querySelector(".Typeahead-menu").classList.add('is-open');
        document.body.classList.add("offcanvas");
    }

    const removeFix = () => {
        setsearchValue('')
        document.querySelector(".Typeahead-menu").classList.remove('is-open');
        document.body.classList.remove("offcanvas");
    }

    const toggleBtn = () => {
        if (searchOpen) {
            setsearchOpen(!searchOpen);
            document.querySelector('.searchIcon').classList.add('open');
        } else {
            setsearchOpen(!searchOpen);
            document.querySelector('.searchIcon').classList.remove('open');
        }
    }   

    function handleButton(search, type) {  
        if (type === "SM") {
            history.push('/dashboard/filter')
            localStorage.setItem("SMSearch", search);
        } else if (type === "EXP") {
            history.push('/dashboard/filter')
            localStorage.setItem("EXPSearch", search);
        } else if (type === "MRKTEXP") {
            history.push('/dashboard/filter')
            localStorage.setItem("MRKTEXPSearch", search);
        } else if (type === "SECTOR") {
            history.push('/dashboard/filter')
            localStorage.setItem("SECTORSearch", search);
        }    
        if ('#/dashboard/filter' === window.location.hash) {
            window.location.reload(true);
        }
    }

    return (
        <Fragment>
            <div>
                <form className="form-inline">
                    <div className="form-group">

                        <select className="btn-sm pl-1 pr-1 pb-2 pt-2 mr-1 ml-1 mt-1" value={window.location.hash === '#/dashboard/filter' ? localStorage.getItem("SMSearch") : ''} onChange={(e) => handleButton(e.target.value, 'SM')}>
                            <option value="">Choose by Platform</option>
                            <option value="FB_ACTIVE=true">Facebook</option>
                            <option value="LN_ACTIVE=true">Linkedin</option>
                            <option value="TW_ACTIVE=true">Twitter</option>
                        </select>

                        <select className="btn-sm pl-1 pr-1 pb-2 pt-2 mr-1 ml-1 mt-1" value={window.location.hash === '#/dashboard/filter' ? localStorage.getItem("EXPSearch") : ''} onChange={(e) => handleButton(e.target.value, 'EXP')}>
                            <option value="">Choose by Experience</option>
                            <option value="WORK_EXP_gte=10&WORK_EXP_lte=15">10 - 15 Years</option>
                            <option value="WORK_EXP_gte=16&WORK_EXP_lte=20">16 - 20 Years</option>
                            <option value="WORK_EXP_gt=20">20 + Years</option>
                        </select>

                        <div>
                            <select className="btn-sm pl-1 pr-1 pb-2 pt-2 mr-1 ml-1 mt-1" value={window.location.hash === '#/dashboard/filter' ? localStorage.getItem("MRKTEXPSearch") : ''} onChange={(e) => handleButton(e.target.value, 'MRKTEXP')}>
                                <option value="">Choose by Market Exp.</option>
                                {Market_Exp.map((item, index) => {
                                    return (
                                        <option value={item.value}>{item.name}</option>
                                    )
                                })}
                            </select>
                        </div>

                        <div>
                            <select className="btn-sm pl-1 pr-1 pb-2 pt-2 mr-1 ml-1 mt-1" value={window.location.hash === '#/dashboard/filter' ? localStorage.getItem("SECTORSearch") : ''} onChange={(e) => handleButton(e.target.value, "SECTOR")}>
                                <option value="">Choose by Sector Domain</option>
                                {Sector.map((item, index) => {
                                    return (
                                        <option value={item.value}>{item.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="Typeahead-menu empty-menu">
                            <div className="tt-dataset tt-dataset-0">
                                <div className="EmptyMessage">
                                    Opps!! There are no result found.
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Fragment>
    );
};

export default withRouter(SearchHeader);