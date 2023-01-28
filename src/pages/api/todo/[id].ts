// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/app/prisma";
import { Todo } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

type Data =
    | Todo
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
        case "PATCH":
            {
                try {
                    const patch: Omit<Todo, "dayId" | "userId"> = req.body;
                    const updatedTodo = await prisma.todo.update({
                        where: {
                            id: patch.id,
                            userId,
                        },
                        data: {
                            ...patch,
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
                    const id = req.query.id as string;
                    await prisma.todo.delete({
                        where: {
                            id,
                            userId,
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
