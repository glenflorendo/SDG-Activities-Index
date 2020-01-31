import React from "react";
import "./App.css";
import Project from "./components/projects/Project";
import FilterDropdown from "./components/filterMenu/FilterDropdown";
import Button from "react-bootstrap/Button";

function App() {
  return (
    <div className="App">
      <div style={{ textAlign: "center" }}>
        <h1>LOS ANGELES SDGs ACTIVITIES INDEX</h1>
        <Button variant="warning">+ ADD YOUR PROJECT</Button>
        <FilterDropdown />
      </div>
      <br />
      <Project />
    </div>
  );
}

export default App;
