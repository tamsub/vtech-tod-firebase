import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import List from "../components/list";
import * as Helpers from "../lib/helper.js";

export default function Home(props) {
	const [lists, setLists] = useState([]);
	const [list, setList] = useState("");
	const inputRef = useRef();
	const editIdRef = useRef();
	const isCompletedRef = useRef();

	const handleList = (e) => {
		const value = e.target.value;
		setList(value);
	};

	const clearEditID = () => {
		editIdRef.current = "";
	};

	const handleFetchTodos = async () => {
		const todos = await Helpers.getAllTodos();
		return todos;
	};

	const handleEnterKeyDown = async (e) => {
		if (e.code !== "Enter") return;
		const validatedTodo = vaildateTodo(list);
		if (!validatedTodo) return clearEditID();
		let newLists;
		if (editIdRef.current) {
			const editTodo = lists.find((item) => item._id == editIdRef.current);
			const response = await Helpers.editTodo({ ...editTodo, todo: list });
			newLists = lists.map((item) => {
				if (item._id == editIdRef.current) {
					return { ...item, todo: list };
				}
				return item;
			});
		} else {
			const newList = {
				_id: uuidv4(),
				todo: list,
				isCompleted: false,
				createdAt: Date.now(),
			};
			const result = await Helpers.createTodo(newList);
			newLists = lists.concat(result);
		}
		setLists(newLists);
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

		const isExist = lists.find((list) => {
			return list.todo.toLowerCase() == todo.toLowerCase();
		});
		if (isExist) {
			alert("The todo is already exist");
			return false;
		} else return true;
	};

	const handleInitialTodos = async () => {
		const initialTodos = await handleFetchTodos().then((data) => data);
		setLists(initialTodos);
	};

	const handleRemoveList = async (id) => {
		const response = await Helpers.removeTodo(id);
		if (!response) return;
		const newLists = lists.filter((list) => {
			return list._id !== id;
		});
		setLists(newLists);
	};

	const handleEditList = async (list) => {
		inputRef.current.value = list.todo;
		inputRef.current.focus();
		editIdRef.current = list._id;

		setList(list.todo);
	};

	const handleCompletedList = async (list) => {
		const result = await Helpers.editTodo(list);
		const newLists = lists.map((item) => {
			if (list._id == item._id) return list;
			else return item;
		});
		if (result) setLists(newLists);
	};

	const filterLists = () => {
		let filteredLists;
		if (!lists.length > 0) return [];
		if (list) {
			filteredLists = lists.filter((item) => {
				if (item.todo.includes(list)) {
					return true;
				}
			});
		} else filteredLists = lists;
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
