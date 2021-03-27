/**
 * File Name: Notes/index.js
 * Notes Component 
 * Features : Add Notes, Table Components, DatePicker initializing
 * Author: Subrahmanyam Poluru
 */

import Table from "../Table";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
import moment from "moment";
import { setStorage, getStorage } from "../../helpers";

const Notes = () => {
  const [showAddForm, setAddForm] = useState(false);
  const [addNote, setNewNote] = useState("");
  const [setDate, setSelectedDate] = useState(new Date());
  const [notes, setNotes] = useState(getStorage() || []);

  const saveData = (newNotes) => {
    console.log(newNotes);
    setStorage(newNotes);
  };

  const toggleAddForm = () => {
    setAddForm(showAddForm ? false : true);
  };

  const addNewNote = () => {
    if (addNote.trim()) {
      let newNotes = [
        ...notes,
        {
          note: addNote.trim(),
          endDate: moment(setDate).format("MM/DD/YYYY"),
          id: Date.now(),
        },
      ];
      setNotes(newNotes);
      setNewNote("");
      saveData(newNotes);
      setAddForm(false);
    }
  };

  const handleAddNote = (e) => {
    setNewNote(e.target.value);
  };

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h4"><i className="far fa-sticky-note"></i> To Do List</h1>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="block shadow-lg">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-2 border-bottom">
              <h2><i className="far fa-sticky-note"></i> Notes ({notes.length})</h2>
              <div className="btn-toolbar mb-2 mb-md-0">
                <button
                  type="button"
                  className="btn btn-sm btn-success"
                  onClick={toggleAddForm}
                >
                  Add Note <i className="fas fa-plus"></i>
                </button>
              </div>
            </div>
            {showAddForm && (
              <div className="add-note">
                <div className="card">
                  <div className="card-header">Add Note</div>
                  <div className="card-body">
                    <div className="row mb-3">
                      <label
                        htmlFor="EndDate"
                        className="col-sm-2 col-form-label"
                      >
                        End Date
                      </label>
                      <div className="col-sm-10">
                        <DatePicker
                          selected={setDate}
                          onChange={(date) => setSelectedDate(date)}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="AddNote"
                        className="col-sm-2 col-form-label"
                      >
                        Add Note
                      </label>
                      <div className="col-sm-10">
                        <textarea
                          className="form-control"
                          id="addNoteText"
                          onChange={handleAddNote}
                          maxLength="100"
                        ></textarea>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-2"></label>
                      <div className="col-sm-10">
                        <button
                          className="btn btn-primary text-right"
                          onClick={addNewNote}
                        >
                         <i className="fas fa-plus"></i> Add Note 
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <Table notes={notes} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
