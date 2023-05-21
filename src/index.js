import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotificationProvider from 'use-toast-notification'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode >
    <NotificationProvider style={{backgroundColor:"rgb(100,128,128)"}}
			config={{
				position: 'top-center',
				isCloseable: false,
				showTitle: true,
				showIcon: true,
				duration: 8,
        successColor:'green',
			}}
		>
      <App  />
    </NotificationProvider>
    
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
