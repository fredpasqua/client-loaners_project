import React, { useState } from "react";
import axios from "axios";
import "./AddLoaner.css";
import Alert from "react-bootstrap/Alert";
import Accordion from "react-bootstrap/Accordion";
const AddLoaner = (props) => {
 
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(props.user);
  const [formData, setFormData] = useState({
    type: "",
    brand: "",
    serial: "",
    barcode: "",
    location: "",
    userid: user.user._id,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      userid: user.user._id,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://horntrax-api.herokuapp.com/loaners/add",
        formData
      );
      setMessage("Instrument addeded Succesfully!");
      setShow2(true);
      setTimeout(() => {
        setShow2(false);
      }, 2000);
      setFormData({
        type: "",
        brand: "",
        serial: "",
        barcode: "",
        location: "",
        userid: user.user._id,
      });
      props.forceUpdate();
    } catch (error) {
      console.error(error);
      setShow(true);
      setMessage(error.response.data);
    }
  };

  return (
    <>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>ADD AN INSTRUMENT</Accordion.Header>
          <Accordion.Body>
            {show ? (
              <Alert
                variant="danger"
                onClose={() => setShow(false) && setMessage("")}
                dismissible
              >
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>{message}</p>
              </Alert>
            ) : null}
            {show2 ? (
              <Alert
                variant="primary"
                onClose={() => setShow2(false) && setMessage("")}
                dismissible
              >
                <Alert.Heading>{message}</Alert.Heading>
              </Alert>
            ) : null}

            <form className="loaner-form" onSubmit={handleSubmit}>
              <label>
                Instrument:
                <input
                  className="loaner-input"
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                />
              </label>
              <label>
                Brand:
                <input
                  className="loaner-input"
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                />
              </label>
              <label>
                Serial:
                <input
                  className="loaner-input"
                  type="text"
                  name="serial"
                  value={formData.serial}
                  onChange={handleChange}
                />
              </label>
              <label>
                Barcode:
                <input
                  className="loaner-input"
                  type="number"
                  name="barcode"
                  value={formData.barcode}
                  onChange={handleChange}
                />
              </label>
              <label>
                Location:
                <input
                  className="loaner-input"
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </label>
              <button className="loaner-submit" type="submit">
                Add Instrument
              </button>
            </form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default AddLoaner;
