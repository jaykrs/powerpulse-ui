import React, { Fragment, useState } from 'react';
import {
    setTranslations,
    setDefaultLanguage,
    setLanguageCookie,
    setLanguage,
    translate,
} from 'react-switch-lang';
import en from '../../../assets/i18n/en.json';
import es from '../../../assets/i18n/es.json';
import pt from '../../../assets/i18n/pt.json';
import fr from '../../../assets/i18n/fr.json';
import axios from 'axios';
import { CMS_STRAPI_URL } from '../../../constant/serviceurl';

setTranslations({ en, es, pt, fr });
setDefaultLanguage('en');
setLanguageCookie();

const Language = () => {
    const handleSetLanguage = (key) => {
        setLanguage(key);
    };

    const [value, setValue] = useState(
        localStorage.getItem('jwt')
    );
    const [listData, setListData] = useState([]);
    const [check, setCheck] = useState(true);

    const allData = async () => {
        const { data } = await axios.get(CMS_STRAPI_URL + '/influencers', {
            headers: {
                Authorization:
                    'Bearer ' + value,
            },
        });

        setListData(data)
        setCheck(false)
        // console.log('influencerData', data);
        // console.log('List Data', listData);
    }
    if (check) {
        allData();
    }

    return (
        <Fragment>
            <div>
                <ul className="language-dropdown onhover-show-div p-20">
                    {listData.map((item, index) => {
                        return (
                            <li onClick={() => handleSetLanguage('en')}>
                                <a href="#javascript" data-lng="en">
                                    <i className="fa fa-user"></i> {item.DISPLAY_NAME}
                                </a>
                            </li>
                        )
                    })}

                    {/* <li onClick={() => handleSetLanguage('es')}>
                        <a href="#javascript" data-lng="es">
                            <i className="flag-icon flag-icon-um"></i> Spanish
                        </a>
                    </li>
                    <li onClick={() => handleSetLanguage('pt')}>
                        <a href="#javascript" data-lng="pt">
                            <i className="flag-icon flag-icon-uy"></i> Portuguese
                        </a>
                    </li>
                    <li onClick={() => handleSetLanguage('fr')}>
                        <a href="#javascript" data-lng="fr">
                            <i className="flag-icon flag-icon-nz"></i> French
                        </a>
                    </li> */}
                </ul>
            </div>
        </Fragment>
    );
};


export default translate(Language);