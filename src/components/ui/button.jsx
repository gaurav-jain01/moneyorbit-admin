import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

function ButtonComponent({ children, variant = 'contained', onClick }) {
    return <Button variant={variant} onClick={onClick}>{children}</Button>;
}

ButtonComponent.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.string,
    onClick: PropTypes.func,
};

export default ButtonComponent;