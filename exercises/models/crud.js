const User = require("./user");

const getUserById = (id) => {
	return User.findById(id).exec();
};

const getAllUsers = () => {
	return User.find({}).exec();
};

const createUser = (userDetails) => {
	const user = new User(userDetails);
	return user.save();
	// second approach
	//return User.create(userDetails)
};
const removeUserById = (id) => {
	const user = User.findById(id);
	return user.remove();
	// second approach
	// return User.findByIdAndRemove(id).exec();
};

const updateUserById = (id, update) => {
	return User.findByIdAndUpdate(id, update, { new: true });
};

module.exports = {
	getUserById,
	getAllUsers,
	createUser,
	removeUserById,
	updateUserById,
};
