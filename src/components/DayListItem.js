import React from "react";

import "components/DayListItem.scss";
const classNames = require('classnames');

const formatSpots = function(spots) {
  if (spots) {
    if(spots === 1){
      return "1 spot remaining";
    }
    else {
      return spots + " spots remaining";
    }
  } else{
    return "no spots remaining";
  }
};

export default function DayListItem(props) {
  let dayClass = classNames({
    "day-list__item" : true,
    "day-list__item--selected" : props.selected, 
    "day-list__item--full" : props.spots===0
  });

  return (
    <li data-testid="day" className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2>{props.name}</h2>
      <h3>{formatSpots(props.spots)}</h3>
    </li>
  );
}