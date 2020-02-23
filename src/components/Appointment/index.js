import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from "hooks/useVisualMode";

const ERROR = "ERROR";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";

export default function Appointment(props){
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview, () => {transition(SHOW)});
  }

  function deleteInterview() {
    props.cancelInterview(props.id);
    console.log("teansitionEmpty")
    transition(EMPTY);
  }
  
  return (
    <article className="appointment">
      <Header time={props.time}/>
      
      {mode === CONFIRM && <Confirm message={"Are you sure you would like to delete?"} onCancel={() => {transition(SHOW)}} onConfirm={deleteInterview} />}
      {mode === CREATE && <Form onSave={save} onCancel={() => {transition(EMPTY)}} interviewers={props.interviewers}/>}
      {mode === EMPTY && <Empty onAdd={() => {transition(CREATE)}} />}
      {mode === SAVING && <Status message={"Saving"}/>}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => {transition(CONFIRM)}}
          onEdit={save}
        />
      )}
    </article>
  )
}