//@flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router';
import Login from './modules/Login/Login';
import Chat from './modules/Chat/Chat';
import { getUserData, userIsLoggedIn } from './store/user/user.reducer';
import { bindActionCreators } from 'redux';
import ResetPassword from './modules/ResetPassword/ResetPassword';
import Faq from './modules/Faq/Faq';

type Props = {
  location: { pathname: string, search: string, hash: string, key: string },
  history: { push: Function },
  userIsLoggedIn: boolean,
};

class Routes extends React.PureComponent<Props, null> {
  componentDidMount() {
    const { userIsLoggedIn, history } = this.props;

    if (!userIsLoggedIn) {
      history.push('/login');
    } else {
      history.push('/');
    }
  }

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/faq" component={Faq} />
          <Route exact path="/" component={Chat} />
          <Route exact path="/resetpassword" component={ResetPassword} />

          <Redirect to="/login" />
        </Switch>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: getUserData(state),
  userIsLoggedIn: userIsLoggedIn(state),
});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Routes)
);
