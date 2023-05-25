import { getSession } from "next-auth/react";
import prisma, { createPreferences, getPreferences, updatePreferences } from "../../../prisma/userpreferences";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const { method, body } = req;

  switch (method) {
    case "POST":
      try {
        console.log("body:", body);
        const preferences = await createPreferences(body, session);
        
        res.status(201).json(preferences);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
      }
      break;

    case "GET":
      try {
        const preferences = await getPreferences(session);
        res.status(200).json(preferences);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;

    case "PUT":
      try {
        const preferences = await updatePreferences(req.query.id, body, session);
        res.status(200).json(preferences);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;

    default:
      res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
};
