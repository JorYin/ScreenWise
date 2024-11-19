import User from '../model/user.js';

// Dashboard
const addHours = async(req, res) => {

  try {
    
    const { userId } = req.params;
    const { hours } = req.body;

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (hours < 0) {
      return res.status(404).json({ error: "Please input hours greater than or equal to 0"})
    }


    user.screenTimeData.push({ date: new Date(), time: hours });
    
    // Save the updated user data
    await user.save();

    res.status(200).json({ message: "Hours added successfully" });

  } catch (error) {
    return res.status(404).json({ error: "Could not add new date" });
  }
};

const getHours = async(req, res) => {

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
              _id: user._id
            }
        },
        {
          $unwind: "$screenTimeData",
        },
        {
          $project: {
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
            _id: "$date",
            totalHours: {
              $sum: "$hours",
            },
          },
        },
      ]).exec();


    if(totalTime.length === 0){
      return res.json(0);
    } else {
      return res.json(totalTime[0].totalHours);
    }
  
  } catch (error) {
    return res.status(404).json({ error: "Total time could not be updated" });
  }
};


export {addHours, getHours}