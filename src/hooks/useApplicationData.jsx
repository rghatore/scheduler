import { useState, useEffect } from "react";
const axios = require("axios");

function useApplicationData () {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  //  initial state
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }))
    })
  },[])
  
  const setDay = day => setState({...state, day});

  function bookInterview(id, interview) {
    return axios.put(
      `/api/appointments/${id}`,
      {interview: {...interview}}
    ).then(() => {
      // replacing interview null to interview with data
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      // copying appointments object and updating with new appointment data
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      // set new state
      setState({...state, appointments});
    })
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      // replacing interview data to null
      const appointment = {
        ...state.appointments[id],
        interview: null
      }
      // copying appointments object and updating with new appointment data
      const appointments = {
        ...state.appointments,
        [id]: appointment
      }
      // set new state
      setState({...state, appointments})
    })
  }




return {state, setDay, bookInterview, cancelInterview}
}

export default useApplicationData;