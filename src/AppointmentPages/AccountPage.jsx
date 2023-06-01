import React, { useContext } from "react";
import { Row, Col, Button, Table } from "react-bootstrap";
import { useOutletContext } from 'react-router-dom';
import AppointmentContext from "../AppointmentContext";
import ServicesContext from "../ServicesContext";
import SuccessModal from "../components/SuccessModal";
import ShowBookAppointmentModal from "../components/ShowBookAppointmentModal";
import RescheduleModal from "../components/RescheduleModal";
import TimeScheduleContext from "../TimeScheduleContext"
import UsersContext from "../UsersContext";
import { nanoid } from "nanoid";


const AccountPage = () => {
  const { selectedUser } = useContext(UsersContext)
  console.log(selectedUser)
  const { services } = useContext(ServicesContext)
  const {
    showModal,
    setShowModal,
    showReschedModal,
    date,
    setDate,
    time,
    setTime,
    service,
    setService,
    appointments,
    setAppointments,
    currentAppointmentId,
    handleCloseModal,
    handleCancelAppointment,
    handleReschedule,
    handleEditAppointment,
    errorMessage,
    showSuccessModal,
    handleDeleteAppointment,
    isInvalidDate,
    isInvalidTime,
    setIsInvalidDate,
    setIsInvalidTime,
    handleServiceChange,
    setErrorMessage,
    setShowSuccessModal
  } = useContext(AppointmentContext)

  const darkMode = useOutletContext();

  const openModal = () => {
    setShowModal(true)
    setIsInvalidDate(false)
    setIsInvalidTime(false)
    setDate("")
    setTime("")
    setService("")
    setErrorMessage("")
  }

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

  const appointmentBtns = (id, status, isCompleted) => {
    if (isCompleted) {
      return <h6 className="text-primary">Completed</h6>
    } else if (status.toLowerCase() === "rescheduled") {
      return (
        <>
          <Button className="btn btn-sm m-1" variant="danger" onClick={() => handleCancelAppointment(id)}>Cancel</Button>
          <Button className="btn btn-sm m-1" variant="primary" onClick={() => handleReschedule(id)}>Reschedule</Button>
          <Button className="btn btn-sm m-1" variant="success" onClick={() => handleConfirmAppointment(id)}>Confirm</Button>
        </>
      )
    } else if (status.toLowerCase() === "pending" || status.toLowerCase() === "confirmed") {
      return (
        <>
          <Button className="btn btn-sm m-1" variant="danger" onClick={() => handleCancelAppointment(id)}>Cancel</Button>
          <Button className="btn btn-sm m-1" variant="primary" onClick={() => handleReschedule(id)}>Reschedule</Button>
        </>
      )
    } else {
      return <Button className="btn btn-sm m-1" variant="secondary" onClick={() => handleDeleteAppointment(id)}>Remove</Button>
    }
  }
  
  const displayedUserAppointments = appointments.filter(appointment => appointment.userId === selectedUser.id || appointment.name.toLowerCase() === `${selectedUser.firstName.toLowerCase()} ${selectedUser.lastName.toLowerCase()}`)
  const appointmentToReschedule = appointments.filter(appointment => appointment.id === currentAppointmentId)

  return (
    <div className={`h-100 p-2 ${darkMode ? "bg-dark text-light" : null}`}>
      <h3>My Appointments</h3>
      <Row>
        <Col className="my-2">
          <Button className="btn-sm fw-bold" onClick={openModal}>New Appointment</Button>
        </Col>
      </Row>
      <div style={{ height: "360px", overflow: "scroll" }}>
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
                  {appointmentBtns(appointment.id, appointment.status, appointment.isCompleted)}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <ShowBookAppointmentModal
        setDate={setDate}
        setTime={setTime}
        setService={setService}
        setIsInvalidDate={setIsInvalidDate}
        setIsInvalidTime={setIsInvalidTime}
        setShowModal={setShowModal}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleDateChange={handleDateChange}
        handleTimeChange={handleTimeChange}
        handleServiceChange={handleServiceChange}
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