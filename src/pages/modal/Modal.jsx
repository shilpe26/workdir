import React, { useState } from "react";
import { addTask } from "../../utils/add-task";
import { LabelHidden } from "./LabelHidden";
import { useTodo } from "../../Context/todo-context";
import "./modal.css";
export function Modal({
	title = "",
	time = "",
	description = "",
	show,
	onClose,
	setShow,
	isEditing,
	editTask,
}) {
	const [modalValues, setModalValues] = useState({
		title,
		description,
		time,
	});
	const [errorMessage, setErrorMessage] = useState("");

	const { tasks, setTasks } = useTodo();

	const modalHandler = (e) => {
		const { id: key, value } = e.target;
		setModalValues((val) => {
			return { ...val, [key]: value };
		});
	};

	return (
		<div
			className={`modal-container flex items-center justify-center ${
				show && "show"
			}`}
			onClick={onClose}
		>
			<div className="modal-border-wrap p-4 rounded-lg">
				<article
					className="modal rounded bg-white p-2 font-serif font-semibold"
					onClick={(e) => e.stopPropagation()}
				>
					<header>
						<LabelHidden labelFor="title" text="Title" />
						<input
							type="text"
							placeholder="Add Title"
							id="title"
							value={modalValues.title}
							onChange={modalHandler}
						/>
					</header>
					<section>
						<LabelHidden labelFor="description" text="Description" />
						<textarea
							cols="30"
							rows="10"
							id="description"
							placeholder="Add Description"
							value={modalValues.description}
							onChange={modalHandler}
						></textarea>

						<LabelHidden labelFor="time" text="Time" />
						<input
							id="time"
							type="number"
							className="number"
							placeholder="Time in Minutes"
							value={modalValues.time}
							onChange={modalHandler}
						/>
					</section>
					<footer className="flex justify-between mt-4 p-1">
						<button className="btn btn-primary text-3xl" onClick={onClose}>
							Close
						</button>
						<button
							className="btn btn-success text-3xl"
							onClick={() =>
								addTask(
									editTask,
									tasks,
									modalValues,
									setErrorMessage,
									setTasks,
									onClose,
									isEditing
								)
							}
						>
							{isEditing ? "Update" : "Add"}
						</button>
					</footer>

					{
						<span className="modal-error mt-4 block text-center text-2xl text-red-600">
							{errorMessage}
						</span>
					}
				</article>
			</div>
		</div>
	);
}
