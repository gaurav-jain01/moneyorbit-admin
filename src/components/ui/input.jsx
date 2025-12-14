import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

function InputComponent({ label, type = 'text', value, onChange }) {
    return <TextField id="outlined-basic" 
    label={label} 
    type={type} 
    value={value} 
    onChange={(e) => onChange(e.target.value)} 
    variant="outlined" 
    fullWidth
    />
}

InputComponent.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

export default InputComponent;