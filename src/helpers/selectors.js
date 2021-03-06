
export function getAppointmentsForDay(state, day) {
  // get object for a particular day
  const specificDay = state.days.find(item => item.name === day)

  if(!specificDay) {
    return [];
  }
  // get appointments array by matching appointment ids
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
  return { ...interview, interviewer: state.interviewers[interview.interviewer] };
}

export function getInterviewersForDay(state, day) {
  //  get object for a particular day
  const specificDay = state.days.find(item => item.name === day)

  if(!specificDay) {
    return [];
  }
  const interviewersData = specificDay.interviewers.map(item => state.interviewers[item])
  return interviewersData;
}