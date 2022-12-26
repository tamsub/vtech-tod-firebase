import { useState } from "react";
import styles from "../styles/List.module.css";

const todoStatus = { false: "Mark as complete", true: "Mark as incomplete" };
const List = ({
	list,
	handleRemoveList,
	handleEditList,
	handleCompletedList,
}) => {
	const [isShown, setIsShown] = useState(false);

	const handleHover = () => {
		setIsShown(!isShown);
	};

	const handleRemove = () => {
		handleRemoveList(list._id);
	};

	const handleEdit = () => {
		handleEditList(list);
	};

	const handleIsCompleted = () => {
		handleCompletedList({ ...list, isCompleted: !list.isCompleted });
	};

	return (
		<div
			onMouseEnter={handleHover}
			onMouseLeave={handleHover}
			className={styles.listContainer}
		>
			<li
				className={
					list.isCompleted ? styles.isCompleted : styles.isNotCompleted
				}
			>
				{list.todo} {isShown && <button onClick={handleRemove}>remove</button>}
			</li>
			{isShown && <button onClick={handleEdit}>edit</button>}
			{isShown && (
				<button onClick={handleIsCompleted}>
					{todoStatus[list.isCompleted]}
				</button>
			)}
		</div>
	);
};

export default List;
