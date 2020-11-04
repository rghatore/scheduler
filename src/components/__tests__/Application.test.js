import React from "react";

import { render, cleanup, waitForElement, fireEvent } from "@testing-library/react";

import Application from "components/Application";

import axios from "axios";
// jest.mock('../../__mocks__/axios')

afterEach(cleanup);

// xit("renders without crashing", () => {
//   render(<Application />);
// });
// console.log('axios inside test: ', axios)

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday"))
    .then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });
});