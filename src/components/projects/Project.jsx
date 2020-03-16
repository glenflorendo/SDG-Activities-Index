import React from "react";
import { Card, Container, CardColumns, Pagination, Row } from "react-bootstrap";
import style from "./Project.module.css";
import Fade from "react-reveal/Fade";

class Project extends React.Component {
  state = {
    flipped: {},
    backgroundColor: "",
    height: {},
    currentPage: 1,
    projectsPerPage: 11
  };

  flipCard = data => {
    console.log(data);
    let cardHeight = document.getElementById(data).offsetHeight;
    this.setState(prevState => ({
      flipped: {
        ...prevState.flipped,
        [data]: !prevState.flipped[data]
      },
      height: {
        ...prevState.height,
        [data]: cardHeight
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
          const sdgData = { image: sdg.image, sdg};
          finalArray.push(sdgData);
        }
      })
    );
    const sdgImages = finalArray.map((data, index) => (
      <img
        key={index}
        onClick={() => this.props.selectGoal(data.sdg, index)}
        src={data.image}
        width="auto"
        height="60"
        alt="goal"
        className={style.sdgImage}
      />
    ));
    return sdgImages;
  };

  displayThemes = themes => {
    let themesArr = themes.split(",");
    const themesDisplay = themesArr.map((data, index) => (
      <span
        key={index}
        className={style.theme}
        onClick={() => this.props.selectTheme(data)}
      >
        {" "}
        {data}
      </span>
    ));
    return themesDisplay;
  };

  getPages = () => {
    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(this.props.projects.length / this.state.projectsPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }
    const items = pageNumbers.map(number => (
      <Pagination.Item
        key={number}
        id={number}
        onClick={e => this.handleClick(e)}
        active={number === this.state.currentPage}
      >
        {number}
      </Pagination.Item>
    ));
    return items;
  };

  handleClick = event => {
    this.setState({
      currentPage: Number(event.target.id)
    });
  };

  resetCurrentPage = () => {
    this.setState({
      currentPage: 1
    });
  };

  render() {
    const indexOfLastProject =
      this.state.currentPage * this.state.projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - this.state.projectsPerPage;
    const currentProjects = this.props.projects.slice(
      indexOfFirstProject,
      indexOfLastProject
    );

    return (
      <div className={style.projects}>
        <Container>
          <Row className="justify-content-end">
            <Pagination>{this.getPages()}</Pagination>
          </Row>
          <CardColumns>
            {currentProjects.map((data, index) => (
              <Fade key={data.id} bottom>
                {/* <div className={style.card}> */}
                {!this.state.flipped[data.id] ? (
                  <Card
                    style={{
                      marginTop: "20px",
                      textAlign: "center"
                    }}
                    className="mb-4 p-3"
                    id={data.id}
                  >
                    <i
                      className={`${style.flipIcon} fas fa-undo`}
                      style={{
                        color: "#455262"
                      }}
                      onClick={() => this.flipCard(data.id)}
                    ></i>
                    <p
                      style={{ color: "#a6a6a6" }}
                      className={style.sector}
                      onClick={() => this.props.selectSector(data.sector)}
                    >
                      {data.sector}
                    </p>

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
                    id={data.id}
                  >
                    <i
                      className={`${style.flipIcon} fas fa-undo`}
                      onClick={() => this.flipCard(data.id)}
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
                {/* </div> */}
              </Fade>
            ))}
          </CardColumns>
          <Row className="justify-content-center">
            <Pagination>{this.getPages()}</Pagination>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Project;
