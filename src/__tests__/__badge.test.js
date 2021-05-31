import { mount } from "enzyme";
import React from "react";

import Badge from "../components/Badge";

test("Badge has no color when 0", () => {
  const wrapper = mount(
    <Badge number={0} />,
  );
  const badge = wrapper.find(".Badge");
  const hasColor = badge.hasClass("Badge--active");
  expect(badge.text()).toBe(" 0");
  expect(hasColor).toBe(false);
});

test("Badge has color when > 0", () => {
  const wrapper = mount(
    <Badge number={1} />,
  );
  const badge = wrapper.find(".Badge");
  const hasColor = badge.hasClass("Badge--active");
  expect(badge.text()).toBe(" 1");
  expect(hasColor).toBe(true);
});
