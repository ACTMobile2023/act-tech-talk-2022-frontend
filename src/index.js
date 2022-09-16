import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.min.css';
import {BrowserRouter, Route, Routes } from "react-router-dom";
import {createStore} from "redux";
import rootReducers from "./redux/reducers/index"
import {Provider} from "react-redux";

const store = createStore(rootReducers);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store} >
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<App />}/>
              </Routes>
          </BrowserRouter>
      </Provider>
  </React.StrictMode>
);

reportWebVitals();
