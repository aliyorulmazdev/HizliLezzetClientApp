import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import CallWaiterButton from "../app/Components/CallWaiterButton";

describe("CallWaiterButton", () => {
  it("should render the button correctly", () => {
    const { getByText } = render(<CallWaiterButton />);
    const buttonElement = getByText("Call Waiter");
    expect(buttonElement).toBeInTheDocument();
  });

  it("should open the dialog when the button is clicked", () => {
    render(<CallWaiterButton />);
    const buttonElement = screen.getByText("Call Waiter");
    fireEvent.click(buttonElement);

    const dialogElement = screen.getByText("Are you sure you want to call the waiter?");
    expect(dialogElement).toBeInTheDocument();
  });
});
