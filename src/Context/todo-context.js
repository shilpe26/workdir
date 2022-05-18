import { useContext, createContext, useState } from "react";

const TodoContext = createContext([[], () => {}]);

const TodoProvider = ({ children }) => {
	const [tasks, setTasks] = useState([]);
	return (
		<TodoContext.Provider value={{ tasks, setTasks }}>
			{children}
		</TodoContext.Provider>
	);
};
const useTodo = () => useContext(TodoContext);

export { useTodo, TodoProvider };
