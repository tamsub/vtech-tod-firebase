import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { useEffect, useRef, useState } from "react";
import { Main } from "next/document";

import List from "../components/list";

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

	const handleEnterKeyDown = (e) => {
		if (e.code !== "Enter") return;
		const validatedTodo = vaildateTodo(list);
		if (!validatedTodo) return;
		let newLists;
		if (editIdRef.current) {
			newLists = lists.map((item) => {
				if (item.id == editIdRef.current) {
					return { ...item, todo: list };
				}
				return item;
			});
		} else {
			const newList = {
				id: Date.now(),
				todo: list,
				isCompleted: false,
				createdAt: Date.now(),
			};
			newLists = lists.concat(newList);
		}

		setLists(newLists);
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
		const response = await fetch("api/todo");
		const initialTodos = await response.json();
		setLists(initialTodos);
	};

	const handleRemoveList = (id) => {
		const newLists = lists.filter((list) => {
			return list.id !== id;
		});
		setLists(newLists);
	};

	const handleEditList = (list) => {
		inputRef.current.value = list.todo;
		inputRef.current.focus();
		editIdRef.current = list.id;
		setList(list.todo);
	};

	const handleCompletedList = (list) => {
		const newLists = lists.map((item) => {
			if (list.id == item.id) return list;
			else return item;
		});
		setLists(newLists);
	};

	const filterLists = () => {
		let filteredLists;
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
