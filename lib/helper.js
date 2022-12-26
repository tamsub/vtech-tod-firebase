export const getSingleTodo = async (id) => {
	try {
		// const response = await fetch("api/todo" + id);
	} catch (err) {}
};
export const getAllTodos = async () => {
	try {
		const response = await fetch("api/todo");
		const todos = await response.json();
		return todos;
	} catch (err) {}
};
export const editTodo = async (todo) => {
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify(todo);
	var requestOptions = {
		method: "PUT",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};
	const URL = `api/todo/${todo._id}`;

	try {
		const response = await fetch(URL, requestOptions);
		const todo = await response.json();
		return todo;
	} catch (err) {}
};
export const removeTodo = async (id) => {
	const URL = `api/todo/${id}`;
	try {
		var requestOptions = {
			method: "DELETE",
			redirect: "follow",
		};

		const resonse = await fetch(URL, requestOptions);
		const deletedResult = await resonse.json();
		return deletedResult.deletedCount;
	} catch (err) {}
};
export const createTodo = async (todo) => {
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	var raw = JSON.stringify(todo);

	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};
	try {
		const response = await fetch("api/todo", requestOptions);
		const todo = await response.json();
		return todo;
	} catch (err) {}
};
