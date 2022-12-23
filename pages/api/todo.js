// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

let todo = [
	{ id: 1, todo: "todo1", isCompleted: false, createAt: Date.now() },
	{ id: 2, todo: "todo2", isCompleted: false, createAt: Date.now() },
	{ id: 3, todo: "todo3", isCompleted: false, createAt: Date.now() },
	{ id: 4, todo: "todo4", isCompleted: false, createAt: Date.now() },
	{ id: 5, todo: "todo5", isCompleted: false, createAt: Date.now() },
];

export default function handler(req, res) {
	res.status(200).json(todo);
}
