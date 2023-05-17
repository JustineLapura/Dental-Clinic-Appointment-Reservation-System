import React, { useContext } from "react";
import { Row, Col, Button, Table, Modal, Form, Alert } from "react-bootstrap";
import { useOutletContext } from 'react-router-dom';
import AppointmentContext from "../AppointmentContext";
import ServicesContext from "../ServicesContext";
import SuccessModal from "../components/SuccessModal";
import ShowBookAppointmentModal from "../components/ShowBookAppointmentModal";
import RescheduleModal from "../components/RescheduleModal";

const AccountPage = () => {
  const firstName = localStorage.getItem("firstName").toLowerCase()
  const lastName = localStorage.getItem("lastName").toLowerCase()
  const { services } = useContext(ServicesContext)
  const {
    showModal,
    setShowModal,
    showReschedModal,
    date,
    time,
    service,
    setService,
    appointments,
    setAppointments,
    currentAppointmentId,
    handleCloseModal,
    handleBookAppointment,
    handleCancelAppointment,
    handleReschedule,
    handleEditAppointment,
    errorMessage,
    showSuccessModal,
    handleDeleteAppointment,
    handleDateChange,
    isInvalidDate,
    handleTimeChange,
    isInvalidTime,
    setIsInvalidDate,
    setIsInvalidTime
  } = useContext(AppointmentContext)

  const darkMode = useOutletContext();

  const handleConfirmAppointment = (id) => {
    const updatedAppointments = appointments.map((appointment) => {
      if (appointment.id === id) {
        return { ...appointment, status: 'Confirmed' };
      }
      return appointment;
    });
    setAppointments(updatedAppointments);
  };

  const statusBackground = (obj) => {
    let background
    if (obj.status.toLowerCase() === "confirmed") {
      background = "text-success"
    } else if (obj.status.toLowerCase() === "cancelled") {
      background = "text-danger"
    } else if (obj.status.toLowerCase() === "rescheduled") {
      background = "fw-bold text-primary"
    } else {
      background = "text-secondary"
    }

    return background
  }

  const appointmentBtns = (id, status) => {
    if (status.toLowerCase() === "rescheduled") {
      return (
        <>
          <Button className="m-1" variant="danger" onClick={() => handleCancelAppointment(id)}>Cancel</Button>
          <Button className="m-1" variant="primary" onClick={() => handleReschedule(id)}>Reschedule</Button>
          <Button className="m-1" variant="success" onClick={() => handleConfirmAppointment(id)}>Confirm</Button>
        </>
      )
    } else if (status.toLowerCase() === "pending" || status.toLowerCase() === "confirmed") {
      return (
        <>
          <Button className="m-1" variant="danger" onClick={() => handleCancelAppointment(id)}>Cancel</Button>
          <Button className="m-1" variant="primary" onClick={() => handleReschedule(id)}>Reschedule</Button>
        </>
      )
    } else {
      return <Button className="m-1" variant="secondary" onClick={() => handleDeleteAppointment(id)}>Remove</Button>
    }
  }

  const displayedUserAppointments = appointments.filter(appointment => appointment.name.toLowerCase() === `${firstName} ${lastName}`)
  const appointmentToReschedule = appointments.filter(appointment => appointment.id === currentAppointmentId)

  return (
    <div className={`h-100 p-2 ${darkMode ? "bg-dark text-light" : null}`}>
      <h1 className="py-1">My Appointments</h1>
      <Row>
        <Col className="my-3">
          <Button className="fw-bold" onClick={() => {
            setShowModal(true)
            setIsInvalidDate(false)
            setIsInvalidTime(false)
          }}>New Appointment</Button>
        </Col>
      </Row>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Service</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedUserAppointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{new Date(appointment.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</td>
              <td>{new Date(`2000-01-01T${appointment.time}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</td>
              <td>{appointment.service}</td>
              <td className={`fw-bold ${statusBackground(appointment)}`}>{appointment.status}</td>
              <td>
                {appointmentBtns(appointment.id, appointment.status)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ShowBookAppointmentModal 
        showModal={showModal} 
        handleCloseModal={handleCloseModal}
        handleDateChange={handleDateChange} 
        handleTimeChange={handleTimeChange} 
        isInvalidDate={isInvalidDate}
        isInvalidTime={isInvalidTime}
        date={date}
        time={time}
        service={service}
        services={services}
        errorMessage={errorMessage}
        handleBookAppointment={handleBookAppointment}
        />

      {appointmentToReschedule.map(appointment => {
        return (
          <RescheduleModal 
            showReschedModal={showReschedModal}
            handleCloseModal={handleCloseModal}
            appointment={appointment}
            date={date}
            time={time}
            service={service}
            handleDateChange={handleDateChange}
            handleTimeChange={handleTimeChange}
            isInvalidDate={isInvalidDate}
            isInvalidTime={isInvalidTime}
            services={services}
            errorMessage={errorMessage}
            handleEditAppointment={handleEditAppointment}
            setService={setService}
            currentAppointmentId={currentAppointmentId}
          />
        )
      })}
      {/* Show Booked Success Modal */}
      <SuccessModal showSuccessModal={showSuccessModal} handleCloseModal={handleCloseModal} />
    </div>
  );
};

export default AccountPage;


