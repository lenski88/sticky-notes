import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { NewNote } from "./NewNote";
import {
  NotesContextProvider,
  formatDateTime,
} from "../../context/NotesContext";

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

  test("placeholder doesn't exist when user type at least a char", async () => {
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

  test("is button exist", () => {
    render(
      <NotesContextProvider>
        <NewNote />
      </NotesContextProvider>
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("note doesn't exists if user no type text", async () => {
    render(
      <NotesContextProvider>
        <NewNote />
      </NotesContextProvider>
    );

    const currentCountTasks = JSON.parse(localStorage.getItem("notes")).notes
      .length;

    await userEvent.click(screen.getByRole("button"));

    expect(JSON.parse(localStorage.getItem("notes")).notes.length).toBe(
      currentCountTasks
    );
  });

  test("note has been created if user typed  some text", async () => {
    render(
      <NotesContextProvider>
        <NewNote />
      </NotesContextProvider>
    );

    const currentCountTasks = JSON.parse(localStorage.getItem("notes")).notes
      .length;

    const input = screen.getByTestId("textarea");
    await userEvent.type(input, "new task");
    await userEvent.click(screen.getByRole("button"));

    expect(JSON.parse(localStorage.getItem("notes")).notes.length).toBe(
      currentCountTasks + 1
    );
  });

  test("test date last task", async () => {
    render(
      <NotesContextProvider>
        <NewNote />
      </NotesContextProvider>
    );

    const currentLastNoteDate = JSON.parse(
      localStorage.getItem("notes")
    ).lastNoteDate;

    const input = screen.getByTestId("textarea");
    await userEvent.type(input, "new task");
    await userEvent.click(screen.getByRole("button"));

    expect(JSON.parse(localStorage.getItem("notes")).lastNoteDate).not.toBe(
      currentLastNoteDate
    );
  });

  test("test time creating task", async () => {
    render(
      <NotesContextProvider>
        <NewNote />
      </NotesContextProvider>
    );

    const input = screen.getByTestId("textarea");
    await userEvent.type(input, "new task");
    await userEvent.click(screen.getByRole("button"));
    const now = new Date();

    expect(JSON.parse(localStorage.getItem("notes")).notes[0].time).toBe(
      formatDateTime(now)
    );
  });

  test("test title task", async () => {
    render(
      <NotesContextProvider>
        <NewNote />
      </NotesContextProvider>
    );

    const input = screen.getByTestId("textarea");
    await userEvent.type(input, "new task");
    await userEvent.click(screen.getByRole("button"));

    expect(JSON.parse(localStorage.getItem("notes")).notes[0].note).toBe(
      "new task"
    );
  });
});
