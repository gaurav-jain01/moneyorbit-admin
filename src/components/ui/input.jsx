import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";

function InputComponent({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  small = false,
}) {
  return (
    <TextField
      label={label}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      variant="outlined"
      fullWidth
      placeholder={placeholder}
      size={small ? "small" : "medium"}
      InputProps={{
        sx: {
          height: small ? 40 : 48, // ✅ controls box height
          display: "flex",
          alignItems: "center", // ✅ vertical center
        },
      }}
      inputProps={{
        sx: {
          padding: "0 12px", // ✅ reduce inner padding
          height: "100%",
          boxSizing: "border-box",
        },
      }}
    />
  );
}

InputComponent.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  small: PropTypes.bool,
};

export default InputComponent;
