import Search from "./Search";

import Enzyme from "enzyme";
import Adapter from "@cfaester/enzyme-adapter-react-18";
import React from "react";

Enzyme.configure({ adapter: new Adapter() });

describe("Test <Search />", () => {
  it("handles user input", () => {
    const searchHandler = jest.fn();
    const event = {
      preventDefault() {},
      target: { value: "test the input" },
    };
    const wrapper = Enzyme.shallow(
      <Search
        onUpdateSearch={searchHandler}
        disabled={false}
        inputId="testID"
        placeholder="lorem ipsum"
      />
    );

    wrapper.find("input").simulate("change", event);
    expect(searchHandler).toBeCalledWith("test the input");
    expect(!wrapper.find("input").props().disabled).toBeTruthy();
  });

  it("check if input can be disabled", () => {
    const searchHandler = jest.fn();
    const event = {
      preventDefault() {},
      target: {
        value: "test the input",
      },
    };
    const wrapper = Enzyme.shallow(
      <Search
        onUpdateSearch={searchHandler}
        disabled={true}
        inputId="testID"
        placeholder="lorem ipsum"
      />
    );

    wrapper.find("input").simulate("change", event);
    expect(wrapper.find("input").props().disabled).toBeTruthy();
  });
});
