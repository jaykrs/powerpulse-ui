import React, { Fragment, Component } from "react";
import Breadcrumb from "../common/breadcrumb";
import axios from "axios";
import { CMS_STRAPI_URL } from "../../constant/serviceurl";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
class NotificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: localStorage.getItem("jwt"),
      userId: localStorage.getItem("userId"),
      dataList: [],
      data: "",
      userType: localStorage.getItem("userType"),
      userTypeId: localStorage.getItem("userTypeId"),
      notification: [],
    };
  }

  //Function to mark the notification as read
  markNotificationAsRead(notificationId) {
    axios({
      method: "PUT",
      url: `${CMS_STRAPI_URL}/api/notification-schemas/${notificationId}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      data: {
        data: {
          readstatus: true, //set readstatus to true
        },
      },
    })
      .then((response) => {
        if (response.status === 200) {
          // Request was successful
          // Update the state to mark the notification as read
          const updateNotification = this.state.notification.map((item) => {
            if (item.id === notificationId) {
              item.attributes.readstatus = true;
            }
            return item;
          });
          this.setState({
            notification: updateNotification,
          });
        } else {
          // Request failed
          console.error("Request failed with status code", response.status);
          console.error("Response data:", response.data);
        }
      })
      .catch((error) => {
        // Handle network or other errors
        console.error("An error occurred:", error);
      });
  }

  componentDidMount() {
    const participant = JSON.parse(localStorage.getItem("userData")).username;
    const token = localStorage.getItem("jwt"); // Get the token from localStorage
    axios({
      method: "GET",
      url: `${CMS_STRAPI_URL}/api/notification-schemas?filters[participant][$eq]=${participant}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response.data.data, "adadshrgconnectsresponse");
        this.setState({
          notification: response.data.data,
        });
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { notification } = this.state;
    return (
      <Fragment>
        <Breadcrumb title="Notification List" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <div className="order-history table-responsive">
                    <table className="table table-bordernone">
                      <thead>
                        <tr>
                          <th scope="col">S. NO.</th>
                          <th scope="col">Subject</th>
                          <th scope="col">Participants</th>
                          <th scope="col">View</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!!notification &&
                          notification.length > 0 &&
                          notification.map((item, index) => {
                            const commonClassName = `font-weight-${
                              item.attributes.readstatus ? "normal" : "bold"
                            }`;
                            return (
                              <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td className={commonClassName}>
                                  {item.attributes.subject.replace(/_/g, " ")}
                                </td>
                                <td className={commonClassName}>
                                  {item.attributes.participant}
                                </td>
                                <td>
                                  <button
                                    className="btn btn-primary active"
                                    onClick={() => {
                                      console.log(item.id);
                                      this.markNotificationAsRead(item.id);
                                      this.props.history.push(
                                        `/viewNotification/${item.id}`
                                      );
                                    }}
                                  >
                                    View
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default NotificationScreen;
