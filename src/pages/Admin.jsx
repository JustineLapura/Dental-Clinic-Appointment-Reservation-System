import React, { useState } from "react";
import { Container, Row, Col, Table, Modal, Button, Form } from "react-bootstrap";

const Admin = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [patients, setPatients] = useState([
        {
            id: 1,
            name: "John Doe",
            email: "johndoe@example.com",
            phone: "123-456-7890",
            medicalHistory: "No significant medical history",
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "janesmith@example.com",
            phone: "555-555-5555",
            medicalHistory: "Asthma, allergies",
        },
    ]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [medicalHistory, setMedicalHistory] = useState("");

    const handleAddModalClose = () => setShowAddModal(false);
    const handleAddModalShow = () => setShowAddModal(true);
    const handleEditModalClose = () => setShowEditModal(false);
    const handleEditModalShow = (patient) => {
        setSelectedPatient(patient);
        setName(patient.name);
        setEmail(patient.email);
        setPhone(patient.phone);
        setMedicalHistory(patient.medicalHistory);
        setShowEditModal(true);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handleMedicalHistoryChange = (event) => {
        setMedicalHistory(event.target.value);
    };

    const handleAddPatient = () => {
        const newPatient = {
            id: patients.length + 1,
            name: name,
            email: email,
            phone: phone,
            medicalHistory: medicalHistory,
        };
        setPatients([...patients, newPatient]);
        setName("");
        setEmail("");
        setPhone("");
        setMedicalHistory("");
        setShowAddModal(false);
    };

    const handleEditPatient = () => {
        const updatedPatient = {
            id: selectedPatient.id,
            name: name,
            email: email,
            phone: phone,
            medicalHistory: medicalHistory,
        };
        const newPatients = patients.map((patient) => {
            if (patient.id === selectedPatient.id) {
                return updatedPatient;
            } else {
                return patient;
            }
        });
        setPatients(newPatients);
        setSelectedPatient(null);
        setName("");
        setEmail("");
        setPhone("");
        setMedicalHistory("");
        setShowEditModal(false);
    };

    const handleDeletePatient = (patient) => {
        const newPatients = patients.filter((p) => p.id !== patient.id);
        setPatients(newPatients);
    };

    return (
        <Container className="py-5">
            <h1 className="text-center mb-5">Patient Information Management</h1>
            <Row className="mb-4">
                <Col>
                    <Button variant="primary" onClick={handleAddModalShow}>
                        Add Patient
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover        >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Medical History</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patients.map((patient) => (
                                <tr key={patient.id}>
                                    <td>{patient.id}</td>
                                    <td>{patient.name}</td>
                                    <td>{patient.email}</td>
                                    <td>{patient.phone}</td>
                                    <td>{patient.medicalHistory}</td>
                                    <td>
                                        <Button variant="primary" onClick={() => handleEditModalShow(patient)}>
                                            Edit
                                        </Button>{" "}
                                        <Button variant="danger" onClick={() => handleDeletePatient(patient)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Modal show={showAddModal} onHide={handleAddModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Patient</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" value={name} onChange={handleNameChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" placeholder="Enter phone number" value={phone} onChange={handlePhoneChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Medical History</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter medical history"
                                value={medicalHistory}
                                onChange={handleMedicalHistoryChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleAddModalClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddPatient}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            {selectedPatient && (
                <Modal show={showEditModal} onHide={handleEditModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Patient</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" value={name} onChange={handleNameChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" placeholder="Enter phone number" value={phone} onChange={handlePhoneChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Medical History</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter medical history"
                                    value={medicalHistory}
                                    onChange={handleMedicalHistoryChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleEditModalClose}>
                            Close
                        </Button>
                        <Button variant="primary">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </Container>
    )
}

export default Admin;

