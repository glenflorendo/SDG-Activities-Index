import React from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import {
  RadioGroup,
  Radio,
  FormLabel,
  FormControlLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const validationSchema = yup.object().shape({
  activityType: yup
    .string()
    .required("Please select an activity type to continue"),
  // activityType: yup.mixed().oneOf(["project", "organization"]),
});

const options = [
  { value: "project", label: "Project" },
  { value: "organization", label: "Organization" },
];

export const ActivityType = ({ formData, setFormData, nextStep }) => {
  const classes = useStyles();

  return (
    <>
      <Formik
        initialValues={formData}
        onSubmit={(values) => {
          setFormData(values);
          nextStep();
        }}
        validationSchema={validationSchema}
        validateOnChange={true}
      >
        {({ errors, touched }) => (
          <Form className={classes.form}>
            <FormLabel margin="normal">Activity Type*</FormLabel>
            <RadioGroup name="activityType">
              {options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  label={option.label}
                  value={option.value}
                  control={
                    <Field
                      margin="normal"
                      as={Radio}
                      error={touched.activityType && errors.activityType}
                      helpertext={touched.activityType && errors.activityType}
                    />
                  }
                />
              ))}
            </RadioGroup>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Continue
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

ActivityType.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
};
