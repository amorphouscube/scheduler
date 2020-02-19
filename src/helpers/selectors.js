
export function getAppointmentsForDay(state, day) {
  let appoints = [];
  const filteredDays = state.days.filter(days => days.name === day);
  if (!filteredDays[0]){
    console.log("here");
    return [];
  }
  filteredDays[0].appointments.forEach(element => {
    appoints.push(state.appointments[element])
  });
  return appoints;
}