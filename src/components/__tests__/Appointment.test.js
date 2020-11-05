import React from "react";
import { render } from "@testing-library/react";
import Appointment from "../Appointment";

describe("Appointment", () => {
  test("renders without crashing", () => {
    render(<Appointment />);
  });
});