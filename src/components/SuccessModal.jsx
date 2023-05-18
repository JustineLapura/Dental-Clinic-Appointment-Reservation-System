import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

function SuccessModal({showSuccessModal, handleCloseModal, gotoMyAppointments}) {
    const pathname = useLocation().pathname
  return (
    <div>
      <Modal show={showSuccessModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Appointment:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className="fw-bold text-success text-center my-5">Booked Successfully!</h5>
          <div className='d-flex justify-content-end gap-2'>
            {pathname === "/appointments" && 
            <Button className='btn-sm' variant="secondary" onClick={gotoMyAppointments}>
              Go to my Appointments
            </Button>}
            <Button className='btn-sm' variant="primary" onClick={handleCloseModal}>
              Done
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default SuccessModal
