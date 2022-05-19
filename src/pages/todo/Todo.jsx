import React, { useState, useEffect } from "react";
import { ShowPortal } from "../../components/Components";
import { useTodo } from "../../Context/todo-context";
import { getTasks } from "./TodoFunc";
import { FaPlusCircle } from "react-icons/fa";
import { Modal, TodoCard } from "../Pages";
import { useTitle } from "../../hooks/useTitle";
import "./todo.css";
function Todo() {
	const [show, setShow] = useState(false);
	const { tasks, setTasks } = useTodo();

	const modalHandler = () => setShow((val) => !val);

	useEffect(() => {
		setTasks(getTasks());
	}, []);
	useTitle("Task | Clockwork");
	return (
		<div>
			<main className="todo-container p-2 my-64 mx-auto rounded max-w-screen-md">
				<header className="p-1 mb-1 text-center">
					<h1 className="h2 text-6xl py-4 font-semibold">Welcome back</h1>
					<p className="text-2xl font-serif mb-4">
						You have {tasks.length === 0 ? "no" : tasks.length}{" "}
						{tasks.length > 1 ? "tasks" : "task"} for today.
					</p>
				</header>

				<section className="task-container bg-white p-3 rounded">
					<header className="flex align-center justify-between">
						<h2 className="font-mono mt-2 ml-2 text-2xl">Add ToDo's</h2>
						<button className="add-PlusBtn text-4xl" onClick={modalHandler}>
							<FaPlusCircle title="Add task" />
						</button>
					</header>
					<hr className="p-2"></hr>
					{tasks.map((task) => {
						return <TodoCard task={task} key={task.id} />;
					})}
				</section>

				{show ? (
					<ShowPortal>
						<Modal show={show} onClose={modalHandler} setShow={setShow} />
					</ShowPortal>
				) : null}
			</main>
		</div>
	);
}

export { Todo };
