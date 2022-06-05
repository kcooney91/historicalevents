import HistoricalEvents from "./HistoricalEvents";

import Enzyme from "enzyme";
import Adapter from "@cfaester/enzyme-adapter-react-18";
import React from "react";

Enzyme.configure({ adapter: new Adapter() });

describe("Test <HistoricalEvents /> rendering", () => {
  it("Make sure the heading is there, comply with WCAG", () => {
    const wrapper = Enzyme.shallow(<HistoricalEvents />);
    expect(wrapper.find("h1")).toBeTruthy();
  });
});
