import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditServiceModal = ({ show, handleClose, service }) => {
  const [serviceName, setServiceName] = useState(service.name);
  const [description, setDescription] = useState(service.description);
  const [price, setPrice] = useState(service.price);

  const handleSave = () => {
    // Perform validation and update service in database
    // Then, close modal and clear form
    handleClose();
    setServiceName('');
    setDescription('');
    setPrice('');
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Service</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="serviceName">
            <Form.Label>Service Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter service name"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditServiceModal;
