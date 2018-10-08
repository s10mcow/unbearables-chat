//@flow
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from 'src/store/user/user.action';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { type UserObjectType, type ErrorStateType } from 'src/types';
import { Wrapper, Container, Error } from '../Login/LoginComponents';
import { getError } from 'src/store/error/error.reducer';
import ResetPasswordForm from './ResetPasswordForm';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';

type OwnProps = {
  userLogin: Function,
  userSignup: Function,
  user: UserObjectType,
  error: ErrorStateType,
};

type State = {
  showLogin: boolean,
};

class ResetPassword extends React.PureComponent<OwnProps, State> {
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

  resetPassword = ({ email }) => {
    this.props.userResetPassword(email);
  };

  render() {
    const { error } = this.props;

    return (
      <article>
        <Helmet>
          <title>Reset Password</title>
          <meta name="description" content="ResetPassword page" />
        </Helmet>
        <Container>
          <Wrapper>
            <Card className="Card">
              <CardHeader title="Reset Password" />
              <CardContent>
                <ResetPasswordForm onSubmit={this.resetPassword} />{' '}
                <Error>{error.passwordError}</Error>
                <Button onClick={() => this.props.history.push('/login')}>
                  Goto Login
                </Button>
              </CardContent>
            </Card>
          </Wrapper>
        </Container>
      </article>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      userResetPassword: email => actions.userResetPassword(email),
    },
    dispatch
  );

const mapStateToProps = state => ({
  error: getError(state),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ResetPassword)
);
