import "./App.css";
import InstrumentList from "./instrumentList";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { RegistrationView } from "./registration-view";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="client-loaners_project" element={<InstrumentList />} />
        <Route path="register" element={<RegistrationView />} />
        <Route path="login" element={<InstrumentList />} />
      </Routes>
    </div>
  );
}

export default App;
