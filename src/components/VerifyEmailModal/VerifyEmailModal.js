import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { connect } from 'react-redux';
import {
  appGetAccountVerified,
  appGetVerifySent,
  AppIsReadOnly,
} from 'src/store/app/app.reducer';
import { userIsLoggedIn } from 'src/store/user/user.reducer';
import actions from 'src/store/app/app.action';
import { bindActionCreators } from 'redux';

class VerifyEmailModal extends React.PureComponent {
  shouldOpenModal = (isAccountVerified, verifySent) =>
    typeof isAccountVerified === 'boolean'
      ? !isAccountVerified && !verifySent
      : false;
  render() {
    const {
      resendVerify,
      isAccountVerified,
      verifySent,
      resetVerification,
      isUserLoggedIn,
      isReadOnly,
      refresh,
    } = this.props;

    return isUserLoggedIn && !isReadOnly ? (
      <React.Fragment>
        <Dialog open={this.shouldOpenModal(isAccountVerified, verifySent)}>
          <DialogTitle>Email Bearification</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Be a good bear, verify your email...
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={resendVerify}
              color="primary"
              autoFocus
            >
              Resend Verification
            </Button>
            <Button
              variant="contained"
              onClick={refresh}
              color="default"
              autoFocus
            >
              I Did
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={verifySent}>
          <DialogTitle>Check your mail!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              In the mean time you can watch the stream for salmon.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={resetVerification}
              color="primary"
              autoFocus
            >
              OK!
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    ) : null;
  }
}

const mapStateToProps = state => ({
  isAccountVerified: appGetAccountVerified(state),
  verifySent: appGetVerifySent(state),
  isUserLoggedIn: userIsLoggedIn(state),
  isReadOnly: AppIsReadOnly(state),
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      resendVerify: () => actions.resendVerify(),
      refresh: () => actions.refresh(),
      resetVerification: () => actions.resetVerification(),
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyEmailModal);
