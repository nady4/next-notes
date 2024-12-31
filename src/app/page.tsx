"use client";

import { useEffect } from "react";
import { useNotes } from "@/context/NoteContext";
import NoteForm from "@/components/NoteForm";
import NoteCard from "@/components/NoteCard";

function Page() {
  const { notes, loadNotes } = useNotes();

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  return (
    <div className="flex items-center justify-center h-vh">
      <div>
        <NoteForm />
        <ul className="my-8">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Page;
