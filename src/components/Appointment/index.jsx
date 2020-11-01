import React from "react";

import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "../../hooks/useVisualMode";



function Appointment (props) {
  // console.log('props: ', props)
  // const { student, interviewer } = props.interview;
  // console.log(student, interviewer);
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";


  // props.interview ? useVisualMode(SHOW) : useVisualMode(EMPTY);
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // to save data in the form save event
  function save(name, interviewer) {
  // show saving status
    transition(SAVING);

    const interview = {
      student: name,
      interviewer
    };
    // console.log("interview: ", interview);
    // update state
    props.bookInterview(props.id, interview)
    .then(() => {
      // change visual state to show (pessimistic approach)
      transition(SHOW);
    })
  }

  // to delete an interview
  function onDelete() {
    // show deleting status
    transition(DELETING);
    // console.log("Hello Hello")
    // call cancelInterview function
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY);
    })
  }

  const slot = () => {
    // const {student, interviewer} = props.interview;
    // return props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />
    // return props.interview ? <Show student interviewer /> : <Empty />
    if (mode === EMPTY) {
      return (
        <Empty
          onAdd={() => transition(CREATE)}
        />
      )
    } else if (mode === SHOW) {
      return (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}
        />
      )
    } else if (mode === CREATE) {
      return (
        // name interview interviewer onCancel onSave
        <Form
          name={props.name}
          interview={props.interview}
          interviewers={props.interviewers}
          onCancel={() => back(EMPTY)}
          onSave={(name, interviewer) => save(name, interviewer)}
        />
      )
    } else if (mode === SAVING) {
      return (
        <Status message={"Saving"} />
      )
    } else if (mode === DELETING) {
      return (
        <Status message={"Deleting"} />
      )
    }
  }
  
  
  return (
    <article className="appointment">
      <Header time={props.time} />
      {slot()}
    </article>
  )
}

export default Appointment;