import React from "react";

import "components/DayListItem.scss";

const classnames = require('classnames')

function DayListItem(props) {

  const dayListItemClass = classnames(
    "day-list__item",
    {
      "day-list__item--selected": props.selected,
      "day-list__item--full": props.spots === 0
    }
  )

  function formatSpots () {
    return props.spots === 0 ? 'no spots remaining' : `${props.spots} spot${props.spots === 1 ? '' : 's'} remaining`
  }

  return (
    <li className={dayListItemClass} onClick={() => props.setDay(props.name)}>   {/*google/mentor help with this*/}
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}

export default DayListItem;