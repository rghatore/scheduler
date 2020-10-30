
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

export function getInterview(state, interview) {
  // recieving an object with interview id
  // add interview object to replace interviewer id
  // interview.interviewer gives the id
  if(!interview) {
    return null;
  }
  // const obj = { ...interview, interviewer: state.interviewers[interview.interviewer] };
  // console.log(obj);
  return { ...interview, interviewer: state.interviewers[interview.interviewer] };
}