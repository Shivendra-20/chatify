import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../email/emailHandler.js";
import { ENV } from "../lib/env.js";
import cloudinary from "../lib/cloudinary.js";

/* Flow for signup

Frontend
  ↓
API Request (/signup)
  ↓
Validation Layer (empty check)
  ↓
Business Rules (email format, password length)
  ↓
DB Check (user exists?)
  ↓
Hash Password (bcrypt)
  ↓
Create User in DB
  ↓
Generate JWT Token
  ↓
Send Response to Frontend
  ↓
Async Task: Send Welcome Email
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
                await sendWelcomeEmail(savedUser.email,savedUser.fullName, ENV.CLIENT_URL);
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

/* Flow for login
Frontend
   ↓
Send email + password
   ↓
Backend API (/login)
   ↓
Check input validation
   ↓
Find user in DB
   ↓
Compare password (bcrypt)
   ↓
Generate JWT token
   ↓
Send user data + token
   ↓
Frontend logs user in
*/
export const login = async (req, res) =>{
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({message:"Email and Password are required"});
    }

    try {
        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({ message : "Invalide Credentials"});
        // Never tell the client which is field is incorrect : email or password

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials"});

        generateToken(user._id,res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log("Error in login controller : ",error);
        res.status(500).json({message: "Internal server error"});
    }
}

/* Flow for logout
Frontend (Logout button click)
   ↓
POST /api/auth/logout
   ↓
Auth Controller (logout)
   ↓
Clear JWT Cookie (set maxAge = 0)
   ↓
Browser deletes token
   ↓
User becomes unauthenticated
   ↓
Frontend redirects to login page
*/
export const logout = async (req,res)=>{
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"Logged out successfully"})
}

export const updateProfile = async (req,res) =>{
   try {
     const { profilePic } = req.body;
     if(!profilePic) return res.status(400).json({message:"Profile pic is required"});
 
     const userId = req.user._id;
 
     const uploadResponse = await cloudinary.uploader.upload(profilePic);
     
     const updateUser = await User.findByIdAndUpdate(
         userId,
         { profilePic: uploadResponse.secure_url },
         { new:true }
     );
 
     res.status(200).json(updateUser);
 
   } catch (error) {
    console.log("Error in update profile : ",error);
    res.status(500).json({ message: "Internal server error" });
   }


}