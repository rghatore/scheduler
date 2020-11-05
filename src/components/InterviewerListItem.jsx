import React from "react";

import "components/InterviewerListItem.scss"
const classnames = require("classnames");

function InterviewerListItem(props) {

  const interviewListItemClass = classnames(
    "interviewers__item",
    {
      "interviewers__item--selected": props.selected
    }
  )

  return <li className={interviewListItemClass} onClick={props.onChange}>
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
    {props.selected && props.name}
  </li>

}

export default InterviewerListItem;