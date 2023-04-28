import prisma from "./prisma";

export const createPreferences = async (userpreferences, session) => {
  try {
    const parsedPreferences = JSON.parse(userpreferences);
    if (!parsedPreferences.welcomeInput || !parsedPreferences.addressClients || !parsedPreferences.endearingTerm || !parsedPreferences.withoutName || !parsedPreferences.messageInput) {
      throw new Error('Invalid preferences data');
    }
    const data = { ...parsedPreferences, userId: session?.user?.id };
    console.log("data:", data);
    if (!prisma) {
      throw new Error("Prisma is not initialized");
    }
    const result = await prisma.userPreference.create({ data });
    console.log("result:", result);
    return result;
  } catch (error) {
    console.error("createPreferences error:", error);
    throw error;
  }
};

export const updatePreferences = async (id, data, session) => {
  try {
    const preference = await prisma.userPreference.findUnique({
      where: { id_userId: { id, userId: session?.user?.id } },
    });
    if (!preference) {
      throw new Error("Preference not found");
    }
    const updatedPreference = await prisma.userPreference.update({
      where: { id: preference.id },
      data,
    });
    return updatedPreference;
  } catch (error) {
    console.error("updatePreferences error:", error);
    throw error;
  }
};
