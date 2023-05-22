// pages/api/contacts/[contactId].js

import { getSession } from 'next-auth/react';
import { getContactById, updateContact, deleteContact } from '../../../../prisma/contact';

export default async function handler(req, res) {
  const session = await getSession({ req });
  console.log("id check",session)

  if (!session) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const { contactId } = req.query;

  if (req.method === 'GET') {
    // Get contact by ID logic
    try {
      const contact = await getContactById(parseInt(contactId), session.user.id);
      if (contact) {
        res.status(200).json(contact);
      } else {
        res.status(404).json({ message: 'Contact not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch contact' });
    }
  } else if (req.method === 'PUT') {
    // Update contact logic
    try {
      const updatedContact = await updateContact((contactId), req.body);
      res.status(200).json(updatedContact);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update contact' });
    }
  } else if (req.method === 'DELETE') {
    // Delete contact logic
    try {
      await deleteContact((contactId));
      res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete contact' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
