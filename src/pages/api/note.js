import { createNote } from "../../../prisma/Note";
import { getSession } from "next-auth/react";
export default async function handle(req, res) {
  // Get the current session data with {user, email, id}
  const session = await getSession({ req });
  // Run if the request was a post request
  if (req.method == "POST") {
    // Get note title & body from the request body
    const body = req.body;
    // Create a new note
    // also pass the session which would be use to get the user information
    const note = await createNote(
      body, session
    );
    // return created note
    return res.json(note);
  }
}


