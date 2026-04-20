import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllContacts, getChatPartners, getMessageByUserId, sendMessage } from "../controllers/message.controller.js";


const router = Router();

router.get("/contacts",protectRoute,getAllContacts);
router.get("/chats",protectRoute,getChatPartners);
router.get("/:id",protectRoute,getMessageByUserId);
router.post("/send/:id",protectRoute,sendMessage);

export default router;