import "./App.scss";
import "./assets/icons/mypro-icon.css";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useMediaQuery } from "../node_modules/react-responsive/src";
import Header from "./components/Header";
import MessageList from "./components/MessageList";
import MessageView from "./components/views/MessageView";
import { fetchRealtors } from "./features/realtorSlice";

function App() {
  const isDesktop = useMediaQuery({
    query: "(min-width: 720px)",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRealtors());
  }, []);
  return (
    <div className="App">
      <Header />
      <main className="App__main">
        <Switch>
          <Route path="/" exact>
            <MessageList />
            {isDesktop && <MessageView />}
          </Route>
          <Route path="/message/:messageId">
            {isDesktop
              && <MessageList />}
            <MessageView />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </div>
  );
}

export default App;
