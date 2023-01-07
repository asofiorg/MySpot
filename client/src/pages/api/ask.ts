import type { NextApiRequest, NextApiResponse } from "next";
import { ask } from "../../lib/ai";

const askFallback = (): string => {
  return "This is a fallback response, the connection between the chat interface and the hotspot service is still in progress";
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // This is a mock function
    // the expected behavior should be send an SMS to the endpoint
    // and wait for a response to return it to the client

    if (process.env.NODE_ENV !== "production") {
      const message = askFallback();
      res.status(200).json({ response: { message } });
    } else {
      const response = await ask(req.body.prompt);
      res.status(200).json({ response });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default handler;
