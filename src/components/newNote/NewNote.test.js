import { render, screen, describe, test, expect } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { NewNote } from "./NewNote";
import { NotesContextProvider } from "../../context/NotesContext";

describe("tests NewNote", () => {
  test("render component", async () => {
    render(
      <NotesContextProvider>
        <NewNote />
      </NotesContextProvider>
    );

    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  test("is placeholder display", async () => {
    render(
      <NotesContextProvider>
        <NewNote />
      </NotesContextProvider>
    );

    expect(
      screen.getByPlaceholderText("Type here your note...")
    ).toBeInTheDocument();
  });

  test("placeholder doesn't when user type at least a char", async () => {
    render(
      <NotesContextProvider>
        <NewNote />
      </NotesContextProvider>
    );

    const input = screen.getByTestId("textarea");
    await userEvent.type(input, "r");

    expect(
      screen.queryByPlaceholderText("Type here your note...")
    ).not.toHaveDisplayValue();
  });

  test("change input value", async () => {
    render(
      <NotesContextProvider>
        <NewNote />
      </NotesContextProvider>
    );

    const input = screen.getByTestId("textarea");
    await userEvent.type(input, "goodbye world!");

    expect(input).toHaveValue("goodbye world!");
  });

  test("input has no more that 140 characters", async () => {
    render(
      <NotesContextProvider>
        <NewNote />
      </NotesContextProvider>
    );

    const input = screen.getByTestId("textarea");
    await userEvent.type(
      input,
      "Esse officia officia laborum eu adipisicing cillum irure aliqua veniam deserunt mollit sunt est. Officia excepteur ut occaecat quis nulla magna in. Aliquip ipsum nisi dolor dolore veniam. Magna laboris dolore Lorem consectetur sunt. Elit dolore laboris ipsum magna.Esse officia officia laborum eu adipisicing cillum irure aliqua veniam deserunt mollit sunt est. Officia excepteur ut occaecat quis nulla magna in. Aliquip ipsum nisi dolor dolore veniam. Magna laboris dolore Lorem consectetur sunt. Elit dolore laboris ipsum magna."
    );

    expect(screen.getByText(/Esse officia /).value.length).toBeLessThanOrEqual(
      140
    );
  });
});
