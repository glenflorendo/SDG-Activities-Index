import React from "react";
import "./App.css";
import * as spreadsheetData from "./data";
import Project from "./components/projects/Project";
import FilterMenu from "./components/filterMenu/FilterMenu";
import Button from "react-bootstrap/Button";

class App extends React.Component {
  state = {
    projects: [],
    projectsDisplay: [],
    themes: [],
    theme: "",
    sectors: [],
    goals: []
  };

  componentDidMount = () => {
    spreadsheetData.getSpreadsheet().then(this.spreadsheeetSuccess);
    spreadsheetData.getGoals().then(this.goalsSuccess);
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

  goalsSuccess = data => {
    this.setState({
      goals: data
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

  projectsSelected = () => {
    const projectsArr = this.state.projects.filter(
      project => project.activitytype === "project"
    );
    this.setState({
      projectsDisplay: projectsArr
    });
  };

  organizationsSelected = () => {
    const organizationsArr = this.state.projects.filter(
      project => project.activitytype === "organization"
    );
    this.setState({
      projectsDisplay: organizationsArr
    });
  };

  goalSelected = data => {
    const goalArr = this.state.projects.filter(project =>
      project.sdg.includes(data.id)
    );
    this.setState({
      projectsDisplay: goalArr
    });
  };

  resetFilter = () => {
    this.setState({
      projectsDisplay: this.state.projects
    });
  };

  handleSearch = value => {
    const searchArr = this.state.projects.filter(entry =>
      Object.values(entry).some(
        val => typeof val === "string" && val.toLowerCase().includes(value)
      )
    );
    this.setState({
      projectsDisplay: searchArr
    });
  };

  render() {
    return (
      <div className="App">
        <div style={{ textAlign: "center" }}>
          <h1>LOS ANGELES SDGs ACTIVITIES INDEX</h1>
          <Button variant="warning">+ ADD YOUR PROJECT</Button>
          <FilterMenu
            themes={this.state.themes}
            sectors={this.state.sectors}
            selectTheme={this.themeSelected}
            selectSector={this.sectorSelected}
            searchProjects={this.handleSearch}
            selectProjects={this.projectsSelected}
            selectOrganizations={this.organizationsSelected}
            resetFilter={this.resetFilter}
            goals={this.state.goals}
            selectGoal={this.goalSelected}
          />
        </div>
        <br />
        <Project
          projects={this.state.projectsDisplay}
          goals={this.state.goals}
        />
      </div>
    );
  }
}

export default App;
