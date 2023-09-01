import React, { Fragment, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
// import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import "./crud.css";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Toast } from "bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function CRUD() {
  //
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name, setName] = useState("");
  const [cmsID, setcmsID] = useState("");
  const [Email, setEmail] = useState("");
  const [AngerScore, setAngerScore] = useState("");
  const [DepressionScore, setDepressionScore] = useState("");
  const [AnxietyScore, setAnxietyScore] = useState("");
  const [SelfesteemScore, setSelfEsteemScore] = useState("");

  const [data, setData] = useState([]);
  const [editId, setEditId] = useState("");
  const [editName, setEditName] = useState("");
  const [editCms, setEditCms] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editAngerScore, setEditAngerScore] = useState("");
  const [editDepressionScore, setEditDepressionScore] = useState("");
  const [editSelfesteemScore, setEditSelfesteemScore] = useState("");
  const [editAnxietyScore, setEditAnxietyScore] = useState("");
  const [editComment, setEditComment] = useState("");
  const [editClientofC3a, setEditClientofC3a] = useState("");

  console.log(data);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("https://localhost:7013/api/Users")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const postData = () => {
    const url = "https://localhost:7013/api/Users";
    const data = {
      cmS_ID: cmsID,
      name: name,
      email: Email,
      anger_Score: AngerScore,
      depression_Score: DepressionScore,
      anxiety_Score: AnxietyScore,
      selfesteem_Score: SelfesteemScore,
      comments: "",
      clientOfC3A: "",
      email_Sent: "Yes",
    };
    axios
      .post(url, data)
      .then((response) => {
        getData();
        clear();
        toast.success("Data added Successfully");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const clear = () => {
    setName("");
    setcmsID("");
    setEmail("");
    setSelfEsteemScore("");
    setAnxietyScore("");
    setDepressionScore("");
    setAngerScore("");
  };

  const handleEdit = (id) => {
    handleShow();
    axios
      .get(`https://localhost:7013/api/Users/${id}`)
      .then((response) => {
        setEditId(id);
        setEditName(response.data.name);
        setEditCms(response.data.cmS_ID);
        setEditEmail(response.data.email);
        setEditAngerScore(response.data.anger_Score);
        setEditDepressionScore(response.data.depression_Score);
        setEditAnxietyScore(response.data.anxiety_Score);
        setEditSelfesteemScore(response.data.selfesteem_Score);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const putData = () => {
    const url = `https://localhost:7013/api/Users/${editId}`;
    const data = {
      id: editId,
      cmS_ID: editCms,
      name: editName,
      email: editEmail,
      anger_Score: editAngerScore,
      depression_Score: editDepressionScore,
      anxiety_Score: editAnxietyScore,
      selfesteem_Score: editSelfesteemScore,
      comments: editComment,
      clientOfC3A: editClientofC3a,
      email_Sent: "Yes",
    };
    axios
      .put(url, data)
      .then((response) => {
        getData();
        clear();
        toast.success("Data updated Successfully");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this employee") == true) {
      axios
        .delete(`https://localhost:7013/api/Users/${id}`)
        .then((response) => {
          getData();
          toast.success("Data deleted Successfully");
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "10px" }}>User Information</h1>
      <ToastContainer />
      <div style={{ marginTop: "20px", marginLeft: "115px" }}>
        <div style={{ display: "flex", gap: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter CMS ID"
              value={cmsID}
              onChange={(e) => setcmsID(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Anger Score"
              value={AngerScore}
              onChange={(e) => setAngerScore(e.target.value)}
            />
          </Col>
        </div>
        <div style={{ display: "flex", marginTop: "10px", gap: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Depression Score"
              value={DepressionScore}
              onChange={(e) => setDepressionScore(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Anxiety Score"
              value={AnxietyScore}
              onChange={(e) => setAnxietyScore(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Selfesteem Score"
              value={SelfesteemScore}
              onChange={(e) => setSelfEsteemScore(e.target.value)}
            />
          </Col>
          <Col>
            <button onClick={postData} className="btn btn-primary">
              Submit
            </button>
          </Col>
        </div>
      </div>

      <br></br>
      <Table
        striped
        bordered
        hover
        style={{
          marginTop: "20px",
          width: "98%",
          marginLeft: "20px",
          border: "1px",
        }}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>CMS ID</th>
            <th>Email</th>
            <th>Anger Score</th>
            <th>Depression Score</th>
            <th>Anxiety Score</th>
            <th>Selfesteem Score</th>
            <th>Comments</th>
            <th>Client of C3A</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0
            ? data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.cmS_ID}</td>
                    <td>{item.email}</td>
                    <td className={item.anger_Score > 20 ? "high-score" : ""}>
                      {item.anger_Score}
                    </td>
                    <td
                      className={item.depression_Score > 20 ? "high-score" : ""}
                    >
                      {item.depression_Score}
                    </td>
                    <td className={item.anxiety_Score > 20 ? "high-score" : ""}>
                      {item.anxiety_Score}
                    </td>
                    <td
                      className={item.selfesteem_Score > 20 ? "high-score" : ""}
                    >
                      {item.selfesteem_Score}
                    </td>
                    <td className="comment-cell">
                      <div className="comment-text">{item.comments}</div>
                    </td>
                    <td>{item.clientOfC3A}</td>

                    <td colSpan={2}>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEdit(item.cmS_ID)}
                      >
                        Edit
                      </button>{" "}
                      &nbsp;
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(item.cmS_ID)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            : "Loading..."}
        </tbody>
      </Table>

      {/* Modal Code*/}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify / Update Student Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Row className="mb-3">
              <Col>
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </Col>
              <Col>
                <label className="form-label">CMS ID</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter CMS ID"
                  value={editCms}
                  onChange={(e) => setEditCms(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label className="form-label">Email</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                />
              </Col>
              <Col>
                <label className="form-label">Anger Score</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Anger Score"
                  value={editAngerScore}
                  onChange={(e) => setEditAngerScore(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label className="form-label">Depression Score</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Depression Score"
                  value={editDepressionScore}
                  onChange={(e) => setEditDepressionScore(e.target.value)}
                />
              </Col>
              <Col>
                <label className="form-label">Anxiety Score</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Anxiety Score"
                  value={editAnxietyScore}
                  onChange={(e) => setEditAnxietyScore(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label className="form-label">Selfesteem Score</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Selfesteem Score"
                  value={editSelfesteemScore}
                  onChange={(e) => setEditSelfesteemScore(e.target.value)}
                />
              </Col>
              <Col>
                <label className="form-label">Cient of C3A</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Client of C3A"
                  value={editClientofC3a}
                  onChange={(e) => setEditClientofC3a(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label className="form-label">Comment</label>
                <textarea
                  className="form-control"
                  placeholder="Enter Comment"
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                />
              </Col>
              <Col
                className="d-flex justify-content-end align-items-center"
                style={{
                  marginTop: "40px",
                  paddingLeft: "0px",
                  paddingRight: "25px",
                }}
              >
                <button onClick={putData} className="btn btn-primary">
                  Submit
                </button>
              </Col>
            </Row>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default CRUD;
