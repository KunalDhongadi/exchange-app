const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');
var fetchUser = require("../middleware/fetchuser");
const router = express.Router();

const { body, validationResult } = require('express-validator');


//Route 1:  Create a user using post & no login required.
router.post("/createuser",[
    body('username','Enter a valid username').isLength({min:3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'The password should be 5 characters long').isLength({min:5})
    ],
 async (req, res) => {
    // const user = User(req.body);
    // user.save();

    const errors = validationResult(req);
    let success = false;
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try {
        let username = await User.findOne({name: req.body.username});
        if(username){
            return res.status(400).json({error:"Username is already taken. Please try again with a different username"});
        }

        let email = await User.findOne({email: req.body.email});
        if(email){
            return res.status(400).json({error:"User with given email already exists. Please try again with another email"});
        }

        let password = req.body.password.trim();
        if(password.length < 5){
            return res.status(400).json({error:"Please enter a valid password"});
        }

        // if(req.body.username === ""){
        //     return res.status(400).json({error:"Enter valid username"});
        // }

        const salt = await bcrypt.genSalt();
        let securePass = await bcrypt.hash(password, salt);

        const user = await User.create({
            name: req.body.username.trim(),
            email:req.body.email,
            password: securePass,
        });

        //data is the payload sent to the user.
        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, "kunal");
        success = true;
        res.json({success, authToken});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");

    }
 
});

//Route 2: authenticate a user using post and no login required.
router.post("/login",[
    body('username', 'Enter a valid username').isLength({min:3}),
    body('password', 'The password field should not be empty.').exists(),
    body('password', 'The password should be 5 characters long').isLength({min:5})
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        let success = false;
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const {username, password} = req.body;

        try {
            let user = await User.findOne({name:username});
            if(!user){

                return res.status(400).json({error: "Please try again with valid credentials."})
            }

            const passCompare = await bcrypt.compare(password, user.password);
            if(!passCompare){
                success = false;
                return res.status(400).json({success, error: "The Password entered is incorrect. Please try again."})
            }

            const data = {
                user:{
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, "kunal");
            success = true;
            res.json({success, authToken});

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occured");
        }
    }

)


// Route 3: Get Logged in user details. User needs to be logged in
router.get("/getuser", fetchUser,  
    async (req, res) => {
        try {
            let userId = req.user.id;

            // console.log("getuser", userId);

            const user = await User.findById(userId).select("-password");
            if(!user){
                res.status(404).json({success: false, "message":"User not found"});
            }else{
                res.json({success:true, user:user});
            }

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occured");
        }
    }
);


module.exports = router;