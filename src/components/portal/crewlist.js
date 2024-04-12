import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { toast } from "react-toastify";
import Image from '../../assets/images/man.png';
import { CMS_STRAPI_URL } from '../../constant/serviceurl';
import Breadcrumb from '../common/breadcrumb';
import {Plus } from 'react-feather';

// import { jobForm } from '.';

class CrewList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: localStorage.getItem('jwt'),
      userId: localStorage.getItem('userId'),
      dataList: [],
      userType: localStorage.getItem('userType'),
      data: '',
      projectcrews: [],
      project: [],
      engineer: []

    }
  }

  componentWillMount(id) {
    
    let List = JSON.parse(sessionStorage.getItem('PROJECTLIST'))
    console.log("PROJECTLIST", List)
    var servType = List.attributes.servicetype.split(",");

    console.log(this.props.match.params.id, 'popadadsr')
    axios({
      method: "GET",
      url: CMS_STRAPI_URL + "/api/engineers?filters[availabilitystatus][$eq]=true" + "&filters[servicecity][$contains]=" + List.attributes.city + servType.map((data) => ("&filters[servicetype][$contains]=" + data)),
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => {
        console.log(response.data.data)
        var Value = JSON.stringify(response.data.data)
        sessionStorage.setItem('CREWLIST', Value)
        console.log(response)
        console.log(List.attributes.servicetype)
        var servType = List.attributes.servicetype.split(",");
        if (response.data.data.length === 0) {
          axios({
            method: "GET",
            url: CMS_STRAPI_URL + "/api/engineers?filters[availabilitystatus][$eq]=true" + "&filters[servicecity][$contains]=" + List.attributes.city + servType.map((data) => ("&filters[servicetype][$contains]=" + data)),
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          })
            .then((response) => {
              console.log(response.data.data, 'adarshprojectconnect')
              this.setState({
                project: response.data.data
              })
              this.handlePost();
            })
            .catch((error) => {
              console.log(error);
            });
        }
        // const engineerIds = response.data.data[0].attributes.engineerid.split(',');
        // const engineerNames = response.data.data[0].attributes.engineername.split(',');
        // console.log(engineerIds, engineerNames)

        // const newObjs = engineerIds.map((id, index) => {
        //   return {
        //     ...response.data.data,
        //     engineerid: id,
        //     engineername: engineerNames[index]
        //   };
        // });
        // console.log(newObjs, "final")

        this.setState({
          projectcrews: response.data.data
        })


      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleEngineerlist = () => {
    this.props.history.push({ pathname: '/pages/login' })

  }

  handlePost = (item) => {
    let List = JSON.parse(sessionStorage.getItem('PROJECTLIST'))
    console.log(List, "llp")
    console.log(List.attributes.engineeringfirmid, 'wertyui')
    console.log(this.props.match.params.id, 'popadadsr')

    axios({
      method: "POST",
      url: CMS_STRAPI_URL + "/api/projectcrews",
      data: {
        data: {
          "projectid": List.id.toString(),
          "customerid": List.attributes.customerid,
          "efid": List.attributes.engineeringfirmid,
          "projectname": List.attributes.name,
          "customername": List.attributes.customername,
          "efname": List.attributes.engineeringfirmname,
          "engineerid": item.attributes.email,
          "engineername": item.attributes.name,
        }
      },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => {
        console.log(response);
        setTimeout(() => {
          toast.success("Job Request Sent");
        }, 100);
        this.props.history.push({ pathname: '/crew' })
      })
      .catch((error) => {
        console.log(error);

      });
  }


  handleRemove = (item) => {
    let List = JSON.parse(sessionStorage.getItem('PROJECTLIST'))
    console.log(List)
    console.log(this.props.match.params.id, 'popadadsr')
    console.log(item, "ttytytt")
    // axios({
    //   method: "GET",
    //   url: CMS_STRAPI_URL + "/api/onboard/engineerremoval/" + id + "/" + this.props.match.params.id + "/" + List.attributes.engineeringfirmid,
    //   headers: {
    //     Authorization: "Bearer " + localStorage.getItem("jwt"),
    //   },
    // })
    //   .then((response) => {
    //     console.log(response);
    //     setTimeout(() => {
    //       toast.success("Crew Successfully Removed");
    //     }, 100);
    //     this.props.history.push({ pathname: '/crew' })
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     toast.error("Can't Removed Crew");
    //   });
  }

 


  render() {
    const { projectcrews, project, engineer, userType } = this.state;
    return (
      <Fragment>
        <Breadcrumb title="Engineers List" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div>
                {userType === "engineeringfirm" && (
                  <div style={{ display: 'flex', justifyContent: 'end', }}>
                    <button class="btn btn-primary active" onClick={() => { this.handleEngineerlist() }}>Add Foreign Engineer</button>
                  </div>
                )}
                <div>
                  <h5>List Of Local Engineers :</h5>
                </div>
              </div>

              <div class="container ">

                <div className="row mt-4">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr className="border-bottom-primary">
                          <th scope="col">#</th>
                          <th scope="col">Name</th>
                          <th scope="col">Email Id</th>
                          <th scope="col">Phone Number</th>
                          <th scope="col">View</th>
                        </tr>
                      </thead>
                      {!!projectcrews && projectcrews.length > 0 && projectcrews.map((item, index) => {
                        return (
                          // <div style={{ display: 'flex', justifyContent: 'center' }}>
                          // <div class="mt-4 col-lg-6 col-sm-6">
                          //   <div class="project-box" style={{ backgroundColor: '#fbfbfb', borderRadius: '5px', border: '1px solid #ebd61c', padding: '20px', position: 'relative' }}>
                          //     {userType === "engineeringfirm" && (
                          //       <div style={{ display: 'flex', justifyContent: 'end', }}>
                          //         <button class="btn btn-danger active" onClick={() => { this.handleRemove(item) }}>remove</button>
                          //       </div>
                          //     )}
                          //     <h5 class="f-w-600">{item.attributes.engineername}</h5>
                          //     <div class="d-flex align-items-center"><img class="img-20 me-1 rounded-circle"
                          //       src={Image} alt="" />
                          //       <div class="flex-grow-1">
                          //         <text>{item.attributes.engineerid}</text>
                          //       </div>
                          //     </div>
                          //     <div class="details row mt-4">
                          //       <div class="col-4"><span>Id</span></div>
                          //       <div class="text-primary col-4">{item.id}</div>
                          //     </div>
                          //   </div>
                          // </div>
                          // </div>
                          <tbody>
                            <tr className="border-bottom-secondary">
                              <th scope="row">{index + 1}</th>
                              <td>{item.attributes.name}</td>
                              <td>{item.attributes.email}</td>
                              <td>{item.attributes.phonenumber}</td>
                              <td>
                                <a className="btn btn-pill btn-primary" data-toggle="tooltip" title="btn btn-primary" role="button" onClick={() => { this.handlePost(item) }}><Plus size={20}/></a>

                              </td>
                            </tr>
                          </tbody>
                        )
                      })}
                    </table>
                  </div>

                </div>
              </div>
            </div>


            <div className="col-sm-12">
              <div class="container">
                <div className="row">
                  {!!project && project.length > 0 && project.map((item, index) => {
                    return (
                      // <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <div class="mt-4 col-lg-6 col-sm-6">
                        <div class="project-box" style={{ backgroundColor: '#fbfbfb', borderRadius: '5px', border: '1px solid #ebd61c', padding: '20px', position: 'relative' }}>
                          <div style={{ display: 'flex', justifyContent: 'end', }}>

                            <button class="btn btn-primary active" onClick={() => { this.handlePost(item) }}>Add</button>
                          </div>
                          <h5 class="f-w-600">{item.attributes.name}</h5>
                          <div class="d-flex align-items-center"><img class="img-20 me-1 rounded-circle"
                            src={Image} alt="" />
                            <div class="flex-grow-1">
                              <text>{item.attributes.email}</text>
                            </div>
                          </div>
                          <div class="details row mt-4">
                            <div class="col-4"><span>Id</span></div>
                            <div class="text-primary col-4">{item.id}</div>

                          </div>
                        </div>
                      </div>
                      // </div>
                    )
                  })}
                </div>
              </div>
            </div>



            <div className="col-sm-12">
              <div class="container">
                <div className="row">
                  {!!engineer && engineer.length > 0 && engineer.map((item, index) => {
                    return (
                      // <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <div class="mt-4 col-lg-6 col-sm-6">
                        <div class="project-box" style={{ backgroundColor: '#fbfbfb', borderRadius: '5px', border: '1px solid #ebd61c', padding: '20px', position: 'relative' }}>
                          <div style={{ display: 'flex', justifyContent: 'end', }}>

                            <button class="btn btn-primary active" onClick={() => { this.handlePost(item) }}>Add</button>
                          </div>
                          <h5 class="f-w-600">{item.attributes.name}</h5>
                          <div class="d-flex align-items-center"><img class="img-20 me-1 rounded-circle"
                            src={Image} alt="" />
                            <div class="flex-grow-1">
                              <text>{item.attributes.email}</text>
                            </div>
                          </div>
                          <div class="details row mt-4">
                            <div class="col-4"><span>Id</span></div>
                            <div class="text-primary col-4">{item.id}</div>

                          </div>
                        </div>
                      </div>
                      // </div>
                    )
                  })}

                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment >
    );
  }
}

export default CrewList;