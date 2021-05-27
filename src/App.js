import "./App.scss";

import React from "react";
import {
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useMediaQuery } from "../node_modules/react-responsive/src";
import Header from "./components/Header";
import MessageList from "./components/MessageList";
import MessageView from "./components/views/MessageView";

function App() {
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 720px)",
  });

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
