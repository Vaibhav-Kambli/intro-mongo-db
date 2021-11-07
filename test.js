const mongoose = require("mongoose");

const connect = () => {
	return mongoose.connect("mongodb://localhost:27017/whatever", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
};

const student = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			unique: true,
		},
		favFoods: [{ type: String }],
		info: {
			school: {
				type: String,
			},
			age: {
				type: Number,
			},
		},
		school: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "school",
		},
	},
	{ timestamps: true }
);

const school = new mongoose.Schema({
	name: String,
});

const School = mongoose.model("school", school);
const Student = mongoose.model("student", student);

connect()
	.then(async (connection) => {
		const school = await School.create({
			name: "JK elementry school",
		});

		const student = await Student.create({
			firstName: "John",
			school: school._id,
		});

		const match = await Student.findById(student.id).populate("school").exec();

		console.log(match);
	})
	.catch((err) => {
		console.log(err);
	});
