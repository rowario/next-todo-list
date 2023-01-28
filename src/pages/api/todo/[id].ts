// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/app/prisma";
import { Todo } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
    | Todo
    | {
          message?: string;
      };

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    switch (req.method) {
        case "PATCH":
            {
                try {
                    const newTodo: Omit<Todo, "dayId" | "userId"> = req.body;
                    const updatedTodo = await prisma.todo.update({
                        where: {
                            id: newTodo.id,
                        },
                        data: {
                            ...newTodo,
                        },
                    });
                    res.status(200).json(updatedTodo);
                } catch (e) {
                    res.status(400).json({
                        message: "Ошибка при создании задания.",
                    });
                }
            }
            break;
        case "DELETE":
            {
                try {
                    const id: number = parseInt(req.query.id as string, 10);
                    await prisma.todo.delete({
                        where: {
                            id,
                        },
                    });
                    res.status(200).json({
                        message: "Задача успешно уделена!",
                    });
                } catch (e) {
                    res.status(400).json({
                        message: "Ошибка при удалении задачи.",
                    });
                }
            }
            break;
        default:
            res.status(405).json({ message: "Method not allowed." });
            break;
    }
}
