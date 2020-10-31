import React from "react";

import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "../../hooks/useVisualMode";



function Appointment (props) {
  // console.log('props: ', props)
  // const { student, interviewer } = props.interview;
  // console.log(student, interviewer);
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";

  // props.interview ? useVisualMode(SHOW) : useVisualMode(EMPTY);
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const slot = () => {
    // const {student, interviewer} = props.interview;
    // return props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />
    // return props.interview ? <Show student interviewer /> : <Empty />
    if (mode === EMPTY) {
      return <Empty onAdd={() => console.log("Clicked onAdd")} />
    } else if (mode === SHOW) {
      return (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
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