//@flow
import React from 'react';
import { Field } from 'redux-form';
import TextField from '@material-ui/core/TextField';


type Props = {
  name: string,
  type: string,
  placeholder: string,
};

type FieldProps = {
  input: {},
} & Props;

class _Input extends React.PureComponent<FieldProps> {
  render() {
    const { input, name, placeholder, type, ...rest } = this.props;
    return (
      <TextField
        {...rest}
        {...input}
        type={type}
        id={name}
        label={placeholder}
        margin="normal"
        variant="outlined"
      />
    );
  }
}

const FieldInput = (props: Props) => (
  <Field component={_Input} {...props} id={props.name} name={props.name} />
);

export default FieldInput;
