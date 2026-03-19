import React, { useState } from "react";
import { ArrowLeftIcon } from 'lucide-react';
import api from "../lib/axios.js"


import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function CreatePage() {
  
  const[notes,Setnotes]=useState([]);
  const[title,SetTitle]=useState("");
  const[description,SetDescription]=useState("");

  const submitNote=async(e)=>{
    e.preventDefault();
    if(!title.trim()||!description.trim()){
      toast.error("All feilds are required");
      return
    }


    try {
      
      const newNote={
        title,
        description
      }
      Setnotes([...notes, newNote])
      console.log(notes)
      const res=await api.post("/notes",newNote);
      SetTitle("");
      SetDescription("");
      toast.success("New Note Added Successfully");
      
    } catch (error) {
      
      console.log(error);
      if(error.response.status===429){
        toast.error("Slow down! You're creating notes too fast",
          {
            duration:4000,
            icon:"💀",
          });
      }else{
        toast.error("Failed to create note")
      }
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200 p-4">
      <div className="card w-full max-w-md bg-base-600 shadow-xl border-t-4 border-solid border-[#00ff90]">
        
        <div className="card-body">
        <Link to={"/"} className="btn btn-ghost  self-start">
          <ArrowLeftIcon className="size-5"/>
          Back to notes
          </Link>  
        
          <h2 className="card-title text-xl font-bold justify-center mb-4">Create Note</h2>

          <form className="space-y-8" onSubmit={submitNote}>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Title</span>
              </label>
              <input
                type="text"
                placeholder="Enter title"
                className="input input-bordered w-full"
                value={title}
                onChange={(e)=>{SetTitle(e.target.value)}}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Description</span>
              </label>
              <textarea rows={5} cols={12}
                placeholder="Write your note..."
                className="textarea textarea-bordered w-full"
                value={description}
                onChange={(e)=>{SetDescription(e.target.value)}}
              ></textarea>
            </div>

            <div className="form-control mt-4">
              <button className="btn btn-primary w-full" type="submit">
                Add Note
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;