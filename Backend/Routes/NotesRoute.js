const express = require("express");
const router = express.Router();
const Note = require("../Models/notesSchema.js");


//getting a Note
router.get('/', async (req, res) => {
    try {
        const Notes = await Note.find();
        res.status(200).send(Notes)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//getting a single note
router.get('/:id', async (req, res) => {
     const { id } = req.params
    try {
        const Notes = await Note.findById(id)
        res.status(200).send(Notes)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Posting the newtodo
router.post('/', async (req, res) => {
    const { title, description } = req.body;
    const newNote = new Note({
        title: req.body.title,
        description: req.body.description
    })
    try {
        const createNote = await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

//Updateing the Existing Note
router.put('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const updatedNote = await Note.findByIdAndUpdate(id);
        if (!updatedNote) {
            return res.status(400).json({ message: "Note Not Found" })
        }
        updatedNote.title = req.body.title || updatedNote.title;
        updatedNote.description = req.body.description || updatedNote.description;
        await updatedNote.save();
        res.status(201).json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

//Delete a Single Note
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deleteNote = await Note.findByIdAndDelete(id);
        if (!deleteNote) {
            return res.status(400).json({ message: "Note Not Found" })
        }
        res.json({ message: "Note Deleted Succesfully" });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})

module.exports = router;