import React, { Component } from "react";
import {
  Dropdown,
  DropdownButton,
  ButtonToolbar,
  Container,
  Row,
  Col
} from "react-bootstrap";

class FilterDropdown extends Component {
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
                  {this.props.themes.map(theme => (
                    <Dropdown.Item
                      key={theme}
                      onClick={() => this.props.selectTheme(theme)}
                    >
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
                  {this.props.sectors.map(sector => (
                    <Dropdown.Item
                      key={sector}
                      onClick={() => this.props.selectSector(sector)}
                    >
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
                  {/* {this.state.projects.map(data => (
                    <Dropdown.Item key={data.id} href="#/action-3">
                      {data.theme}
                    </Dropdown.Item>
                  ))} */}
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
