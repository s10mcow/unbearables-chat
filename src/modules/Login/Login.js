//@flow
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from 'src/store/user/user.action';
import { isLoggingIn, isSigningUp } from 'src/store/user/user.reducer';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { type UserObjectType, type ErrorStateType } from 'src/types';
import { Wrapper, Container, Error } from './LoginComponents';
import { getError } from 'src/store/error/error.reducer';
import { withRouter } from 'react-router';

type OwnProps = {
  userLogin: Function,
  userSignup: Function,
  user: UserObjectType,
  error: ErrorStateType,
  isLoggingIn: boolean,
  isSigningUp: boolean,
  history: Function,
};

type State = {
  showLogin: boolean,
};

class Login extends React.PureComponent<OwnProps, State> {
  componentDidMount() {}

  state = {
    showLogin: true,
    resetPassword: false,
  };

  login = ({ username, password }) => {
    this.props.userLogin(username, password);
  };

  signup = ({ username, password, email }) => {
    this.props.userSignup(username, password, email);
  };

  render() {
    const { error, isLoggingIn, isSigningUp, history } = this.props;

    return (
      <article>
        <Helmet>
          <title>Login Signup</title>
          <meta name="description" content="Login signup page" />
        </Helmet>
        <Container>
          {this.state.showLogin && (
            <Wrapper>
              <Card className="Card">
                <CardHeader title="Login" />
                <CardContent>
                  <LoginForm onSubmit={this.login} isLoggingIn={isLoggingIn} />
                  <Error>{error.loginError}</Error>
                  <Button onClick={() => this.setState({ showLogin: false })}>
                    Goto Signup
                  </Button>
                  <Button onClick={() => history.push('/resetpassword')}>
                    Forgot Password
                  </Button>
                </CardContent>
              </Card>
            </Wrapper>
          )}

          {!this.state.showLogin && (
            <Wrapper>
              <Card className="Card">
                <CardHeader title="Signup" />
                <CardContent>
                  <SignupForm
                    onSubmit={this.signup}
                    isSigningUp={isSigningUp}
                  />
                  <Error>{error.signupError}</Error>
                  <Button onClick={() => this.setState({ showLogin: true })}>
                    Goto Login
                  </Button>
                </CardContent>
              </Card>
            </Wrapper>
          )}
        </Container>
      </article>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      userLogin: (email, password) => actions.userLogin(email, password),
      userSignup: (username, password, email) =>
        actions.userSignup(username, password, email),
    },
    dispatch
  );

const mapStateToProps = state => ({
  user: state && state.user,
  error: getError(state),
  isLoggingIn: isLoggingIn(state),
  isSigningUp: isSigningUp(state),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);
