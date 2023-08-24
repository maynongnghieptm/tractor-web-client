import React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { IntlProvider } from 'react-intl'
import store from '../src/Account/store';
import CssBaseline from '@material-ui/core/CssBaseline'
import { Provider } from 'react-redux'
import theme from './_theme'
import AppRouter from './AppRouter'
import DataReceiverComponent from '../src/Account/data'
const App: React.FC = () => {
  return (

    <div className="App">
      <CssBaseline />
      <AppRouter />
    </div>
   
  )
}
export default () => (
  <Provider store={store}> {/* Bọc bởi Provider */}
    <IntlProvider locale={navigator.language}>
      <ThemeProvider theme={theme}>
        <DataReceiverComponent/>
        <App />
      </ThemeProvider>
    </IntlProvider>
  </Provider>
)
