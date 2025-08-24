import { generateToken } from '../lib/utils.js';
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs';
import cloudinary from '../lib/cloudinary.js';
export const signup = async (req, res) => {
    const { email, fullName, password, confirmPassword, gender } = req.body;
    try{
        if(!email || !fullName || !password || !confirmPassword || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if(password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        if(password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        const user = await User.findOne({email});
        if(user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            gender
        });

        // Generate token and save user
        generateToken(newUser._id, res);
        await newUser.save();

        res.status(201).json({ 
            _id: newUser._id, 
            email: newUser.email, 
            fullName: newUser.fullName, 
            profilePic: newUser.profilePic 
        });

    }
    catch(error){
        console.log("Error in signup controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        // Add validation
        if (!email || !password) {
            return res.status(400).json({message: "All fields are required"});
        }

        const user = await User.findOne({email})
        if(!user) {
            return res.status(400).json({message:"Invalid Credentials"})
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect){
            return res.status(400).json({message:"Invalid Credentials"})
        }
        generateToken(user._id,res)
        res.status(200).json({
            _id:user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        })
    } catch (error) {
        console.log("Error in the login controller", error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}
export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge:0})
        res.status(200).json({message:"Logout Successful!"})
    } catch (error) {
        console.log("Error code in the logout Controller", error.message)
        res.status(500).json({message:"Internal server error"})
    }
}

export const updateProfile = async (req, res) => {
    try{
        const {profilePic} = req.body;
        const userId= req.user._id;
        if(!profilePic){
            return res.status(400).json({message:"Profile picture is required"});
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        );
        res.status(200).json({
            _id: updatedUser._id,
            fullName: updatedUser.fullName,
            email: updatedUser.email,
            profilePic: updatedUser.profilePic
        });

    }
    catch(error){
        console.log("Error in updateProfile controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const checkAuth = (req, res) => {
    console.log("Checking authentication for user:", req.user);

    try{
        res.status(200).json(req.user);
        console.log("User is authenticated:", req.user);
    }
    catch(error){
        console.log("Error in checkAuth controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
