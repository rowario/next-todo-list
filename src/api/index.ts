import { Todo } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
    tagTypes: ["Todo"],
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    endpoints: (build) => ({
        getTodos: build.query<Todo[], void>({
            query: () => "/todo",
            providesTags: ["Todo"],
        }),
        toggleTodo: build.mutation<void, Omit<Todo, "dayId" | "userId">>({
            query: (todo) => ({
                url: `/todo/${todo.id}`,
                method: "PATCH",
                body: { ...todo, completed: !todo.completed },
            }),
            // invalidatesTags: ["Todo"],
            onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {
                const patchResult = dispatch(
                    api.util.updateQueryData("getTodos", undefined, (draft) => {
                        const current = draft.find((x) => x.id === id);
                        if (current) {
                            current.completed = !current.completed;
                        }
                    })
                );
                try {
                    await queryFulfilled;
                } catch (e) {
                    patchResult.undo();
                }
            },
        }),
        addTodo: build.mutation<void, string>({
            query: (title) => ({
                url: "/todo",
                method: "POST",
                body: { title },
            }),
            invalidatesTags: ["Todo"],
        }),
        deleteTodo: build.mutation<void, number>({
            query: (id) => ({
                url: `/todo/${id}`,
                method: "DELETE",
            }),
            // invalidatesTags: ["Todo"],
            onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
                const patchResult = dispatch(
                    api.util.updateQueryData("getTodos", undefined, (draft) => {
                        const current = draft.findIndex((x) => x.id === id);
                        draft.splice(current, 1);
                    })
                );
                try {
                    await queryFulfilled;
                } catch (e) {
                    patchResult.undo();
                }
            },
        }),
    }),
});

export default api;

export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useToggleTodoMutation,
    useDeleteTodoMutation,
} = api;
