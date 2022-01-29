const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');

// ROUTE 1 : Get all notes using : GET "/api/notes/fetchallnotes" (Login required)
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        // find notes of user & send it via response
        const notes = await Notes.find({ use: req.user.id });
        res.json(notes);
        // end try block
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error.");
    }
});


// ROUTE 2 : Add a new note using : POST "/api/notes/addnote" (Login required)
router.post('/addnote', fetchUser, [
    body('title', 'Title cannot be empty').exists(),
    body('description', 'description must be atleast 5 characters.').isLength({ min: 5 })],
    async (req, res) => {

        try {
            const { title, description, tag } = req.body;

            // If there are errors, return bad request & errors!
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Adding a new note 
            const note = new Notes({
                title, description, tag, user: req.user.id
            });
            const savedNote = await note.save();
            res.send(savedNote);

            // end try block
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal server error.");
        }

    });


// ROUTE 2 : Update note using : Put "/api/notes/updatenote" (Login required)
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // Create newNote object
        const newNote = {};

        // if any of the field is updating,it will be effected in newNote object 
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated & update it
        let note = await Notes.findById(req.params.id);
        
        if (!note) { return res.status(404).send("Not found!") }
        if (note.user.toString() !== req.user.id) { return res.status(401).send("Not allowed!") }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        
        res.send(note);

        // end try block
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error.");
    }
});

module.exports = router;