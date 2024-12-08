import { useEffect, useState } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
            .required("Please enter your email");
        } else if (field.type === "number") {
          acc[field.name] = Yup.number()
            .typeError("Must be a number")
            .required("Please enter your age");
        } else if (field.type === "date") {
          acc[field.name] = Yup.date().required(
            "Please select your date of birth"
          );
        } else if (field.type === "select") {
          acc[field.name] = Yup.string().required("Please select gender");
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
        dob: values.dob
          ? new Date(values.dob).toISOString().split("T")[0]
          : null, // Ensure dob is formatted
      };
      if (userToEdit) {
        formattedValues.id = userToEdit.id;
      }
      setOpenPopup(true);

      // Save the data
      onSave(formattedValues);

      // Reset the form after submission
      formik.resetForm();

      // Optionally, close the popup after a slight delay
      setTimeout(() => {
        setOpenPopup(false);
      }, 2000); // Close popup after 2 seconds
    },
  });

  useEffect(() => {
    formik.setValues(initialValues); // Reset form when `userToEdit` changes
  }, [userToEdit]);

  const [openPopup, setOpenPopup] = useState(false);

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  function ThankYouPopup({ open, onClose }) {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Thank You!</DialogTitle>
        <DialogContent>
          <p>Your form has been successfully submitted.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12} size={12}>
          <h2>{userToEdit ? "Edit" : "Add"} User</h2>
        </Grid>
        {fields.map((field) => {
          if (field.type === "date") {
            return (
              <Grid item xs={12} key={field.name} size={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    fullWidth
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
              <Grid item xs={12} key={field.name} size={12}>
                <FormControlLabel
                  fullWidth
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

          if (field.type === "hobbies") {
            return (
              <Grid item xs={12} key={field.name} size={12}>
                <InputLabel style={{ marginBottom: "8px" }}>
                  {field.label}
                </InputLabel>
                <FormControl
                  component="fieldset"
                  style={{ width: "100%" }} // Ensure the field takes the full width
                  error={
                    formik.touched[field.name] &&
                    Boolean(formik.errors[field.name])
                  }
                >
                  <Grid container spacing={1}>
                    {field.options.map((option) => (
                      <Grid item xs={6} md={4} key={option}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                formik.values[field.name]?.includes(option) ||
                                false
                              }
                              onChange={(event) => {
                                const value = event.target.checked
                                  ? [...formik.values[field.name], option]
                                  : formik.values[field.name].filter(
                                      (item) => item !== option
                                    );

                                formik.setFieldValue(field.name, value);
                              }}
                              name={field.name}
                            />
                          }
                          label={option}
                        />
                      </Grid>
                    ))}
                  </Grid>
                  <FormHelperText>
                    {formik.touched[field.name] && formik.errors[field.name]}
                  </FormHelperText>
                </FormControl>
              </Grid>
            );
          }

          if (field.type === "select") {
            return (
              <Grid item xs={12} key={field.name} size={12}>
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
            <Grid item xs={12} key={field.name} size={12}>
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
          <ThankYouPopup open={openPopup} onClose={handleClosePopup} />
        </Grid>
      </Grid>
    </form>
  );
}

export default UserForm;
