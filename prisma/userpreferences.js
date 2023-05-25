import prisma from "./prisma";

export const createPreferences = async (userpreferences, session) => {
  try {
    const parsedPreferences = JSON.parse(userpreferences);
    if (!parsedPreferences.welcomeInput || !parsedPreferences.addressClients || !parsedPreferences.endearingTerm || !parsedPreferences.withoutName || !parsedPreferences.selectCard || !parsedPreferences.messageInput) {
      throw new Error('Invalid preferences data');
    }

    const userId = session?.user?.id;
    if (!userId) {
      throw new Error('User not authenticated');
    }

    // Retrieve existing preferences for the user
    const existingPreferences = await prisma.userPreference.findMany({ where: { userId } });

    // Calculate the next preference number
    const nextPreferenceNumber = existingPreferences.length + 1;

    // Assign the name with the preference number
    const name = `Preference ${nextPreferenceNumber}`;

    const data = { ...parsedPreferences, userId, name };
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
    const userId = session?.user?.id;
    if (!userId) {
      throw new Error('User not authenticated');
    }

    const preference = await prisma.userPreference.findUnique({
      where: { id_userId: { id, userId } },
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

export const deletePreferences = async (id, session) => {
  try {
    const userId = session?.user?.id;
    if (!userId) {
      throw new Error('User not authenticated');
    }

    const preference = await prisma.userPreference.findUnique({
      where: { id_userId: { id, userId } },
    });
    if (!preference) {
      throw new Error("Preference not found");
    }

    const deletedPreference = await prisma.userPreference.delete({
      where: { id: preference.id },
    });
    return deletedPreference;
  } catch (error) {
    console.error("deletePreferences error:", error);
    throw error;
  }
};
