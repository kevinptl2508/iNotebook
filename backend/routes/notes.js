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

module.exports = router;