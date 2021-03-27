/**
 * File Name: NotesCalendar/index.js
 * Notes Calendar Component 
 * Features : Based on selecting specific date it will display items array based on the dates
 * Author: Subrahmanyam Poluru
 */


import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
import moment from "moment";
import { getStorage } from "../../helpers";

const NotesCalendar = () => {
  const [noteDate, setNoteDate] = useState(null);
  const [notes, setNotes] = useState([]);
  function onNotesSelected(value) {
    let notes = getStorage();
    let filter = notes.filter(
      (todo) => todo.endDate === moment(value).format("MM/DD/YYYY")
    );
    setNotes(filter);
    setNoteDate(moment(value).format("MM/DD/YYYY"));
    console.log(noteDate);
  }
  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h4"><i className="far fa-calendar-alt"></i> Calendar View</h1>
      </div>
      <p>
        {" "}
        Click on specific date in calendar and see the notes on the right side.
      </p>
      <div className="row">
        <div className="col-lg-4">
          <div className="custom-calendar">
            {" "}
            <Calendar onClickDay={onNotesSelected} />
          </div>
        </div>
        <div className="col-lg-8">
          {notes.length === 0 ? (
            <div className="text-center p-3 bg-white text-info shadow-lg">
              No Notes found.
            </div>
          ) : (
            <div className="row">
              {notes.map((note) => {
                return (
                  <div key={note.id} className="col-lg-4">
                    <div className="bg-white shadow-lg p-3 calendar-card">
                      <h6 className="border-bottom mb-2 pb-2 text-info">
                        <i className="far fa-calendar-alt"></i> {note.endDate}
                      </h6>
                      {note.note}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesCalendar;
