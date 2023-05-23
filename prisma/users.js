import prisma from "./prisma";

export async function getUsersWithContactCount() {
  const users = await prisma.user.findMany({
    include: {
      contacts: true,
    },
    
  });
  console.log("prisma users",users)

  const formattedUsers = users.map((user) => ({
    id: user.id,
    name: user.name,
    role: user.role,
    contactCount: user.contacts.length,
  }));

  return formattedUsers;
}
