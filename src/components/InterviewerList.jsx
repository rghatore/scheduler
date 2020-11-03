import React from "react";
import PropTypes from 'prop-types';

import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

function InterviewerList (props) {
  // console.log("props in interviewer list: ", props)
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

// check props type
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};


export default InterviewerList;