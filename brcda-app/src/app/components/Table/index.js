/**
 * File Name: Table/index.js
 * Table Component 
 * Features : Table components, Sorting, Search, Edit, Delete, Update, based on date click calendar view date highlighted
 * Author: Subrahmanyam Poluru
 */


import { compareByAsc, compareByDesc } from "../../helpers";
import React, { useState, useEffect } from "react";
import { setStorage } from "../../helpers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import CalendarView from "../CalendarView";

const Table = ({ notes }) => {
  const [todos, setTodos] = useState(notes);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [seletedRowDate, setDateRowSelected] = useState();
  const [isEdit, setEdit] = useState({});
  const [setDate, setSelectedDate] = useState(new Date());
  const [editNote, setEditNote] = React.useState("");

  useEffect(() => {
    if (notes) {
      const results = notes.filter((person) =>
        person.note.toLowerCase().includes(searchTerm)
      );
      setTodos(results);
    }
  }, [searchTerm, notes]);

  const sortByKeys = (key) => {
    let arrayCopy = [...todos];
    const arrInStr = JSON.stringify(arrayCopy);
    arrayCopy.sort(compareByAsc(key));
    const arrInStr1 = JSON.stringify(arrayCopy);
    if (arrInStr === arrInStr1) {
      arrayCopy.sort(compareByDesc(key));
    }
    setTodos(arrayCopy);
  };

  const search = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleRowSelected = (note) => {
    setDateRowSelected(note);
  };

  const toggleEdit = (id) => {
    setEdit((prev) =>
      Boolean(!prev[id]) ? { ...prev, [id]: true } : { ...prev, [id]: false }
    );
  };

  const deleteNote = (id) => {
    var r = window.confirm("Are you sure, Do you want delete this?");
    if (r === true) {
      let newNotes = todos.filter((note) => note.id !== id);
      setTodos(newNotes);
      setStorage(newNotes);
      window.location.reload(false);
    }
  };

  const editNoteText = (e) => {
    setEditNote(e.target.value);
  };

  const updateNotes = (id) => {
   if (editNote.trim()) {
      let filter = todos.map((item) => {
        if (item.id === id) {
          item["note"] = editNote;
          item["endDate"] = moment(setDate).format("MM/DD/YYYY");
          return item;
        }
        return item;
      });
      setTodos(filter);
      setStorage(filter);
      setEdit(false);
    }
  };

  return (
    <div className="row">
      <div className="col-lg-8">
        <div className="row justify-content-end">
          <div className="col-lg-3">
            <div className="input-group input-group-sm mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                aria-label="Search..."
                aria-describedby="button-addon2"
                onChange={search}
              />
            </div>
          </div>
        </div>
        <div className="table-responsive brcda-table">
          <table className="table table-striped table-bordered table-sm bg-white mb-0">
            <thead className="text-white">
              <tr>
                <th onClick={() => sortByKeys("note")}>
                  Note <i className="fas fa-sort"></i>
                </th>
                <th
                  onClick={() => sortByKeys("endDate")}
                  className="text-center"
                >
                  End Date <i className="fas fa-sort"></i>
                </th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center text-warning">
                    No notes found.
                  </td>
                </tr>
              ) : (
                todos.map((note) => {
                  return !isEdit[note.id] ? (
                    <tr key={note.id}>
                      <td
                        onClick={() => toggleRowSelected(note)}
                        className="td-wrap"
                      >
                        {note.note}
                      </td>
                      <td
                        onClick={() => toggleRowSelected(note)}
                        className="text-center"
                      >
                        {note.endDate}
                      </td>
                      <td className="text-center">
                        <i
                          className="fas fa-pencil-alt text-info"
                          onClick={() => toggleEdit(note.id)}
                          title="Edit Note"
                        ></i>
                        &nbsp;
                        <i
                          className="fas fa-times-circle text-danger"
                          onClick={() => deleteNote(note.id)}
                          title="Delete Note"
                        ></i>
                      </td>
                    </tr>
                  ) : (
                    <tr key={note.id}>
                      <td>
                        <textarea
                          id="todoInput"
                          className="form-control"
                          placeholder={note.note}
                          defaultValue={note.note}
                          onChange={editNoteText}
                          maxLength="100"
                        ></textarea>
                      </td>
                      <td className="text-center pt-4">
                        <DatePicker
                          selected={note.endDate ? new Date(setDate) : null}
                          onChange={(date) => setSelectedDate(date)}
                        />
                      </td>
                      <td className="text-center pt-4">
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
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="col-lg-4 p-3">
        <div className="brcda-calendar">
          <CalendarView selectedTask={seletedRowDate} allNotes={todos} />
        </div>
      </div>
    </div>
  );
};

export default Table;
