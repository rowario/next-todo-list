import { FC } from "react";
import {
    selectTodoById,
    useDeleteTodoMutation,
    useToggleTodoMutation,
} from "@/api";
import { Checkbox, CloseButton } from "@mantine/core";
import { EntityId } from "@reduxjs/toolkit";
import { useAppSelector } from "@/hooks/redux";

const TodoItem: FC<{
    todoId: EntityId;
}> = ({ todoId }) => {
    const todo = useAppSelector((state) => selectTodoById(state, todoId));

	if (!todo) return null;

    const [toggleTodo] = useToggleTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();
    return (
        <div
            style={{
                paddingTop: 4,
                paddingBottom: 4,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <Checkbox
                onChange={() => {
                    toggleTodo(todo);
                }}
                label={todo.title}
                checked={todo.completed}
            />
            <CloseButton
                size="sm"
                onClick={() => {
                    deleteTodo(todo.id);
                }}
                aria-label="Delete todo"
            />
        </div>
    );
};

export default TodoItem;
