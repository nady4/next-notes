"use client";

import { createContext, useState, useContext, useCallback } from "react";
import { NoteData } from "../types/Note";
import { Note } from "@prisma/client";

export const useNotes = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error("useNotes must be used within a NoteProvider");
  }
  return context;
};

export const NoteContext = createContext<{
  notes: Note[];
  loadNotes: () => Promise<void>;
  createNote: (note: NoteData) => Promise<void>;
  updateNote: (id: number, note: NoteData) => Promise<void>;
  deleteNote: (id: number) => Promise<void>;
  selectedNote: Note | null;
  setSelectedNote: (note: Note | null) => void;
}>({
  notes: [],
  loadNotes: async () => {},
  createNote: async () => {},
  updateNote: async () => {},
  deleteNote: async () => {},
  selectedNote: null,
  setSelectedNote: () => {},
});

export const NoteProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const loadNotes = useCallback(async () => {
    const res = await fetch("/api/notes");
    const data = await res.json();
    setNotes(data);
  }, []);

  async function createNote(note: NoteData) {
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    const newNote = await res.json();
    setNotes([...notes, newNote]);
  }

  async function updateNote(id: number, note: NoteData) {
    const res = await fetch(`/api/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    if (res.ok) {
      const data = await res.json();
      setNotes(notes.map((note) => (note.id === id ? data.note : note)));
    }
  }

  async function deleteNote(id: number) {
    const res = await fetch(`/api/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setNotes(notes.filter((note) => note.id !== id));
    }
  }

  return (
    <NoteContext.Provider
      value={{
        notes,
        loadNotes,
        createNote,
        updateNote,
        deleteNote,
        selectedNote,
        setSelectedNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
