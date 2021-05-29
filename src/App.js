import "./App.scss";
import "./assets/icons/mypro-icon.css";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Redirect,
  Route,
  Switch,
  useLocation,
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
  const { pathname } = useLocation();

  useEffect(() => {
    const arr = pathname.split("/");
    const hasRealtorParam = arr[1] === "realtor" && arr[2];
    dispatch(fetchRealtors(hasRealtorParam ? arr[2] : 0));
  }, []);
  return (
    <div className="App">
      <Header />
      <main className="App__main">
        <Switch>
          <Route path={["/", "/realtor/:realtorId"]} exact>
            <MessageList />
            {isDesktop && <MessageView />}
          </Route>
          <Route path="/realtor/:realtorId/message/:messageId">
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
