import { FC } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoItem from "./TodoItem";
import { useGetTodosQuery } from "@/api";

const TodoList: FC = () => {
    const { data: todos, isLoading } = useGetTodosQuery();
    if (isLoading) return <>Загрузка...</>;
    return (
        <>
            Список задач:
			<br />
            {todos &&
                todos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo}></TodoItem>
                ))}
            {(!todos || !todos.length) && "У вас нет задач."}
            <div style={{ paddingTop: 4 }}>
                <AddTodoForm />
            </div>
        </>
    );
};

export default TodoList;
