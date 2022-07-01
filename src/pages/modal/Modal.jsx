import React, { useState } from "react";
import { addTask } from "../../utils/add-task";
import { LabelHidden } from "./LabelHidden";
import { useTodo } from "../../Context/todo-context";
import { v4 as uuidv4 } from "uuid";

import "./modal.css";
export function Modal({
	title = "",
	time = "",
	description = "",
	show,
	onClose,
	isEditing,
	editTask,
	tags,
}) {
	const [modalValues, setModalValues] = useState({
		title,
		description,
		time,
		tags: tags || [],
	});
	const [errorMessage, setErrorMessage] = useState("");

	const { tasks, setTasks } = useTodo();

	const modalHandler = (e) => {
		const { id: key, value } = e.target;
		setModalValues((val) => {
			return { ...val, [key]: value };
		});
	};
	//useState for storing current tag
	const [tag, setTag] = useState("");

	// delete tags function
	function handleTagDelete(id) {
		setModalValues((val) => ({
			...val,
			tags: val.tags.filter((currTag) => currTag.id !== id),
		}));
	}

	// add tags function
	function handleTagAdd(e) {
		if (e.keyCode === 32 && tag.trim().length !== 0) {
			const newTag = {
				id: uuidv4(),
				name: tag,
			};
			setModalValues((val) => ({ ...val, tags: [...val.tags, newTag] }));
			setTag("");
		}
	}

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
						<input
							type="text"
							id="tag-field"
							className="add-input tag-field"
							placeholder="Press Space after entering Tags"
							value={tag}
							onChange={(e) => setTag(e.target.value)}
							onKeyDown={handleTagAdd}
						/>
						<p className="text-red-400 text-lg">press space to enter tags</p>
						<div className="tags-section">
							{modalValues.tags.length !== 0 &&
								modalValues.tags.map(({ id, name }) => (
									<span className="tag text-2xl mt-8 ml-4" key={id}>
										{name}
										<button
											className="tag-delete-btn"
											onClick={() => handleTagDelete(id)}
										>
											<i className="fa-solid fa-trash"></i>
										</button>
									</span>
								))}
						</div>
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
