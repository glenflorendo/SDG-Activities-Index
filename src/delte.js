import React from "react";
import "./App.css";
import * as spreadsheetData from "./data";
import Project from "./components/projects/Project.jsx";
import FilterMenu from "./components/filterMenu/FilterMenu.jsx";
import AddProject from "./components/form/AddProject.js";
import {
  Button,
  Modal,
  Spinner,
  Alert,
  Container,
  Row,
  Col
} from "react-bootstrap";
import SdgDescription from "./components/sdg-description/SdgDescription";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.resetPage = React.createRef();
    this.state = {
      projects: [],
      projectsDisplay: [],
      themes: [],
      theme: "",
      sectors: [],
      goals: [],
      modal: false,
      searchError: false,
      loading: true,
      filters: [],
      active: {},
      goalDescription: "",
      goalImage: null,
      goalColor: ""
    };
  }

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
    const themesAlphabetical = themesArrayNoDuplicates.sort();
    const sectorsArray = data.map(data => data.sector);
    const sectorsArrayNoDuplicates = Array.from(new Set(sectorsArray));
    const sectorsAlphabetical = sectorsArrayNoDuplicates.sort();
    this.setState({
      projects: data,
      projectsDisplay: data,
      themes: themesAlphabetical,
      sectors: sectorsAlphabetical,
      loading: false
    });
  };

  goalsSuccess = data => {
    this.setState({
      goals: data
    });
  };

  themeSelected = data => {
    const themeArr = this.state.projectsDisplay.filter(project =>
      project.theme.includes(data)
    );
    this.setState(prevState => ({
      filters: Array.from(new Set(this.state.filters.concat(data))),
      projectsDisplay: themeArr,
      active: {
        [data]: !prevState.active[data]
      },
      searchError: false,
      goalDescription: "",
      goalImage: null,
      goalColor: ""
    }));
  };

  sectorSelected = data => {
    const sectorArr = this.state.projectsDisplay.filter(
      project => project.sector === data
    );
    this.setState(prevState => ({
      filters: Array.from(new Set(this.state.filters.concat(data))),
      projectsDisplay: sectorArr,
      active: {
        [data]: !prevState.active[data]
      },
      searchError: false,
      goalDescription: "",
      goalImage: null,
      goalColor: "",
      sectorDropdown: true
    }));
  };

  goalSelected = (data, index) => {
    const goalArr = this.state.projectsDisplay.filter(project =>
      project.sdg.split(",").includes(data.id)
    );
    this.setState(prevState => ({
      filters: Array.from(new Set(this.state.filters.concat(data.name))),
      projectsDisplay: goalArr,
      searchError: false,
      active: {
        [index]: !prevState.active[index]
      },
      goalDescription: data.description,
      goalImage: data.image,
      goalColor: data.color
    }));
    this.resetPage.current.resetCurrentPage();
  };

  projectsSelected = () => {
    const projectsArr = this.state.projectsDisplay.filter(
      project => project.activitytype === "project"
    );
    this.setState({
      projectsDisplay: projectsArr,
      searchError: false,
      goalDescription: "",
      goalImage: null,
      goalColor: ""
    });
    this.resetPage.current.resetCurrentPage();
  };

  organizationsSelected = () => {
    const organizationsArr = this.state.projectsDisplay.filter(
      project => project.activitytype === "organization"
    );
    this.setState({
      projectsDisplay: organizationsArr,
      searchError: false,
      goalDescription: "",
      goalImage: null,
      goalColor: ""
    });
    this.resetPage.current.resetCurrentPage();
  };

  handleSearch = value => {
    const searchArr = this.state.projects.filter(entry =>
      Object.values(entry).some(
        val => typeof val === "string" && val.includes(value)
      )
    );
    this.setState({
      projectsDisplay: searchArr,
      searchError: false
    });
    if (searchArr.length === 0) {
      this.setState({
        searchError: true
      });
    }
    this.resetPage.current.resetCurrentPage();
  };

  resetFilter = () => {
    this.setState({
      projectsDisplay: this.state.projects,
      searchError: false,
      filters: [],
      goalDescription: "",
      goalImage: null,
      goalColor: ""
    });
    this.resetPage.current.resetCurrentPage();
  };

  handleShow = () => {
    this.setState({ modal: true });
  };

  handleClose = () => {
    this.setState({ modal: false });
  };

  deleteFilter = value => {
    // const matches = this.state.projects.filter(project =>
    //   this.state.filters.every(tag => Object.values(project).includes(tag))
    // );
    this.setState(prevState => ({
      filters: prevState.filters.filter(item => item !== value)
      // projectsDisplay: matches
    }));
  };

  render() {
    return (
      <div style={{ backgroundColor: "white" }}>
        <div style={{ margin: "40px" }}>
          <h1 style={{ textAlign: "center", size: "7" }}>ACTIVITIES INDEX</h1>

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
          selectedItem={this.itemSelected}
          themes={this.state.themes}
          sectors={this.state.sectors}
          selectTheme={this.themeSelected}
          selectSector={this.sectorSelected}
          searchProjects={this.handleSearch}
          selectProjects={this.projectsSelected}
          selectOrganizations={this.organizationsSelected}
          resetFilter={this.resetFilter}
          goals={this.state.goals}
          filters={this.state.filters}
          deleteFilter={this.deleteFilter}
          projects={this.state.projectsDisplay}
          selectGoal={this.goalSelected}
          active={this.state.active}
        />
        <br />
        <SdgDescription
          goalDescription={this.state.goalDescription}
          goalImage={this.state.goalImage}
          goalColor={this.state.goalColor}
        />
        {this.state.searchError ? (
          <Container>
            <Row className="justify-content-md-center">
              <Col>
                <Alert variant="danger">
                  No cards match your search. Please try filtering for the
                  content you are looking for.
                </Alert>
              </Col>
            </Row>
          </Container>
        ) : (
          <span></span>
        )}
        {this.state.loading ? (
          <Spinner
            animation="border"
            variant="info"
            style={{ position: "fixed", left: "50%" }}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : this.state.filters.length === 0 ? (
          <h1>Please reset filter</h1>
        ) : (
          <Project
            projects={this.state.projectsDisplay}
            goals={this.state.goals}
            ref={this.resetPage}
            sectors={this.state.sectors}
            selectTheme={this.themeSelected}
            selectSector={this.sectorSelected}
            selectGoal={this.goalSelected}
          />
        )}
      </div>
    );
  }
}

export default App;
