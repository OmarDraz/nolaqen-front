import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


const theme = createMuiTheme({
    overrides: {
      // Style sheet name ⚛️
      MuiPaper: {
          root: {
            backgroundColor: 'none',
            overflow: 'hidden',
            margin: '-10px 0'
          }
      },
      MuiButton: {
        // Name of the rule
        label: {
            overflow: 'hidden'
        }
      },
    },
  });

ReactDOM.render( <ThemeProvider theme={theme}>
  <App />
  </ThemeProvider>, document.getElementById('root'))
    // If you want to start measuring performance in your app, pass a function
    // to log results (for example: reportWebVitals(console.log))
    // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals