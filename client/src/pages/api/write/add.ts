import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

type Post = {
  name: string;
  content: string;
  image?: string | null;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, content, image }: Post = req.body;

    const post = await prisma.post.create({
      data: {
        name,
        content,
        image: image ? image : null,
      },
    });

    res.status(200).json({ post });
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
};

export default handler;
