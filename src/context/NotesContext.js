import React, { createContext, useReducer } from "react";
import { v4 as uuid } from "uuid";

export const NotesContext = createContext();

//форматирование даты
function formatDateTime(dt) {
  var year = dt.getFullYear();
  var month = dt.getMonth() + 1;
  var day = dt.getDate();
  var hours = dt.getHours();
  var minutes = dt.getMinutes();
  var seconds = dt.getSeconds();
  return `${str0l(day, 2)}.${str0l(month, 2)}.${year} ${str0l(
    hours,
    2
  )}:${str0l(minutes, 2)}:${str0l(seconds, 2)}`;
}

function str0l(val, len) {
  var strVal = val.toString();
  while (strVal.length < len) strVal = "0" + strVal;
  return strVal;
}

// массив цветов заметок
const notesColors = ["#ff7fba", "#ff65a4", "#7bfcff", "#feff9d", "#fff73e"];

//получение случайного элемента массива цветов при создании заметки
function randomDiap(n, m) {
  return Math.floor(Math.random() * (m - n + 1)) + n;
}


const initialState = {
  lastNoteDate: null,
  totalNotes: 0,
  notes: [],
};

const ADD_NOTES = "ADD_NOTES";
const DELETE_NOTES = "DELETE_NOTES";

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTES: {
      return {
        ...state,
        lastNoteDate: formatDateTime(new Date()),
        totalNotes: state.notes.length + 1,
        notes: [
          ...state.notes,
          {
            id: uuid(),
            note: action.payload,
            color: notesColors[randomDiap(1, 5)],
          },
        ],
      };
    }
    case DELETE_NOTES: {
      return {
        ...state,
        totalNotes: state.notes.length - 1,
        notes: state.notes.filter((id) => id !== action.payload),
      };
    }
    default: {
      return state;
    }
  }
};

export const NotesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, initialState);

  const addNotes = (note) => {
    dispatch({ type: ADD_NOTES, payload: note });
  };

  const deleteNote = (id) => {
    dispatch({ type: DELETE_NOTES, payload: id });
  };

  return (
    <NotesContext.Provider value={{ state, addNotes, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
};
