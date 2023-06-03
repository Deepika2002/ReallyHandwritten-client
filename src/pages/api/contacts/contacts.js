import { getSession } from 'next-auth/react';
import { createContacts, getContacts } from '../../../../prisma/contact';

export default async function handler(req, res) {
  const session = await getSession({ req });
  console.log(session);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    try {
      const contacts = req.body;
      console.log("req body", contacts)

      const createdContacts = await createContacts(contacts, session);

      res.status(201).json({ createdContacts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create contacts' });
    }
  } else if (req.method === 'GET') {
    try {
      const { userId } = req.query; // Get the userId from the request query parameter

      // Handle different scenarios based on user role
      let contacts;
      // if (session.user.role === 'ADMIN') {
      //   if (userId) {
      //     contacts = await getContacts(userId); // Fetch contacts for the specified userId
      //   } else {
      //     contacts = await getContacts(); // Fetch all contacts for the admin
      //   }
      // } else {
      //   const loggedUserId = session.user.id;
      //   if (userId && userId !== loggedUserId) {
      //     return res.status(401).json({ error: 'Unauthorized' });
      //   }
      //   contacts = await getContacts(loggedUserId); // Fetch contacts for the logged-in user
      // }

      const loggedUserId = session.user.id;
        if (userId && userId !== loggedUserId) {
          return res.status(401).json({ error: 'Unauthorized' });
        }
        contacts = await getContacts(loggedUserId);

      res.status(200).json(contacts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch contacts' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
