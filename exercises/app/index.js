const express = require("express");
const morgan = require("morgan");
const connect = require("../connect");
const { json, urlencoded } = require("body-parser");
const app = express();
const Todo = require("./todo");

app.use(morgan("dev"));
app.use(urlencoded({ extended: true }));
app.use(json());

app.get("/todo/:id", async (req, res) => {
	const todoId = req.params.id;

	try {
		const todo = await Todo.findById(todoId);
		if (!todo) {
			res.status(404).json({ error: "Todo not found" });
		}
		res.status(200).json({ todo: todo });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

app.get("/", (req, res) => {
	res.send("Welcome to Todo app");
});

app.get("/todos", async (req, res) => {
	try {
		const todos = await Todo.find({}).exec();

		res.status(200).json(todos);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

app.post("/todo", async (req, res) => {
	const todoToCreate = req.body;

	try {
		const createdTodo = await Todo.create({
			message: todoToCreate.message,
			complete: todoToCreate.complete,
			dueOn: todoToCreate.dueOn
		});
		res.status(201).json(createdTodo);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

app.delete("/todo/:id", async (req, res) => {
	const todoId = req.params.id;

	try {
		const product = await Todo.findById(todoId).exec();

		if (product) {
			console.log("PRODUCT FOUND");
			await product.remove();
			res.status(200).json({ message: "Todo deleted" });
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

connect("mongodb://localhost:27017/todos", {
	useNewUrlParser: true
})
	.then(() =>
		app.listen(4000, () => {
			console.log("server on http://localhost:4000");
		})
	)
	.catch((e) => console.error(e));
