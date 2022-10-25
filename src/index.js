import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "tailwindcss/tailwind.css";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from 'react-redux';
import rootReducer from "./reducers/rootReducer";


console.log("hi");
let store = configureStore({
  reducer:{rootReducer}
});

ReactDOM.render(
  <React.StrictMode>
     <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
