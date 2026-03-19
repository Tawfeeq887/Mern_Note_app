import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';
import { LoaderIcon, Trash2Icon, ArrowLeftIcon } from 'lucide-react';
import axios from 'axios';
import api from "../api.js"


function NoteDetailPage() {
  const [notes, setNotes] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const[saving,Setsaving]=useState(false)
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchNote = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/notes/${id}`);
      setNotes(res.data);
      setTitle(res.data.title);
      setDescription(res.data.description);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to fetch the note");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
   if(!window.confirm("Are you sure you want to delete this note?"))return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete note");
    }
  };
const handleSave=async()=>{
  if(!title.trim() || !description.trim()){
    toast.error("Please add a title or content");
    return
  }
Setsaving(true);
try {
await api.put(`/notes/${id}`, {
  title,
  description
});
  toast.success("Note Updated successfully");
navigate("/");
} catch (error) {
   toast.error("Failed to update note");
}
finally{
  Setsaving(false)
}
}
  
  if (loading) {
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10' />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>

          <div className='flex items-center justify-between mb-6'>
            <Link to={"/"} className="btn btn-ghost self-start">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to notes
            </Link>

            <button className='btn btn-error btn-outline' onClick={handleDelete}>
              <Trash2Icon className='h-5 w-5' />
              Delete Note
            </button>
          </div>

          <div className='card bg-base-200'>
            <div className='card-body'>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-bold">Title</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Description</span>
                </label>
                <textarea
                  rows={5}
                  className="textarea textarea-bordered w-full"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="card-actions justify-end">
                <button className='btn btn-primary' disabled={saving} onClick={handleSave}>
                {saving ? "Saving...":"Save Changes"}
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default NoteDetailPage;