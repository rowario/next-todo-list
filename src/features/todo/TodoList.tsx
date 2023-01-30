import { FC, useEffect } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoItem from "./TodoItem";
import api, { selectTodoIds, useGetTodosQuery } from "@/api";
import { Loader } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

const TodoList: FC = () => {
    const todoIds = useAppSelector((state) => selectTodoIds(state));
    const dispatch = useAppDispatch();

	const {isLoading} = useGetTodosQuery();

    useEffect(() => {
        dispatch(api.endpoints.getTodos.initiate());
    }, []);

    if (isLoading)
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Loader />
            </div>
        );
    return (
        <>
            Список задач:
            <br />
            {todoIds &&
                todoIds.map((todoId) => (
                    <TodoItem key={todoId} todoId={todoId}></TodoItem>
                ))}
            {(!todoIds || !todoIds.length) && "У вас нет задач."}
            <div style={{ paddingTop: 4 }}>
                <AddTodoForm />
            </div>
        </>
    );
};

export default TodoList;
