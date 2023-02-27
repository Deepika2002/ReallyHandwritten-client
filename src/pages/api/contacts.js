// pages/api/save-my-data.js
import { PrismaClient } from "@prisma/client";
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

export default async function handler(req, res) {

  const session = await getSession({ req });
  
  if (!session) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  if (req.method === "POST") {
    
    const contacts = req.body;
    const result = await saveMyData(contacts, session);
    res.status(200).json({ result });

  } else {
    res.status(400).json({ message: "Invalid request method" });
  }
}

async function saveMyData(contacts, session) {
  const result = await prisma.contact.createMany({
    data: contacts.map((obj) => ({
      firstname: obj.firstname,
      lastname: obj.lastname,
      phone: obj.phone,
      email: obj.email,
      address: obj.address,
      agent: obj.agent,
      userId: session?.user?.email
    })),
  });
  return result;
}
