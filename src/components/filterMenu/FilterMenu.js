import React, { Component } from "react";
import {
  Dropdown,
  DropdownButton,
  ButtonToolbar,
  Container,
  Row,
  Col,
  Form,
  Button
} from "react-bootstrap";

class FilterMenu extends Component {
  constructor(props) {
    super(props);
    this.keyword = React.createRef();
    this.state = {
      isChecked: false,
      orgsChecked: false
    };
  }

  handleProjects = () => {
    this.setState({ isChecked: !this.state.isChecked });
    if (this.state.isChecked === false) {
      this.props.selectProjects();
    } else if (this.state.isChecked === true) {
      this.props.resetFilter();
    }
  };

  handleOrgs = () => {
    this.setState({ orgsChecked: !this.state.orgsChecked });
    if (this.state.orgsChecked === false) {
      this.props.selectOrganizations();
    } else if (this.state.orgsChecked === true) {
      this.props.resetFilter();
    }
  };

  submit() {
    var keyword = this.keyword.current.value;
    this.props.searchProjects(keyword);
  }

  render() {
    return (
      <div style={{ marginTop: "20px" }}>
        <h5>Filter by</h5>
        <ButtonToolbar aria-label="Toolbar with button groups">
          <Container>
            <Row className="justify-content-md-center">
              <Col sm={6}>
                <Form>
                  <Form.Group controlId="search">
                    <Form.Control
                      type="text"
                      placeholder="Search by Keyword"
                      ref={this.keyword}
                      onChange={() => this.submit()}
                    />
                  </Form.Group>
                </Form>
              </Col>
              <Col sm={2}>
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
              <Col sm={2}>
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
              <Col sm={2}>
                <DropdownButton
                  drop="down"
                  variant="secondary"
                  id="dropdown-basic-button"
                  title="SDG"
                >
                  {this.props.goals.map(goal => (
                    <Dropdown.Item
                      key={goal.id}
                      onClick={() => this.props.selectGoal(goal)}
                    >
                      <img src={goal.image} alt="goal" width="30" height="30" />{" "}
                      {goal.name}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </Col>
            </Row>
            <Row>
              <Col sm={4}>
                <Form.Group controlId="projectsCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Projects"
                    checked={this.state.isChecked}
                    onChange={this.handleProjects}
                  />
                </Form.Group>
              </Col>
              <Col sm={4}>
                <Form.Group controlId="orgsCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Organizations"
                    checked={this.state.orgsChecked}
                    onChange={this.handleOrgs}
                  />
                </Form.Group>
              </Col>
              <Col sm={4}>
                <Button variant="link" onClick={() => this.props.resetFilter()}>
                  Reset Filter
                </Button>
              </Col>
            </Row>
          </Container>
        </ButtonToolbar>
      </div>
    );
  }
}
export default FilterMenu;
