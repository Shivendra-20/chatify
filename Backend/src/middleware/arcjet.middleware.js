import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";
import { ENV } from "../lib/env.js";

export const arcjetProjection = async (req,res,next)=>{
    try {
        // Avoid false bot blocking during local development.
        if (ENV.NODE_ENV !== "production") {
            return next();
        }

        const decision = await aj.protect(req)

        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                return res.status(429).json({message:"Rate Limit exceeded Please try again later"});
            }
            if(decision.reason.isBot()){
                return res.status(403).json({message:"Bot access denied"});
            }
            return res.status(403).json({message:"Access denied by security policy."});
        }

        // Check for spoofed bots
        if(decision.results.some(isSpoofedBot)){
            return res.status(403).json({error:"Spoofed bot detected", message:"Malicious bot activity detected.",})
        }
        next();

    } catch (error) {
        console.log("Arject Protection Error : ",error);
        next();
    }
}