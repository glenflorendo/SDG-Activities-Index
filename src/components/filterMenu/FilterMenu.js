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
  }

  submit() {
    var keyword = this.keyword.current.value;
    this.props.searchProjects(keyword);
  }

  render() {
    return (
      <div style={{ marginTop: "20px" }}>
        <Container>
          <Row className="justify-content-md-center">
            <h5>Filter by</h5>
            <ButtonToolbar aria-label="Toolbar with button groups">
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
          <Row>
            <Col>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Projects" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Organizations" />
              </Form.Group>
            </Col>
            <Col>
              <Button variant="link" onClick={() => this.props.resetFilter()}>
                Reset Filter
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default FilterMenu;
