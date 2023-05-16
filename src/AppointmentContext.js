import React, {createContext, useState, useEffect} from "react";
import { nanoid } from "nanoid";

export const AppointmentContext = createContext()
const { pathname } = window.location;
export const AppointmentProvider = ({ children }) => {
  const firstName = localStorage.getItem("firstName")
  const lastName = localStorage.getItem("lastName")
  const [showModal, setShowModal] = useState(false)
  const [showReschedModal, setShowReschedModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [service, setService] = useState("");
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
  };

  const handleBookAppointment = (e) => {
    e.preventDefault()
    const newAppointment = { id: nanoid(), name: `${firstName} ${lastName}`, date, time, status: 'Pending' , service };
    if( date !== "" && time !== "" && service !== "" && !isInvalidDate) {
      setAppointments([newAppointment, ...appointments]);
      handleCloseModal();
      setErrorMessage(null)
      setShowSuccessModal(true)
    } else {
      setErrorMessage("Please fill the form!")
    }

  };

  const handleDeleteAppointment = (id) => {
    setAppointments(oldAppointments => oldAppointments.filter(appointment => appointment.id !== id))
}

  const handleCancelAppointment = (id) => {
    const updatedAppointments = appointments.map((appointment) => {
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
  }

  const handleEditAppointment = (id) => {
    if(date && time && service) {
      setAppointments(prevAppointments => prevAppointments.map(prevAppointment => {
        return prevAppointment.id === currentAppointmentId
          ? {...prevAppointment, date, time, service, status: pathname === "/admin" ?  "Rescheduled" : "Pending" }
          : prevAppointment
      }))
      handleCloseModal()
      setErrorMessage(null)
      setCurrentAppointmentId("")
    } else {
      setErrorMessage("Please fill the form!")
    }
  }
  
  const isSunday = (date) => {
    const day = new Date(date).getDay();
    return day === 0; // 0 corresponds to Sunday
  };

  const validateDate = (date) => {
    const currentDate = new Date().toISOString().split('T')[0];
    return date < currentDate || isSunday(date);
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

    return(
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
                handleBookAppointment,
                handleCancelAppointment,
                handleReschedule,
                handleEditAppointment,
                errorMessage,
                showSuccessModal,
                setShowSuccessModal,
                handleDeleteAppointment,
                handleDateChange,
                isInvalidDate
                }
            }>
            {children}
        </AppointmentContext.Provider>
    )
}

export default AppointmentContext