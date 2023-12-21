import React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { IntlProvider } from 'react-intl'

import CssBaseline from '@material-ui/core/CssBaseline'

import theme from './_theme'
import AppRouter from './AppRouter'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor } from './store/store'; // Import Redux store

const App: React.FC = () => {
  return (
    <Provider store={store}>
      
      <PersistGate loading={null} persistor={persistor}>
    <div className="App">
      <CssBaseline />
      
      <AppRouter />
    </div>
    </PersistGate>
    </Provider>

  )
}
export default () => (
  
    <IntlProvider locale={navigator.language}>
      <ThemeProvider theme={theme}>
       
        <App />
      </ThemeProvider>
    </IntlProvider>

)
