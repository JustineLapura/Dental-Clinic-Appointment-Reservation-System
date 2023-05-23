import React, { useState, useContext } from 'react';
import { Table, Button, Form, Row, Col, Modal, Alert } from 'react-bootstrap';
import AppointmentContext from ".././AppointmentContext"
import TimeScheduleContext from ".././TimeScheduleContext"
import RescheduleModal from '../components/RescheduleModal';

const AdminDashboard = () => {
  const {
    appointments,
    setAppointments,
    currentAppointmentId,
    setCurrentAppointmentId,
    showReschedModal,
    setShowReschedModal,
    handleCloseModal,
    date,
    time,
    errorMessage,
    handleEditAppointment,
    isInvalidDate,
    isInvalidTime,
    setDate,
    setIsInvalidDate,
    setTime,
    setIsInvalidTime
  } = useContext(AppointmentContext)
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
  const [name, setName] = useState('');
  const [status, setStatus] = useState('All');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const appointmentToReschedule = appointments.filter(appointment => appointment.id === currentAppointmentId)

  const {schedule} = useContext(TimeScheduleContext)

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

  const handleViewAppointment = (id) => {
    const appointment = appointments.find((appointment) => appointment.id === id);
    setSelectedAppointment(appointment);
    setShowModal(true);
    setCurrentAppointmentId(id)
  };


  const handleFilter = () => {
    let filtered = appointments;
    // Filter by date range
    if (dateRange.startDate && dateRange.endDate) {
      filtered = filtered.filter(
        (appointment) =>
          appointment.date >= dateRange.startDate && appointment.date <= dateRange.endDate
      );
    }
    // Filter by patient name
    if (name) {
      filtered = filtered.filter((appointment) =>
        appointment.name.toLowerCase().includes(name.toLowerCase())
      );
    }
    // Filter by status
    if (status !== 'All') {
      filtered = filtered.filter((appointment) => appointment.status === status);
    }
    setFilteredAppointments(filtered);
  };

  const handleAdminReschedule = () => {
    handleModalClose()
    setShowReschedModal(true)
  }

  const handleConfirmAppointment = (id, date, time) => {
    const recipientPhone = localStorage.getItem("phone")
    const firstName = localStorage.getItem("firstName") 
    const updatedAppointments = appointments.map((appointment) => {
      if (appointment.id === id) {
        return { ...appointment, status: 'Confirmed' };
      }
      return appointment;
    });
    setAppointments(updatedAppointments);
    handleModalClose();
  
    // Call the Send Message API to send an SMS confirmation to the recipient's phone number
    const apiKey = '50d3d2389fbdfdf4f9c89ca15f5c75a149ea9c6a';
    const message = `Hi ${firstName}, Your appointment on ${new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}, ${new Date(`2000-01-01T${selectedAppointment.time}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} has been confirmed.`;
    const device = 421; // ID of the device used for sending
    const sim = 1; // Sim slot number for sending message
    const priority = 1; // Send the message as priority
    const url = `https://sms.teamssprogram.com/api/send?key=${apiKey}&phone=${recipientPhone}&message=${message}&device=${device}&sim=${sim}&priority=${priority}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };
  

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedAppointment(null);
  };

  const statusBackground = (appointment) => {
    let background
    if (appointment.status.toLowerCase() === "confirmed") {
      background = "fw-bold text-success"
    } else if (appointment.status.toLowerCase() === "cancelled") {
      background = "fw-bold text-danger"
    } else if (appointment.status.toLowerCase() === "rescheduled") {
      background = "fw-bold text-primary"
    } else {
      background = "fw-bold text-secondary"
    }

    return background
  }

 const appointmentModalBtns = (selected) => {
    let btnElements
    if (selected && selected.status.toLowerCase() === "pending") {
      btnElements =
        <>
          <Button className="btn-sm" variant="primary" onClick={handleAdminReschedule}>
            Reschedule
          </Button>
          <Button className="btn-sm" variant="success" onClick={() => handleConfirmAppointment(selected.id, selected.date, selected.time)}>
            Confirm
          </Button>
        </>
    } else if (selected && (selected.status.toLowerCase() === "confirmed" || selected.status.toLowerCase() === "rescheduled")) {
      btnElements =
        <>
          <Button className="btn-sm" variant="primary" onClick={handleAdminReschedule}>
            Reschedule
          </Button>
          <Button className="btn-sm" variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </>
    } else {
      btnElements =
        <Button variant="secondary" onClick={handleModalClose}>
          Close
        </Button>
    }

    return btnElements
  }

  return (
    <>
      <Row className='d-flex align-items-center py-3 px-2 g-3'>
        <Col md={3}>
          <div className="filters">
            <h5>Filters:</h5>
            <Form.Group controlId="formBasicDate">
              <Form.Label>Date Range:</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="date"
                  placeholder="Enter end date"
                  value={dateRange.endDate}
                  onChange={(e) =>
                    setDateRange((prev) => ({ ...prev, endDate: e.target.value }))
                  }
                />
              </div>
            </Form.Group>
            <Form.Group controlId="formBasicPatient">
              <Form.Label>Patient:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter patient name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicStatus">
              <Form.Label>Status:</Form.Label>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Pending">Pending</option>
              </Form.Select>
            </Form.Group>
            <Button className='my-2' variant="primary" onClick={handleFilter}>
              Filter
            </Button>
          </div>
        </Col>
        <Col md={9} style={{ height: "450px", overflow: "scroll" }}>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Patient Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {(filteredAppointments.length > 0 ? filteredAppointments : appointments).map(
                (appointment, index) => (
                  <tr key={appointment.id}>
                    <td>{index + 1}</td>
                    <td>{appointment.name}</td>
                    <td>{new Date(appointment.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</td>
                    <td>{new Date(`2000-01-01T${appointment.time}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</td>
                    <td className={statusBackground(appointment)}>{appointment.status}</td>
                    <td>
                      {appointment.isCompleted ? <h6 className='text-primary'>Completed</h6> :
                       <Button className='btn-sm' variant="info" onClick={() => handleViewAppointment(appointment.id)}>
                        View
                      </Button>}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Appointment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <div>
              <p><strong>Patient Name:</strong> {selectedAppointment.name}</p>
              <p><strong>Date:</strong> {new Date(selectedAppointment.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              <p><strong>Time:</strong> {new Date(`2000-01-01T${selectedAppointment.time}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</p>
              <p><strong>Status:</strong> {selectedAppointment.status}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {appointmentModalBtns(selectedAppointment)}
        </Modal.Footer>
      </Modal>

      {/* open Reschedule modal */}
      {appointmentToReschedule.map(appointment => {
        return (
          <RescheduleModal
            showReschedModal={showReschedModal}
            handleCloseModal={handleCloseModal}
            appointment={appointment}
            date={date}
            time={time}
            handleDateChange={handleDateChange}
            handleTimeChange={handleTimeChange}
            isInvalidDate={isInvalidDate}
            isInvalidTime={isInvalidTime}
            errorMessage={errorMessage}
            handleEditAppointment={handleEditAppointment}
            currentAppointmentId={currentAppointmentId}
          />
        )
      })}
    </>
  );
};

export default AdminDashboard;
