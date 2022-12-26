import { getTodo, deleteTodo, updateTodo } from "../../../database/controllers";

import connectMongo from "../../../database/conn";

export default async function handler(req, res) {
	connectMongo().catch(() =>
		res.status(405).json({ error: "Error in the Connection" })
	);

	const { method } = req;

	switch (method) {
		case "GET":
			await getTodo(req, res);
			break;
		case "DELETE":
			deleteTodo(req, res);
			break;
		case "PUT":
			updateTodo(req, res);
			break;
		default:
			res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
			res.status(405).end(`Method ${method} Not Allowd`);
			break;
	}
}
