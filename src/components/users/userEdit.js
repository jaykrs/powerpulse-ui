import React, { Fragment, useState, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import avatar from '../../assets/images/user/avatar.jpg';
import axios from 'axios';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import { LabelConstants } from '../../constant/LableConstant';
import { country_data } from '../../assets/country_data';
import { Upload, UploadCloud } from 'react-feather';
import { toast } from 'react-toastify';
import ImageUploader from 'react-images-upload';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
class UserEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: localStorage.getItem('jwt'),
            userId: localStorage.getItem('userId'),
            avataruri: localStorage.getItem('avatarUri'),
            userType: localStorage.getItem('userType'),
            name: '',
            email: '',
            phone: '',
            newPassword: '',
            password: '',
            sex: '',
            dob: '',
            remarks: '',
            selectedFile: '',
            influencerId: '',
            picture: '',
            open: false,
            openPwd: false,
            uploadError: false,
            countrydata: country_data,
            countryCode: '',
        }
    }

    async componentDidMount() {
        const { userId, value, userType } = this.state;
        const { data } = await axios.get(CMS_STRAPI_URL + '/users/' + userId, {
            headers: {
                Authorization:
                    'Bearer ' + value,
            },
        });

        this.setState({
            userData: data,
            name: data.Name,
            email: data.email,
            phone: data.phone,
            sex: data.sex,
            dob: data.dob,
            remarks: data.remarks,
            countryCode: data.country_code
        })
        if (null != userType && userType == 'influencer') {
            this.setState({
                influencerId: localStorage.getItem('userTypeId'),
            })
        }

        console.log('User Data', data);
    }

    fileChangedHandler(event) {
        var file = event.target.files[0];
        console.log(file.name);
        if (file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/jpg') {
            this.setState({
                selectedFile: event.target.files[0]
            })
        } else {
            alert("Sorry file extension is not valid, please upload jpeg/png files");
        }
    }

    async uploadHandler() {
        const { selectedFile } = this.state;
        const formData = new FormData()
        formData.append(
            'files',
            selectedFile
        )
        await axios.post(CMS_STRAPI_URL + '/upload/', formData).then((response) => {
            this.setState({
                avataruri: response.data[0].url
            })
            this.onCloseModal();
        }, (error) => {
            console.log(error);
        });
    }

    async handleInfluencerFileUpdate(pavatar_url) {
        const { influencerId, value } = this.state;
        if (null != influencerId && influencerId > 0) {
            const { data } = await axios({
                method: 'put',
                url: CMS_STRAPI_URL + '/influencers/' + influencerId,
                headers: {
                    Authorization:
                        'Bearer ' + value,
                },
                data: {
                    AVATAR_URL: pavatar_url,
                }
            })
        }
    }

    async handleUpdate() {
        const { userId, value, name, dob, phone, sex, remarks, avataruri, countryCode } = this.state;
        if (null == countryCode || countryCode === '') {
            alert(LabelConstants.ALERT_COUNTRY_CODE);
            return;
        } else if (null == phone || (phone === '' || !Number(phone))) {
            alert(LabelConstants.ALERT_PHONE);
            return;
        } else {
            await axios({
                method: 'put',
                url: CMS_STRAPI_URL + '/users/' + userId,
                headers: {
                    Authorization:
                        'Bearer ' + value,
                },
                data: {
                    Name: name,
                    dob: dob,
                    phone: phone,
                    sex: sex,
                    remarks: remarks,
                    avatar_url: avataruri,
                    country_code: countryCode
                }
            }).then((response) => {
                this.handleInfluencerFileUpdate(response.data.avatar_url);
                localStorage.setItem("avatarUri", response.data.avatar_url);
                localStorage.setItem("userName", response.data.Name)
                setTimeout(() => {
                    toast.success(LabelConstants.ALERT_SAVED);
                }, 100);

                setTimeout(() => {
                    window.location.reload(true);
                }, 800);
            })
        }
    }

    onDrop(pictureFiles, pictureDataURLs) {
        console.log('imageData', pictureFiles[0])
        console.log('imageDataUrl', pictureDataURLs[0])
        var file = pictureFiles[0];
        if (null != file && file.name.length > 20) {
            alert("please upload a valid type of file with smaller file name");
            this.setState({ uploadError: true })
            return false;
        }
        else {
            this.setState({
                selectedFile: pictureFiles[0],
                avataruri: pictureDataURLs[0]
            })
        }
    }
    onOpenModal() {
        this.setState({ open: true })
    };

    onCloseModal() {
        this.setState({ open: false })
    };

    onOpenPwd() {
        this.setState({ openPwd: true })
    };

    onClosePwd() {
        this.setState({ openPwd: false })
    };

    async handlePassword() {
        const { newPassword, password, userId, value } = this.state;
        if (null == newPassword || newPassword === '') {
            alert(LabelConstants.ALERT_NEW_PASSWORD);
            return;
        } else if (null == password || password === '') {
            alert(LabelConstants.ALERT_CONF_PASSWORD);
            return;
        } else if (newPassword !== password) {
            alert(LabelConstants.ALERT_PASSWORD_MATCH)
            return;
        } else {
            await axios({
                method: 'put',
                url: CMS_STRAPI_URL + '/users/' + userId,
                headers: {
                    Authorization:
                        'Bearer ' + value,
                },
                data: {
                    password: password,
                }
            }).then((response) => {
                this.onClosePwd();
                setTimeout(() => {
                    toast.success(LabelConstants.ALERT_PASSWORD_SAVED);
                }, 200);
            })
        }
    }

    render() {
        const { avataruri, open, userData, name, dob, countryCode, countrydata, phone, sex, openPwd, newPassword, password, email } = this.state;
        return (
            <Fragment>
                <Breadcrumb parent={LabelConstants.USER} title={LabelConstants.EDIT_ACCOUNT_SETTING} />
                <div className="container-fluid">
                    <form>
                        <div className="edit-profile">
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="card">
                                        <div className="card-header">
                                            <h5 className="card-title mb-0">{LabelConstants.MY_ACCOUNT}</h5>
                                            <div className="card-options">
                                                <a className="card-options-collapse" href="javascript" data-toggle="card-collapse"><i className="fe fe-chevron-up"></i></a><a className="card-options-remove" href="javascript" data-toggle="card-remove"><i className="fe fe-x"></i></a></div>
                                        </div>
                                        <div className="card-body">

                                            <div className="row mb-2">
                                                <div className="col-auto">
                                                    <img onClick={() => this.onOpenModal()} width="120px" height="120px" className="rounded-circle" onError={(e) => { e.target.onerror = null; e.target.src = "https://app.cinfluencers.com/avatar.jpg" }} alt="" src={CMS_STRAPI_URL + avataruri} />
                                                    <Modal open={open} onClose={() => this.onCloseModal()} center>
                                                        <div className="col-sm-12">
                                                            <div className="card">
                                                                <div className="card-header">
                                                                    <h5>Upload Picture</h5>
                                                                </div>
                                                                <div className="card-body">
                                                                    <ImageUploader
                                                                        withIcon={false}
                                                                        withPreview={true}
                                                                        label=""
                                                                        singleImage={true}
                                                                        buttonText="Browse Images"
                                                                        onChange={(value, pictureDataURLs) => this.onDrop(value, pictureDataURLs)}
                                                                        imgExtension={[".jpg", ".gif", ".png", ".gif", ".svg"]}
                                                                        maxFileSize={1048576}
                                                                        fileSizeError=" file size is too big"
                                                                        fileContainerStyle={{ minWidth: '500px', margin: "2px auto" }}
                                                                        defaultImage={CMS_STRAPI_URL + avataruri}
                                                                    >
                                                                    </ImageUploader>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <text className="btn btn-sm btn-primary mt-2" type="submit" onClick={() => this.uploadHandler()}>Upload Picture</text>
                                                    </Modal>
                                                </div>
                                                <div className="col">

                                                    <h4 className="mb-1">{name}</h4>
                                                </div>
                                            </div>
                                            {/* <div className="form-group">
                                        <h6 className="form-label">{LabelConstants.REMARKS}</h6>
                                        <textarea className="form-control" rows="5" value={remarks} placeholder={LabelConstants.REMARKS} onChange={e => setRemarks(e.target.value)} />
                                    </div> */}
                                            <div className="btn btn-sm btn-primary mt-2" onClick={() => this.onOpenModal()}>Upload Picture</div>

                                            {/* <div className="form-group mt-3">
                                            <label className="form-label">{LabelConstants.EMAIL_ADDRESS}</label>
                                            <input className="form-control" placeholder={LabelConstants.EMAIL_PLACEHOLDER} value={null != userData.email ? userData.email.includes("linkedin") ? "linkedin.com" : userData.email : null} readOnly={true} />
                                        </div> */}
                                            <div className="form-group">
                                                {/* <label className="form-label">{LabelConstants.PASSWORD}</label>
                                            <input className="form-control" type="password" value={password} onChange={e => setPassword(e.target.value)} /> */}
                                                {null != email ? email.includes("linkedin") ?
                                                    null :
                                                    <div className="form-group mt-3">
                                                        <h5 className="card-title">Change Password</h5>
                                                        <text className="btn btn-sm btn-primary" type="submit" onClick={() => this.onOpenPwd()}>Update Password</text>
                                                    </div>
                                                    : null}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-8">

                                    <div className="card-header" style={{ backgroundColor: '#102c54' }}>
                                        <h5 className="card-title mb-0" style={{ color: '#fff' }}>Edit Account</h5>
                                        <div className="card-options"><a className="card-options-collapse" href="javascript" data-toggle="card-collapse"><i className="fe fe-chevron-up"></i></a><a className="card-options-remove" href="javascript" data-toggle="card-remove"><i className="fe fe-x"></i></a></div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">{LabelConstants.NAME}</label>
                                                    <input className="form-control" type="text" placeholder={LabelConstants.NAME} value={name} onChange={e => this.setState({ name: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">{LabelConstants.DOB}</label>
                                                    <input className="form-control" type="date" placeholder={LabelConstants.DOB} value={dob} onChange={e => this.setState({ dob: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">Country *</label>
                                                    <select className="form-control mb-1"
                                                        value={countryCode}
                                                        onChange={e => this.setState({ countryCode: e.target.value })}
                                                    >
                                                        <option value="">{LabelConstants.PLS_SELECT}</option>
                                                        {countrydata.map((item, index) => {
                                                            return (
                                                                <option value={item.dial_code}>{item.name}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">{LabelConstants.PHONE_NUMBER} *</label>
                                                    <div className="d-flex">
                                                        <input className="form-control col-sm-3 col-md-3 text-dark bg-white" type="text" value={countryCode} readOnly={true} />
                                                        <input className="form-control" type="text" placeholder={LabelConstants.PHONE_NUMBER} value={phone} onChange={e => this.setState({ phone: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">{LabelConstants.GENDER}</label>
                                                    <select className="form-control mb-1"
                                                        value={sex}
                                                        onChange={e => this.setState({ sex: e.target.value })}
                                                    >
                                                        <option value="">{LabelConstants.PLS_SELECT}</option>
                                                        <option value="male">{LabelConstants.MALE}</option>
                                                        <option value="female">{LabelConstants.FEMALE}</option>
                                                        <option value="others">{LabelConstants.OTHERS}</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <text className="btn btn-primary" type="submit" onClick={() => this.handleUpdate()}>Update Account</text>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <Modal open={openPwd} onClose={() => this.onClosePwd()} center>
                            <div className="pt-3 pb-3 pr-1 pl-1" style={{ width: 500, height: 300 }}>
                                <h3 className="text-center">Update Password</h3>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label className="form-label">{LabelConstants.NEW_PASSWORD}</label>
                                            <input className="form-control" type="password" placeholder={LabelConstants.NEW_PASSWORD} value={newPassword} onChange={e => this.setState({ newPassword: e.target.value })} />
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-group">
                                            <label className="form-label">{LabelConstants.CONF_PASSWORD}</label>
                                            <input className={newPassword !== '' && newPassword !== '' ? newPassword === password ? "form-control border-success" : "form-control border-danger" : "form-control"} type="password" placeholder={LabelConstants.CONF_PASSWORD} value={password} onChange={e => this.setState({ password: e.target.value })} />
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex pt-5">
                                    <div className="btn btn-sm btn-primary mx-auto" onClick={() => this.handlePassword()}>Submit</div>
                                </div>
                            </div>
                        </Modal>
                    </form>
                </div>
            </Fragment>
        );
    }
}

export default UserEdit;