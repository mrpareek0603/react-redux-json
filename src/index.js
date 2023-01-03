import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import store from "./redux/store"
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Provider store={store}>
//         <App />
//       </Provider>
//     </BrowserRouter>
//   </React.StrictMode>
// )

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// "@emotion/react": "^11.10.5",
// "@emotion/styled": "^11.10.5",
// "@mui/icons-material": "^5.11.0", nahi hua
// "@mui/material": "^5.11.2", nahi hua
// "@mui/styles": "^5.11.2",