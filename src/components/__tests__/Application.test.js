import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  waitForElementToBeRemoved,
  queryByText,
  queryByAltText,
  getByDisplayValue
} from "@testing-library/react";

import Application from "components/Application";

import axios from "axios";
// jest.mock('../../__mocks__/axios')

afterEach(cleanup);

// xit("renders without crashing", () => {
//   render(<Application />);
// });
// console.log('axios inside test: ', axios)

describe("Application", () => {
  test("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday"))
      .then(() => {
        fireEvent.click(getByText("Tuesday"));
        expect(getByText("Leopold Silvers")).toBeInTheDocument();
      });
  });

  test("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    // console.log(prettyDOM(container));
    // const appointments = getAllByTestId(container, "appointment");
    // console.log(prettyDOM(appointments));
    const appointment = getAllByTestId(container, "appointment")[0];
    fireEvent.click(getByAltText(appointment, "Add"));
    // console.log(prettyDOM(appointment));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    // console.log(prettyDOM(appointment));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));
    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();
    // debug();
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    // console.log(prettyDOM(day));
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  test("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the first booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the element with the text "Confirm" is displayed.
    expect(getByText(appointment, /are you sure you would like to delete?/i)).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirm component.
    fireEvent.click(getByText(appointment, /confirm/i));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, /deleting/i)).toBeInTheDocument();

    // 7. Wait until the element with the text "Add" is displayed.
    await waitForElementToBeRemoved(() => getByText(appointment, /deleting/i));
    expect(getByAltText(appointment, /add/i)).toBeInTheDocument();
    // debug();

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    // console.log(prettyDOM(day));
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  test("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Edit" button on the first booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    
    fireEvent.click(queryByAltText(appointment, "Edit"));
    
    // 4. Check that the form with name Archie Cohen is shown.
    // console.log(prettyDOM(appointment));
    expect(getByDisplayValue(appointment, /Archie Cohen/i)).toBeInTheDocument();

    // 5. Edit the name and click the "save" button on the confirm component.
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Clark Kent" }
    });

    fireEvent.click(getByText(appointment, /save/i));

    // 6. Check that the element with the text "saving" is displayed.
    expect(getByText(appointment, /saving/i)).toBeInTheDocument();

    // 7. Wait until the element with the text "Clark Kent" is displayed.
    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));
    expect(getByText(appointment, "Clark Kent")).toBeInTheDocument();
    // debug();

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  })

});