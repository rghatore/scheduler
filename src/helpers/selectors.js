
export function getAppointmentsForDay(state, day) {
  //  get object for a particular day
  const specificDay = state.days.find(item => item.name === day)

  if(!specificDay) {
    return [];
  }
  // get appointments array
  //  match appointment ids and return appointments data array
  const appointmentsData = specificDay.appointments.map(item => state.appointments[item])
  return appointmentsData;
}