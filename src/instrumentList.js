import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, InputGroup, Form, Card } from "react-bootstrap";
import ReactModal from "react-modal";
import AddLoaner from "./AddLoaner";
import Alert from "react-bootstrap/Alert";
import DropDown from "./select";

// import loaners from "./instruments.js";

function InstrumentList() {
  const [instruments, setInstruments] = useState([]);
  const [selectedInstrument, setSelectedInstrument] = useState({});
  const [query, setQuery] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  // const [selectedLocation, setSelectedLocation] = useState("");

  const [updater, setUpdater] = useState(0);
  const [formData, setFormData] = useState({
    type: "",
    brand: "",
    serial: "",
    barcode: "",
    location: "",
    dateLastServiced: "",
  });
  const [deleteMessage, setDeleteMessage] = useState({
    message: "",
    show: false,
  });
  const onRequestClose = () => {
    setShowModal(false);
  };
  const forceUpdate = () => {
    setUpdater(updater + 1);
  };

  useEffect(
    () =>
      async function getLoaners() {
        await axios
          .get("https://horntrax-api.herokuapp.com/loaners/")
          .then((res) => setInstruments(res.data));
      },
    [updater]
  );

  //Drop Down Menu Calls this function to set state of SelecetedDepartments
  const updateSelectedType = (e) => {
    setSelectedType(e);
  };
  //creates a list of  instruments prefiltered by selectedDepartment state
  let preFilteredInstruments = [];
  selectedType.length > 0
    ? (preFilteredInstruments = instruments.filter((instrument) => {
        return instrument.type
          .toLowerCase()
          .includes(selectedType.toLowerCase());
      }))
    : (preFilteredInstruments = instruments);
  let filteredInstruments = [];
  query.length > 0
    ? (filteredInstruments = preFilteredInstruments.filter((instrument) => {
        return (
          instrument.type.toLowerCase().includes(query.toLowerCase()) ||
          instrument.brand.toLowerCase().includes(query.toLowerCase()) ||
          instrument.serial.toLowerCase().includes(query.toLowerCase()) ||
          instrument.location.toLowerCase().includes(query.toLowerCase()) ||
          instrument.barcode.toString().includes(query)
        );
      }))
    : (filteredInstruments = preFilteredInstruments);

  const clear = (e) => {
    setQuery("");
  };
  async function deleteLoaner(key) {
    await axios
      .get(`https://horntrax-api.herokuapp.com/loaners/delete/${key}`)
      .then((res) => setDeleteMessage({ message: res.data, show: true }))
      .then((res) =>
        setTimeout(() => {
          setDeleteMessage({ message: "", show: false });
          setShowModal(false);
        }, 2000)
      );

    forceUpdate();
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleUpdateLoanerInfo = async (e, ID) => {
    e.preventDefault();
    try {
      await axios.post(
        `https://horntrax-api.herokuapp.com/loaners/update/${ID}`,
        formData
      );
      setFormData({
        type: "",
        brand: "",
        serial: "",
        barcode: "",
        location: "",
      });
      forceUpdate();
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="loanersViewContainer">
        <div className="top-container">
          <AddLoaner forceUpdate={forceUpdate} />

          <div className="searchBar">
            <div className="searchBarAndButton">
              <input
                onChange={(event) => setQuery(event.target.value)}
                value={query}
                placeholder="search anything..."
              ></input>

              <div className="clearButton">
                <Button onClick={() => clear()}>Clear</Button>
              </div>
            </div>
            <DropDown
              data={instruments}
              action={updateSelectedType}
              selector={{ value: "type" }}
            />
          </div>
        </div>
        <div className="cards-container">
          {filteredInstruments?.map((instrument) => (
            <Card
              style={{
                borderRadius: "4px",
                width: "100vw",
                textAlign: "center",
                justifyContent: "center",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "10px",
              }}
              key={instrument._id}
            >
              <Card.Body>
                <Card.Title>
                  <Button
                    className="btn-instrument btn-primary"
                    onClick={() => {
                      setShowModal(true);
                      setSelectedInstrument(instrument);
                      setFormData({
                        type: instrument.type,
                        brand: instrument.brand,
                        serial: instrument.serial,
                        barcode: instrument.barcode,
                        location: instrument.location,
                        dateLastServiced: instrument.dateLastServiced.slice(
                          0,
                          10
                        ),
                      });
                    }}
                  >
                    {instrument.type}
                  </Button>
                </Card.Title>

                <Card.Text>
                  Brand: {instrument.brand}
                  <br></br>
                  Serial: {instrument.serial}
                  <br></br>
                  Location: {instrument.location}
                  <br></br>
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
      <div className="reactModal">
        <ReactModal
          isOpen={showModal}
          ariaHideApp={false}
          contentLabel="directory modal"
          shouldReturnFocusAfterClose={true}
          onRequestClose={() => onRequestClose()}
          shouldCloseOnOverlayClick={true}
          style={{
            overlay: {
              backgroundColor: "white",
              zIndex: 2,
              width: "100%",
            },
            content: {
              backgroundColor: "#71c7ec",
            },
          }}
        >
          {deleteMessage.show ? (
            <Alert
              variant="danger"
              onClose={() => setDeleteMessage({ message: "", show: false })}
            >
              <Alert.Heading>{deleteMessage.message}</Alert.Heading>
            </Alert>
          ) : null}
          <button
            className="modalCloseButton"
            onClick={() => onRequestClose()}
            style={{
              height: "40px",
              width: "40px",
              color: "#3794ca",
              marginLeft: "92%",
            }}
          >
            X
          </button>
          <div>
            <div className="useInfo">
              <h2 className="updateFormTitle">DETAIL VIEW</h2>
              <h2 className="updateFormTitle">Instrument: {formData.type}</h2>
              <InputGroup className="modal-text">
                <Form.Label>Brand: {" " + formData.brand}</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.brand}
                  onChange={handleChange}
                  name="brand"
                  placeholder={formData.brand}
                  aria-label="Update Brand of Instrument"
                  aria-describedby="basic-addon2"
               
                ></Form.Control>{" "}
                <Form.Label>Serial#: {" " + formData.serial}</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.serial}
                  name="serial"
                  placeholder={formData.serial}
                  onChange={handleChange}
                  aria-label="Update serial of Instrument"
                  aria-describedby="basic-addon2"
                ></Form.Control>{" "}
                <Form.Label>Barcode: {" " + formData.barcode}</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.barcode}
                  name="barcode"
                  placeholder={formData.barcode}
                  onChange={handleChange}
                  aria-label="Update barcode of Instrument"
                  aria-describedby="basic-addon2"
                ></Form.Control>{" "}
                <Form.Label>Location: {formData.location}</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.location}
                  name="location"
                  placeholder={formData.location}
                  onChange={handleChange}
                  aria-label="Update location of Instrument"
                  aria-describedby="basic-addon2"
                ></Form.Control>
                <Form.Label>
                  Date of last service:
                  {" " + formData.dateLastServiced}
                </Form.Label>
                <Form.Control
                  type="date"
                  name="dateLastServiced"
                  placeholder={formData.dateLastServiced}
                  value={formData.dateLastServiced}
                  onChange={handleChange}
                  aria-label="Update date of last service"
                  aria-describedby="basic-addon2"
                ></Form.Control>
              </InputGroup>
              <div className="updateFormButtonsContainer">
                <Button
                  className="btn-loaner-update"
                  onClick={(e) =>
                    handleUpdateLoanerInfo(e, selectedInstrument._id)
                  }
                >
                  Update Information
                </Button>
                <Button
                  value={selectedInstrument._id}
                  onClick={(e) => deleteLoaner(e.target.value)}
                >
                  Delete Instrument
                </Button>
              </div>
            </div>
          </div>
        </ReactModal>
      </div>
    </>
  );
}

export default InstrumentList;
