import React from "react";
import "components/InterviewerListItem.scss"
const classNames = require("classnames");

export default function InterviewerListItem(props) {
  let interviewclass = classNames({
    "interviewers__item" : true,
    "interviewers__item--selected" : props.selected
  })

  return (
    <li className={interviewclass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}