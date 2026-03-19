import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import RateLimitedUi from '../Components/RateLimitedUi';
import axios from "axios";
import toast from "react-hot-toast";
import NoteCard from './NoteCard';
import { FileTextIcon, PlusCircleIcon } from "lucide-react";
import { LoaderIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from "../api.js"
function HomePage() {

  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    try {
      const res = await api.get("/notes");
      setNotes(res.data);
      setIsRateLimited(false);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        setIsRateLimited(true);
      } else {
        toast.error("Failed to load notes");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className='min-h-screen'>
      <Navbar />

      {/* Rate Limit UI */}
      {isRateLimited && <RateLimitedUi />}

      <div className='max-w-7xl mx-auto p-4 mt-6'>

        {/* Loader */}
        {loading && (
          <div className='flex items-center justify-center py-20'>
            <LoaderIcon className='animate-spin size-10'/>
          </div>
        )}

       
     

{!loading && notes.length === 0 && !isRateLimited && (
  <div className="flex flex-col items-center justify-center py-24 text-center">

    {/* Icon */}
    <div className="bg-primary/10 p-6 rounded-full mb-6">
      <FileTextIcon className="w-12 h-12 text-primary" />
    </div>

    {/* Heading */}
    <h2 className="text-3xl font-bold mb-2">
      No notes yet
    </h2>

    {/* Subtext */}
    <p className="text-base-content/70 max-w-md mb-6">
      You don’t have any notes yet. Start organizing your thoughts by creating your first note.
    </p>

    {/* Action Button */}
    <Link
      to="/create"
      className="btn btn-primary gap-2 px-6"
    >
      <PlusCircleIcon className="w-5 h-5" />
      Create Your First Note
    </Link>

  </div>
)}

       
        {!loading && notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map(note => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default HomePage;