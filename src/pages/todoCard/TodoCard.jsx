import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useTodo } from "../../Context/todo-context";
import { useEscape } from "../../hooks/useEscape";
import { updateLocalStorage } from "../../utils/task-utils";
import { Modal } from "../Pages";
import { ShowPortal } from "../../components/Components";
import "./todoCard.css";
function TodoCard({ task }) {
	const { id, title, time, description } = task;
	const [isEditing, setIsEditing] = useState(false);

	const { tasks, setTasks } = useTodo();

	function editHandler() {
		setIsEditing((pre) => !pre);
	}
	function deleteHandler(id) {
		const updatedTask = tasks.filter((task) => task.id !== id);
		setTasks(updatedTask);
		updateLocalStorage(updatedTask);
	}
	useEscape(setIsEditing);

	return (
		<div className="task-wrapper">
			<section className="task-card flex justify-between align-center">
				<Link to="/pomoclock" state={{ task }} className="task-link">
					<p className="task-title text-2xl p-4">{title}</p>
				</Link>
				<div className="flex">
					<button className="btn" onClick={editHandler}>
						<FaEdit
							className="pointer-cursor text-2xl p-0"
							fontSize="1.1rem"
							title="Edit task"
						/>
					</button>
					<button className="btn ml-sm" onClick={() => deleteHandler(id)}>
						<FaTrashAlt
							className="pointer-cursor text-2xl"
							fontSize="1.1rem"
							title="Delete Task"
						/>
					</button>
				</div>

				{isEditing ? (
					<ShowPortal>
						<Modal
							taskToEdit={task}
							title={title}
							description={description}
							time={time}
							show={isEditing}
							onClose={editHandler}
							isEditing={true}
						></Modal>
					</ShowPortal>
				) : null}
			</section>
		</div>
	);
}

export { TodoCard };
