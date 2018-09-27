// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { appIsInitialized } from '../../store/app/app.reducer';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import img from 'assets/images/splash.png';

type Props = {
  appIsReady: boolean,
  children: React.Node,
};

const LoadingImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const LoadingImage = styled.div`
  width: 300px;
  height: 300px;
  background-image: ${`url(${img})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

const AppReadyWaiter = ({ appIsReady, children }: Props): React.Node => {
  if (!appIsReady) {
    return (
      <LoadingImageWrapper>
        <LoadingImage />
      </LoadingImageWrapper>
    );
  }
  return <React.Fragment>{children}</React.Fragment>;
};

const mapStateToProps = state => ({
  appIsReady: appIsInitialized(state),
});

const mapDispatchToProps = dispatch => ({});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppReadyWaiter)
);
