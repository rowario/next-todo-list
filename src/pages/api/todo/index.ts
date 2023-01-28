// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/app/prisma";
import { Todo } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

type Data =
    | Todo
    | Todo[]
    | {
          message?: string;
      };

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const session = await getServerSession(req, res, authOptions);
    if (!session || !session.user) {
        res.status(401).json({ message: "Unauthorized." });
        return;
    }
    const { id: userId } = session.user;
    switch (req.method) {
        case "GET":
            {
                const todos = await prisma.todo.findMany({
                    where: {
                        userId,
                    },
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
                            userId,
                            dayId: "cldg59u7b0000cggmahrrnom7",
                        },
                    });
                    res.status(200).json(createdTodo);
                } catch (e) {
                    res.status(400).json({
                        message: "Ошибка при создании задания.",
                    });
                }
            }
            break;
        default:
            res.status(405).json({ message: "Method not allowed." });
            break;
    }
}
