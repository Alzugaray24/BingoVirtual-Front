import PropTypes from "prop-types";
import { Box, Grid, Typography, Alert, Link } from "@mui/material";
import SubmitButton from "./SubmitButton";
import InputField from "./InputField";

const Form = ({
  title,
  fields,
  onSubmit,
  loading,
  successMessage,
  error,
  messageType,
  link,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(fields);
  };

  return (
    <Box
      maxWidth="500px"
      margin="auto"
      padding={4}
      borderRadius={2}
      boxShadow={3}
      bgcolor="background.paper"
    >
      <Typography variant="h5" gutterBottom align="center">
        {title}
      </Typography>

      {successMessage && (
        <Alert severity={messageType} sx={{ marginBottom: 2 }}>
          {successMessage}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {fields.map((field, index) => (
            <Grid item xs={12} key={index}>
              <InputField
                label={field.label}
                type={field.type}
                value={field.value}
                onChange={field.onChange}
                autoComplete={field.autoComplete}
                required={field.required}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <SubmitButton loading={loading} text="Enviar" />
          </Grid>
          {link && (
            <Grid item xs={12} align="center">
              <Typography variant="body2">
                {link.message}{" "}
                <Link component="button" variant="body2" onClick={link.onClick}>
                  {link.text}
                </Link>
              </Typography>
            </Grid>
          )}
        </Grid>
      </form>
    </Box>
  );
};

Form.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      onChange: PropTypes.func.isRequired,
      autoComplete: PropTypes.string,
      required: PropTypes.bool,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  successMessage: PropTypes.string,
  error: PropTypes.string,
  messageType: PropTypes.string,
  link: PropTypes.shape({
    message: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func,
  }),
};

export default Form;
