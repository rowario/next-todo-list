import {
    useAddTodoMutation,
    useGetTodosQuery,
    useToggleTodoMutation,
} from "@/api/api";
import { Button, Checkbox, Input } from "@mantine/core";
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
    return (
        <Checkbox
            onChange={() => {
                toggleTodo(todo);
            }}
            sx={{
                paddingTop: 8,
                paddingBottom: 8,
            }}
            label={todo.title}
            checked={todo.completed}
        />
    );
}

function AddTodoForm() {
    const [title, setTitle] = useState("");
    const [addTodo] = useAddTodoMutation();
    return (
        <>
            <div style={{ display: "flex", width: "100%", flexGrow: 1 }}>
                <Input
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                    sx={{ flexGrow: 1, paddingRight: 8 }}
                    placeholder="Название задачи"
                ></Input>
                <Button
                    onClick={() => {
                        addTodo(title);
                        setTitle("");
                    }}
                >
                    Добавить
                </Button>
            </div>
        </>
    );
}

export default TodoList;
