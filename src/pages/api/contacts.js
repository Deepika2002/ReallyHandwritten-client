import { createContacts, updateContact, deleteContact, getContacts } from "../../../prisma/contact";
import { getSession } from "next-auth/react";

export default async function handle(req, res) {
  try {
    // Get the current session data with {user, email, id}
    const session = await getSession({ req });

    if (!session) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    switch (req.method) {
      case "POST": {
        try {
          // Get contact title & body from the request body
          const contacts = req.body;

          // Create a new contact
          // also pass the session which would be use to get the user information
          const result = await createContacts(contacts, session);

          // return created contact
          res.status(200).json({ result });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "An error occurred while creating the contact" });
          return;
        }
      }

      case "PUT": {
        try {
          const { id, title, body } = req.body;

          // Update current contact
          // also pass the session which would be use to get the user information
          const contact = await updateContact(id, { title, body }, session);

          // return updated contact
          return res.json(contact);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "An error occurred while updating the contact" });
          return;
        }
      }

      case "DELETE": {
        try {
          const { id } = req.body;
          const contact = await deleteContact(id, session);

          // return deleted contact
          return res.json(contact);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "An error occurred while deleting the contact" });
        }
      }

      case "GET": {
        try {
          const userid = session?.user?.id;
          console.log("userid",userid)


          const contacts = await getContacts(userid);
          console.log("contacts get request", contacts)

          // return all contacts of the current user
          return res.json(contacts);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "An error occurred while retrieving the contacts" });
          return;
        }
      }

      default: {
        res.status(405).json({ message: "Method not allowed" });
        return;
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while processing the request" });
    return;
  }
}
