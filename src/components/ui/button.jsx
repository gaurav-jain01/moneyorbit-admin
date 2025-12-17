import Button from "@mui/material/Button";
import PropTypes from "prop-types";

function ButtonComponent({
  children,
  variant = "contained",
  onClick,
  type = "button",
  disabled
}) {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}

ButtonComponent.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  disabled: PropTypes.bool
};

export default ButtonComponent;
