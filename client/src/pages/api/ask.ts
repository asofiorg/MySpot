import type { NextApiRequest, NextApiResponse } from "next";
import { ask } from "../../lib/ai";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { prompt } = req.body;

    const response = await ask(prompt);

    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default handler;
