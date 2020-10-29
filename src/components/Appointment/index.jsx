import React from "react";

import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";



function Appointment (props) {
  // console.log('props: ', props)
  // const { student, interviewer } = props.interview;
  // console.log(student, interviewer);

  const slot = () => {
    // const {student, interviewer} = props.interview;
    return props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />
    // return props.interview ? <Show student interviewer /> : <Empty />
  }
  
  
  return (
    <article className="appointment">
      <Header time={props.time} />
      {slot()}
    </article>
  )
}

export default Appointment;