export const prepareAppointmentsWeekData = (appointments) => {
  const result = {};
  const now = new Date();

  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + 1);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  days.forEach(day => {
    result[day] = { name: day, uv: 0, pv: 0 };
  });

  appointments.forEach((appt) => {
    const { date, from } = appt.dateTime;
    const apptDateTime = new Date(`${date}T${from}:00`);
    const dayName = appt.dateTime.day;

    if (apptDateTime >= startOfWeek && apptDateTime <= endOfWeek) {
      const status = apptDateTime > now ? "uv" : "pv"; // uv: upcoming, pv: past
      if (!result[dayName]) result[dayName] = { name: dayName, uv: 0, pv: 0 };
      result[dayName][status]++;
    }
  });

  return days.map(day => result[day]);
};
