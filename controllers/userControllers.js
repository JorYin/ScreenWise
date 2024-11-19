import User from '../model/user.js';

// Profile

const getBio = async (req, res) => {
  try {
    const { userId } = req.params;

    console.log("At User")
    // Find the user by userId
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(user.bio);
    
  } catch (error) {
    
  }
}

const getUsername = async (req, res) => {
  try {
    const { userId } = req.params;

    console.log("At User")
    // Find the user by userId
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(user.username);
    
  } catch (error) {
    
  }
}

const changeBio = async (req, res) => {
  try {
    const { userId } = req.params;
    const { newBio } = req.body;

    // Find the user by userId
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if(newBio.length <= 0){
      return res.status(200).json({ message: "Bio updated successfully" });
    }
    
    user.bio = newBio;
    
    // Save the updated user data
    await user.save();

    return res.status(200).json({ message: "Bio updated successfully" });
    
  } catch (error) {
    
  }
}

const changeUsername = async (req, res) => {
  try {
    const { userId } = req.params;
    const { newUsername } = req.body;

    // Find the user by userId
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if(newUsername.length <= 0){
      return res.status(200).json({ message: "Username updated successfully" });
    }

    user.username = newUsername

    // Save the updated user data
    await user.save();

    return res.status(200).json({ message: "Username updated successfully" });
    
  } catch (error) {
    
  }
}

export {getBio, getUsername, changeBio, changeUsername};