// ./prisma/.js
import prisma from "./prisma";
import { useSession } from 'next-auth/react';

// CREATE


export const createContacts = async (contacts, session) => {
  const data = contacts.map(({ firstname, lastname, phone, email, address, agent }) => ({
    firstname,
    lastname,
    phone,
    email,
    address,
    agent,
    userId: session?.user?.id,
  }));

  return await prisma.contact.createMany({ data });
};

export const getContacts = async (userId) => {
  return await prisma.contact.findMany({
    where: {
      userId: userId,
    },
  });
};

export const updateContact = async (id, data, session) => {
  const contact = await prisma.contact.findFirst({
    where: {
      id: id,
      userId: session?.user?.id,
    },
  });

  if (!contact) {
    throw new Error("Contact not found");
  }

  const updatedContact = await prisma.contact.update({
    where: {
      id: id,
    },
    data,
  });

  return updatedContact;
};
export const deleteContact = async (id, session) => {
  const contact = await prisma.contact.findFirst({
    where: {
      id: id,
      userId: session?.user?.id,
    },
  });

  if (!contact) {
    throw new Error("Contact not found");
  }

  return await prisma.contact.delete({
    where: {
      id: id,
    },
  });
};