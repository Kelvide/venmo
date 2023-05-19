import React from 'react';
import ReactDOM from 'react-dom/client';

import '../src/styles/global.css';
import App from './App';
import { TransactionProvder } from './components/context/contexts';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TransactionProvder>
      <App />
    </TransactionProvder>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();