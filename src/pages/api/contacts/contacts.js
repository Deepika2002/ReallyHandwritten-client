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
      const  contacts  = req.body;
      console.log("req body",contacts)

      const createdContacts = await createContacts(contacts, session);

      res.status(201).json({ createdContacts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create contacts' });
    }
  } else if (req.method === 'GET') {
    try {
      let contacts;
      if (session.user.role === 'ADMIN') {
        contacts = await getContacts();
      } else {
        const userId = session.user.id;
        contacts = await getContacts(userId);
      }
      res.status(200).json(contacts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch contacts' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
