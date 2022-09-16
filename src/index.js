import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.min.css';
import {BrowserRouter, Route, Routes } from "react-router-dom";
import Attenders from "./components/AttenderList/Attenders";
import {createStore} from "redux";
import rootReducers from "./redux/reducers/index"
import {Provider} from "react-redux";
import AddSuccess from "./components/AddSuccess/AddSuccess";

const store = createStore(rootReducers);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store} >
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<App />}/>
                  <Route path="/attenders" element={<Attenders />} />
                  <Route path="/add-success" element={<AddSuccess />} />
              </Routes>
          </BrowserRouter>
      </Provider>
  </React.StrictMode>
);

reportWebVitals();
