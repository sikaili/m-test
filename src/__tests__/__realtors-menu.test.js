import { mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import RealtorsMenu from "../components/RealtorsMenu";
import { setCurrentRealtor, setRealtors } from "../store/features/realtorSlice";
import { store } from "../store/store";

const ReduxProvider = ({ children, reduxStore }) => (
  <Router>
    <Provider store={reduxStore}>{children}</Provider>
  </Router>
);

test("Click on menu item changes realtor, display realtors correctly", () => {
  store.dispatch(setRealtors([
    {
      id: 101,
      logo: "http://placehold.it/100x100?text=Agence+101",
      name: "Agence #101",
      unread_messages: 63,
    },
    {
      id: 102,
      logo: "http://placehold.it/100x100?text=Agence+102",
      name: "Agence #102",
      unread_messages: 59,
    },
    {
      id: 103,
      logo: "http://placehold.it/100x100?text=Agence+103",
      name: "Agence #103",
      unread_messages: 0,
    },
  ]));
  store.dispatch(setCurrentRealtor(
    {
      id: 103,
      logo: "http://placehold.it/100x100?text=Agence+103",
      name: "Agence #103",
      unread_messages: 0,
    },
  ));

  const menu = mount(
    <ReduxProvider reduxStore={store}><RealtorsMenu /></ReduxProvider>,
  );

  const firstH3 = menu.find("h3").first();
  expect(firstH3.text()).toBe("Agence #101");

  expect(store.getState().realtorSlice.currentRealtor.id).toBe(103);
  firstH3.simulate("click");
  expect(store.getState().realtorSlice.currentRealtor.id).toBe(101);
});
