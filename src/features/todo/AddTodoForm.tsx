import { FC, useState } from "react";
import { useAddTodoMutation } from "@/api";
import { Button, Input, LoadingOverlay } from "@mantine/core";

const AddTodoForm: FC = () => {
    const [title, setTitle] = useState("");
    const [isInvalid, setIsInvalid] = useState(false);
    const [addTodo, { isLoading }] = useAddTodoMutation();
    return (
        <>
            <form
                style={{ display: "flex", position: "relative" }}
                onSubmit={(e) => {
                    e.preventDefault();
                    if (title.length) {
                        addTodo(title);
                        setTitle("");
                    } else {
                        setIsInvalid(true);
                    }
                }}
            >
                <LoadingOverlay visible={isLoading} overlayBlur={2} />
                <Input
                    invalid={isInvalid}
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        setIsInvalid(false);
                    }}
                    sx={{ flexGrow: 1, paddingRight: 8 }}
                    placeholder="Название задачи"
                ></Input>
                <Button type="submit">Добавить</Button>
            </form>
        </>
    );
};

export default AddTodoForm;
