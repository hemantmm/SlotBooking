// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import ProfileDropdown from "./ProfileDropdown";

// const generateTimeSlots = (blockedStart, blockedEnd, bookedSlots) => {
//   const slots = [];
//   let time = new Date("2025-02-14T00:00");
//   const endTime = new Date("2025-02-14T23:30");

//   while (time <= endTime) {
//     const timeStr = time.toTimeString().slice(0, 5);
//     if (
//       !(blockedStart <= timeStr && timeStr < blockedEnd) &&
//       !bookedSlots.includes(timeStr)
//     ) {
//       slots.push(timeStr);
//     }
//     time.setMinutes(time.getMinutes() + 60);
//   }
//   return slots;
// };

// const CalendarView = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [slots, setSlots] = useState({});
//   const [availability, setAvailability] = useState({});
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [availableSlots, setAvailableSlots] = useState([]);
//   const [isUnavailable, setIsUnavailable] = useState(false);
//   const [bookedSlots, setBookedSlots] = useState({});
//   const [timeZone, setTimeZone] = useState(localStorage.getItem("timeZone") || Intl.DateTimeFormat().resolvedOptions().timeZone);

//   useEffect(() => {
//     const fetchData = () => {
//       const savedAvailability = JSON.parse(localStorage.getItem("availability")) || {};
//       const savedBookedSlots = JSON.parse(localStorage.getItem("bookedSlots")) || {};

//       setAvailability(savedAvailability);
//       setBookedSlots(savedBookedSlots);

//       const updatedSlots = {};
//       Object.keys(savedAvailability).forEach((day) => {
//         if (savedAvailability[day].enabled) {
//           updatedSlots[day] = generateTimeSlots(
//             savedAvailability[day].start,
//             savedAvailability[day].end,
//             savedBookedSlots[day] || []
//           );
//         } else {
//           updatedSlots[day] = [];
//         }
//       });

//       setSlots(updatedSlots);
//     };

//     fetchData();
//     const handleStorageChange = () => fetchData();
//     window.addEventListener("storage", handleStorageChange);

//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);

//   useEffect(() => {
//     if (selectedDate) {
//       handleDateClick(selectedDate);
//     }
//   }, [bookedSlots, timeZone]);

//   const handleDateClick = (date) => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     if (date < today) return;

//     setSelectedDate(date);
//     const dateKey = date.toISOString().split("T")[0];
//     const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();

//     if (!availability[dayOfWeek] || !availability[dayOfWeek].enabled) {
//       setIsUnavailable(true);
//       setAvailableSlots([]);
//     } else {
//       setIsUnavailable(false);
//       const alreadyBooked = bookedSlots[dateKey] || [];
//       let filteredSlots = slots[dayOfWeek]?.filter((slot) => !alreadyBooked.includes(slot)) || [];

//       if (dateKey === today.toISOString().split("T")[0]) {
//         const currentTime = new Date();
//         const currentHour = currentTime.getHours();
//         const currentMinutes = currentTime.getMinutes();
//         filteredSlots = filteredSlots.filter((slot) => {
//           const [slotHour, slotMinute] = slot.split(":").map(Number);
//           return slotHour > currentHour || (slotHour === currentHour && slotMinute > currentMinutes);
//         });
//       }

//       setAvailableSlots(filteredSlots.map((slot) => convertTimeToLocal(slot, timeZone)));
//     }
//   };

//   const convertTimeToLocal = (timeStr, tz) => {
//     if (!timeStr || typeof timeStr !== "string" || !timeStr.includes(":")) {
//       console.error("Invalid timeStr input:", timeStr);
//       return null;
//     }

//     const [hours, minutes] = timeStr.split(":").map(Number);

//     if (isNaN(hours) || isNaN(minutes)) {
//       console.error("Invalid hours or minutes:", hours, minutes);
//       return null;
//     }

//     const date = new Date();
//     date.setHours(hours, minutes, 0, 0);

//     return new Intl.DateTimeFormat("en-GB", {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: false,
//       timeZone: tz,
//     }).format(date);
//   };

//   const handleTimeZoneChange = (e) => {
//     const tz = e.target.value;
//     setTimeZone(tz);
//     localStorage.setItem("timeZone", tz);
//   };

//   const handleSlotClick = (slot) => {
//     if (!selectedDate) return;

//     console.log("Clicked slot:", slot); // Debugging log

//     if (!slot || typeof slot !== "string" || !slot.includes(":")) {
//       console.error("Invalid slot format:", slot);
//       return;
//     }

//     const dateKey = selectedDate.toISOString().split("T")[0];

//     try {
//       const convertedTime = convertTimeToLocal(slot, timeZone);
//       console.log("Converted Time:", convertedTime); // Debugging log

//       localStorage.setItem(
//         "selectedSlot",
//         JSON.stringify({ date: dateKey, time: convertedTime })
//       );
//       navigate("/confirm-booking");
//     } catch (error) {
//       console.error("Error converting time:", error);
//     }
//   };

//   return (
//     <div className="bg-purple-500">
//       <div className="flex items-center justify-center pb-3 pt-3">
//         <div className="bg-white rounded-lg p-6 w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl">
//           <div className="flex items-center justify-between">
//             <h2 className="text-2xl font-bold text-center text-purple-500 mb-4">
//               Select a Date
//             </h2>
//             <ProfileDropdown />
//           </div>
//           <div className="flex justify-center">
//             <Calendar
//               onClickDay={handleDateClick}
//               tileDisabled={({ date }) => date < new Date().setHours(0, 0, 0, 0)}
//               className="w-full"
//             />
//           </div>
//         </div>
//       </div>

//       {selectedDate && (
//         <div className="border rounded-lg p-6 bg-white mx-auto max-w-lg">
//           <h3 className="text-xl font-semibold mb-4 text-center text-purple-600">
//             Availability for {selectedDate.toDateString()}
//           </h3>

//           {isUnavailable ? (
//             <p className="text-red-600 text-xl text-center font-medium">Unavailable</p>
//           ) : availableSlots.length > 0 ? (
//             <div className="flex flex-wrap justify-between">
//               <div className="mb-4">
//                 <label className="text-lg font-medium text-purple-600">Time Zone</label>
//                 <select
//                   value={timeZone}
//                   onChange={handleTimeZoneChange}
//                   className="border rounded w-full bg-white text-purple-500 p-2 text-sm sm:text-base md:text-lg lg:text-xl"
//                 >
//                   {Intl.supportedValuesOf("timeZone").map((tz) => (
//                     <option key={tz} value={tz}>
//                       {tz}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               {availableSlots.map((slot, index) => (
//                 <button key={index} className="border-4 w-32 p-2 m-1 text-sm font-medium rounded-lg border-purple-500 hover:bg-purple-500 hover:text-white" onClick={() => handleSlotClick(slot)}>
//                   {slot}
//                 </button>
//               ))}
//             </div>
//           ) : (
//             <p className="text-center text-purple-500">No available slots for this date.</p>
//           )}
//         </div>

      
//       )}
//       <button
//         className="w-full text-purple-400 flex items-center justify-center font-2xl font-bold mt-6 py-3 bg-white rounded-lg shadow-md"
//         onClick={() => navigate("/slot")}
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 16 16"
//           fill="currentColor"
//           className="w-5"
//         >
//           <path
//             fillRule="evenodd"
//             d="M12.5 9.75A2.75 2.75 0 0 0 9.75 7H4.56l2.22 2.22a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 1.06L4.56 5.5h5.19a4.25 4.25 0 0 1 0 8.5h-1a.75.75 0 0 1 0-1.5h1a2.75 2.75 0 0 0 2.75-2.75Z"
//             clipRule="evenodd"
//           />
//         </svg>
//         Back to Slot Manager
//       </button>
//     </div>
//   );
// };

// export default CalendarView;










import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [slots, setSlots] = useState({});
  const [availability, setAvailability] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isUnavailable, setIsUnavailable] = useState(false);
  const [bookedSlots, setBookedSlots] = useState({});
  const [isOwner, setIsOwner] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const sharedView = urlParams.get("shared");
    const encodedAvailability = urlParams.get("availability");

    if (sharedView && encodedAvailability) {
      setIsOwner(false);
      try {
        const sharedAvailability = JSON.parse(
          decodeURIComponent(encodedAvailability)
        );
        setAvailability(sharedAvailability);
      } catch (error) {
        console.error("Invalid shared availability data");
      }
    } else {
      const savedAvailability = JSON.parse(
        localStorage.getItem("availability")
      );
      if (savedAvailability) {
        setAvailability(savedAvailability);
      }
    }
  }, [location.search]);

  useEffect(() => {
    const generatedSlots = {};
    Object.keys(availability).forEach((day) => {
      if (availability[day].enabled) {
        generatedSlots[day] = generateTimeSlots(
          availability[day].start,
          availability[day].end,
          bookedSlots[day] || []
        );
      } else {
        generatedSlots[day] = [];
      }
    });
    setSlots(generatedSlots);
  }, [availability, bookedSlots]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const dayOfWeek = date
      .toLocaleDateString("en-US", { weekday: "short" })
      .toUpperCase();
    if (availability[dayOfWeek] && !availability[dayOfWeek].enabled) {
      setIsUnavailable(true);
      setAvailableSlots([]);
    } else {
      setIsUnavailable(false);
      setAvailableSlots(slots[dayOfWeek] || []);
    }
  };

  const handleSlotClick = (slot) => {
    if (!selectedDate) return;
    const dateKey = selectedDate.toISOString().split("T")[0];
    localStorage.setItem(
      "selectedSlot",
      JSON.stringify({ date: dateKey, time: slot })
    );
    navigate("/confirm-booking");
  };

  const shareLink = `${window.location.origin}${
    location.pathname
  }?shared=true&availability=${encodeURIComponent(
    JSON.stringify(availability)
  )}`;

  return (
    <div className="bg-purple-500">
      <div className="flex items-center justify-center pb-3 pt-3">
        <div className="bg-white rounded-lg p-6 w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-center text-purple-500 mb-4">
              Select a Date
            </h2>
            {isOwner && <ProfileDropdown />}
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
                  onClick={() => handleSlotClick(slot)}
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

      {isOwner && (
        <div className="bg-white rounded-lg p-4 mx-auto max-w-lg mt-4">
          <h3 className="text-lg font-semibold text-purple-600 mb-2">
            Share Your Calendar
          </h3>
          <input
            type="text"
            value={shareLink}
            readOnly
            className="w-full p-2 border rounded-lg text-gray-700"
          />
          <button
            className="mt-2 w-full bg-purple-500 text-white py-2 rounded-lg"
            onClick={() => {
              navigator.clipboard.writeText(shareLink);
              alert("Link copied to clipboard!");
            }}
          >
            Copy Link
          </button>
        </div>
      )}

      {isOwner && (
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
      )}
    </div>
  );
};

export default CalendarView;

