import Todos from "../model/todo";

//Get all todos
export async function getTodos(req, res) {
	try {
		const todos = await Todos.find({});
		return res.status(200).json(todos);
	} catch (err) {
		return res.status(404).json({ err });
	}
}

//Get single todo
export async function getTodo(req, res) {
	const { id } = req.query;
	try {
		const todo = await Todos.findOne({ _id: id });
		return res.status(200).json(todo);
	} catch (err) {
		return res.status(404).json({ err });
	}
}

//Post
export async function postTodo(req, res) {
	try {
		const formData = req.body;
		await Todos.create(formData, (err, data) => {
			return res.status(200).json(data);
		});
	} catch (error) {
		return res.status(404).json({ error });
	}
}

// PUT

export async function updateTodo(req, res) {
	try {
		const { id } = req.query;
		const formData = req.body;
		const result = await Todos.findByIdAndUpdate(id, formData);
		return res.status(200).json(result);
	} catch (error) {
		return res.status(404).json({ error });
	}
}

// DELETE

export async function deleteTodo(req, res) {
	try {
		const { id } = req.query;
		const result = await Todos.deleteOne({ _id: id });
		res.status(200).json(result);
	} catch (err) {
		return res.status(404).json({ err: err });
	}
}
