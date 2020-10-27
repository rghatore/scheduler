import React from "react";

function DayListItem(props) {
  return (
    <li onClick={() => props.setDay(props.name)}>   {/*google/mentor help with this*/}
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}

export default DayListItem;