// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/app/prisma";
import { Todo } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
    | Todo
    | Todo[]
    | {
          error?: string;
      };

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    switch (req.method) {
        case "GET":
            {
                const todos = await prisma.todo.findMany({
                    orderBy: {
                        id: "asc",
                    },
                });
                res.status(200).json(todos);
            }
            break;
        case "POST":
            {
                try {
                    const newTodo: Omit<
                        Todo,
                        "id" | "dayId" | "userId" | "completed"
                    > = req.body;
                    const createdTodo = await prisma.todo.create({
                        data: {
                            ...newTodo,
                            completed: false,
                            userId: 1,
                            dayId: 1,
                        },
                    });
                    res.status(200).json(createdTodo);
                } catch (e) {
                    res.status(400).json({
                        error: "Ошибка при создании задания.",
                    });
                }
            }
            break;
        default:
            res.status(405).json({ error: "Method not allowed." });
            break;
    }
}
