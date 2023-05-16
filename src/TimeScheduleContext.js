import React, { createContext, useState, useEffect } from "react"

export const TimeScheduleContext = createContext()

export const TimeScheduleProvider = ({ children }) => {
  // Define the initial state of the availability schedule
  const [availability, setAvailability] = useState(() => {
    // Get services from localStorage or use default values
    const storedSchedule = localStorage.getItem('availability');
    return storedSchedule ? JSON.parse(storedSchedule) :
      {}
  });

  useEffect(() => {
    localStorage.setItem("availability", JSON.stringify(availability));
  }, [availability]);

  // Define the state variables for the edit modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [dayToEdit, setDayToEdit] = useState('');
  const [newSchedule, setNewSchedule] = useState('');

  // Function to handle opening the edit modal
  const handleEditModalOpen = (day) => {
    setDayToEdit(day);
    setNewSchedule(availability[day]);
    setShowEditModal(true);
  };

  // Function to handle updating the availability schedule
  const handleUpdateSchedule = () => {
    setAvailability({
      ...availability,
      [dayToEdit]: newSchedule
    });
    setShowEditModal(false);
  };

  

  return (
    <TimeScheduleContext.Provider value={{
      availability,
      setAvailability,
      showEditModal, setShowEditModal,
      dayToEdit,
      setDayToEdit,
      newSchedule,
      setNewSchedule,
      handleEditModalOpen,
      handleUpdateSchedule
    }}>
      {children}
    </TimeScheduleContext.Provider>
  )
}

export default TimeScheduleContext