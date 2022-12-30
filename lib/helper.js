import db from "../firebase/db";
import {
	collection,
	addDoc,
	getDoc,
	onSnapshot,
	deleteDoc,
	setDoc,
	doc,
} from "firebase/firestore";

export const getAllTodos = async (dispatch) => {
	console.log("dispatch", dispatch);
	const unsub = onSnapshot(collection(db, "todos"), (doc) => {
		let todos = [];
		doc.docs.forEach((item) => {
			todos.push(item.data());
		});
		todos.sort((a, b) => a.createdAt - b.createdAt);

		dispatch(todos);
	});
	return unsub;
};

export const editTodo = async (todo) => {
	try {
		setDoc(doc(db, "todos", todo._id), todo);
	} catch (e) {
		console.error("Error adding document: ", e);
	}
};

export const removeTodo = async (id) => {
	await deleteDoc(doc(db, "todos", id));
};

export const createTodo = async (todo) => {
	try {
		setDoc(doc(db, "todos", todo._id), todo);
	} catch (e) {
		console.error("Error adding document: ", e);
	}
};
