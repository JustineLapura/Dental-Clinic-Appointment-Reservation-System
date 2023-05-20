import React, { useContext } from 'react';
import { Container, Row, Col, Form, Button, Table, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Appointment.css";
import { authRequired } from '../authRequired';
import { useOutletContext, useNavigate } from 'react-router-dom';
import ServicesContext from ".././ServicesContext";
import AppointmentContext from '../AppointmentContext';
import TimeScheduleContext from '../TimeScheduleContext';
import SuccessModal from '../components/SuccessModal';
import "animate.css";
import clickMe from ".././images/giphy.gif"

export async function loader() {
  return await authRequired()

}

function Appontment() {
  const firstName = localStorage.getItem("firstName")
  const navigate = useNavigate()
  const darkMode = useOutletContext()
  const { schedule } = useContext(TimeScheduleContext)
  const { services } = useContext(ServicesContext)
  const {
    date,
    time,
    service,
    handleBookAppointment,
    errorMessage,
    handleCloseModal,
    showSuccessModal,
    isInvalidDate,
    handleTimeChange,
    isInvalidTime,
    handleServiceChange,
    setIsInvalidDate,
    setDate
  } = useContext(AppointmentContext)

  
  const sunday = schedule.find(sched => sched.day.toLowerCase() === "sunday");
  const monday = schedule.find(sched => sched.day.toLowerCase() === "monday");
  const tuesday = schedule.find(sched => sched.day.toLowerCase() === "tuesday");
  const wednesday = schedule.find(sched => sched.day.toLowerCase() === "wednesday");
  const thursday = schedule.find(sched => sched.day.toLowerCase() === "thursday");
  const friday = schedule.find(sched => sched.day.toLowerCase() === "friday");
  const saturday = schedule.find(sched => sched.day.toLowerCase() === "saturday");

const isSunday = (date) => {
  const day = new Date(date).getDay();
  return day === 0; // 0 corresponds to Sunday
};

const isMonday = (date) => {
  const day = new Date(date).getDay();
  return day === 1; // 1 corresponds to Monday
};

const isTuesday = (date) => {
  const day = new Date(date).getDay();
  return day === 2; // 2 corresponds to Tuesday
};

const isWednesday = (date) => {
  const day = new Date(date).getDay();
  return day === 3; // 3 corresponds to Wednesday
};

const isThursday = (date) => {
  const day = new Date(date).getDay();
  return day === 4; // 4 corresponds to Thursday
};

const isFriday = (date) => {
  const day = new Date(date).getDay();
  return day === 5; // 5 corresponds to Friday
};

const isSaturday = (date) => {
  const day = new Date(date).getDay();
  return day === 6; // 6 corresponds to Saturday
};

const validateDate = (date) => {
  const currentDate = new Date().toISOString().split('T')[0];
  const isSundayValid = !sunday || !sunday.startTime || !sunday.endTime;
  const isMondayValid = !monday || !monday.startTime || !monday.endTime;
  const isTuesdayValid = !tuesday || !tuesday.startTime || !tuesday.endTime;
  const isWednesdayValid = !wednesday || !wednesday.startTime || !wednesday.endTime;
  const isThursdayValid = !thursday || !thursday.startTime || !thursday.endTime;
  const isFridayValid = !friday || !friday.startTime || !friday.endTime;
  const isSaturdayValid = !saturday || !saturday.startTime || !saturday.endTime;
  return date < currentDate 
    || (isSunday(date) && isSundayValid) 
    || (isMonday(date) && isMondayValid) 
    || (isTuesday(date) && isTuesdayValid)
    || (isWednesday(date) && isWednesdayValid)
    || (isThursday(date) && isThursdayValid)
    || (isFriday(date) && isFridayValid)
    || (isSaturday(date) && isSaturdayValid)
    ;
};
  
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    if (validateDate(selectedDate)) {
      // Handle invalid date
      setIsInvalidDate(true)
    } else {
      setDate(selectedDate);
      setIsInvalidDate(false)
    }
  };

  const gotoMyAppointments = () => {
    navigate('/appointments/account')
    handleCloseModal()
  }



  return (
    <main className={`pb-5 ${darkMode ? "bg-dark text-light" : null}`}>
      <section className="appointment-section">
        <Container fluid>
          <Row className='d-flex justify-content-between align-items-center'>
            <Col xs={12} md={4} lg={3} className='mt-5 pe-5'>
              <Table bordered>
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => {
                    const daySchedule = schedule.find(item => item.day === day);
                    const startTime = daySchedule ? daySchedule.startTime : '';
                    const endTime = daySchedule ? daySchedule.endTime : '';

                    if (startTime && endTime) {
                      return (
                        <tr key={day}>
                          <td>{day}</td>
                          <td>{new Date(`2000-01-01T${startTime}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} - {new Date(`2000-01-01T${endTime}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</td>
                        </tr>
                      );
                    }
                    return (
                      <tr key={day}>
                        <td>{day}</td>
                        <td>Closed</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
            <Col xs={12} md={4} lg={6} className='text-center px-5'>
              <h5 className='my-3 animate_animated animate__fadeIn'>Hi, {firstName}!..</h5>
              <h3 className='my-3 text-primary animate__animated animate__pulse animate__delay-2s animate__infinite animate__slow'>Book your appointment now.</h3>
              <Form>
                <Form.Group className='position-relative pe-4' controlId="date">
                  <img className='position-absolute end-0' width="50px" src={clickMe} alt="Click me GIF" />
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" value={date} onChange={handleDateChange} />
                  {isInvalidDate &&
                    <Alert variant="danger">
                      Please select a date within the available schedule.
                    </Alert>}
                </Form.Group>
                <Form.Group className='position-relative pe-4' controlId="time">
                  <img className='position-absolute end-0' width="50px" src={clickMe} alt="Click me GIF" />
                  <Form.Label>Time</Form.Label>
                  <Form.Control type="time" value={time} onChange={handleTimeChange} />
                  {isInvalidTime && (
                    <Alert variant="danger">
                      Please select a time between 9:00 AM and 5:00 PM.
                    </Alert>
                  )}
                </Form.Group>
                <Form.Group className='pe-4' controlId="service">
                  <Form.Label>Service</Form.Label>
                  <Form.Control as="select" value={service} onChange={handleServiceChange}>
                    <option value="">Select a service</option>
                    {services.map(service => {
                      return <option key={service.id} value={service.name}>{service.name}</option>
                    })}
                  </Form.Control>
                </Form.Group>
                {errorMessage && <h6 className="text-danger mx-auto mt-2">{errorMessage}</h6>}
                <div xs={12} className='py-3'>
                  <Button className='btn-sm fw-bold' variant="primary" type="submit" onClick={handleBookAppointment}>Submit Appointment</Button>
                </div>
              </Form>
            </Col>
            <Col xs={12} md={4} lg={3} className='justify-content-end ps-5'>
              <div style={{ height: '500px', overflow: 'scroll' }} className='mt-4'>
                <Table bordered>
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((service) => (
                      <tr key={service.id}>
                        <td>{service.name}</td>
                        <td>P{service.price.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Container>

      </section>
      <SuccessModal showSuccessModal={showSuccessModal} handleCloseModal={handleCloseModal} gotoMyAppointments={gotoMyAppointments} />
    </main>

  );
}

export default Appontment;
