// We are testing a react component, so we need React.createElement
import React from "react";
// We import our helper functions from the react-testing-library
import { render, cleanup, fireEvent } from "@testing-library/react";
// We import the component that we are testing
import Form from "../Appointment/Form";
/*
  A test that renders a React Component
*/
afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  test("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(<Form interviewers={interviewers} />);
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  test("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form
        interviewers={interviewers}
        name="Clark Kent"
      />
    )
    expect(getByTestId("student-name-input")).toHaveValue("Clark Kent");
  });

  test("validates that the student name is not blank", () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn();
    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the name prop should be blank or undefined */
    const { getByText } = render(
      <Form
        interviewers={interviewers}
        onSave={onSave}
      />
    )
    /* 3. Click the save button */
    fireEvent.click(getByText("Save"));
    /* validation is shown */
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    /* onSave is not called */
    expect(onSave).not.toHaveBeenCalled();
  });

  test("calls onSave function when the name is defined", () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn();
    /* 2. Render the Form with interviewers, name and the onSave mock function passed as an onSave prop */
    const { queryByText, getByText } = render(
      <Form
        interviewers={interviewers}
        name="Clark Kent"
        onSave={onSave}
      />
    )
    /* 3. Click the save button */
    fireEvent.click(getByText("Save"));
    /* validation is not shown */
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    /* onSave is called once*/
    expect(onSave).toHaveBeenCalledTimes(1);
    /* onSave is called with the correct arguments */
    expect(onSave).toHaveBeenCalledWith("Clark Kent", null);
  });
});