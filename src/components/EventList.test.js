import EventList from "./EventList";
import fetchAPI from "./Functional/fetchAPI";

import Enzyme from "enzyme";
import Adapter from '@cfaester/enzyme-adapter-react-18';
// import sinon from 'sinon';
import React from "react";
Enzyme.configure({ adapter: new Adapter() });

describe("Test <EventList /> rendering", () => {
  it("Make sure the table is there!", () => {
    const wrapper = Enzyme.shallow(<EventList />);
    expect(wrapper.find("table")).toBeTruthy();
  });
});

describe("Test API Call", () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(
        {"result": {"count": "3", "event": {"date": "1901", "description": "January 1", "lang": "en", "category1": "January", "granularity": "year"}, "event": {"date": "1901", "description": "The world celebrates the beginning of the 20th century.", "lang": "en", "category1": "January", "granularity": "year"}, "event": {"date": "1901", "description": "The British colonies of New South Wales, Queensland, South Australia, Tasmania, Victoria and Western Australia federate as the Commonwealth of Australia. Edmund Barton becomes first Prime Minister.", "lang": "en", "category1": "January", "granularity": "year"}}}
        ),
    })
  );

  beforeEach(() => {
    fetch.mockClear();
  });

  it("Checks API Call", () => {
    fetchAPI().then(() =>{
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        `https://www.vizgr.org/historical-events/search.php?format=json&begin_date=-3000000&end_date=20151231&lang=en`
      );
    });
    
  });
});
