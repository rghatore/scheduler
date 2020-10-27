import React from "react";

import DayListItem from "./DayListItem";


function DayList(props) {

  function items () {
    return props.days.map((day) => {
      day.selected = (day.name === props.day)
      day.setDay = props.setDay;
      return DayListItem(day)
    })
  }

  return <ul>{items()}</ul>

}

export default DayList;