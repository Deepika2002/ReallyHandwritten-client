import { createContacts, updateContact, deleteContact, getContacts } from "../../../prisma/contact";
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

    switch (req.method) {
      case "POST": {
        try {
          const contacts = req.body;

          const createdContacts = await createContacts(contacts, session);

          res.status(200).json({ contacts: createdContacts });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "An error occurred while creating the contacts" });
        }
        break;
      }

      case "PUT":
        // Handle PUT request
        try {
          const updatedContact = await updateContact({
            where: {
              id: parseInt(id),
              userId: session.user.id,
            },
            data: JSON.parse(body),
          });
          res.status(200).json(updatedContact);
        } catch (error) {
          res.status(500).json({ error: "Failed to update contact" });
        }
        break;
      case "DELETE":
        // Handle DELETE request
        try {
          const deletedContact = await deleteContact({
            where: {
              id: parseInt(id),
              userId: session.user.id,
            },
          });
          res.status(200).json(deletedContact);
        } catch (error) {
          res.status(500).json({ error: "Failed to delete contact" });
        }
        break;

      case "GET": {
        try {
          let contacts;

          if (session.user.role === 'ADMIN') {
            contacts = await getContacts();
          } else {
            const userId = session.user.id;
            contacts = await getContacts(userId);
          }

          res.json(contacts);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "An error occurred while retrieving the contacts" });
        }
        break;
      }

      default: {
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        res.status(405).json({ message: "Method not allowed" });
        break;
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while processing the request" });
  }
}
