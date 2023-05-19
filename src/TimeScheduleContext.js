import React, { createContext, useState, useEffect } from 'react';

export const TimeScheduleContext = createContext();

export const TimeScheduleProvider = ({ children }) => {
  const [schedule, setSchedule] = useState(() => {
    // Get schedule from localStorage or use default values
    const storedSchedule = localStorage.getItem('schedule');
    return storedSchedule ? JSON.parse(storedSchedule) : [];
  });

  // Save schedule to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('schedule', JSON.stringify(schedule));
  }, [schedule]);

  // Function to handle schedule updates
  const handleScheduleUpdate = (day, startTime, endTime) => {
    const updatedSchedule = [...schedule];
    const dayIndex = updatedSchedule.findIndex(item => item.day === day);

    if (dayIndex !== -1) {
      updatedSchedule[dayIndex] = { day, startTime, endTime };
    } else {
      updatedSchedule.push({ day, startTime, endTime });
    }

    setSchedule(updatedSchedule);
  };

  // Function to handle setting a specific day as closed
  const handleDayClosed = (day) => {
    const updatedSchedule = schedule.filter(item => item.day !== day);
    setSchedule(updatedSchedule);
  };

  return (
    <TimeScheduleContext.Provider
      value={{
        schedule,
        setSchedule,
        handleScheduleUpdate,
        handleDayClosed
      }}
    >
      {children}
    </TimeScheduleContext.Provider>
  );
};

export default TimeScheduleContext;
