
export function getAppointmentsForDay(state, day) {
  let appoints = [];
  const filteredDays = state.days.filter(days => days.name === day);
  if (!filteredDays[0]){
    return [];
  }
  filteredDays[0].appointments.forEach(element => {
    appoints.push(state.appointments[element])
  });
  return appoints;
}

export function getInterview(state, interviewer){
  if(!interviewer) { return null; }
  let interview = {
  student: interviewer.student,
  interviewer: state.interviewers[interviewer.interviewer]
  };
  return interview;
}

export function getInterviewersForDay(state, day) {
  let inters = [];
  const filteredDays = state.days.filter(days => days.name === day);
  if (!filteredDays[0]){
    return [];
  }
  filteredDays[0].interviewers.forEach(element => {
    inters.push(state.interviewers[element])
  });
  return inters;
}