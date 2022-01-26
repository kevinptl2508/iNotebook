const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'Kevinisagoodboy';

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

        try {
            // Check whether user with this email exist or not.
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ Error: "Email already exists!" });
            }
            // Create a new User
            let salt = await bcrypt.genSalt(10);
            let secPass = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            });
            const data = {
                user : {
                    id : user.id
                }
            }
            const authToken = jwt.sign(data,JWT_SECRET);
            res.json({authToken});
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Some error occured.");
        }
    })

module.exports = router;