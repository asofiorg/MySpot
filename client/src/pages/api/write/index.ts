import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { page } = req.query as unknown as { page: number };

    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      skip: page ? (page - 1) * 10 : 0,
      take: 10,
    });

    const pages = Math.ceil((await prisma.post.count()) / 10);

    res.status(200).json({ posts, pages });
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
};

export default handler;
