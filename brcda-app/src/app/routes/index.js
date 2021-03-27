/**
 * File Name: Routes/index.js
 * Initializing page Routes
 * Routing for Notes, NotesCalendar, and Dashboard pages
 * Author: Subrahmanyam Poluru
 */


import { Route } from "react-router-dom";
import Notes from "../components/Notes";
import NotesCalendar from "../components/NotesCalendar";
import Dashboard from "../components/Dashboard";

const Main = () => {
  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <Route exact path="/" component={Notes} />
      <Route path="/calendar" component={NotesCalendar} />
      <Route path="/dashboard" component={Dashboard} />
    </main>
  );
};

export default Main;
