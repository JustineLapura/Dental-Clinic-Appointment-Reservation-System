import React, { useContext } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Form,
  Modal
} from "react-bootstrap";
import ServicesContext from ".././ServicesContext";

const AdminService = () => {
  const {
    services,
    showAddModal,
    setShowAddModal,
    serviceName,
    description,
    price,
    handleAddService,
    showEditModal,
    editServiceName,
    editDescription,
    editPrice,
    handleEditService,
    handleDeleteService,
    handleEditServiceModalOpen,
    setServiceName,
    setDescription,
    setPrice,
    setShowEditModal,
    setEditServiceName,
    setEditDescription,
    setEditPrice
  } = useContext(ServicesContext);

  return (
    <Container fluid>
      <Row className="justify-content-center mt-4 h-100">
        <Col xs={12} md={10} lg={8}>
          <h2 className="text-center mb-4">Services</h2>
          <div className="d-flex justify-content-end">
            <Button variant="success" onClick={() => setShowAddModal(true)}>
              Add Service
            </Button>
          </div>
          <Table striped bordered hover className="mt-4">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={service.id}>
                  <td>{index + 1}</td>
                  <td>{service.name}</td>
                  <td>{service.description}</td>
                  <td>${service.price.toFixed(2)}</td>
                  <td className="text-center">
                    <Button
                      variant="primary"
                      onClick={() => handleEditServiceModalOpen(service.id)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      className="mt-1 mx-1"
                      variant="danger"
                      onClick={() => handleDeleteService(service.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Modal for adding a new service */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Service Name</Form.Label>
              <Form.Control
                type="text"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAddService}>
            Add Service
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for editing an existing service */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Service Name</Form.Label>
              <Form.Control
                type="text"
                value={editServiceName}
                onChange={(e) => setEditServiceName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditService}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminService;
