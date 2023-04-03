// ./prisma/.js
import prisma from "./prisma";

export const userPreferences = async (userpreferences, session) => {
  
    // const [{ welcomeInput, addressClients, endearingTerm, withoutName, messageInput }] = userpreferences;
  console.log(userpreferences,userpreferences.welcomeInput)
    const data = {
      welcomeInput,
      addressClients,
      endearingTerm,
      withoutName,
      messageInput,
      userId: session?.user?.id,
    };
    console.log(data)
  
    return await prisma.userpreference.create({ data });
  };
// export const userPreferences = async (userpreferences, session) => {
//     const userPreference = userpreferences[0];
//     const data = {
//       welcomeInput: userPreference.welcomeInput,
//       addressClients: userPreference.addressClients,
//       endearingTerm: userPreference.endearingTerm,
//       withoutName: userPreference.withoutName,
//       messageInput: userPreference.messageInput,
//       userId: session?.user?.id,
//     };
//     console.log(data);
//     return await prisma.userpreference.create({ data });
//   };
  