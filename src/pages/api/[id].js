// pages/api/contacts/[id].js
import prisma from "../../../prisma/prisma";
import { getSession } from "next-auth/react";

export default async function handle(req, res) {
  const {
    query: { id },
    method,
    body,
  } = req;

  try {
    const session = await getSession({ req });

    if (!session) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    switch (method) {
      case "PUT":
        // Handle PUT request
        try {
          const updatedContact = await prisma.contact.update({
            where: {
              id: parseInt(id),
              userId: session.user.id,
            },
            data: JSON.parse(body),
          });
          res.status(200).json(updatedContact);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Failed to update contact" });
        }
        break;

      case "DELETE":
        // Handle DELETE request
        try {
          const deletedContact = await prisma.contact.delete({
            where: {
              id: parseInt(id),
              userId: session.user.id,
            },
          });
          res.status(200).json(deletedContact);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Failed to delete contact" });
        }
        break;

      default:
        res.setHeader("Allow", ["PUT", "DELETE"]);
        res.status(405).json({ message: "Method not allowed" });
        break;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while processing the request" });
  }
}
