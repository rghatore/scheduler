import React from "react";

import DayListItem from "./DayListItem";


function DayList(props) {

  function items () {
    return props.days.map((day) => {
      // day.selected = (day.name === props.day)
      // day.setDay = props.setDay;
      // important: return a react component not a js function
      // earlier I was doing return DayListItem(day) = function != component
      return <DayListItem 
              name={day.name}
              spots={day.spots}
              key={day.id}
              selected={(day.name === props.day)}
              setDay={props.setDay} />
    })
  }

  return <ul>{items()}</ul>

}

export default DayList;