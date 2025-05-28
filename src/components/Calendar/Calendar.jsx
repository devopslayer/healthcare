import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { parse, getMonth } from "date-fns";
import "./Calendar.css";

function Calendar({
  monthYear,
  onPrev,
  onNext,
  days,
  dates,
  fullDates,
  hours,
  todayDate,
  appointments,
}) {
  const currentMonth = getMonth(parse(monthYear, "MMMM yyyy", new Date()));

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h3 className="calendar-title">{monthYear}</h3>
        <div className="calendar-nav">
          <button onClick={onPrev}>
            <FaArrowLeft />
          </button>
          <button onClick={onNext}>
            <FaArrowRight />
          </button>
        </div>
      </div>

      <div className="calendar-row header-row">
        {days.map((day, idx) => {
          const isToday = fullDates[idx] === todayDate;
          const dateObj = new Date(fullDates[idx]);
          const isNextMonth = dateObj.getMonth() !== currentMonth;
          return (
            <div
              key={idx}
              className={`calendar-cell header-cell ${isToday ? "today" : ""} ${
                isNextMonth ? "next-month" : ""
              }`}
            >
              <div className="day-label">{day}</div>
              <div className="date-label">{dates[idx]}</div>
            </div>
          );
        })}
      </div>

      {hours.map((hour, rowIdx) => (
        <div key={rowIdx} className="calendar-row time-row">
          {fullDates.map((date, colIdx) => {
            const isToday = date === todayDate;

            const appointment = appointments.find((appt) => {
              const apptHour = appt.dateTime.from.split(":")[0];
              const calendarHour = hour.split(":")[0];
              return appt.dateTime.date === date && apptHour === calendarHour;
            });

            const duration =
              appointment &&
              parseInt(appointment.dateTime.to.split(":")[0]) -
                parseInt(appointment.dateTime.from.split(":")[0]);

            const isStartSlot =
              appointment &&
              hour.startsWith(appointment.dateTime.from.slice(0, 2));

            return (
              <div
                key={colIdx}
                className={`calendar-cell time-slot ${isToday ? "today" : ""}`}
                style={{
                  position: "relative",
                  padding: 0,
                }}
              >
                {appointment && isStartSlot ? (
                  <div
                    className={`${
                      isToday ? "appointment-pill " : "appointment-pill-next"
                    }`}
                    style={{
                      gridRow: `span ${duration + 1 || 1}`,
                      // height: `calc(${duration + 1 || 1} * 100%)`,
                    }}
                    title={appointment.title}
                  >
                    <span>{appointment.title}</span>
                    {/* {appointment.dateTime.from && appointment.dateTime.to && (
                      <span>
                        {appointment.dateTime.from || ""} -{" "}
                        {appointment.dateTime.to || ""}
                      </span>
                    )} */}
                  </div>
                ) : (
                  <span className="time-label">{hour}</span>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Calendar;
