import React, {createContext, useState} from "react"

export const TimeScheduleContext = createContext()

export const TimeScheduleProvider = ({children}) => {
    // Define the initial state of the availability schedule
  const [availability, setAvailability] = useState({
    Monday: '9:00 AM - 5:00 PM',
    Tuesday: '9:00 AM - 5:00 PM',
    Wednesday: '9:00 AM - 5:00 PM',
    Thursday: '9:00 AM - 5:00 PM',
    Friday: '9:00 AM - 5:00 PM',
    Saturday: 'Closed',
    Sunday: 'Closed'
  });

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
        showEditModal,setShowEditModal,
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