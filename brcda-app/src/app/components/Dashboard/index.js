/**
 * File Name: Dashboard/index.js
 * Dashboard Component 
 * Features : All in one place. This is additional design like a dashboard view
 * Author: Subrahmanyam Poluru
 */



import { setStorage, getStorage, getNotesByDates } from "../../helpers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useEffect } from "react";
import moment from "moment";
import CalendarView from "../CalendarView";

const Dashboard = () => {
  const [addNote, setNewNote] = useState("");
  const [setDate, setSelectedDate] = useState(new Date());
  const [notes, setNotes] = useState(getStorage() || []);
  const [isEdit, setEdit] = useState({});
  const [editNote, setEditNote] = React.useState("");
  const [seletedRowDate, setDateRowSelected] = useState();
  const [searchTerm, setSearchTerm] = React.useState("");

  useEffect(() => {
    if (getStorage()) {
      const results = getStorage().filter((person) =>
        person.note.toLowerCase().includes(searchTerm)
      );
      setNotes(results);
    }
  }, [searchTerm, notes]);

  const saveData = (newNotes) => {
    setStorage(newNotes);
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
      window.location.reload(false);
    }
  };

  const updateNotes = (id) => {
    if (editNote.trim()) {
      let filter = notes.map((item) => {
        if (item.id === id) {
          item["note"] = editNote;
          item["endDate"] = moment(setDate).format("MM/DD/YYYY");
          return item;
        }
        return item;
      });
      setNotes(filter);
      setStorage(filter);
      setEdit(false);
    }
  };

  const deleteNote = (id) => {
    var r = window.confirm("Are you sure, Do you want delete this?");
    if (r === true) {
      let newNotes = notes.filter((note) => note.id !== id);
      setNotes(newNotes);
      setStorage(newNotes);
      window.location.reload(false);
    }
  };

  const toggleEdit = (id) => {
    setEdit((prev) =>
      Boolean(!prev[id]) ? { ...prev, [id]: true } : { ...prev, [id]: false }
    );
  };

  const toggleRowSelected = (note) => {
    //console.log("note", note);
    setDateRowSelected(note);
  };

  const handleAddNote = (e) => {
    setNewNote(e.target.value);
  };

  const editNoteText = (e) => {
    setEditNote(e.target.value);
  };

  const search = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h4">
          {" "}
          <i className="fas fa-tachometer-alt"></i> Dashboard
        </h1>
      </div>
      <div>
        <div className="glance">
          <div className="row">
            <div className="col-6 col-sm-3 themed-grid-col">
              <div className="block shadow-lg mb-3">
                <div className="row">
                  <div className="col-5 bg-orange">
                    <h4 className="p-3 text-center">{notes.length}</h4>
                  </div>
                  <div className="col-7">
                    <p className="p-3 m-0">Total Notes </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-3 themed-grid-col">
              <div className="block shadow-lg mb-3">
                <div className="row">
                  <div className="col-5 bg-sky">
                    <h4 className="p-3 text-center">
                      {getNotesByDates(notes, "1")}
                    </h4>
                  </div>
                  <div className="col-7">
                    <p className="p-3 m-0">Today Notes </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-3 themed-grid-col">
              <div className="block shadow-lg mb-3">
                <div className="row">
                  <div className="col-5 bg-brand">
                    <h4 className="p-3 text-center">
                      {getNotesByDates(notes, "7")}
                    </h4>
                  </div>
                  <div className="col-7">
                    <p className="p-3 m-0">Last Week </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-3 themed-grid-col">
              <div className="block shadow-lg mb-3">
                <div className="row">
                  <div className="col-5 bg-violet">
                    <h4 className="p-3 text-center">
                      {getNotesByDates(notes, "31")}
                    </h4>
                  </div>
                  <div className="col-7">
                    <p className="p-3 m-0">Last Month </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="card notes-list">
              <div className="card-header bg-brand text-white">
                <i className="far fa-sticky-note"></i> Notes ({notes.length})
              </div>
              <div className="card-body">
                {notes.length !== 0 && (
                  <div className="row justify-content-end">
                    <div className="col-lg-5">
                      <div className="input-group input-group-sm mb-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search..."
                          aria-label="Search..."
                          aria-describedby="Search"
                          onChange={search}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <ul>
                  {notes.length === 0 ? (
                    <li className="notes text-center p-2" key="{note.id}">
                      No notes found.
                    </li>
                  ) : (
                    notes.map((note) => {
                      return !isEdit[note.id] ? (
                        <li className="notes" key={note.id}>
                          <div
                            className="notes-title"
                            onClick={() => toggleRowSelected(note)}
                          >
                            <i className="far fa-calendar-alt"></i>{" "}
                            {note.endDate}
                          </div>
                          <div
                            className="notes-content"
                            onClick={() => toggleRowSelected(note)}
                          >
                            <p className="m-0">{note.note}</p>
                          </div>
                          <div className="note-footer mb-1">
                            <p className="text-end">
                              <i
                                className="fas fa-pencil-alt text-info"
                                onClick={() => toggleEdit(note.id)}
                              ></i>
                              &nbsp;
                              <i
                                className="fas fa-times-circle text-danger"
                                onClick={() => deleteNote(note.id)}
                              ></i>
                            </p>
                          </div>
                        </li>
                      ) : (
                        <li className="notes">
                          <div className="notes-title">
                            <DatePicker
                              selected={note.endDate ? new Date(setDate) : null}
                              onChange={(date) => setSelectedDate(date)}
                            />
                          </div>
                          <div className="notes-content mb-1">
                            <textarea
                              id="todoInput"
                              className="form-control"
                              placeholder={note.note}
                              defaultValue={note.note}
                              onChange={editNoteText}
                              maxLength="100"
                            ></textarea>
                          </div>
                          <div className="note-footer  mb-1">
                            <div className="text-end">
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => toggleEdit(note.id)}
                              >
                                <i className="far fa-window-close"></i> Cancel
                              </button>{" "}
                              &nbsp;
                              <button
                                className="btn btn-success btn-sm"
                                onClick={() => updateNotes(note.id)}
                              >
                                {" "}
                                <i className="far fa-save"></i> Save
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div>
              <CalendarView selectedTask={seletedRowDate} allNotes={notes} />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="card">
              <div className="card-header bg-brand text-white">
                <i className="fas fa-plus"></i> Add Notes{" "}
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    End Date
                  </label>
                  <DatePicker
                    selected={setDate}
                    onChange={(date) => setSelectedDate(date)}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="endDate"
                    className="form-label"
                  >
                    Notes
                  </label>
                  <textarea
                    className="form-control"
                    id="addNote"
                    rows="3"
                    onChange={handleAddNote}
                    maxLength="100"
                  ></textarea>
                </div>
                <div className="text-right d-block">
                  <button className="btn btn-primary" onClick={addNewNote}>
                    <i className="fas fa-plus"></i> Add Note
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
