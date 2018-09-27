//@flow
import React from 'react';
// import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Input from 'src/components/Input/Input';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

type OwnProps = {
  handleSubmit: Function,
};

const FormWrapper = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

class LoginForm extends React.PureComponent<OwnProps> {
  render() {
    return (
      <FormWrapper onSubmit={this.props.handleSubmit}>
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
          Login
        </Button>
      </FormWrapper>
    );
  }
}

export default connect(
  null,
  null
)(reduxForm({ form: 'loginForm' })(LoginForm));
