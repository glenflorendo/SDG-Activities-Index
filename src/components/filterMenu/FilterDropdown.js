import React, { Component } from "react";
import * as spreadsheetData from "../../data";
import {
  Dropdown,
  DropdownButton,
  ButtonToolbar,
  Container,
  Row,
  Col
} from "react-bootstrap";

class FilterDropdown extends Component {
  state = {
    projects: [],
    projectsDisplay: [],
    themes: [],
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

  themeSelected = event => {
    const theme = event.target.innerText;
    const themeArr = this.state.projects.filter(
      project => project.theme === theme
    );
    this.setState({
      projectsDisplay: themeArr
    });
  };

  render() {
    return (
      <div style={{ marginTop: "20px" }}>
        <Container>
          <Row className="justify-content-md-center">
            <ButtonToolbar aria-label="Toolbar with button groups">
              <Col>
                <h5>Filter by</h5>
              </Col>
              <Col>
                <DropdownButton
                  variant="secondary"
                  id="dropdown-basic-button"
                  title="Theme"
                >
                  {this.state.themes.map(theme => (
                    <Dropdown.Item key={theme} onClick={this.themeSelected}>
                      {theme}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </Col>
              <Col>
                <DropdownButton
                  variant="secondary"
                  id="dropdown-basic-button"
                  title="Sector"
                >
                  {this.state.sectors.map(sector => (
                    <Dropdown.Item key={sector} href="#/action-1">
                      {sector}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </Col>
              <Col>
                <DropdownButton
                  variant="secondary"
                  id="dropdown-basic-button"
                  title="Activity Type"
                >
                  {this.state.projects.map(data => (
                    <Dropdown.Item key={data.id} href="#/action-3">
                      {data.theme}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </Col>
            </ButtonToolbar>
          </Row>
        </Container>
      </div>
    );
  }
}
export default FilterDropdown;
