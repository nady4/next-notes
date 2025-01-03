"use client";

import { useState, useEffect, useRef } from "react";
import { useNotes } from "@/context/NoteContext";

function NoteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);
  const { createNote, updateNote, selectedNote, setSelectedNote } = useNotes();

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content || "");
    }
  }, [selectedNote]);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (selectedNote) {
          await updateNote(selectedNote.id, { title, content });
        } else {
          await createNote({ title, content });
        }
        setTitle("");
        setContent("");
        titleRef.current?.focus();
      }}
    >
      <input
        type="text"
        name="title"
        placeholder="Write your title here"
        autoFocus
        className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        ref={titleRef}
      />
      <textarea
        name="title"
        placeholder="Write your content here"
        className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
      <div className="flex justify-end gap-x-2">
        <button
          type="submit"
          className="px-5 py-2 rounded-lg text-white bg-blue-500 rounded-mod hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!title || !content}
        >
          {selectedNote ? "Update" : "Create"}
        </button>
        {selectedNote && (
          <button
            type="button"
            className="px-5 py-2 rounded-lg text-white bg-red-500 rounded-mod hover:bg-red-600 active:bg-red-700"
            onClick={() => {
              setSelectedNote(null);
              setTitle("");
              setContent("");
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default NoteForm;
