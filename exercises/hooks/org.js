const mongoose = require("mongoose");
const Project = require("./project");
const cdnUrl = "https://cdn.adminapp.com";

const orgSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	subscription: {
		status: {
			type: String,
			required: true,
			default: ["active"],
			enum: ["active", "trialing", "overdue", "canceled"]
		},
		last4: {
			type: Number,
			min: 4,
			max: 4
		}
	}
});

// virtual getter for the org's schema logo
orgSchema.virtual("avatar").get(function () {
	return `${cdnUrl}/${this._id}`;
});

orgSchema.post("remove", async function () {
	await Project.deleteMany({ org: this._id });
});

module.exports = mongoose.model("org", orgSchema);
