import React from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  let dailyAppointments = [];

  dailyAppointments = getAppointmentsForDay(state, state.day);

  function interviewSpots(bookings) {
    return bookings.map((booking) => {
      const interview = getInterview(state, booking.interview);
      const appointment = { ...booking, interview: interview }
      return (
        <Appointment
          key={appointment.id}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
          // spotsRemaining={spotsRemaining}
          interviewers={getInterviewersForDay(state, state.day)}
          {...appointment}
        />
      )
    })
  }

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {interviewSpots(dailyAppointments)}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}


