import jwt from "jsonwebtoken";


export const generateToken = (userId, res) =>{
    const { JWT_SECRET } = process.env;
    if(!JWT_SECRET){
        throw new Error("JWT_SECRET is not configured");
    }

    const token = jwt.sign({ userId }, process.env.JWT_SECRET,{ expiresIn:"7d"});

    const secure = process.env.NODE_ENV === "production" ? true : false;

    res.cookie("jwt", token,{
        maxAge: 7*24*60*60*1000, // miliseconnd
        httpOnly: true, // prevent XSS attacks : cross-site scripting 
        sameSite: secure ? "none" : "lax", // CSRF attacks
        secure: secure,
    });

    return token;
};