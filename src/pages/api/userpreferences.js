import { userPreferences } from "../../../prisma/userpreferences";
import { getSession } from "next-auth/react";

export default async function handle(req, res) {
    try {
        // Get the current session data with {user, email, id}
        const session = await getSession({ req });

        if (!session) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        // Get contact title & body from the request body
        const userpreferences = req.body;

        // Create a new contact
        // also pass the session which would be use to get the user information
        const result = await userPreferences(userpreferences, session);

        // return created contact
        res.status(200).json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while creating the contact" });
        return;
    }
}
// export default function handler(req, res) {
   
//     res.status(200).json({ name: 'John Doe' })
//     console.log(req.body)
//   }