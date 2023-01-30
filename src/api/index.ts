import { RootState } from "@/app/store";
import { Todo } from "@prisma/client";
import {
    createEntityAdapter,
    createSelector,
    EntityState,
} from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const todoAdapter = createEntityAdapter<Todo>({
    selectId: (todo) => todo.id,
});
const initialState = todoAdapter.getInitialState();

const api = createApi({
    tagTypes: ["Todo"],
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    endpoints: (build) => ({
        getTodos: build.query<EntityState<Todo>, void>({
            query: () => "/todo",
            transformResponse: (response: Todo[]) => {
                return todoAdapter.setAll(initialState, response);
            },
            providesTags: ["Todo"],
        }),
        toggleTodo: build.mutation<void, Omit<Todo, "dayId" | "userId">>({
            query: (todo) => ({
                url: `/todo/${todo.id}`,
                method: "PATCH",
                body: { ...todo, completed: !todo.completed },
            }),
            onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {
                const patchResult = dispatch(
                    api.util.updateQueryData("getTodos", undefined, (draft) => {
                        const current = draft.entities[id];
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
            // TODO: maybe create here pessimistic update instead of inivalidating
            invalidatesTags: ["Todo"],
        }),
        deleteTodo: build.mutation<void, string>({
            query: (id) => ({
                url: `/todo/${id}`,
                method: "DELETE",
            }),
            onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
                const patchResult = dispatch(
                    api.util.updateQueryData("getTodos", undefined, (draft) => {
                        todoAdapter.removeOne(draft, id);
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

const selectTodosResult = api.endpoints.getTodos.select();

const selectTodosData = createSelector(
    selectTodosResult,
    (result) => result.data
);

export const { selectIds: selectTodoIds, selectById: selectTodoById } =
    todoAdapter.getSelectors<RootState>(
        (state) => selectTodosData(state) ?? initialState
    );

export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useToggleTodoMutation,
    useDeleteTodoMutation,
} = api;
