import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Input from 'src/components/Input/Input';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const FormWrapper = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
class ResetPassword extends React.PureComponent {
  render() {
    const { handleSubmit } = this.props;

    return (
      <FormWrapper onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="E-Mail" required />
        <Button type="submit" variant="contained" color="primary">
          Send Reset email
        </Button>
      </FormWrapper>
    );
  }
}

export default connect(
  null,
  null
)(reduxForm({ form: 'passwordResetForm' })(ResetPassword));
