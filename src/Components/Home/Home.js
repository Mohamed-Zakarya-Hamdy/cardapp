import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import "./Home.css";

const Home = ({ addToCart }) => {
  const [callapi, setCallApi] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchAxios = async () => {
    const response = await axios("https://dummyjson.com/products");
    setCallApi(response.data.products);
  };

  useEffect(() => {
    fetchAxios();
  }, []);

  const handleShow = (item) => {
    setSelectedItem(item);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  return (
    <div className="container">
      {callapi.map((item) => (
        <Card
          key={item.id}
          className="modern-card"
          onClick={() => handleShow(item)}
        >
          <Card.Img variant="top" src={item.thumbnail} />
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Text>
              {item.description.length > 60
                ? item.description.substring(0, 60) + "..."
                : item.description}
            </Card.Text>
            <Button variant="primary">View Details</Button>
          </Card.Body>
        </Card>
      ))}

      {/* Modal Section */}
      {selectedItem && (
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedItem.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={selectedItem.thumbnail}
              alt={selectedItem.title}
              className="img-fluid"
            />
            <p className="mt-3">{selectedItem.description}</p>
            <h5>Price: ${selectedItem.price}</h5>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="success"
              onClick={() => {
                addToCart(selectedItem);
                handleClose();
              }}
            >
              Add to Cart
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Home;
