// import '../styles/globals.css'

import { useReducer } from "react";
import TodoContext from "../context/todoContext";

const todoReducer = (state, event) => {
	console.log("state reducer", state);
	console.log("event reducer", event);
	return event;
};

export default function App({ Component, pageProps }) {
	const [todos, setTodos] = useReducer(todoReducer, []);
	return (
		<TodoContext.Provider value={{ todos: todos, setTodos: setTodos }}>
			<Component {...pageProps} />
		</TodoContext.Provider>
	);
}
