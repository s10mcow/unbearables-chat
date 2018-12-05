// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { ThemeProvider } from 'styled-components';
import BaseStyles from './base-styles';
import './index.css';
import Routes from './Routes';
import getStoreAndPersistor, { history } from './store/store';
import theme from './styles/1-settings/theme';
import AppStartup from './modules/AppStartup/AppStartup';
import AppReadyWaiter from './modules/AppReadyWaiter/AppReadyWaiter';
import VerifyEmailModal from './components/VerifyEmailModal/VerifyEmailModal';

const { store, persistor } = getStoreAndPersistor();

const Application = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <PersistGate loading="loading..." persistor={persistor}>
        <BaseStyles />
        <AppStartup />
        <VerifyEmailModal />
        <ConnectedRouter history={history}>
          <AppReadyWaiter>
            <Routes />
          </AppReadyWaiter>
        </ConnectedRouter>
      </PersistGate>
    </ThemeProvider>
  </Provider>
);

export default Application;
