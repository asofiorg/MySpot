import type { NextApiRequest, NextApiResponse } from "next";
import { ask } from "../../lib/ai";

const askFallback = (): string => {
  return "This is a fallback response";
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // This is a mock function
    // the expected behavior should be send an SMS to the endpoint
    // and wait for a response to return it to the client
    
    if (process.env.NODE_ENV === "development") {
      res.status(200).json({ response: { message: askFallback() } });
    } else {
      const response = await ask(req.body.message);
      res.status(200).json({ response });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default handler;
