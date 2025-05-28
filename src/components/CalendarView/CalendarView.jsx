import Calendar from "../Calendar/Calendar";
import Card from "../Card/Card";
import appointments from "../../data/appointments.json";
import Tooth from "../../assets/tooth.png";
import Muscle from "../../assets/muscle.png";
import Heart from "../../assets/heart.png";
import Doctor from "../../assets/doctor.png";
import Eye from "../../assets/eye.png";
import {
  format,
  startOfWeek,
  addDays,
  addHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
} from "date-fns";
import "./CalendarView.css";

const typeToImageMap = {
  Dentist: Tooth,
  Physiotherapy: Muscle,
  Cardiology: Heart,
  "General Medicine": Doctor,
  Ophthalmology: Eye,
};

function CalendarView() {
  const today = new Date();
  const todayStr = format(today, "yyyy-MM-dd");
  const tomorrowStr = format(addDays(today, 1), "yyyy-MM-dd");

  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dates = Array.from({ length: 7 }, (_, i) =>
    format(addDays(weekStart, i), "d")
  );
  const fullDates = Array.from({ length: 7 }, (_, i) =>
    format(addDays(weekStart, i), "yyyy-MM-dd")
  );

  const baseHour = addHours(
    setMinutes(setSeconds(setMilliseconds(today, 0), 0), 0),
    1
  );

  const hourFormats = Array.from({ length: 3 }, (_, i) =>
    format(addHours(baseHour, i), "HH")
  );

  const hoursDisplay = hourFormats.map((h, i) =>
    format(addHours(baseHour, i), "h:00aa").toLowerCase()
  );

  const filteredAppointments = appointments
    .filter((a) => {
      const isTodayMatch = a.dateTime.date === todayStr;
      const isTomorrowMatch = a.dateTime.date === tomorrowStr;
      return isTodayMatch || isTomorrowMatch;
    })
    .sort((a, b) => {
      if (a.dateTime.date !== b.dateTime.date) {
        return a.dateTime.date < b.dateTime.date ? -1 : 1;
      }

      const aTime = new Date(`${a.dateTime.date}T${a.dateTime.from}:00`);
      const bTime = new Date(`${b.dateTime.date}T${b.dateTime.from}:00`);
      return aTime - bTime;
    });

  return (
    <div className="appointments">
      <Calendar
        monthYear={format(today, "MMMM yyyy")}
        onPrev={() => console.log("Previous week")}
        onNext={() => console.log("Next week")}
        days={days}
        dates={dates}
        fullDates={fullDates}
        hours={hoursDisplay}
        todayDate={todayStr}
        appointments={appointments}
      />

      <div className="appointments-row">
        {filteredAppointments.length === 0 ? (
          <Card className="appointment empty">
            <p>No upcoming appointments.</p>
          </Card>
        ) : (
          filteredAppointments.map(
            ({ title, type, doctor, dateTime }, index) => {
              const imgSrc = typeToImageMap[type] || Tooth;

              const isCurrent = dateTime.date === todayStr;
              const isUpcoming = dateTime.date === tomorrowStr;

              const appointmentClass = isCurrent
                ? "appointment current-appointment"
                : isUpcoming
                ? "appointment upcoming-appointment"
                : "appointment";

              return (
                <Card key={index} className={appointmentClass}>
                  <div className="appointment-header">
                    <h4>{title}</h4>
                    <img src={imgSrc} alt={`${type} icon`} />
                  </div>
                  <p>
                    {dateTime.from} - {dateTime.to}
                  </p>
                  <p>{doctor.name}</p>
                </Card>
              );
            }
          )
        )}
      </div>

      <div className="upcoming-appointments">
        <h4>The Upcoming Schedule</h4>
        {filteredAppointments.length === 0 ? (
          <p>No upcoming appointments.</p>
        ) : (
          Object.entries(
            filteredAppointments.reduce((acc, appt) => {
              const day = appt.dateTime.day;
              if (!acc[day]) acc[day] = [];
              acc[day].push(appt);
              return acc;
            }, {})
          ).map(([day, appts], index) => (
            <div key={index} className="upcoming-appointment-item">
              <h5 className="upcoming-appointment-day">On {day}</h5>
              <div className="upcoming-appointment-details">
                {appts.map(({ title, type, dateTime }, i) => {
                  const imgSrc = typeToImageMap[type] || Tooth;
                  return (
                    <Card key={i} className="appointment upcoming-appointment">
                      <div className="appointment-header">
                        <h4>{title}</h4>
                        <img src={imgSrc} alt={`${type} icon`} />
                      </div>
                      <p>
                        {dateTime.from} - {dateTime.to}
                      </p>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CalendarView;
