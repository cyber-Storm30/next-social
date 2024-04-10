import { getData } from "./rootService";

export const handleGetNotifications = async (userId: string) => {
  try {
    const response = await getData(`/notification?userId=${userId}`);
    return response;
  } catch (err) {
    return err;
  }
};
