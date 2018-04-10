import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'

// Presentation component template
export const FieldGroup = (id, label, help, ...props) => 
{<FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
</FormGroup>}
