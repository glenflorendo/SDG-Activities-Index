import React from "react";
import * as spreadsheetData from "../../data";
import styles from "./Project.module.css";
import { Card, CardColumns } from "react-bootstrap";

class Project extends React.Component {
  state = {
    projects: [],
    flipped: {}
  };

  componentDidMount = () => {
    spreadsheetData.getSpreadsheet().then(this.spreadsheeetSuccess);
  };

  spreadsheeetSuccess = data => {
    this.setState({
      projects: data
    });
  };

  flipCard = id => {
    this.setState(prevState => ({
      flipped: {
        ...prevState.flipped,
        [id]: !prevState.flipped[id]
      }
    }));
  };

  render() {
    return (
      <div style={{ margin: "20px" }}>
        <CardColumns>
          {this.state.projects.map((data, index) => (
            <Card
              key={data.id}
              className="p-3"
              onClick={() => this.flipCard(data.id)}
            >
              {!this.state.flipped[data.id] ? (
                <div>
                   <p>{data.sector}</p>
                  <Card.Body
                    style={{
                      textAlign: "center",
                      backgroundColor: "lightgrey"
                    }}
                  >
                    <Card.Title>{data.projectname}</Card.Title>
                    <Card.Text>{data.organization}</Card.Text>
                  </Card.Body>
                  <Card.Text>{data.sdg}</Card.Text>
                  <p style={{ textAlign: "right" }}>{data.theme}</p>
                </div>
              ) : (
                <div style={{ textAlign: "center", backgroundColor: "0083BF" }}>
                  <Card.Title>{data.projectname}</Card.Title>
                  <Card.Text>{data.organization}</Card.Text>
                  <small>{data.description}</small>
                  <br />
                  <Card.Link href={`${data.website}`}>Read More</Card.Link>
                </div>
              )}
            </Card>
          ))}
        </CardColumns>
      </div>
    );
  }
}
export default Project;
