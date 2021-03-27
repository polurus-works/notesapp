/**
 * File Name: App.js
 * Initializing Page Theme components
 * Layout Components <Header/>, <Sidebar />, and <Main />
 * Author: Subrahmanyam Poluru
 */

import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import Main from "./routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="brcda-app">
        <Header />
        <div className="container-fluid">
          <div className="row">
            <Sidebar />
            <Main />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
