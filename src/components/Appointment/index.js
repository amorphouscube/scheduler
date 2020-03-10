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
const EDIT = "EDIT";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";

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
    props.bookInterview(props.id, interview, () => {transition(SHOW)}, () => {transition(ERROR, true)});
  }

  function deleteInterview() {
    transition(DELETING);
    props.cancelInterview(props.id, () => {transition(ERROR, true)}, () => {transition(EMPTY)});
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time}/>
      
      {mode === SAVING && <Status message={"Saving"}/>}
      {mode === DELETING && <Status message={"Deleting"}/>}
      {mode === ERROR && <Error message={"An error has occured"} onClose={() => back()}/>}
      {mode === CONFIRM && <Confirm message={"Are you sure you would like to delete?"} onCancel={() => {transition(SHOW)}} onConfirm={deleteInterview} />}
      {mode === CREATE && <Form onSave={save} onCancel={() => {transition(EMPTY)}} interviewers={props.interviewers}/>}
      {mode === EDIT && <Form onSave={save} onCancel={() => {transition(SHOW)}} interviewers={props.interviewers}/>}
      {mode === EMPTY && <Empty onAdd={() => {transition(CREATE)}} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => {transition(CONFIRM)}}
          onEdit={() => {transition(EDIT)}}
        />
      )}
    </article>
  )
}

//      {mode === CREATE_ERROR && <Error message={"An error has occured"} onClose={transition(EMPTY)}/>}
