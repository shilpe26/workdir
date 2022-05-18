export function getTasks() {
	const tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];

	return tasks;
}

export function updateLocalStorage(updatedTaskList) {
	localStorage.setItem("tasks", JSON.stringify(updatedTaskList));
}
