import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setupSocketDataListener } from './store'; // Import the setupSocketDataListener function
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';



const DataReceiverComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const disconnectSocket = setupSocketDataListener(token, dispatch);

    return () => {
      disconnectSocket(); // Disconnect socket when component unmounts
    };
  }, [dispatch]);

  return (
    <div className="App">
   
    </div>
  );
};

const AppWithProviders = () => (
  <IntlProvider locale={navigator.language}>
    <ThemeProvider >
      <DataReceiverComponent /> {/* Use the updated component here */}
    </ThemeProvider>
  </IntlProvider>
);

export default AppWithProviders;
