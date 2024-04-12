import React, { useEffect, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import axios from "axios";
import { CMS_STRAPI_URL } from "../../constant/serviceurl";
import { Fragment } from "react";
const DetailView = (props) => {
  // Access the ID from the URL using useParams
  const [data, setData] = useState([]);
  const token = localStorage.getItem("jwt");
  useEffect(() => {
    // Define the API endpoint and fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `${CMS_STRAPI_URL}/api/notification-schemas/${props.match.params.id}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData([response.data]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function
  }, [props.match.params.id]);

  return (
    <Fragment>
      <Breadcrumb title="Notification Detail" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-xl-6">
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <ul>
                    {data.map((item) => (
                      <li key={item.data.id}>
                        <div className="card-body">
                          <form className="theme-form mega-form">
                            <label className="col-form-label">Id: </label>
                            <input
                              className="form-control"
                              type="text"
                              value={item.data.id}
                              readOnly
                            />
                            <label className="col-form-label">Language</label>
                            <input
                              className="form-control"
                              type="text"
                              value={item.data.attributes.language}
                              readOnly
                            />
                            <label className="col-form-label">
                              Participant:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              value={item.data.attributes.participant}
                              readOnly
                            />
                            <label className="col-form-label">Subject: </label>
                            <input
                              className="form-control"
                              type="text"
                              value={item.data.attributes.subject}
                              readOnly
                            />
                            <label className="col-form-label">
                              Read Status:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              value={
                                item.data.attributes.readstatus
                                  ? "Read"
                                  : "Unread"
                              }
                              readOnly
                            />
                            <label className="col-form-label">
                              Created At:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              value={item.data.attributes.createdAt}
                              readOnly
                            />
                            <label className="col-form-label">
                              Updated At:{" "}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              value={item.data.attributes.updatedAt}
                              readOnly
                            />
                          </form>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DetailView;
