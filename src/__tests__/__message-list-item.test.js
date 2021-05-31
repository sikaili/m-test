import { mount } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";

import MessageListItem from "../components/MessageListItem";

const timeString = "2021-05-10T08:16:07.049461";
const dataFormatted = "10/05/2021";
const name = "Tom";

test("renders correctly", () => {
  const component = renderer.create(
    <MessageListItem sender={name} time={timeString} />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Date is correct", () => {
  const wrapper = mount(
    <MessageListItem sender={name} time={timeString} />,
  );
  const sender = wrapper.find(".MessageListItem__sender");
  const time = wrapper.find(".MessageListItem__time");
  expect(sender && sender.text()).toBe(name);
  expect(time.text()).toBe(dataFormatted);
});

test("Display weekday when within a week", () => {
  const timeString = String(Number(new Date()) - 24 * 3600 * 1000 * 3);
  const wrapper = mount(
    <MessageListItem time={timeString} />,
  );
  const time = wrapper.find(".MessageListItem__time");
  expect(time.text()).toMatch(/[a-z]+/);
});
