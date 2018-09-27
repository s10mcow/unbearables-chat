// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import actions from '../../store/app/app.action';

type Props = {
  initApp: () => void,
};

class AppStartup extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.initApp();
  }
  render() {
    return null;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  initApp: () => dispatch(actions.appInit()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppStartup);
