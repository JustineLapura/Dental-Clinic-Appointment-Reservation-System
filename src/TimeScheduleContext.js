import React, { createContext, useState, useEffect } from 'react';

export const TimeScheduleContext = createContext();

export const TimeScheduleProvider = ({ children }) => {
  const [schedule, setSchedule] = useState(() => {
    let storedSchedule = null;

    if (typeof window !== "undefined") {
      storedSchedule = localStorage.getItem("schedule");
    }

    return storedSchedule
      ? JSON.parse(storedSchedule)
      : [
          { day: "Monday", startTime: "09:00", endTime: "17:00" },
          { day: "Tuesday", startTime: "09:00", endTime: "17:00" },
          { day: "Wednesday", startTime: "09:00", endTime: "17:00" },
          { day: "Thursday", startTime: "09:00", endTime: "17:00" },
          { day: "Friday", startTime: "09:00", endTime: "17:00" },
          { day: "Saturday", startTime: "09:00", endTime: "22:00" }
        ];
  });


  // Save schedule to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("schedule", JSON.stringify(schedule));
    }
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
