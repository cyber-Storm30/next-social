import { getData } from "@/services/rootService";

export const useAuth = async () => {
  try {
    const response = await getData("/auth/check");
    if (response.status === 200) {
      return {
        success: response.success,
        userId: response.userId,
      };
    } else {
      return { success: false, userId: "NONE" };
    }
  } catch (error) {
    console.log(error);
    return { success: false, userId: "NONE" };
  }
};
