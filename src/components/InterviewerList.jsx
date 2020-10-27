import React from "react";

import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

function InterviewerList (props) {
  return <section className="interviewers">
          <h4 className="interviewers__header text--light">Interviewer</h4>
          <ul className="interviewers__list">
            {props.interviewers.map((item) => {
              return <InterviewerListItem 
              key={item.id}
              name={item.name}
              avatar={item.avatar}
              selected={item.id === props.value}
              onChange={event => props.onChange(item.id)}
              />
            })}
          </ul>
          </section>
}

export default InterviewerList;