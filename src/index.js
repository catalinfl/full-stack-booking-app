import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SearchContextProvider } from './context/SearchContext';
import { AuthContextProvider } from './context/AuthContext';
import { RegisterContextProvider } from './context/RegisterContext';
import { CreateHotelContextProvider } from './context/CreateHotelContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RegisterContextProvider> 
    <AuthContextProvider>
    <SearchContextProvider> 
    <CreateHotelContextProvider>
    <App />
    </CreateHotelContextProvider>
    </SearchContextProvider>
    </AuthContextProvider>
    </RegisterContextProvider>
  </React.StrictMode>
);
