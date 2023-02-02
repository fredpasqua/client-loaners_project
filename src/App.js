import "./App.css";
import InstrumentList from "./instrumentList";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { RegistrationView } from "./registration-view";

import Navigate from "./navbar.js";
function App() {
  return (
    <div className="App">
      <Navigate />
      <Routes>
        <Route path="home" element={<InstrumentList />} />
        <Route path="register" element={<RegistrationView />} />
        <Route path="login" element={<InstrumentList />} />
      </Routes>
    </div>
  );
}

export default App;
