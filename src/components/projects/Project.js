import React from "react";
import { Card, CardColumns } from "react-bootstrap";
import style from "./Project.module.css";

class Project extends React.Component {
  state = {
    flipped: {}
  };

  flipCard = id => {
    this.setState(prevState => ({
      flipped: {
        ...prevState.flipped,
        [id]: !prevState.flipped[id]
      }
    }));
  };

  getSdgImages = projectSDGs => {
    let projectSDGsArr = projectSDGs.split(",");
    let sdgArray = this.props.goals;
    const finalArray = [];
    projectSDGsArr.forEach(projectSDG =>
      sdgArray.forEach(sdg => {
        if (projectSDG === sdg.id) {
          finalArray.push(sdg.image);
        }
      })
    );
    const sdgImages = finalArray.map((data, index) => (
      <img key={index} src={data} width="30" height="30" alt="goal" />
    ));
    return sdgImages;
  };

  render() {
    return (
      <div style={{ margin: "20px" }}>
        <CardColumns>
          {this.props.projects.map((data, index) => (
            <Card
              key={data.id}
              onClick={() => this.flipCard(data.id)}
              className={`${style.card} p-3`}
            >
              {!this.state.flipped[data.id] ? (
                <div className={style.front}>
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
                  <Card.Text>{this.getSdgImages(data.sdg)}</Card.Text>
                  <p style={{ textAlign: "right" }}>{data.theme}</p>
                </div>
              ) : (
                <div style={{ textAlign: "center" }} className={style.back}>
                  <i className="fas fa-undo" style={{ float: "right" }}></i>
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
