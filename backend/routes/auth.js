const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// Create a user using : POST "/api/auth/createuser" (No Login required)
router.post('/createuser', [
    body('email', 'Enter a valid email.').isEmail(),
    body('password', 'Password must be atleast 5 characters.').isLength({ min: 5 })],
    async (req, res) => {

        // If there are errors, return bad request & errors!
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check whether user with this email exist or not.
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ Error: "Email already exists!" });
            }
            // Create a new User
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });
            res.json({ "message": "User created successfully!" });
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Some error occured.");
        }
    })

module.exports = router;