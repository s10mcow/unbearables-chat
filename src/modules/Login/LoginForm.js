//@flow
import React from 'react';
// import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Input from '../../components/Input/Input';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

type OwnProps = {
  handleSubmit: Function,
  isLoggingIn: boolean,
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

class LoginForm extends React.PureComponent<OwnProps> {
  render() {
    const { isLoggingIn, handleSubmit } = this.props;
    return (
      <FormWrapper onSubmit={handleSubmit}>
        <Input
          name="username"
          type="text"
          placeholder="Username or E-Mail"
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <Button color="primary" variant="contained" size="large" type="submit">
          {isLoggingIn ? (
            <LoaderContainer>
              <CircularProgress size={20} color="secondary" />
            </LoaderContainer>
          ) : (
            'Login'
          )}
        </Button>
      </FormWrapper>
    );
  }
}

export default connect(
  null,
  null
)(reduxForm({ form: 'loginForm' })(LoginForm));
