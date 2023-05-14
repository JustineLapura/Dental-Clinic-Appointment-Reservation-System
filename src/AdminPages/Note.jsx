import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const AdminNotePage = () => {
  const [note, setNote] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Save the note to the database or perform other necessary actions
    setShowAlert(true);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Admin Note</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Enter Note</Form.Label>
              <Form.Control as="textarea" rows={5} value={note} onChange={handleNoteChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Col>
      </Row>
      {showAlert && (
        <Row>
          <Col>
            <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
              Note saved successfully!
            </Alert>
          </Col>
        </Row>
      )}
      {note && (
        <Row>
          <Col>
            <h3>Current Note:</h3>
            <p>{note}</p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default AdminNotePage;
