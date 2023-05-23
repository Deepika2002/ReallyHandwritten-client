
// export const updateContact = async (id, data, session) => {
//   try {
//     const contact = await prisma.contact.findFirst({
//       where: {
//         id: parseInt(id),
//         userId: session.user.id,
//       },
//     });

//     if (!contact) {
//       throw new Error('Contact not found');
//     }

//     const updatedContact = await prisma.contact.update({
//       where: {
//         id: parseInt(id),
//       },
//       data,
//     });

//     return updatedContact;
//   } catch (error) {
//     throw new Error('Failed to update contact');
//   }
// };



// prisma/contact.js

import prisma from './prisma';

export const getContacts = async (userId) => {
  try {
    const contacts = await prisma.contact.findMany({
      where: {
        userId,
      },
    });

    return contacts;
  } catch (error) {
    throw new Error('Failed to fetch contacts');
  }
};

export const createContacts = async (contacts, session) => {
  console.log("data from prisma",contacts)
  try {
    const data = contacts.map(({ firstname, lastname, phone, email, address, agent }) => ({
      firstname,
      lastname,
      phone,
      email,
      address,
      agent,
      userId: session.user.id,
    }));

    const createdContacts = await prisma.contact.createMany({ data });
   

    return createdContacts;
  } catch (error) {
    throw new Error('Failed to create contacts');
  }
};

export const getContactById = async (id, userId) => {
  try {
    const contact = await prisma.contact.findFirst({
      where: {
        id: id,
        userId,
      },
    });

    return contact;
  } catch (error) {
    throw new Error('Failed to fetch contact');
  }
};

export const updateContact = async (contactId, data) => {
  console.log("data",contactId, data)
  const updatedContact = await prisma.contact.update({
    where: { id: contactId },
    data:{
      firstname:data.firstname,
      lastname:data.lastname,
      phone:data.phone,
      email:data.email,
      address:data.address,
      agent:data.agent,
      status:data.status

    }

  });
  return updatedContact;
};

export const deleteContact = async (contactId) => {
  await prisma.contact.delete({
    where: { id: contactId },
  });
};
