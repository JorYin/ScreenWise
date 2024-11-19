import User from '../model/user.js';

// Friends List

const addFriend = async(req, res) => {
  try {
    
    const { userId } = req.params;
    const { friendID } = req.body;

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const findFriendID = await User.findById(friendID); 

    if (!findFriendID) {
      return res.status(404).json({ error: "Friend not found" });
    }


    // Maps the userIDOfFriends for the user that is sending then checks if they have already sent a request.
    const friendMap = user.friendSent.map( (arrayElement) => {
      return arrayElement.userIdOfFriend;
    })

    for(let i = 0; i < friendMap.length; i++){
      if(friendMap[i].equals(friendID)){
        return res.status(404).json({ error: "Friend request was already sent" });
      }
    }

    // I also want to check if the user has already gotten a request from the person they want to sent to
    const friendMapReceived = user.friendReceived.map( (arrayElement) => {
      return arrayElement.userIdOfFriend;
    })

    for(let i = 0; i < friendMapReceived.length; i++){
      if(friendMapReceived[i].equals(friendID)){
        return res.status(404).json({ error: "The user has already sent a request to you" });
      }
    }

    // I also want to check if they are already friends
    const friendsListMap = user.friendList.map( (arrayElement) => {
      return arrayElement.userIdOfFriend;
    })

    for(let i = 0; i < friendsListMap.length; i++){
      if(friendsListMap[i].equals(friendID)){
        return res.status(404).json({ error: "You are already friends" });
      }
    }


    user.friendSent.push({ userIdOfFriend: friendID});
    findFriendID.friendReceived.push({userIdOfFriend: user});
    
    // Save the updated user data
    await user.save();
    await findFriendID.save();

    res.status(200).json({ message: "Friend Request sent successfully" });

  } catch (error) {
    return res.status(404).json({ error: "Could not add friend" });
  }
};

const getFriendsSent = async(req, res) => {

  try {
    
    const { userId } = req.params;


    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const arrayOfUserModels = [];
    for(let i = 0; i < user.friendSent.length; i++){
      const friend = await User.findById(user.friendSent[i].userIdOfFriend);

      arrayOfUserModels.push(friend);

    }


    res.status(200).json({arrayOfUserModels});
  } catch (error) {
    return res.status(404).json({ error: "Could not get friends sent" });
  }
};

const getFriendsRequested = async(req, res) => {
  try {
    
    const { userId } = req.params;

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const arrayOfUserModels = [];
    for(let i = 0; i < user.friendReceived.length; i++){
      const friend = await User.findById(user.friendReceived[i].userIdOfFriend);

      arrayOfUserModels.push(friend);

    }


    res.status(200).json({arrayOfUserModels});

  } catch (error) {
    
  }
}

const getFriendsList = async(req, res) => {
  try {
    
    const { userId } = req.params;


    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const arrayOfUserModels = [];
    for(let i = 0; i < user.friendList.length; i++){
      const friend = await User.findById(user.friendList[i].userIdOfFriend);

      arrayOfUserModels.push(friend);

    }


    res.status(200).json({arrayOfUserModels});

  } catch (error) {
    
  }
}

const getFriendId = async(req, res) => {
  try {
    
    const { userId } = req.params;


    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }


    res.status(200).json({ friendId: user._id });

  } catch (error) {
    
  }
}

const deleteFriendSent = async(req, res) => {

  try {
    
    const { userId } = req.params;
    const { friendID } = req.body;


    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }


    const findFriendID = await User.findById(friendID); 

    if (!findFriendID) {
      return res.status(404).json({ error: "Friend not found" });
    }


    for(let i = 0; i < user.friendSent.length; i++){
      if(user.friendSent[i].userIdOfFriend.equals(friendID)){
        user.friendSent.pull({ userIdOfFriend: friendID});
        findFriendID.friendReceived.pull({ userIdOfFriend: userId});
      }
    }
    
    // Save the updated user data
    await user.save();
    await findFriendID.save();

    res.status(200).json({ message: "Friend Request delete successfully" });

  } catch (error) {
    return res.status(404).json({ error: "Could not delete friend" });
  }
}

const deleteFriendReceived = async(req, res) => {

  try {
    
    const { userId } = req.params;
    const { friendID } = req.body;


    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }


    const findFriendID = await User.findById(friendID); 

    if (!findFriendID) {
      return res.status(404).json({ error: "Friend not found" });
    }


    for(let i = 0; i < user.friendReceived.length; i++){
      if(user.friendReceived[i].userIdOfFriend.equals(friendID)){
        user.friendReceived.pull({ userIdOfFriend: friendID});
        findFriendID.friendSent.pull({ userIdOfFriend: userId});
      }
    }
    
    // Save the updated user data
    await user.save();
    await findFriendID.save();

    res.status(200).json({ message: "Friend Request delete successfully" });

  } catch (error) {
    return res.status(404).json({ error: "Could not delete friend" });
  }
}

const addFriendReceived = async(req, res) => {

  try {
    
    const { userId } = req.params;
    const { friendID } = req.body;


    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }


    const findFriendID = await User.findById(friendID); 

    if (!findFriendID) {
      return res.status(404).json({ error: "Friend not found" });
    }


    user.friendList.push({ userIdOfFriend: friendID});
    findFriendID.friendList.push({userIdOfFriend: user});
    
    // Save the updated user data
    await user.save();
    await findFriendID.save();

    res.status(200).json({ message: "Friend Request delete successfully" });

  } catch (error) {
    return res.status(404).json({ error: "Could not delete friend" });
  }
}

export {addFriend, getFriendsSent, getFriendsRequested, getFriendsList, getFriendId, deleteFriendSent, deleteFriendReceived, addFriendReceived};