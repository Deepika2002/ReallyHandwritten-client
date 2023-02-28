// ./prisma/.js
import prisma from "./prisma";

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

// READ
export const getContacts = async (session) => {
  const userid = session?.user?.id;
  
  return await prisma.contact.findMany({
    where: {
      userId: userid,
    },
  });
};

// UPDATE
export const updateContact = async (id, data, session) => {
  const { id: contactId } = await prisma.contact.update({
    where: {
      id_userId: {
        id,
        userId: session?.user?.id,
      },
    },
    data,
  });

  return await prisma.contact.findUnique({
    where: {
      id: contactId,
    },
  });
};

// DELETE
export const deleteContact = async (id, session) => {
  return await prisma.contact.delete({
    where: {
      id_userId: {
        id,
        userId: session?.user?.id,
      },
    },
  });
};
