/**
 * File Name: CalendarView/index.js
 * Calendar View Component 
 * Props : selectTask (Object), allNotes (Array)
 * Author: Subrahmanyam Poluru
 */



import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";

const CalendarView = ({ selectedTask, allNotes }) => {
  console.log("Selected", selectedTask, allNotes);

  const [taskDate, setTaskDate] = useState(null);
  const [setDt, setDateDt] = useState([]);

  function onTaskSelected(value) {
    let filter = allNotes.filter(
      (todo) => todo.endDate === moment(value).format("MM/DD/YYYY")
    );
    console.log("Tfilasdfsad", filter);
    setDateDt(moment(value).format("MM/DD/YYYY"));
    console.log("setDt", setDt)
  }

  useEffect(() => {
    if (selectedTask) {
      setTaskDate(moment(selectedTask.endDate, "MM/DD/YYYY").toDate());
    }
  }, [selectedTask]);

  return (
    <div className="notes-calendar shadow-lg">
      <div className="notes-header">
        <h3><i className="far fa-calendar-alt"></i> Calendar View</h3>
      </div>
      <Calendar onClickDay={onTaskSelected} value={taskDate} />
    </div>
  );
};

export default CalendarView;
