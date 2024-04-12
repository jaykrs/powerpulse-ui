import React ,{ Fragment, useState, useEffect } from 'react';
import { withRouter } from "react-router";
import imag from '../img/about.jpg'
import data from '../../../jsonData/data.json'
import '../layout/style.css'

const initialState = {
    name: '',
    email: '',
    message: '',
  }

const ContactUs = (props) => {
  const [landingPageData, setLandingPageData] = useState({...data});
  const [{ name, email, message }, setState] = useState(initialState)


  const handleChange = (e) => {
    const { name, value } = e.target
    setState((prevState) => ({ ...prevState, [name]: value }))
  }
  const clearState = () => setState({ ...initialState })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(name, email, message)
    // emailjs
    //   .sendForm(
    //     'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_USER_ID'
    //   )
    //   .then(
    //     (result) => {
    //       console.log(result.text)
    //       clearState()
    //     },
    //     (error) => {
    //       console.log(error.text)
    //     }
    //   )
  }
  return (
    <div>
    <div id='contact'>
      <div className=' row justify-content-center bg-red'>
        <div className='col-md-8 main_div'>
          <div className='row'>
            <div className='section-title'>
              <h2>Get In Touch</h2>
              <p>
                Please fill out the form below to send us an email and we will
                get back to you as soon as possible.
              </p>
            </div>
            <form name='sentMessage' validate onSubmit={handleSubmit}>
              <div className='row'>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      className='form-control'
                      placeholder='Name'
                      required
                      onChange={handleChange}
                    />
                    <p className='help-block text-danger'></p>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      className='form-control'
                      placeholder='Email'
                      required
                      onChange={handleChange}
                    />
                    <p className='help-block text-danger'></p>
                  </div>
                </div>
              </div>
              <div className='form-group'>
                <textarea
                  name='message'
                  id='message'
                  className='form-control'
                  rows='4'
                  placeholder='Message'
                  required
                  onChange={handleChange}
                ></textarea>
                <p className='help-block text-danger'></p>
              </div>
              <div id='success'></div>
              <button type='submit' className='btn btn-custom btn-lg'>
                Send Message
              </button>
            </form>
          </div>
        </div>
        <div className='col-md-3 col-md-offset-1 contact-info margin-left-10px '>
          <div className='contact-item'>
            <h3>Contact Info</h3>
            <p>
              <span>
                <i className='fa fa-map-marker'></i> Address
              </span>
              {landingPageData.Contact ? landingPageData.Contact.address : 'loading'}
            </p>
          </div>
          <div className='contact-item'>
            <p>
              <span>
                <i className='fa fa-phone'></i> Phone
              </span>{' '}
              {landingPageData.Contact ? landingPageData.Contact.phone : 'loading'}
            </p>
          </div>
          <div className='contact-item'>
            <p>
              <span>
                <i className='fa fa-envelope-o'></i> Email
              </span>{' '}
              {landingPageData.Contact ? landingPageData.Contact.email : 'loading'}
            </p>
          </div>
        </div>
        <div className='col-md-12'>
          <div className='row'>
            <div className='social'>
              <ul>
                <li>
                  <a href={landingPageData.Contact ? landingPageData.Contact.facebook : '/'}>
                    <i className='fa fa-facebook'></i>
                  </a>
                </li>
                <li>
                  <a href={landingPageData.Contact ? landingPageData.Contact.twitter : '/'}>
                    <i className='fa fa-twitter'></i>
                  </a>
                </li>
                <li>
                  <a href={landingPageData.Contact ? landingPageData.Contact.youtube : '/'}>
                    <i className='fa fa-youtube'></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id='footer'>
      <div className='container text-center'>
        <p>
          &copy; 2020 Issaaf Kattan React Land Page Template. Design by{' '}
          <a href='http://www.templatewire.com' rel='nofollow'>
            TemplateWire
          </a>
        </p>
      </div>
    </div>
  </div>
   
);
};
export default withRouter(ContactUs);