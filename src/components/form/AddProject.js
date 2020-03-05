import React from "react";
import styled from "styled-components";
import { Form, Button, Popover, OverlayTrigger, Alert } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import themesInfo from "../../themesInfo.png";
import { addProject } from "../../data";

const CONTAINER = styled.div`
  .error {
    border: 2px solid #ff6565;
  }
  .error-message {
    color: #ff6565;
    padding: 0.5em 0.2em;
    height: 1em;
    position: absolute;
    font-size: 0.8em;
  }
`;

const BUTTON = styled(Button)`
  background: #1863ab;
  border: none;
  font-size: 1.2em;
  font-weight: 400;
  &:hover {
    background: #1d3461;
  }
`;

// Schema for yup
const validationSchema = Yup.object().shape({
  projectname: Yup.string()
    .min(2, "*Names must have at least 2 characters")
    .max(100, "*Names can't be longer than 100 characters")
    .required("*Name is required"),
  description: Yup.string()
    .max(250, "*Description must be less than 250 characters"),
  organization: Yup.string()
    .min(2, "*Organiation name must have at least 2 characters")
    .max(100, "*Organization name can't be longer than 100 characters")
    .required("*Organization name is required"),
  website: Yup.string()
    .url("*Must enter URL in http://www.example.com format")
    .required("*URL required")
  // themes: Yup.required(
  //   "Please indicate your communications preference"
  // ),
  // sector: Yup.oneOf(props.sectors).required("Required"),
  // // sdg: Yup.oneOf([props.goals]).required(
  // //   "Please indicate your communications preference"
  // // ),
  // activtyType: Yup.string()
  //   .oneOf(["project", "organization"], "You must select and activity type")
  //   .required("Required")
});

const AddProject = props => {
  return (
    <CONTAINER>
      <Formik
        initialValues={{
          projectname: "",
          description: "",
          organization: "",
          website: "",
          // themes: [],
          sector: "",
          // sdg: [],
          activityType: ""
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          // When button submits form and form is in the process of submitting, submit button is disabled
          setSubmitting(true);

          // Simulate submitting to database, shows us values submitted, resets form
          setTimeout(() => {
            addProject(values);
            alert("Thank you for submitting your project! We will review and add it to our website soon")
            resetForm();
            setSubmitting(false);
          }, 500);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <Form onSubmit={handleSubmit} className="mx-auto">
            <Form.Group controlId="formProjectName">
              <Form.Label>Project Name*</Form.Label>
              <Form.Control
                type="text"
                name="projectname"
                placeholder="Project Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                className={
                  touched.projectname && errors.projectname ? "has-error" : null
                }
              />
              {touched.projectname && errors.projectname ? (
                <div className="error-message">{errors.projectname}</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="Description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                className={
                  touched.description && errors.description ? "has-error" : null
                }
              />
              {touched.description && errors.description ? (
                <div className="error-message">{errors.description}</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formOrganization">
              <Form.Label>Organization*</Form.Label>
              <Form.Control
                type="text"
                name="organization"
                placeholder="Organization"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.organization}
                className={
                  touched.organization && errors.organization
                    ? "has-error"
                    : null
                }
              />
              {touched.organization && errors.organization ? (
                <div className="error-message">{errors.organization}</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formWebsite">
              <Form.Label>Website*</Form.Label>
              <Form.Control
                type="text"
                name="website"
                placeholder="Website URL"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.website}
                className={
                  touched.website && errors.website ? "has-error" : null
                }
              />
              {touched.website && errors.website ? (
                <div className="error-message">{errors.website}</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formSector">
              <Form.Label>Sector*</Form.Label>
              <Form.Control
                name="sector"
                placeholder="sector"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.sector}
                className={touched.sector && errors.sector ? "has-error" : null}
                as="select"
              >
                <option>Select a sector</option>
                {props.sectors.map(sector => (
                  <option key={sector}>{sector}</option>
                ))}
                {touched.website && errors.website ? (
                  <div className="error-message">{errors.website}</div>
                ) : null}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formThemes" name="theme">
              <Form.Label>Themes* <small>(Select all that apply)</small></Form.Label>

              <Form.Control
                name="themes"
                placeholder="themes"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.themes}
                className={touched.themes && errors.themes ? "has-error" : null}
                as="select"
                multiple
              >
                {props.themes.map(theme => (
                  <option key={theme}>{theme}</option>
                ))}
                {touched.themes && errors.themes ? (
                  <div className="error-message">{errors.themes}</div>
                ) : null}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="sdg">
              <Form.Label>SDGs* <small>(Select all that apply)</small></Form.Label>{" "}
              <OverlayTrigger
                placement="right"
                overlay={
                  <Popover>
                    <img
                      src={themesInfo}
                      width="550px"
                      height="auto"
                      alt="SDG Guide"
                    />
                  </Popover>
                }
              >
                <i style={{ margin: "5px" }} className="fas fa-info-circle"></i>
              </OverlayTrigger>
              <Form.Control
                name="sdg"
                placeholder="sdg"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.sdg}
                className={touched.sdg && errors.sdg ? "has-error" : null}
                as="select"
                multiple
              >
                {props.goals.map(goal => (
                  <option
                    key={goal.id}
                    // onClick={() => this.props.selectgoal(goal)}
                  >
                    {goal.id} {goal.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formActivityType">
              <Form.Label>Activity Type*</Form.Label>
              <Form.Check
                type="radio"
                name="activityType"
                label="Project"
                onChange={handleChange}
                onBlur={handleBlur}
                value="project"
                className={
                  touched.activityType && errors.activityType
                    ? "has-error"
                    : null
                }
              />
              <Form.Check
                type="radio"
                name="activityType"
                label="Organization"
                value="organization"
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  touched.activityType && errors.activityType
                    ? "has-error"
                    : null
                }
              />
            </Form.Group>

            {/*Submit button that is disabled after button is clicked/form is in the process of submitting*/}
            <BUTTON variant="primary" type="submit" disabled={isSubmitting}>
              Submit
            </BUTTON>{}
            
          </Form>
        )}
      </Formik>
    </CONTAINER>
  );
};

export default AddProject;
