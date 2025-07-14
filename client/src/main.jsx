import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import App from './App.jsx';
import { store, persistor } from './store/index.js';
import { ApiProvider } from "./hooks/useApiProvider.jsx";

import Toast from "./components/shared/Toast.jsx";  

import './index.css';

createRoot(document.getElementById('root')).render(
  <ReduxProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <ApiProvider>
          <App />
          <Toast />  
        </ApiProvider>
      </BrowserRouter>
    </PersistGate>
  </ReduxProvider>
);
