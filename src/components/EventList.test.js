import EventList from "./EventList";

import Enzyme from "enzyme";
import Adapter from '@cfaester/enzyme-adapter-react-18';
import sinon from 'sinon';
import React from "react";

Enzyme.configure({ adapter: new Adapter() });

describe("Test <EventList /> rendering", () => {
  it("Make sure the table is there!", () => {
    const wrapper = Enzyme.shallow(<EventList />);
    console.log(wrapper.find("tr").length)
    expect(wrapper.find("table")).toBeTruthy();
  });
});
