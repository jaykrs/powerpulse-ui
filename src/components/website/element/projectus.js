import React, { Fragment, useState, useEffect, Component } from 'react';
import mobile from '../../../assets/images/mobile.jpeg'
import google from '../../../assets/images/googleplay.png'
import app from '../../../assets/images/app.png'
import appimage from '../../../assets/images/images.png'

class ProjectUs extends Component {

    render() {
        return (
            <div>
                <div className='project'>
                    <div className='project_div' >
                        <img className='project_img' src={mobile} />
                    </div>
                    <div className='project_div1' >
                        <div className='div_project'>
                            <text>Get the app Google play & App Store</text>
                        </div>
                        <div className='div_project1'>
                            <div className='project_content'>
                                <img src={google} />
                            </div>
                            <div className='project_content'>
                                <img src={app} />
                            </div>
                            {/* <div className='project_content'>
                                <img src={appimage} />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProjectUs;