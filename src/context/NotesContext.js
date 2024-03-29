import React, { createContext, useReducer, useEffect, useMemo } from "react";
import { v4 as uuid } from "uuid";

export const NotesContext = createContext();

function str0l(val, len) {
  let strVal = val.toString();
  while (strVal.length < len) strVal = `0${strVal}`;
  return strVal;
}

// форматирование даты
export function formatDateTime(dt) {
  const year = dt.getFullYear();
  const month = dt.getMonth() + 1;
  const day = dt.getDate();
  const hours = dt.getHours();
  const minutes = dt.getMinutes();
  const seconds = dt.getSeconds();
  return `${str0l(day, 2)}.${str0l(month, 2)}.${year} ${str0l(
    hours,
    2
  )}:${str0l(minutes, 2)}:${str0l(seconds, 2)}`;
}

// массив цветов заметок
export const notesColors = [
  "#ff7fba",
  "#ff65a4",
  "#7bfcff",
  "#feff9d",
  "#fff73e",
];

// получение случайного элемента массива цветов при создании заметки
function randomDiap(n, m) {
  return Math.floor(Math.random() * (m - n + 1)) + n;
}

const initialState = JSON.parse(localStorage.getItem("notes")) ?? {
  lastNoteDate: null,
  totalNotes: 0,
  notes: [],
  filterNotes: [],
};

const ADD_NOTES = "ADD_NOTES";
const DELETE_NOTE = "DELETE_NOTE";
const CHANGE_COLOR = "CHANGE_COLOR";
const CHANGE_NOTE = "CHANGE_NOTE";
const FILTER = "FILTER";
const SHOW_ALL = "SHOW_ALL";

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
            color: notesColors[randomDiap(0, 4)],
            rotate: randomDiap(-2, 2),
            time: formatDateTime(new Date()),
          },
        ],
      };
    }
    case DELETE_NOTE: {
      return {
        ...state,
        totalNotes: state.notes.length - 1,
        notes: state.notes.filter((i) => i.id !== action.payload),
        filterNotes: state.filterNotes.filter((i) => i.id !== action.payload),
      };
    }

    case CHANGE_COLOR: {
      let task = state.notes.find((i) => i.id === action.id);
      task = { ...task, color: action.color };

      return {
        ...state,
        notes: state.notes.map((i) => {
          if (i.id === action.id) {
            return task;
          }
          return i;
        }),
        filterNotes: state.filterNotes.map((i) => {
          if (i.id === action.id) {
            return task;
          }
          return i;
        }),
      };
    }
    case CHANGE_NOTE: {
      let task = state.notes.find((i) => i.id === action.id);
      task = { ...task, note: action.changedNote };
      return {
        ...state,
        notes: state.notes.map((i) => {
          if (i.id === action.id) {
            return task;
          }
          return i;
        }),
        filterNotes: state.filterNotes.map((i) => {
          if (i.id === action.id) {
            return task;
          }
          return i;
        }),
      };
    }
    case FILTER: {
      if (!action.payload) return { ...state, filterNotes: [] };
      return {
        ...state,
        filterNotes: state.notes.filter((i) =>
          i.note.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };
    }
    case SHOW_ALL: {
      return { ...state, filterNotes: [] };
    }
    default: {
      return state;
    }
  }
};

export function NotesContextProvider({ children }) {
  const [state, dispatch] = useReducer(notesReducer, initialState);
  useEffect(() => {
    localStorage.setItem(
      "notes",
      JSON.stringify({ ...state, filterNotes: [] })
    );
  }, [state]);

  const addNote = (note) => {
    dispatch({ type: ADD_NOTES, payload: note });
  };

  const deleteNote = (id) => {
    dispatch({ type: DELETE_NOTE, payload: id });
  };

  const changeColor = (id, color) => {
    dispatch({ type: CHANGE_COLOR, id, color });
  };

  const changeNote = (id, changedNote) => {
    dispatch({ type: CHANGE_NOTE, id, changedNote });
  };

  const filterNotes = (input) => {
    dispatch({ type: FILTER, payload: input });
  };

  const showAll = () => {
    dispatch({ type: SHOW_ALL });
  };

  const NotesContextWrapper = useMemo(
    () => ({
      state,
      addNote,
      deleteNote,
      notesColors,
      changeColor,
      changeNote,
      filterNotes,
      showAll,
    }),
    [state]
  );

  return (
    <NotesContext.Provider value={NotesContextWrapper}>
      {children}
    </NotesContext.Provider>
  );
}
