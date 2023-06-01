import React, { useContext } from 'react';
import { Container, Row, Col, Form, Button, Table, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Appointment.css";
import { authRequired } from '../authRequired';
import { useOutletContext, useNavigate } from 'react-router-dom';
import ServicesContext from ".././ServicesContext";
import AppointmentContext from '../AppointmentContext';
import TimeScheduleContext from '../TimeScheduleContext';
import UsersContext from '../UsersContext';
import SuccessModal from '../components/SuccessModal';
import "animate.css";
import attention from ".././images/attention.gif";
import { nanoid } from 'nanoid';

export async function loader() {
  return await authRequired()

}

function Appontment() {
  const {selectedUser} = useContext(UsersContext)
  console.log(selectedUser)
  const navigate = useNavigate()
  const darkMode = useOutletContext()
  const { services } = useContext(ServicesContext)
  const {
    date,
    time,
    service,
    errorMessage,
    handleCloseModal,
    showSuccessModal,
    isInvalidDate,
    isInvalidTime,
    handleServiceChange,
    setDate,
    setIsInvalidDate,
    setTime,
    setIsInvalidTime,
    setErrorMessage,
    setShowSuccessModal,
    appointments,
    setAppointments
  } = useContext(AppointmentContext)

  const { schedule } = useContext(TimeScheduleContext)

  const handleBookAppointment = (e) => {
    e.preventDefault();
  
    // Check if the selected date and time already exist in the appointments array
    const isDuplicate = appointments.some((appointment) => appointment.date === date && appointment.time === time);
  
    if (isDuplicate) {
      setErrorMessage("This appointment date and time is already taken. Please choose a different date and time.");
    } else if (date !== "" && time !== "" && service !== "" && !isInvalidDate && !isInvalidTime) {
      const newAppointment = {
        id: nanoid(),
        name: `${selectedUser.firstName} ${selectedUser.lastName}`,
        date,
        time,
        status: "Pending",
        service,
        isCompleted: false,
        phone: `+63${selectedUser.phone}`,
      };
  
      // Update only the new appointment status to "Pending" and keep the existing appointments' statuses intact
      const updatedAppointments = [newAppointment, ...appointments];
  
      setAppointments(updatedAppointments);
      handleCloseModal();
      setErrorMessage(null);
      setShowSuccessModal(true);
    } else {
      setErrorMessage("Please fill the form correctly!");
    }
  };
  
  

  const sunday = schedule.find(sched => sched.day.toLowerCase() === "sunday"); // Find the schedule for Sunday
  const monday = schedule.find(sched => sched.day.toLowerCase() === "monday"); // Find the schedule for Monday
  const tuesday = schedule.find(sched => sched.day.toLowerCase() === "tuesday"); // Find the schedule for Tuesday
  const wednesday = schedule.find(sched => sched.day.toLowerCase() === "wednesday"); // Find the schedule for Wednesday
  const thursday = schedule.find(sched => sched.day.toLowerCase() === "thursday"); // Find the schedule for Thursday
  const friday = schedule.find(sched => sched.day.toLowerCase() === "friday"); // Find the schedule for Friday
  const saturday = schedule.find(sched => sched.day.toLowerCase() === "saturday"); // Find the schedule for Saturday

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
    const currentDate = new Date().toISOString().split('T')[0]; // Get the current date
    const isSundayValid = !sunday || !sunday.startTime || !sunday.endTime; // Check if Sunday schedule is valid
    const isMondayValid = !monday || !monday.startTime || !monday.endTime; // Check if Monday schedule is valid
    const isTuesdayValid = !tuesday || !tuesday.startTime || !tuesday.endTime; // Check if Tuesday schedule is valid
    const isWednesdayValid = !wednesday || !wednesday.startTime || !wednesday.endTime; // Check if Wednesday schedule is valid
    const isThursdayValid = !thursday || !thursday.startTime || !thursday.endTime; // Check if Thursday schedule is valid
    const isFridayValid = !friday || !friday.startTime || !friday.endTime; // Check if Friday schedule is valid
    const isSaturdayValid = !saturday || !saturday.startTime || !saturday.endTime; // Check if Saturday schedule is valid
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
      setIsInvalidTime(false)
      setTime("")
    } else {
      setDate(selectedDate);
      setIsInvalidDate(false)
      setIsInvalidTime(false)
      setTime("")
    }
  };

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    const isValidTime = validateTime(selectedTime, date);

    setTime(selectedTime);
    setIsInvalidTime(!isValidTime);
  };

  const validateTime = (timeString, date) => {
    const selectedTime = new Date(`2000-01-01T${timeString}`);
    const day = new Date(date).getDay();

    let scheduleForDay;
    switch (day) {
      case 0:
        scheduleForDay = sunday;
        break;
      case 1:
        scheduleForDay = monday;
        break;
      case 2:
        scheduleForDay = tuesday;
        break;
      case 3:
        scheduleForDay = wednesday;
        break;
      case 4:
        scheduleForDay = thursday;
        break;
      case 5:
        scheduleForDay = friday;
        break;
      case 6:
        scheduleForDay = saturday;
        break;
      default:
        return false;
    }

    if (!scheduleForDay || !scheduleForDay.startTime || !scheduleForDay.endTime) {
      // No schedule available for the selected day
      return false;
    }

    const startTime = new Date(`2000-01-01T${scheduleForDay.startTime}`);
    const endTime = new Date(`2000-01-01T${scheduleForDay.endTime}`);

    return selectedTime >= startTime && selectedTime <= endTime;
  };



  const gotoMyAppointments = () => {
    navigate('/appointments/account')
    handleCloseModal()
  }



  return (
    <main className={`pb-5 ${darkMode ? "bg-dark text-light" : null}`}>
      <section className="appointment-section">
        <Container fluid>
          <Row className='d-flex justify-content-evenly align-items-center'>
            <Col xs={12} md={4} lg={3} className='mt-5'>
              <Table bordered className='bg-light fs-5 border-black border-2'>
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
            <Col xs={12} md={4} lg={6} className='text-center'>
              {selectedUser && <h5 className='my-3 animate_animated animate__fadeIn'>Hi, {selectedUser.firstName} !..</h5>}
              <h3 className='my-3 text-primary animate__animated animate__pulse animate__delay-2s animate__infinite animate__slow'>Book your appointment now.</h3>
              <Form className='mx-auto border rounded bg-light'>
                <Form.Group className='position-relative w-50 mx-auto px-3' controlId="date">
                  <img className='position-absolute end-0' width="55px" src={attention} alt="Click me GIF" />
                  <Form.Label className='fw-bold my-1 '>Choose a preferred date:</Form.Label>
                  <Form.Control className="form-control-lg text-center mb-1" type="date" value={date} onChange={handleDateChange} />
                  {isInvalidDate &&
                    <Alert variant="danger">
                      Please select a date within the available schedule.
                    </Alert>}
                </Form.Group>
                {date && !isInvalidDate &&
                  <Form.Group className='position-relative position-relative w-50 mx-auto px-3' controlId="time">
                    <img className='position-absolute end-0' width="55px" src={attention} alt="Click me GIF" />
                    <Form.Label className='fw-bold my-1 '>Choose a preferred time:</Form.Label>
                    <Form.Control className="form-control-lg text-center mb-1" type="time" value={time} onChange={handleTimeChange} />
                    {isInvalidTime && (
                      <Alert variant="danger">
                        Please select a time within the available schedule.
                      </Alert>
                    )}
                  </Form.Group>}
                <Form.Group className='px-5' controlId="service">
                  <Form.Label className='fw-bold my-1 '>Choose your preferred service:</Form.Label>
                  <Form.Control className="form-control-lg text-center w-50 mx-auto" as="select" value={service} onChange={handleServiceChange}>
                    <option value="">Select a service</option>
                    {services.map(service => {
                      return <option key={service.id} value={service.name}>{service.name}</option>
                    })}
                  </Form.Control>
                </Form.Group>
                {errorMessage && <h6 className="mx-auto mt-2 text-danger">{errorMessage}</h6>}
                <div xs={12} className='py-3'>
                  <Button className='btn-sm fw-bold' variant="danger" type="submit" onClick={handleBookAppointment}>Submit Appointment</Button>
                </div>
              </Form>
            </Col>
            <Col xs={12} md={4} lg={3} className='justify-content-center'>
              <div style={{ height: '500px', overflow: 'scroll' }} className='mt-4'>
                <Table bordered className='bg-light'>
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
