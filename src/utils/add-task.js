import { v4 as uuid } from "uuid";
import { updateLocalStorage } from "../utils/task-utils";

export const addTask = (
	editTask,
	tasks,
	modalValues,
	setTasks,
	onClose,
	isEditing
) => {
	const { title, description, time, tags } = modalValues;

	const isValidated = getValidated(title, description, time);

	if (!isValidated) return;

	let updatedTaskList;
	if (isEditing) {
		const { id } = editTask;
		updatedTaskList = tasks.map((task) => {
			if (task.id === id) {
				return {
					...editTask,
					...modalValues,
				};
			}

			return task;
		});
	} else {
		const newTask = {
			id: uuid(),
			title,
			description,
			time,
			tags,
		};
		updatedTaskList = [...tasks, newTask];
	}

	setTasks(updatedTaskList);
	updateLocalStorage(updatedTaskList);
	onClose();
};

function getValidated(title, description, time, setErrorMessage) {
	const testTitle = /^[0-9]+$/.test(title);
	const testDescription = /^[0-9]+$/.test(description);

	if (title === "" || description === "" || time === "") {
		setErrorMessage("Please add all values");
		return false;
	} else if (testTitle) {
		setErrorMessage("Add proper title");
		return false;
	} else if (testDescription) {
		setErrorMessage("Add proper description");
		return false;
	}

	if (time > 60 || time < 0) {
		setErrorMessage("Time should be in between 0 and 60");
		return false;
	}

	return true;
}
