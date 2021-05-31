import "./scss/App.scss";
import "./assets/icons/mypro-icon.css";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Redirect,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";

import { useMediaQuery } from "../node_modules/react-responsive/src";
import ErrorBanner from "./components/ErrorBanner";
import Header from "./components/Header";
import MessageList from "./components/MessageList";
import { fetchRealtors, selectError } from "./store/features/realtorSlice";
import MessageView from "./view/MessageView";

function App() {
  const isDesktop = useMediaQuery({
    query: "(min-width: 720px)",
  });
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const error = useSelector(selectError);

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
            <MessageList style={{ display: !isDesktop ? "none" : "" }} />
            <MessageView />
          </Route>
          <Redirect to="/" />
        </Switch>
        {error && <ErrorBanner message={error} />}
      </main>
    </div>
  );
}

export default App;
