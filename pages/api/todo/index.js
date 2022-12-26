// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
	getTodos,
	getTodo,
	postTodo,
	updateTodo,
	deleteTodo,
} from "../../../database/controllers";

let todo = [
	{ id: 1, todo: "todo1", isCompleted: false, createAt: Date.now() },
	{ id: 2, todo: "todo2", isCompleted: false, createAt: Date.now() },
	{ id: 3, todo: "todo3", isCompleted: false, createAt: Date.now() },
	{ id: 4, todo: "todo4", isCompleted: false, createAt: Date.now() },
	{ id: 5, todo: "todo5", isCompleted: false, createAt: Date.now() },
];

import connectMongo from "../../../database/conn";

export default async function handler(req, res) {
	connectMongo().catch(() =>
		res.status(405).json({ error: "Error in the Connection" })
	);

	// type of request
	const { method } = req;

	switch (method) {
		case "GET":
			getTodos(req, res);
			// res.status(202).json(todo);
			break;
		case "POST":
			postTodo(req, res);
			break;
		default:
			res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
			res.status(405).end(`Method ${method} Not Allowd`);
			break;
	}
}
