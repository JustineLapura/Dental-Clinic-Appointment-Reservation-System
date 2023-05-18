import React, { useContext, useState } from 'react';
import { Container, Row, Col, Table, Button, Modal, Form } from 'react-bootstrap';
import TimeScheduleContext from '../TimeScheduleContext';

const AdminTimeSchedule = () => {
  const {
            availability,
            handleEditModalOpen,
            showEditModal,
            setShowEditModal,
            dayToEdit,
            newSchedule,
            setNewSchedule,
            handleUpdateSchedule
        } = useContext(TimeScheduleContext)

  return (
    <Container>
      <h3 className="text-center my-4">Dental Clinic Schedule</h3>
      <Row>
        <Col>
          <Table bordered hover>
            <thead>
              <tr>
                <th>Day</th>
                <th>Schedule</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(availability).map((day) => (
                <tr key={day}>
                  <td>{day}</td>
                  <td>{availability[day]}</td>
                  <td>
                    <Button className='btn-sm className="btn-sm"' variant="primary" onClick={() => handleEditModalOpen(day)}>Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Availability for {dayToEdit}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="schedule">
              <Form.Label>New Schedule</Form.Label>
              <Form.Control type="text" value={newSchedule} onChange={(e) => setNewSchedule(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-sm" variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
          <Button className="btn-sm" variant="primary" onClick={handleUpdateSchedule}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AdminTimeSchedule;
