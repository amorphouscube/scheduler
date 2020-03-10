import React, { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";


export default function useApplicationData() {
  
  const setDay = day => dispatch({type:SET_DAY, value:day });
  
  const [state, dispatch] = useReducer(reducer, 
    {
      type: SET_APPLICATION_DATA, 
      day:"Monday", days:[], 
      appointments: {}, 
      interviewers: {}
    });

  useEffect(()=>{
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      const obj = {
        type: SET_APPLICATION_DATA,
        day: "Monday",
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }
      dispatch( obj );
      })
  }, [] )

  function bookInterview(id, interview, callback, callback1) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    Promise.all([
      axios.put(`/api/appointments/${id}`, {
        interview
      }),
      axios.get(`/api/appointments`),
      axios.get(`/api/days`)
    ])
    .then((all) => {
      dispatch({type:SET_INTERVIEW, value:all[1].data , value2:all[2].data});
    })
    .then(() =>  { 
      callback()
    })
    .catch(error => {
      callback1()
    })
  } 

  function cancelInterview(id, callback, callback1) {
    Promise.all([
      axios.delete(`/api/appointments/${id}`),
      axios.get('/api/appointments'),
      axios.get(`/api/days`)
    ])
    .then((all) => {
      dispatch({type:SET_INTERVIEW, value:all[1].data, value2:all[2].data });
    })
    .then( () => {
      callback1();
    })
    .catch(error => callback())
  }

  return {state, setDay, bookInterview, cancelInterview}
}