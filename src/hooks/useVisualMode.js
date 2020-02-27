import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
 
  function transition(value, replace = false) {
    setMode(value);
    if(replace){
      setHistory(prev => [...prev.slice(0, prev.length-1), value]);
    } else {
      setHistory(prev => [...prev, value]);
    }
  }
  function back(){
    if(history.length > 1){
      setMode(history[history.length-2]);
      setHistory(prev => [...prev.slice(0, prev.length-1)])
    }
  }
  return {mode, transition, back};
}