import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../email/emailHandler.js";
import "dotenv/config";

/** Flow for signup

Get data from req.body
Validate input
Check existing user
Get file paths
Upload images to cloud
Create user in DB
Remove sensitive data
Send response
If error → cleanup images

 */


export const signup = async (req, res) =>{
    const { fullName, email, password } = req.body;

    try {
        if(!fullName || !email || !password){
            return res.status(400).json({ message:"All fields are required" });
        }

        if(password.length < 6){
            return res.status(400).json({ message: "Password must be atleast 6 characters"});
        }

        // check if emails valid: regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;
        if(!emailRegex.test(email)){
            return res.status(400).json({ message : "Invalid email format"});
        }

        const user = await User.findOne({email});
        if(user) return res.status(400).json({message:"Email already exists"})

        // 123456 => $dnjasdkasj_?dmsakmk
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            fullName,
            email,
            password:hashedPassword
        })

        if(newUser){
            // Before CodeRabbit:
            // generateToken(newUser._id, res);
            // await newUser.save();

            // Persist user first, then issue auth cookie
            const savedUser = await newUser.save();
            generateToken(savedUser._id,res);

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic:newUser.profilePic,
            });

            // todo: send a welcome email to user
            try {
                await sendWelcomeEmail(savedUser.email,savedUser.fullName, process.env.CLIENT_URL);
            } catch (error) {
                console.log("Failed to send welcome email : ",error);
            }
        }
        else{
            res.status(400).json({message : "Invalid user data"});
        }

    } catch (error) {
         console.log("Error in signup controller : ",error);
         res.status(500).json({message:"Internal server error"})    
    }
}

export function login(req,res){
    res.send("Login Route");
}

export function logout(req,res){
    res.send("Logout Route");
}
