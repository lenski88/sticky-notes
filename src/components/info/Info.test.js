import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Info } from "./Info";
import { NewNote } from "../newNote/NewNote";
import {
  formatDateTime,
  NotesContextProvider,
} from "../../context/NotesContext";

describe("tests Info", () => {
  test("render component", () => {
    render(
      <NotesContextProvider>
        <Info />
      </NotesContextProvider>
    );

    expect(screen.getByTestId("info-component")).toBeInTheDocument();
  });

  test("test total tasks", () => {
    render(
      <NotesContextProvider>
        <Info />
      </NotesContextProvider>
    );

    expect(screen.getByText(/Quantity of tasks/)).toBeInTheDocument();
  });

  test("test not display last date component when it doesn't exist", () => {
    render(
      <NotesContextProvider>
        <Info />
      </NotesContextProvider>
    );

    expect(screen.getByTestId("empty-last-note").textContent).toBe("");
  });

  test("test display last date component", async () => {
    render(
      <NotesContextProvider>
        <NewNote />
        <Info />
      </NotesContextProvider>
    );

    const input = screen.getByTestId("textarea");
    await userEvent.type(input, "new task");
    await userEvent.click(screen.getByTestId("create-note-btn"));

    const now = formatDateTime(new Date());

    expect(screen.getByTestId("last-note").textContent).toBe(
      `Last note:${now}`
    );
  });
});
