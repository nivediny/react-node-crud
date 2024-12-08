import { useEffect } from "react";
import {
  TextField,
  Button,
  Grid2 as Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useFormik } from "formik";
import * as Yup from "yup";

function UserForm({ userToEdit, onSave, fields }) {
  // Initial values
  const initialValues = fields.reduce((acc, field) => {
    acc[field.name] =
      userToEdit?.[field.name] || (field.type === "checkbox" ? false : "");
    return acc;
  }, {});

  // Yup validation schema
  const validationSchema = Yup.object(
    fields.reduce((acc, field) => {
      if (field.required) {
        if (field.type === "email") {
          acc[field.name] = Yup.string()
            .email("Invalid email")
            .required("This field is required");
        } else if (field.type === "number") {
          acc[field.name] = Yup.number()
            .typeError("Must be a number")
            .required("This field is required");
        } else if (field.type === "date") {
          acc[field.name] = Yup.date().required("This field is required");
        } else if (field.type === "select") {
          acc[field.name] = Yup.string().required("This field is required");
        } else {
          acc[field.name] = Yup.string().required("This field is required");
        }
      }
      return acc;
    }, {})
  );

  // Formik setup
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true, // Update form when userToEdit changes
    onSubmit: (values) => {
      const formattedValues = {
        ...values,
        dob: values.dob ? new Date(values.dob).toISOString() : null, // Ensure dob is formatted
      };
      if (userToEdit) {
        formattedValues.id = userToEdit.id;
      }
      onSave(formattedValues);
    },
  });

  useEffect(() => {
    formik.setValues(initialValues); // Reset form when `userToEdit` changes
  }, [userToEdit]);

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <Grid container spacing={2}>
        <h2>{userToEdit ? "Edit" : "Add"} User</h2>
        {fields.map((field) => {
          if (field.type === "date") {
            return (
              <Grid item xs={12} key={field.name}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label={field.label}
                    value={formik.values[field.name] || null}
                    onChange={(value) =>
                      formik.setFieldValue(field.name, value)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={
                          formik.touched[field.name] &&
                          Boolean(formik.errors[field.name])
                        }
                        helperText={
                          formik.touched[field.name] &&
                          formik.errors[field.name]
                        }
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            );
          }

          if (field.type === "checkbox") {
            return (
              <Grid item xs={12} key={field.name}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values[field.name] || false}
                      onChange={formik.handleChange}
                      name={field.name}
                    />
                  }
                  label={field.label}
                />
              </Grid>
            );
          }

          if (field.type === "select") {
            return (
              <Grid item xs={12} key={field.name}>
                <FormControl
                  fullWidth
                  error={
                    formik.touched[field.name] &&
                    Boolean(formik.errors[field.name])
                  }
                >
                  <InputLabel>{field.label}</InputLabel>
                  <Select
                    name={field.name}
                    value={formik.values[field.name] || ""}
                    onChange={formik.handleChange}
                    label={field.label}
                  >
                    {field.options.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {formik.touched[field.name] && formik.errors[field.name]}
                  </FormHelperText>
                </FormControl>
              </Grid>
            );
          }

          return (
            <Grid item xs={12} key={field.name}>
              <TextField
                label={field.label}
                fullWidth
                name={field.name}
                value={formik.values[field.name] || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched[field.name] &&
                  Boolean(formik.errors[field.name])
                }
                helperText={
                  formik.touched[field.name] && formik.errors[field.name]
                }
                required={field.required}
              />
            </Grid>
          );
        })}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            {userToEdit ? "Update" : "Add"} User
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default UserForm;
