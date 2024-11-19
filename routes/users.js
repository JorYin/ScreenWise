import express from 'express';

import {addFriend, getFriendsSent, getFriendsRequested, getFriendsList, getFriendId, deleteFriendSent, deleteFriendReceived, addFriendReceived} from '../controllers/friendController.js';
import {addHours, getHours} from '../controllers/dashboardController.js';
import {getLeaderboard} from '../controllers/leaderboardController.js';
import {getBio, getUsername, changeBio, changeUsername} from '../controllers/userControllers.js';

const router = express.Router();

// Dashboard
router.post("/addHours/:userId", addHours);
router.get("/getTotalTime/:userId", getHours);

// Friends
router.post("/addFriend/:userId", addFriend);
router.get("/getFriendsSent/:userId", getFriendsSent);
router.get("/getFriendsRequested/:userId", getFriendsRequested);
router.get("/getFriendsList/:userId", getFriendsList);
router.get("/getFriendId/:userId", getFriendId);
router.delete("/deleteFriendSent/:userId", deleteFriendSent);
router.delete("/deleteFriendReceived/:userId", deleteFriendReceived);
router.post("/addFriendReceived/:userId", addFriendReceived);

// Leaderboard
router.get("/getLeaderboard/:userId", getLeaderboard);

// Profile
router.get("/getBio/:userId", getBio);
router.get("/getUsername/:userId", getUsername);
router.put("/changeBio/:userId", changeBio);
router.put("/changeUsername/:userId", changeUsername);

export default router;