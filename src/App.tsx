import React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { IntlProvider } from 'react-intl'

import CssBaseline from '@material-ui/core/CssBaseline'

import theme from './_theme'
import AppRouter from './AppRouter'
import { Provider } from 'react-redux';
import store from './store/store'; // Import Redux store
import SocketComponent from './SocketComponent'
const App: React.FC = () => {
  return (
    <Provider store={store}>
      
    
    <div className="App">
      <CssBaseline />
      
      <AppRouter />
    </div>
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
