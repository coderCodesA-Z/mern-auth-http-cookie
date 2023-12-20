import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc Auth user/set token
// route POST /api/users/auth
// @access PUBLIC
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		res.status(400);
		throw new Error("Please add all fields");
	}

	const user = await User.findOne({ email });
	if (user && (await user.matchPassword(password))) {
		generateToken(res, user._id);
		return res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			// token: generateToken(user._id), using http-only cookie hence not sending token
		});
	} else {
		res.status(401);
		throw new Error("Invalid Email or Password");
	}
});

// @desc Register user
// route POST /api/users
// @access PUBLIC
const registerUser = asyncHandler(async (req, res) => {
	const { email, name, password } = req.body;
	if (!email || !name || !password) {
		res.status(400);
		throw new Error("Please add all fields");
	}

	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
	}

	const user = await User.create({
		name,
		email,
		password,
	});
	if (user) {
		generateToken(res, user._id);
		return res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			// token: generateToken(user._id), using http-only cookie hence not sending token
		});
	}
	res.status(401);
	throw new Error("Invalid user data");
});

// @desc Logout user
// route POST /api/users/logout
// @access PUBLIC
const logoutUser = asyncHandler(async (req, res) => {
	res.cookie("jwt", "", {
		httpOnly: true,
		expires: new Date(0),
	});
	res.status(200).json({ message: "User Logged Out" });
});

// @desc Get user profile
// route get /api/users/profile
// @access PRIVATE
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

// @desc Update user profile
// route put /api/users/profile
// @access PRIVATE
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id); // since password doesn't exist
	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		if (req.body.password) {
			user.password = req.body.password;
		}
		const updatedUser = await user.save();
		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			// token: generateToken(updatedUser._id), using http-only cookie hence not sending token
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

export {
	authUser,
	getUserProfile,
	logoutUser,
	registerUser,
	updateUserProfile,
};
