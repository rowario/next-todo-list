import {
    useAddTodoMutation,
    useDeleteTodoMutation,
    useGetTodosQuery,
    useToggleTodoMutation,
} from "@/api";
import { Button, Checkbox, CloseButton, Input } from "@mantine/core";
import { Todo } from "@prisma/client";
import { useState } from "react";

function TodoList() {
    const { data: todos, isLoading, error } = useGetTodosQuery();
    let content;
    if (isLoading) content = <>Загрузка...</>;
    if (error) content = <>{error}</>;
    if (todos && todos.length) {
        content = todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo}></TodoItem>
        ));
    } else {
        content = <>Нет задач</>;
    }
    return (
        <>
            Список задач:
            <br />
            {content}
            <AddTodoForm />
        </>
    );
}

type TodoItemProps = {
    todo: Todo;
};

function TodoItem({ todo }: TodoItemProps) {
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
                onClick={() => {
                    deleteTodo(todo.id);
                }}
                aria-label="Delete todo"
            />
        </div>
    );
}

function AddTodoForm() {
    const [title, setTitle] = useState("");
    const [addTodo, { isLoading }] = useAddTodoMutation();
    return (
        <>
            <form
                style={{ display: "flex" }}
                onSubmit={(e) => {
                    e.preventDefault();
                    if (title.length) {
                        addTodo(title);
                        setTitle("");
                    }
                }}
            >
                <Input
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                    sx={{ flexGrow: 1, paddingRight: 8 }}
                    placeholder="Название задачи"
                    disabled={isLoading}
                ></Input>
                <Button type="submit" disabled={isLoading}>
                    Добавить
                </Button>
            </form>
        </>
    );
}

export default TodoList;
