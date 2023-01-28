import { FC } from "react";
import { useDeleteTodoMutation, useToggleTodoMutation } from "@/api";
import { Checkbox, CloseButton } from "@mantine/core";
import { Todo } from "@prisma/client";

const TodoItem: FC<{
    todo: Todo;
}> = ({ todo }) => {
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
