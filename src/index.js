import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { saveToLocalStorage } from "./js/helpers";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store/store";

store.subscribe(() => {
  saveToLocalStorage("state", store.getState());
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>

  </React.StrictMode>,
  document.getElementById("root"),
);

reportWebVitals();
