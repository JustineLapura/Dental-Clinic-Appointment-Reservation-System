import React, { createContext, useState, useEffect } from "react";
import { nanoid } from "nanoid";

export const AppointmentContext = createContext()
const { pathname } = window.location;
export const AppointmentProvider = ({ children }) => {
  const firstName = localStorage.getItem("firstName")
  const recipientPhone = `+63${localStorage.getItem("phone")}`
  const [showModal, setShowModal] = useState(false)
  const [showReschedModal, setShowReschedModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [service, setService] = useState('');
  const [appointments, setAppointments] = useState(() => {
    const storedAppointments = localStorage.getItem('appointments');
    return storedAppointments ? JSON.parse(storedAppointments) : [
      { id: nanoid(), name: 'John Smith', date: 'April 28, 2023', time: '10:30 AM', service: 'Check-up', status: 'Confirmed' },
      { id: nanoid(), name: 'Jane Dove', date: 'May 2, 2023', time: '2:00 PM', service: 'Cleaning', status: 'Pending' },
      { id: nanoid(), name: 'Pedro Penduco', date: 'May 8, 2023', time: '9:30 AM', service: 'Filling', status: 'Cancelled' },
    ];
  });
  const [currentAppointmentId, setCurrentAppointmentId] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const [isInvalidDate, setIsInvalidDate] = useState(false)
  const [isInvalidTime, setIsInvalidTime] = useState(false);

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  const handleCloseModal = () => {
    setShowModal(false);
    setShowReschedModal(false)
    setDate("");
    setTime("");
    setService("");
    setErrorMessage(null)
    setShowSuccessModal(false)
    setCurrentAppointmentId("")
    setIsInvalidDate(false)
    setIsInvalidTime(false)
  };

  const handleDeleteAppointment = (id) => {
    setAppointments(oldAppointments => oldAppointments.filter(appointment => appointment.id !== id))
  }

  const handleCancelAppointment = (id) => {
    const updatedAppointments = appointments.map((appointment) => {
      if (pathname === "/admin") {
        // Call the Send Message API to send an SMS confirmation to the recipient's phone number
        const apiKey = '5d0c777c56b50a96a270e2ed009a65aa66327cc5';
        const message = `Hi ${firstName}, Your appointment has been cancelled.`;
        const device = 428; // ID of the device used for sending
        const sim = 1; // Sim slot number for sending message
        const priority = 1; // Send the message as priority
        const url = `https://sms.teamssprogram.com/api/send?key=${apiKey}&phone=${recipientPhone}&message=${message}&device=${device}&sim=${sim}&priority=${priority}`;

        fetch(url)
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error(error));
      }

      if (appointment.id === id) {
        return { ...appointment, status: 'Cancelled' };
      }
      return appointment;
    });
    setAppointments(updatedAppointments);
  };

  const handleReschedule = (id) => {
    setShowReschedModal(true)
    setCurrentAppointmentId(id)
    setErrorMessage(null)
    setIsInvalidDate(false)
    setIsInvalidTime(false)
    setDate("");
    setTime("");
    setService("");
  }

  const handleEditAppointment = (id, name) => {
    // Check if the appointment is valid and all necessary fields are filled
    if (date && time && (!service || pathname !== "/admin") && !isInvalidDate && !isInvalidTime) {
      // Check for duplicate appointments
      const isDuplicate = appointments.some(appointment => appointment.id !== currentAppointmentId && appointment.date === date && appointment.time === time);
      if (isDuplicate) {
        setErrorMessage("Another appointment already exists at the selected date and time. Please choose a different date or time.");
        return; // Stop execution if there is a duplicate appointment
      }

      setAppointments(prevAppointments => prevAppointments.map(prevAppointment => {
        return prevAppointment.id === currentAppointmentId
          ? {
            ...prevAppointment,
            date,
            time,
            ...(pathname !== "/admin" && { service }),
            status: pathname === "/admin" ? "Rescheduled" : "Pending"
          }
          : prevAppointment
      }))
      handleCloseModal()
      setErrorMessage(null)
      setCurrentAppointmentId("")
    } else {
      setErrorMessage("Please fill the form correctly!")
    }

    if (pathname === "/admin") {
      // Call the Send Message API to send an SMS confirmation to the recipient's phone number
      const apiKey = 'a00ee88e9f2f8cb84f4f00a626659600ae8bfead';
      const message = `Hi ${firstName}, Your appointment has been rescheduled to ${new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}, ${new Date(`2000-01-01T${time}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}.`;
      const device = 446; // ID of the device used for sending
      const sim = 1; // Sim slot number for sending message
      const priority = 1; // Send the message as priority
      const url = `https://sms.teamssprogram.com/api/send?key=${apiKey}&phone=${recipientPhone}&message=${message}&device=${device}&sim=${sim}&priority=${priority}`;

      fetch(url)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
    }
  }

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    const isValidTime = validateTime(selectedTime);

    setTime(selectedTime);
    setIsInvalidTime(!isValidTime);
  };

  const validateTime = (timeString) => {
    const selectedTime = new Date(`2000-01-01T${timeString}`);
    const startTime = new Date(`2000-01-01T08:00`);
    const endTime = new Date(`2000-01-01T17:00`);

    return selectedTime >= startTime && selectedTime <= endTime;
  };

  const handleServiceChange = (e) => {
    const selectedService = e.target.value;
    setService(selectedService);
  }

  return (
    <AppointmentContext.Provider value={
      {
        showModal,
        setShowModal,
        showReschedModal,
        setShowReschedModal,
        date,
        setDate,
        time,
        setTime,
        service,
        setService,
        appointments,
        setAppointments,
        currentAppointmentId,
        setCurrentAppointmentId,
        handleCloseModal,
        handleCancelAppointment,
        handleReschedule,
        handleEditAppointment,
        errorMessage,
        showSuccessModal,
        setShowSuccessModal,
        handleDeleteAppointment,
        isInvalidDate,
        handleTimeChange,
        isInvalidTime,
        setIsInvalidDate,
        setIsInvalidTime,
        handleServiceChange,
        setErrorMessage
      }
    }>
      {children}
    </AppointmentContext.Provider>
  )
}

export default AppointmentContext