const User = require("../models/User");
const bcrypt = require("bcrypt");

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = async (req, res) => {
    const users = await User.find().select("-password").lean();

    if (!users?.length) {
        return res.status(400).json({message: "No users found"});
    }
    res.json(users);
};

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = async (req, res) => {
    const {username, password, roles} = req.body;

    // Confirm data
    if (!username || !password) {
        return res.status(400).json({message: "All fields are required"});
    }

    // Check for duplicate
    const duplicateUser = await User.findOne({username}).collation({locale: "en", strength: 2}).lean().exec();

    if (duplicateUser) {
        return res.status(409).json({message: "Username already taken."});
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

    const userObject = (!Array.isArray(roles) || !roles.length)
        ? {username, "password": hashedPwd}
        : {username, "password": hashedPwd, roles};

    // Create and store new user
    const user = await User.create(userObject);

    if (user) {
        res.status(201).json({message: `New user ${username} created`});
    } else {
        res.status(400).json({message: "Invalid user data recived"});
    }
};

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = async (req, res) => {
    const {id, username, roles, active, password} = req.body;

    // Confirm data
    if (
        !id ||
        !username ||
        !Array.isArray(roles) ||
        !roles.length ||
        typeof active !== "boolean"
    ) {
        return res.status(400).json({message: "All fileds are required"});
    }

    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({message: "User not found"});
    }

    // Check for duplicate
    const duplicate = await User.findOne({username}).collation({locale: "en", strength: 2}).lean().exec();
    // Allow updates to the original user

    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({message: "Duplicate username"});
    }

    user.username = username;
    user.roles = roles;
    user.active = active;

    if (password) {
        // Hash password
        user.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.save();
    res.json({message: `${updatedUser.username} updated`});
};

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = async (req, res) => {
    const {id} = req.body;

    if (!id) {
        return res.status(400).json({message: "User ID required"});
    }

    const userExists = await User.findById(id).exec();

    if (!userExists) {
        return res.status(400).json({message: "User not found"});
    }

    const {username} = userExists;

    const result = await User.findOneAndDelete({_id: id});

    const reply = `Username ${user.username} with ID ${result._id} deleted`;

    res.json(reply);
};

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
};
