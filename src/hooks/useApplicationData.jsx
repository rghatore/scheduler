import { useState, useEffect } from "react";
const axios = require("axios");

function useApplicationData() {

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
  }, [])

  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {
    return axios.put(
      `/api/appointments/${id}`,
      { interview: { ...interview } }
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
      setState(prev => ({ ...prev, appointments }));
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
        setState(prev => ({ ...prev, appointments }));
      })
  }


  useEffect(() => {
    console.log("use effect when updating appointments")
    console.log("use effect state.appointments: ", state.appointments);
    console.log("use effect state.day: ", state.day);
    console.log("use effect state.days: ", state.days);
    if (state.days.length > 0) {
      const index = state.days.findIndex(item => item.name === state.day); // this works
      console.log("use effect index: ", index);
      const appointments = state.days[index].appointments
      console.log("use effect appointments: ", appointments);
      const spots = appointments.filter(item => !state.appointments[item].interview).length;
      console.log("spots: ", spots);
      const day = {
        ...state.days[index],
        spots
      }
      console.log("use effect day object: ", day); // working upto here
      const days = [...state.days]
      days.splice(index, 1, day);
      console.log("use effect days array :", days);
      setState(prev => ({ ...prev, days}));
    }
  }, [state.appointments]);

    function spotsRemaining() {
      // when saving or deleting - update spots
      // for (const item of state.days) {
        // const appointments = item.appointments.find
      // }
      // setState(prev => ({...prev}));
      // console.log("state.days: ", state.days);
      // console.log("id: ", id);
      
      const index = state.days.findIndex(item => item.name === state.day); // this works
      // console.log("index: ", index);
      
      const appointments = state.days[index].appointments
      // console.log("appointments: ", appointments);
      // console.log("state.appointments: ", state.appointments);
      // update state
      // const spots = appointments.filter(spot => !spot.interview).length;
      const spots = appointments.filter(item => !state.appointments[item].interview).length;

      // const days = {...state.days}
      console.log("spots: ", spots);
      // replacing spots on a particular day
      // copy day object from state
      const day = {
        ...state.days[index],
        spots
      }
      console.log(day); // working upto here
      // copy days from state and replace object at index
      // const days = [...state.days].splice(index, 1, day); // this returns only the deleted element
      const days = [...state.days]
      days.splice(index, 1, day);
      // replacing days in state
      setState(prev => ({ ...prev, days}));
    }
  // }, [state.appointments])

  return { state, setDay, bookInterview, cancelInterview, spotsRemaining }
}

export default useApplicationData;