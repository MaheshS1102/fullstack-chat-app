import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();
router.post("/send/:id", protectRoute, sendMessage);     // POST
router.get("/users", protectRoute, getUsersForSidebar);  // GET users
router.get("/:id", protectRoute, getMessages);           // GET messages (dynamic)


export default router;