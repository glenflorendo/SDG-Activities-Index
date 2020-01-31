import React from "react";
import "./App.css";
import * as spreadsheetData from "./data";
import Project from "./components/projects/Project";
import FilterDropdown from "./components/filterMenu/FilterDropdown";
import Button from "react-bootstrap/Button";

class App extends React.Component {
  state = {
    projects: [],
    projectsDisplay: [],
    themes: [],
    theme: "",
    sectors: []
  };

  componentDidMount = () => {
    spreadsheetData.getSpreadsheet().then(this.spreadsheeetSuccess);
  };

  spreadsheeetSuccess = data => {
    const themesArray = data.map(data => data.theme);
    const themesArrayNoDuplicates = Array.from(new Set(themesArray));
    const sectorsArray = data.map(data => data.sector);
    const sectorsArrayNoDuplicates = Array.from(new Set(sectorsArray));
    this.setState({
      projects: data,
      projectsDisplay: data,
      themes: themesArrayNoDuplicates,
      sectors: sectorsArrayNoDuplicates
    });
  };

  themeSelected = data => {
    const themeArr = this.state.projects.filter(
      project => project.theme === data
    );
    this.setState({
      projectsDisplay: themeArr
    });
  };
  sectorSelected = data => {
    const sectorArr = this.state.projects.filter(
      project => project.sector === data
    );
    this.setState({
      projectsDisplay: sectorArr
    });
  };

  render() {
    return (
      <div className="App">
        <div style={{ textAlign: "center" }}>
          <h1>LOS ANGELES SDGs ACTIVITIES INDEX</h1>
          <Button variant="warning">+ ADD YOUR PROJECT</Button>
          <FilterDropdown
            themes={this.state.themes}
            sectors={this.state.sectors}
            selectTheme={this.themeSelected}
            selectSector={this.sectorSelected}
          />
        </div>
        <br />
        <Project projects={this.state.projectsDisplay} />
      </div>
    );
  }
}

export default App;
