import { useContext, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import List from "../components/list";
import * as Helpers from "../lib/helper.js";

import TodoContext from "../context/todoContext";

export default function Home(props) {
	const [list, setList] = useState("");
	const inputRef = useRef();
	const listEditRef = useRef();

	const value = useContext(TodoContext);
	const { todos, setTodos } = value;

	const handleList = (e) => {
		const value = e.target.value;
		setList(value);
	};

	const clearEditID = () => {
		listEditRef.current = "";
	};

	const handleEnterKeyDown = async (e) => {
		if (e.code !== "Enter") return;
		const validatedTodo = vaildateTodo(list);
		if (!validatedTodo) return clearEditID();
		const listEdit = listEditRef.current;
		if (listEdit) {
			Helpers.editTodo({ ...listEdit, todo: list });
			listEditRef.current = null;
		} else {
			const newList = {
				_id: uuidv4(),
				todo: list,
				isCompleted: false,
				createdAt: Date.now(),
			};
			const result = await Helpers.createTodo(newList);
		}
		clearEditID();
		clearInput();
	};

	const clearInput = () => {
		inputRef.current.value = "";
		setList("");
	};

	const vaildateTodo = (todo) => {
		if (!todo.trim()) {
			return false;
		}

		const isExist = todos.find((list) => {
			return list.todo.toLowerCase() == todo.toLowerCase();
		});
		if (isExist) {
			alert("The todo is already exist");
			return false;
		} else return true;
	};

	const handleInitialTodos = async () => {
		Helpers.getAllTodos(setTodos);
	};

	const handleRemoveList = async (id) => {
		Helpers.removeTodo(id);
	};

	const handleEditList = async (list) => {
		inputRef.current.value = list.todo;
		inputRef.current.focus();
		listEditRef.current = list;

		setList(list.todo);
	};

	const handleCompletedList = async (list) => {
		Helpers.editTodo(list);
	};

	const filterLists = () => {
		let filteredLists;
		if (!todos.length > 0) return [];
		if (list) {
			filteredLists = todos.filter((item) => {
				if (item.todo.includes(list)) {
					return true;
				}
			});
		} else filteredLists = todos;
		return filteredLists;
	};

	const filteredLists = filterLists();

	useEffect(() => {
		handleInitialTodos();
	}, []);

	return (
		<>
			<div>
				<h1>Todo List</h1>
				<h3>Type todo list and enter</h3>
				<input
					ref={inputRef}
					onChange={handleList}
					onKeyDown={handleEnterKeyDown}
				></input>
			</div>
			<div>
				{list}
				{filteredLists.map((list, index) => {
					return (
						<List
							key={index}
							list={list}
							handleEditList={handleEditList}
							handleRemoveList={handleRemoveList}
							handleCompletedList={handleCompletedList}
						></List>
					);
				})}
			</div>
		</>
	);
}
