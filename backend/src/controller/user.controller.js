import User from '../models/user.model.js'


export const getUserForSidebar = async (req, res) => {
    try{
        const loggedInUserId = req.body._id;
        const filterUsers = await User.find({_id: {$ne: loggedInUserId}}).select('-password');
        res.status(200).json(filterUsers);
    }catch(error){
        console.log("Error in getUserForSidebar:", error.message);
        res.status(500).json({error: error.message});
    }
};
