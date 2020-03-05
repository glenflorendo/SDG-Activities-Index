import React  from "react";
import "./App.css";
import * as spreadsheetData from "./data";
import Project from "./components/projects/Project.jsx";
import FilterMenu from "./components/filterMenu/FilterMenu.jsx";
import AddProject from "./components/form/AddProject.js";
import { Button, Modal } from "react-bootstrap";
import headerImage from "./headerImage.png";
import footerImage from "./footerImage.png";

class App extends React.Component {
  state = {
    projects: [],
    projectsDisplay: [],
    themes: [],
    theme: "",
    sectors: [],
    goals: [],
    modal: false
  };

  componentDidMount = () => {
    spreadsheetData.getSpreadsheet().then(this.spreadsheeetSuccess);
    spreadsheetData.getGoals().then(this.goalsSuccess);
  };

  spreadsheeetSuccess = data => {
    let themesSplit = [];
    let themesList = [];
    const themesArray = data.map(data => data.theme);
    for (let i = 0; i < themesArray.length; i++) {
      themesSplit.push(themesArray[i].split(","));
    }
    const themesArr = themesSplit.flat(1);
    for (let i = 0; i < themesArr.length; i++) {
      themesList.push(themesArr[i].trim());
    }
    const themesArrayNoDuplicates = Array.from(new Set(themesList));
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
    const themeArr = this.state.projects.filter(project =>
      project.theme.includes(data)
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
      project.sdg.split(",").includes(data.id)
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

  handleShow = () => {
    this.setState({ modal: true });
  };

  handleClose = () => {
    this.setState({ modal: false });
  };

  render() {
    // const refModal = useRef();
    // const addActivity = projectForm.AddProject();
    return (
      <div style={{ backgroundColor: "white" }}>
        <img src={headerImage} width="100%" height="auto" alt="header" />
        <div style={{ margin: "40px" }}>
          <h1 style={{ textAlign: "center", size: "7" }}>
            LOS ANGELES SDGs ACTIVITIES INDEX
          </h1>

          <p style={{ color: "rgb(16, 162, 198)", textAlign: "center" }}>
            ────────
          </p>
        </div>

        <div style={{ textAlign: "center" }}>
          <Button
            className="add-project"
            type="button"
            onClick={() => {
              this.handleShow();
            }}
          >
            + ADD YOUR PROJECT
          </Button>
          <Modal
            show={this.state.modal}
            onHide={this.handleClose}
            animation={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add Your Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddProject
                themes={this.state.themes}
                sectors={this.state.sectors}
                goals={this.state.goals}
              />
            </Modal.Body>
          </Modal>
        </div>
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
        <br />
        <Project
          projects={this.state.projectsDisplay}
          goals={this.state.goals}
        />
        <img src={footerImage} width="100%" height="auto" alt="footer" />
      </div>
    );
  }
}

export default App;
