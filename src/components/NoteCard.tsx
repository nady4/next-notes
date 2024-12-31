import { Note } from "@prisma/client";
import { useNotes } from "@/context/NoteContext";

function NoteCard({ note }: { note: Note }) {
  const { setSelectedNote, deleteNote } = useNotes();

  return (
    <div
      key={note.id}
      className="bg-slate-400 p-4 m-2 flex justify-between items-center"
    >
      <div>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
        <p>{new Date(note.createadAt).toLocaleDateString()}</p>
      </div>
      <div className="flex gap-x-2">
        <button
          className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 active:bg-red-700"
          onClick={() => deleteNote(note.id)}
        >
          Delete
        </button>
        <button
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 active:bg-blue-700"
          onClick={() => setSelectedNote(note)}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
