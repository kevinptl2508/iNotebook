const express = require('express');
const router = express.Router();
const User = require('../models/User');
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'Kevinisagoodboy';

// ROUTE 1 : Create a user using : POST "/api/auth/createuser" (No Login required)
router.post('/createuser', [
    body('email', 'Enter a valid email.').isEmail(),
    body('password', 'Password must be atleast 5 characters.').isLength({ min: 5 })],
    async (req, res) => {
        success = false;
        // If there are errors, return bad request & errors!
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        try {
            // Check whether user with this email exist or not.
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ success, Error: "Email already exists!" });
            }

            // Hashing Password
            let salt = await bcrypt.genSalt(10);
            let secPass = await bcrypt.hash(req.body.password, salt);

            // Create a new User
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            });

            // Sending Auth token
            const data = {
                user: {
                    id: user.id
                }
            }
            success = true;
            const authToken = jwt.sign(data, JWT_SECRET);
            res.json({ success, authToken });

            // End Try block
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal server error.");
        }
    });




// ROUTE 2 : Authenticate a user using : POST "/api/auth/login" (No Login required)
router.post('/login', [
    body('email', 'Enter a valid email.').isEmail(),
    body('password', 'Password cannot be empty.').exists()
],
    async (req, res) => {
        let success = false;
        // If there are errors, return bad request & errors!
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // array Destructuring 
            const { email, password } = req.body;

            // Check if user credentials match or not 
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ success, Error: "Credentials does not match!" });
            }
            const comparePassword = await bcrypt.compare(password, user.password);
            if (!comparePassword) {
                return res.status(400).json({ success, Error: "Credentials does not match!" });
            }

            // Sending Auth Token 
            const data = {
                user: {
                    id: user.id
                }
            }
            success = true;
            const authToken = jwt.sign(data, JWT_SECRET);
            res.json({ success, authToken });

            // End Try Block 
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal server error.");
        }
    });


// ROUTE 3 : Get logedIn user details using : POST "/api/auth/getuser" (Login required)
router.post('/getuser', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error.");
    }
});

module.exports = router;