//@flow
import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Input from 'src/components/Input/Input';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

type OwnProps = {
  handleSubmit: Function,
};

const FormWrapper = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const LoaderContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;

class SignupForm extends React.PureComponent<OwnProps> {
  render() {
    const { isSigningUp } = this.props;
    return (
      <FormWrapper onSubmit={this.props.handleSubmit}>
        <Input name="username" type="text" placeholder="Username" required />
        <Input name="email" type="email" placeholder="E-Mail" required />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <Button color="primary" variant="contained" size="large" type="submit">
          {isSigningUp ? (
            <LoaderContainer>
              <CircularProgress size={20} color="secondary" />
            </LoaderContainer>
          ) : (
            'Signup'
          )}
        </Button>
      </FormWrapper>
    );
  }
}

export default connect(
  null,
  null
)(reduxForm({ form: 'signupForm' })(SignupForm));
