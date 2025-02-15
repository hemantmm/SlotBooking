import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ProfileDropdown from "./ProfileDropdown";

const generateTimeSlots = (blockedStart, blockedEnd, bookedSlots) => {
  const slots = [];
  let time = new Date("2025-02-14T00:00");
  const endTime = new Date("2025-02-14T23:30");

  while (time <= endTime) {
    const timeStr = time.toTimeString().slice(0, 5);
    if (
      !(blockedStart <= timeStr && timeStr < blockedEnd) &&
      !bookedSlots.includes(timeStr)
    ) {
      slots.push(timeStr);
    }
    time.setMinutes(time.getMinutes() + 60);
  }
  return slots;
};

const CalendarView = () => {
  const navigate = useNavigate();
  const [slots, setSlots] = useState({});
  const [availability, setAvailability] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isUnavailable, setIsUnavailable] = useState(false);
  const [bookedSlots, setBookedSlots] = useState({});

  useEffect(() => {
    const fetchData = () => {
      const savedAvailability =
        JSON.parse(localStorage.getItem("availability")) || {};
      const savedBookedSlots =
        JSON.parse(localStorage.getItem("bookedSlots")) || {};

      setAvailability(savedAvailability);
      setBookedSlots(savedBookedSlots);

      const updatedSlots = {};
      Object.keys(savedAvailability).forEach((day) => {
        if (savedAvailability[day].enabled) {
          updatedSlots[day] = generateTimeSlots(
            savedAvailability[day].start,
            savedAvailability[day].end,
            savedBookedSlots[day] || []
          );
        } else {
          updatedSlots[day] = [];
        }
      });

      setSlots(updatedSlots);
    };

    fetchData();
    const handleStorageChange = () => fetchData();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);

  useEffect(() => {
    if (selectedDate) {
      handleDateClick(selectedDate);
    }
  }, [bookedSlots]);

  const handleDateClick = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return;

    setSelectedDate(date);
    const dateKey = date.toISOString().split("T")[0];
    const dayOfWeek = date
      .toLocaleDateString("en-US", { weekday: "short" })
      .toUpperCase();

    if (!availability[dayOfWeek] || !availability[dayOfWeek].enabled) {
      setIsUnavailable(true);
      setAvailableSlots([]);
    } else {
      setIsUnavailable(false);
      const alreadyBooked = bookedSlots[dateKey] || [];
      let filteredSlots =
        slots[dayOfWeek]?.filter((slot) => !alreadyBooked.includes(slot)) || [];

      if (dateKey == today.toISOString().split("T")[0]) {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        const currentMinutes = currentTime.getMinutes();
        filteredSlots = filteredSlots.filter((slot) => {
          const [slotHour, slotMinute] = slot.split(":").map(Number);
          return (
            slotHour > currentHour ||
            (slotHour == currentHour && slotMinute > currentMinutes)
          );
        });
      }
      setAvailableSlots(filteredSlots);
    }
  };

  return (
    <div className="bg-purple-500">
      <div className="flex items-center justify-center pb-3 pt-3">
        <div className="bg-white rounded-lg p-6 w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl">
          
           <div className='flex items-center justify-between'>
                {/* <h2 className='text-2xl font-bold text-center mb-4 text-white'>Manage Weekly Unavailability</h2> */}
                <h2 className="text-2xl font-bold text-center text-purple-500 mb-4">
            Select a Date
          </h2>
                <ProfileDropdown />
            </div>
          <div className="flex justify-center">
            <Calendar
              onClickDay={handleDateClick}
              tileDisabled={({ date }) =>
                date < new Date().setHours(0, 0, 0, 0)
              }
              className="w-full"
            />
          </div>
        </div>
      </div>

      {selectedDate && (
        <div className="border rounded-lg p-6 bg-white mx-auto max-w-lg">
          <h3 className="text-xl font-semibold mb-4 text-center text-purple-600">
            Availability for {selectedDate.toDateString()}
          </h3>
          {isUnavailable ? (
            <p className="text-red-600 text-xl text-center font-medium">
              Unavailable
            </p>
          ) : availableSlots.length > 0 ? (
            <div className="flex flex-wrap justify-between">
              {availableSlots.map((slot, index) => (
                <button
                  key={index}
                  className="border-4 w-32 p-2 m-1 text-sm font-medium rounded-lg border-purple-500 hover:bg-purple-500 hover:text-white"
                >
                  {slot}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-center text-purple-500">
              No available slots for this date.
            </p>
          )}
        </div>
      )}

      <button
        className="w-full text-purple-400 flex items-center justify-center font-2xl font-bold mt-6 py-3 bg-white rounded-lg shadow-md"
        onClick={() => navigate("/slot")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-5"
        >
          <path
            fillRule="evenodd"
            d="M12.5 9.75A2.75 2.75 0 0 0 9.75 7H4.56l2.22 2.22a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 1.06L4.56 5.5h5.19a4.25 4.25 0 0 1 0 8.5h-1a.75.75 0 0 1 0-1.5h1a2.75 2.75 0 0 0 2.75-2.75Z"
            clipRule="evenodd"
          />
        </svg>
        Back to Slot Manager
      </button>
    </div>
  );
};

export default CalendarView;
