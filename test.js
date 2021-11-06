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
	},
	{ timestamps: true }
);

const Student = mongoose.model("student", student);

connect()
	.then(async (connection) => {
		const student = await Student.create({
			firstName: "John",
		});

		const found = await Student.find({
			firstName: "John",
		});

		const id = await Student.findById("asdddd");

		const findAndUpdate = await student.findByIdAndUpdate("asddd", {
			firstName: "John 2",
		});

		console.log(student);
	})
	.catch((err) => {
		console.log(err);
	});
