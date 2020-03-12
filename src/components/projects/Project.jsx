import React from "react";
import { Card, Container, CardColumns } from "react-bootstrap";
import style from "./Project.module.css";
import Fade from "react-reveal/Fade";

class Project extends React.Component {
  state = {
    flipped: {},
    backgroundColor: "",
    height: {}
  };

  flipCard = id => {
    let cardHeight = document.getElementById(id).offsetHeight;
    console.log(cardHeight);
    this.setState(prevState => ({
      flipped: {
        ...prevState.flipped,
        [id]: !prevState.flipped[id]
      },
      height: {
        ...prevState.height,
        [id]: cardHeight
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
      <img key={index} src={data} width="auto" height="60" alt="goal" />
    ));
    return sdgImages;
  };

  displayThemes = themes => {
    let themesArr = themes.split(",");
    const themesDisplay = themesArr.map((data, index) => (
      <span key={index} className={style.theme}>
        {" "}
        {data}
      </span>
    ));
    return themesDisplay;
  };

  render() {
    return (
      <div className={style.projects}>
        <Container>
          <CardColumns>
            {this.props.projects.map((data, index) => (
              <Fade key={data.id} bottom>
                <div
                  onClick={() => this.flipCard(data.id)}
                  className={style.card}
                >
                  {!this.state.flipped[data.id] ? (
                    <Card
                      style={{ marginTop: "20px", textAlign: "center" }}
                      className="mb-4 p-3"
                      id={data.id}
                    >
                      <p style={{ color: "#a6a6a6" }}>{data.sector}</p>
                      <Card.Body>
                        <Card.Title
                          style={{
                            fontSize: "20px",
                            color:
                              data.activitytype === "organization"
                                ? "#ff9244"
                                : "#2c88c8"
                          }}
                        >
                          {data.projectname}
                        </Card.Title>
                        <Card.Text>{data.organization}</Card.Text>
                      </Card.Body>
                      <Card.Text>{this.getSdgImages(data.sdg)}</Card.Text>
                      <div
                        className={style.themes}
                        style={{ display: "inline-block" }}
                      >
                        {this.displayThemes(data.theme)}
                      </div>
                    </Card>
                  ) : (
                    <Card
                      style={{
                        height: this.state.height[data.id],
                        overflow: "auto",
                        color: "white",
                        marginTop: "20px",
                        textAlign: "center",
                        backgroundColor:
                          data.activitytype === "organization"
                            ? "#ff9244"
                            : "#2c88c8"
                      }}
                      className="p-3"
                    >
                      <i
                        className="fas fa-undo"
                        style={{ marginBottom: "10px" }}
                      ></i>
                      <Card.Title>{data.projectname}</Card.Title>
                      <Card.Text>{data.organization}</Card.Text>
                      <small>{data.description}</small>
                      <br />
                      <a
                        className={style.readMore}
                        href={`${data.website}`}
                        target="_blank"
                      >
                        Read More
                      </a>
                    </Card>
                  )}
                </div>
              </Fade>
            ))}
          </CardColumns>
        </Container>
      </div>
    );
  }
}
export default Project;
