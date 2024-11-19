import User from '../model/user.js';

// Leaderboard

const getLeaderboard = async (req, res) => {
  try {
    const { userId } = req.params;


    // Find the user by userId
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
      
      const totalTime = await User.aggregate(
        [
          {
              $match: {
                _id: {$in: [user._id, ...user.friendList.map(friend => friend.userIdOfFriend)]}
              }
          },
          {
            $unwind: "$screenTimeData",
          },
          {
            $project: {
              username: 1,
              date: {
                $toDate: {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$screenTimeData.date",
                  },
                },
              },
              hours: "$screenTimeData.time",
            },
          },
          {
            $match: {
              $expr: {
                $eq: [
                  {
                    $dateToString: {
                      format: "%Y-%m-%d",
                      date: "$$NOW",
                    },
                  },
                  {
                    $dateToString: {
                      format: "%Y-%m-%d",
                      date: "$date",
                    },
                  },
                ],
              },
            },
          },
          {
            $group: {
              _id: "$_id",
              username: { $first: "$username" },
              totalHours: {
                $sum: "$hours",
              },
            },
          },
          {
            $sort: { totalHours: -1 }
          },
        ]).exec();

        return res.json(totalTime);

  } catch (error) {
    
  }
}

export {getLeaderboard}