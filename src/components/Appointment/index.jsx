import React from "react";

import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "../../hooks/useVisualMode";



function Appointment (props) {
  // console.log('props: ', props)
  // const { student, interviewer } = props.interview;
  // console.log(student, interviewer);
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  // props.interview ? useVisualMode(SHOW) : useVisualMode(EMPTY);
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // to save data in the form save event
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    // console.log("interview: ", interview);
    // update state
    props.bookInterview(props.id, interview)
    .then(() => {
      // change visual state to show
      transition(SHOW);
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